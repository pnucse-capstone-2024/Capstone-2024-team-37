package com.pnu.pickle.project.api;

import com.pnu.pickle.auth.service.AuthService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.group.service.GroupService;
import com.pnu.pickle.project.dao.ProjectAuthorityRepository;
import com.pnu.pickle.project.dao.ProjectImageRepository;
import com.pnu.pickle.project.dao.ProjectRepository;
import com.pnu.pickle.project.dto.*;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.project.entity.ProjectAuthority;
import com.pnu.pickle.project.entity.ProjectImage;
import com.pnu.pickle.project.exception.InvalidSubmitProjectGroupException;
import com.pnu.pickle.project.exception.SubmitProjectRoleException;
import com.pnu.pickle.project.service.ProjectService;
import com.pnu.pickle.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;
    private final ProjectAuthorityRepository projectAuthorityRepository;
    private final GroupService groupService;
    private final AuthService authService;

    @GetMapping("/get-project-overview")
    @Operation(
            summary = "프로젝트 개요 페이지(배포페이지 step1) 정보 조회 API-졸업과제",
            description = "프로젝트 id로 프로젝트 개요를 반환합니다."
    )
    public ResponseEntity<BaseAPIResponseDto<GetProjectOverviewResDto>> getProjectOverview(@RequestParam Long id){

        Project project = projectRepository.findById(id).orElseThrow();

        List<ProjectAuthority> authorities = projectAuthorityRepository.findByProjectId(project.getId());
        List<ProjectParticipant> participants = new ArrayList<>();
        authorities.forEach((projectAuthority) -> {
            participants.add(ProjectParticipant.from(projectAuthority));
        });

        GetProjectOverviewResDto resDto = GetProjectOverviewResDto.builder()
                .projectName(project.getName())
                .projectDefaultDomain(project.getDomain())
                .projectDescription(project.getDescription())
                .participants(participants)
                .build();

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message(null)
                .data(resDto)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/submit-project-overview")
    @Operation(
            summary = "프로젝트 개요 페이지(배포페이지 step1) 저장 API-졸업과제",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<SubmitProjectDetailResDto>> submitProjectOverview(@RequestParam Long groupId, @RequestBody SubmitProjectOverviewReqDto submitProjectOverviewReqDto, HttpServletRequest request){

        if(!groupService.groupIdExist(groupId)){
            throw new InvalidSubmitProjectGroupException("Invalid GroupId!");
        }

        //권한 검사(그룹 내 어드민인지)
        User user = authService.getUserByToken(request);

        GroupMembership membership = groupService.getUserGroupMembership(user, groupId);

        // Member 라면 프로젝트 생성 불가
        if(membership.getAuthority().ordinal() > MemberGroupRole.ADMIN.ordinal()){
            throw new SubmitProjectRoleException("Member can't submit project!");
        }

        Long projectId = null;

        try {
            projectId = projectService.submitProjectOverview(user, groupId, submitProjectOverviewReqDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Project Overview(Step 1) Successfully Submitted.")
                .data(new SubmitProjectDetailResDto(projectId, submitProjectOverviewReqDto.getDomain()))
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PostMapping("/check-valid-domain")
    @Operation(
            summary = "디폴트 도메인(배포페이지 step1) 중복체크 API-졸업과제",
            description = "프로젝트 테이블에 사용가능한 도메인인지 여부를 반환합니다."
    )
    public ResponseEntity<BaseAPIResponseDto<Boolean>> checkValidDomain(@RequestBody CheckValidProjectDomainReqDto checkValidProjectDomainReqDto){
        Boolean result = projectService.checkValidDomain(checkValidProjectDomainReqDto.getDomain());
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message(result ? "Invalid Domain" : "Valid Domain")
                .data(!result)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/submit-project-detail")
    @Operation(
            summary = "프로젝트 스텝 2 API-졸업과제",
            description = ""
    )
    public BaseAPIResponseDto submitProjectDetail(@RequestPart("projectData") SubmitProjectDetailReqDto projectData,
                                                  @RequestParam Map<String, MultipartFile> files) throws IOException {

        System.out.println(projectData);
        System.out.println("files:" + files.keySet());

        projectService.submitProjectDetail(projectData, files);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Project Submission Step 2 Success")
                .data(true)
                .build();

        return responseDto;
    }

    @GetMapping
    @Operation(
            summary = "프로젝트 정보 가져오기 API-졸업과제",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<GetProjectResDto>> getProject(@RequestParam Long projectId){
        GetProjectResDto resDto = projectService.getProject(projectId);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("")
                .data(resDto)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @DeleteMapping
    @Operation(
            summary = "프로젝트 전체 삭제 API-졸업과제",
            description = "프로젝트 전체를 삭제합니다."
    )
    public BaseAPIResponseDto deleteProject(@RequestParam Long projectId) throws IOException {

        projectService.deleteProject(projectId);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Project Deleted")
                .data(true)
                .build();

        return responseDto;
    }

    @DeleteMapping("/delete-container")
    @Operation(
            summary = "프로젝트 컨테이너 삭제 API-졸업과제",
            description = "프로젝트에 속한 컨테이너 1개를 삭제합니다."
    )
    public BaseAPIResponseDto deleteProjectContainer(@RequestParam Long containerId) throws IOException {

        projectService.deleteProjectContainer(containerId);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Container Deleted")
                .data(true)
                .build();

        return responseDto;
    }

    @DeleteMapping("/delete-container-env")
    @Operation(
            summary = "프로젝트 컨테이너 환경변수 삭제 API-졸업과제",
            description = "프로젝트에 속한 컨테이너의 환경변수 1개를 삭제합니다."
    )
    public BaseAPIResponseDto deleteProjectContainerEnv(@RequestParam Long containerEnvId) throws IOException {

        projectService.deleteProjectContainerEnv(containerEnvId);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Container Env Deleted")
                .data(true)
                .build();

        return responseDto;
    }
}
