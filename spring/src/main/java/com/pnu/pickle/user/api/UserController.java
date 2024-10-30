package com.pnu.pickle.user.api;

import com.pnu.pickle.auth.dto.SignUpResDto;
import com.pnu.pickle.auth.service.AuthService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import com.pnu.pickle.group.dao.GroupRepository;
import com.pnu.pickle.group.dto.GroupProject;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.project.dao.ProjectAuthorityRepository;
import com.pnu.pickle.project.dao.ProjectImageRepository;
import com.pnu.pickle.project.dao.ProjectRepository;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.project.entity.ProjectAuthority;
import com.pnu.pickle.project.entity.ProjectImage;
import com.pnu.pickle.user.dto.*;
import com.pnu.pickle.user.dto.jolgwa.ProjectOverviewInfo;
import com.pnu.pickle.user.entity.User;
import com.pnu.pickle.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final AuthService authService;

    private final ProjectAuthorityRepository projectAuthorityRepository;
    private final ProjectImageRepository projectImageRepository;
    private final ProjectRepository projectRepository;

    private final GroupRepository groupRepository;

    @GetMapping("/project")
    @Operation(
            summary = "유저가 속한 프로젝트들을 가져오는 API",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<List<GroupProject>>> getUserProject(HttpServletRequest request){
        User user = authService.getUserByToken(request);

        List<ProjectAuthority> authorities = projectAuthorityRepository.findByUserId(user.getId());
        List<GroupProject> projects = new ArrayList<>();

        authorities.forEach((authority) -> {

            Project project = authority.getProject();

            String projectImageUrl = "https://pickle-avatar.s3.amazonaws.com/bluee.svg";

            List<ProjectImage> images = projectImageRepository.findByProjectId(project.getId());

            if(!images.isEmpty()) {
                projectImageUrl = images.getFirst().getImage_url();
            }

            GroupProject groupProject = new GroupProject(
                    project.getId(),
                    project.getGroup().getName(),
                    project.getGroup().getImage(),
                    project.getName(),
                    projectImageUrl,
                    project.getDescription()
            );

            projects.add(groupProject);
        });

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("user project info")
                .data(projects)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/get-user-nav-list")
    @Operation(
            summary = "유저가 속한 그룹 및 프로젝트들을 가져오는 API(졸업과제 Only)",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<UserGroupProjectInfoResDto>> getHiMember(HttpServletRequest request){
        User user = authService.getUserByToken(request);

        List<UserGroupProjectInfo> userGroupProjectInfoList = new ArrayList<>();
        List<GroupMembership> memberships = user.getMemberGroups();

        memberships.forEach((groupMembership) -> {
            Long groupId = groupMembership.getGroup().getId();
            String groupName = groupMembership.getGroup().getName();
            MemberGroupRole role = groupMembership.getAuthority();

            List<ProjectOverviewInfo> projectOverviewInfos = new ArrayList<>();
            List<Project> projects = projectRepository.findByGroupId(groupId);
            projects.forEach((project -> {
                ProjectOverviewInfo projectOverviewInfo = ProjectOverviewInfo.fromProject(project);
                projectOverviewInfos.add(projectOverviewInfo);
            }));

            UserGroupProjectInfo result = new UserGroupProjectInfo(groupId, groupName, role, projectOverviewInfos);
            userGroupProjectInfoList.add(result);
        });

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("user group info")
                .data(new UserGroupProjectInfoResDto(userGroupProjectInfoList))
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping
    @Operation(
            summary = "유저가 속한 그룹들을 가져오는 API",
            description = ""
    )
    public ResponseEntity<BaseAPIResponseDto<UserGroupInfoResDto>> getMember(HttpServletRequest request){
        User user = authService.getUserByToken(request);

        List<GroupMembership> memberships = user.getMemberGroups();
        List<UserGroupInfo> userGroupInfos = new ArrayList<>();
        for (GroupMembership membership : memberships) {
            userGroupInfos.add(UserGroupInfo.create(membership));
        }

        UserGroupInfoResDto userGroupInfoResDto = new UserGroupInfoResDto(userGroupInfos);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("user group info")
                .data(userGroupInfoResDto)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/get-user-info")
    @Operation(
            summary = "유저 정보를 가져오는 API",
            description = "유저 정보(id, username, userImage)를 반환합니다."
    )
    public ResponseEntity<BaseAPIResponseDto<UserInfoResDto>> getUserInfo(HttpServletRequest request){
        User user = authService.getUserByToken(request);

        UserInfoResDto userInfoResDto = UserInfoResDto.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .userImage(user.getUserImage())
                .build();

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("user info")
                .data(userInfoResDto)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

//    @PutMapping
//    public ResponseEntity<SuccessResponse<Member>> editMemberProfile(){
//        Member member = memberService.getMemberByEmail();
//        return ResponseEntity.ok(member);
//    }
}
