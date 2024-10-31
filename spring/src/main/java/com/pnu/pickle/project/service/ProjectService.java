package com.pnu.pickle.project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pnu.pickle.group.entity.Group;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.group.service.GroupService;
import com.pnu.pickle.project.dao.*;
import com.pnu.pickle.project.dto.*;
import com.pnu.pickle.project.entity.*;
import com.pnu.pickle.project.exception.DuplicateDomainException;
import com.pnu.pickle.project.exception.InvalidContainerSubDomainException;
import com.pnu.pickle.project.exception.InvalidProjectIdException;
import com.pnu.pickle.s3.service.BucketNameEnum;
import com.pnu.pickle.s3.service.S3Service;
import com.pnu.pickle.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final RedisTemplate<String, String> redisTemplate;
    private final ProjectRepository projectRepository;
    private final GroupService groupService;
    private final S3Service s3Service;
    private final ObjectMapper objectMapper;
    private final ProjectImageRepository projectImageRepository;
    private final ProjectAuthorityRepository projectAuthorityRepository;
    private final ContainerDetailRepository containerDetailRepository;
    private final ContainerEnvRepository containerEnvRepository;

    private void pushDomainToMq(String domain){
        redisTemplate.opsForList().rightPush("domain", domain);
    }

    public Boolean checkValidDomain(String domain){
        return projectRepository.existsByDomain(domain);
    }

    public void deleteProject(Long projectId){
        projectRepository.deleteById(projectId);
    }

    public void deleteProjectContainer(Long containerId){
        containerDetailRepository.deleteById(containerId);
    }

    public void deleteProjectContainerEnv(Long containerEnvId){
        containerEnvRepository.deleteById(containerEnvId);
    }

    public GetProjectResDto getProject(Long projectId){

        Project project = projectRepository.findById(projectId).orElse(null);
        if(project == null){
            throw new InvalidProjectIdException("유효하지 않은 프로젝트 아이디입니다.");
        }

        List<ProjectContainer> containers = new ArrayList<>();

        project.getContainerDetails().forEach(container -> {
            ProjectContainer projectContainer = new ProjectContainer();
            projectContainer.setContainerId(container.getId());
            projectContainer.setContainerDomain(container.getContainerDomain());
            projectContainer.setContainerTemplateName(container.getContainerTemplateName());
            projectContainer.setContainerStack(container.getContainerStack());
            projectContainer.setFilename(container.getFileName());
            projectContainer.setPortIndex(container.getPortIndex());
            projectContainer.setContainerEnvs(container.getContainerEnvs());
            containers.add(projectContainer);
        });

        return GetProjectResDto.builder()
                .containers(containers)
                .build();
    }

    private void setProjectImages(Project project, List<MultipartFile> projectImages) throws Exception{

        projectImages.forEach(multipartFile -> {
            try {
                ProjectImage projectImage = new ProjectImage();
                projectImage.setProject(project);
                String objectKey = s3Service.UploadToS3(multipartFile, BucketNameEnum.PROJECT);
                String url = s3Service.getS3ObjectPublicUrl(objectKey, BucketNameEnum.PROJECT);
                projectImage.setImage_url(url);
                projectImageRepository.save(projectImage);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    @Transactional
    public Long submitProjectOverview(User creator, Long groupId, SubmitProjectOverviewReqDto submitProjectOverviewReqDto) throws Exception{

        // 도메인 중복 검사
        if(projectRepository.existsByDomain(submitProjectOverviewReqDto.getDomain())){
            throw new DuplicateDomainException("Duplicate domain!");
        }

        //그룹에 속한 신규 프로젝트 생성
        Project project = new Project();

        // 이름, 설명 세팅
        project.setName(submitProjectOverviewReqDto.getProjectName());
        project.setDescription(submitProjectOverviewReqDto.getProjectDescription());
        project.setDomain(submitProjectOverviewReqDto.getDomain());
        project.setProjectType(submitProjectOverviewReqDto.getProjectType());

        //만든 이, 속한 그룹 세팅
        project.setOwner(creator);
        project.setGroup(groupService.getGroupById(groupId));

        project = projectRepository.save(project);

        //해당 그룹의 모든 인원(OWNER 제외)을 프로젝트 Authority에 넣어줌
        Group group = groupService.getGroupById(groupId);

        List<GroupMembership> groupMembers = group.getGroupMembers();

        for (GroupMembership groupMembership : groupMembers) {
            ProjectAuthority projectAuthority = new ProjectAuthority();
            User user = groupMembership.getUser();

            projectAuthority.setUser(user);
            projectAuthority.setPermission(Permission.VIEW);

            if(Objects.equals(user.getId(), creator.getId()) || groupService.getUserGroupMembership(user, groupId).getAuthority() == MemberGroupRole.OWNER) {
                projectAuthority.setPermission(Permission.EDIT);
            }

            project.addProjectAuthority(projectAuthority);
        }

        projectRepository.save(project);

        // redis에 도메인 푸쉬
        pushDomainToMq(submitProjectOverviewReqDto.getDomain());

        return project.getId();
    }

    @Transactional
    public void submitProjectDetail(SubmitProjectDetailReqDto projectData, Map<String, MultipartFile> files) throws IOException {
        Long projectId = projectData.getProjectId();
        Project project = projectRepository.findById(projectId).orElse(null);
        String projectDomain = project.getDomain();
        List<PickleContainerInfoToMQ> containers = new ArrayList<>();

        // 파일 리스트 키 값 유효성 검사
        List<String> fileKeyList = files.keySet().stream().toList();
        projectData.getTemplates().stream().forEach((template) -> {
            if(!fileKeyList.contains(template.getSubdomain())){
                String containerStack = template.getContainerStack();
                boolean isDB = containerStack.equals("MYSQL") || containerStack.equals("PostgreSQL") || containerStack.equals("MongoDB") || containerStack.equals("MySQL");
                if(!isDB) {
                    throw new InvalidContainerSubDomainException("file Key List is Invalid");
                }
            }
        });

        if(redisTemplate.opsForValue().get("portIndex") == null){
            redisTemplate.opsForValue().set("portIndex", String.valueOf(10000L));
        }

        for(ProjectTemplate item : projectData.getTemplates()){
            String port = redisTemplate.opsForValue().get("portIndex");

            //컨테이너 서브도메인 유효성 검사
            System.out.println(item.getSubdomain());
            System.out.println(projectDomain);
            if(!item.getSubdomain().endsWith(projectDomain)){
                throw new InvalidContainerSubDomainException(item.getTemplateTitle() + "'s subdomain is invalid!");
            }

            //s3 url 생성
            MultipartFile file = files.get(item.getSubdomain());
            String objectKey = s3Service.UploadToS3(file, BucketNameEnum.AVATAR);
            String url = s3Service.getS3ObjectPublicUrl(objectKey, BucketNameEnum.AVATAR);

            // 메시지큐에 들어갈 컨테이너 정보만들기
            PickleContainerInfoToMQ pc = PickleContainerInfoToMQ.from(item, url, port);
            containers.add(pc);

            // 데이터베이스 저장할 정보 만들기
            ContainerDetail containerDetail = new ContainerDetail();
            containerDetail.setProject(project);
            containerDetail.setContainerTemplateName(item.getTemplateTitle());
            containerDetail.setContainerDomain(item.getSubdomain());
            containerDetail.setContainerStack(item.getContainerStack());
            containerDetail.setFileName(file.getOriginalFilename());
            containerDetail.setPortIndex(Long.valueOf(port));
            containerDetail.setFileUrl(url);

            // DB에 저장
            containerDetailRepository.save(containerDetail);

            // 데이터베이스에 환경변수 키 값 저장
            item.getEnvVars().keySet().forEach((key)->{
                ContainerEnv containerEnv = new ContainerEnv();
                containerEnv.setContainer(containerDetail);
                containerEnv.setKey(key);
                // DB에 저장
                containerEnvRepository.save(containerEnv);
            });

            // port + 1
            redisTemplate.opsForValue().set("portIndex", String.valueOf(Integer.parseInt(port) + 1));
        }

        RealObj obj = RealObj.builder().domain(projectDomain).container(containers).build();

        String value = objectMapper.writeValueAsString(obj);

        ListOperations<String, String> list = redisTemplate.opsForList();

        list.rightPush("projectDetail", value);

    }

}
