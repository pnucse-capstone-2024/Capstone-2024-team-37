package com.pnu.pickle.group.api;

import com.pnu.pickle.auth.service.AuthService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import com.pnu.pickle.group.dto.CreateGroupDto;
import com.pnu.pickle.group.dto.GroupProject;
import com.pnu.pickle.group.dto.groupMember.GroupParticipant;
import com.pnu.pickle.group.dto.gurumOnly.GurumGroupDashBoardResDto;
import com.pnu.pickle.group.dto.jolgwaOnly.JolgwaGroupDashBoardResDto;
import com.pnu.pickle.group.entity.Group;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.service.GroupService;
import com.pnu.pickle.project.dao.ProjectImageRepository;
import com.pnu.pickle.project.dao.ProjectRepository;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.project.entity.ProjectImage;
import com.pnu.pickle.user.entity.User;
import com.pnu.pickle.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Tag(name = "그룹 컨트롤러", description = "그룹과 관련된 API입니다.")
@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {
    private final AuthService authService;
    private final GroupService groupService;
    private final UserService userService;
    private final ProjectRepository projectRepository;
    private final ProjectImageRepository projectImageRepository;

    @PostMapping
    @Operation(
        summary = "그룹 생성 API",
        description = "인증코드 발급 기능이며, 필수 정보로 이메일, 비밀번호가 필요하며 성공 시 jwt를 발급합니다."
    )
    public ResponseEntity<?> addGroup(HttpServletRequest request, @RequestBody CreateGroupDto createGroupDto) {
        User user = authService.getUserByToken(request);
        Long groupId = groupService.createGroupByUser(user, createGroupDto).getId();

        return ResponseEntity.created(URI.create("/group/" + groupId)).body("group created");
    }

    @GetMapping("/dashboard")
    @Operation(
            summary = "그룹 대시보드 조회 API (졸업과제 Only)",
            description = "졸업과제 그룹 대시보드 페이지에 사용되는 API 입니다."
    )
    public ResponseEntity<BaseAPIResponseDto<JolgwaGroupDashBoardResDto>> getGroup(@RequestParam Long groupId) {
        Group group = groupService.getGroupById(groupId);
        List<GroupMembership> groupMembershipList = group.getGroupMembers();
        List<GroupParticipant> groupParticipants = groupMembershipList.stream()
                .map(GroupParticipant::from)
                .sorted(Comparator.comparingInt(participant -> participant.getParticipantAuthority().ordinal()))
                .toList();
        JolgwaGroupDashBoardResDto resDto = JolgwaGroupDashBoardResDto.builder()
                .groupName(group.getName())
                .groupDescription(group.getDescription())
                .groupParticipants(groupParticipants).build();

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Successfully get group dashboard")
                .data(resDto)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping
    @Operation(
        summary = "그룹 조회 API (창업캠프 Only)",
        description = "창업 캠프 피클 그룹 대시보드 페이지에 사용되는 API 입니다."
    )
    public ResponseEntity<BaseAPIResponseDto<GurumGroupDashBoardResDto>> getGroupDashBoard(@RequestParam Long groupId){
        Group group = groupService.getGroupById(groupId);

        List<GroupMembership> groupMembershipList = group.getGroupMembers();
        List<GroupParticipant> groupParticipants = groupMembershipList.stream()
                .map(GroupParticipant::from)
                .sorted(Comparator.comparingInt(participant -> participant.getParticipantAuthority().ordinal()))
                .toList();

        List<Project> projectList = projectRepository.findByGroupId(groupId);
        List<GroupProject> groupProjects = new ArrayList<>();

        for (Project project : projectList) {

            String projectImageUrl = "https://pickle-avatar.s3.amazonaws.com/bluee.svg";

            List<ProjectImage> images = projectImageRepository.findByProjectId(project.getId());

            if(images.size() > 0) {
                projectImageUrl = images.get(0).getImage_url();
            }

            GroupProject groupProject = new GroupProject(
                    project.getId(),
                    group.getName(),
                    group.getImage(),
                    project.getName(),
                    projectImageUrl,
                    project.getDescription()
            );

            groupProjects.add(groupProject);
        }

        GurumGroupDashBoardResDto gurumGroupDashBoardResDto = GurumGroupDashBoardResDto.builder()
                .groupId(group.getId())
                .groupName(group.getName())
                .groupDescription(group.getDescription())
                .groupProfileImage(group.getImage())
                .groupParticipants(groupParticipants)
                .groupProjects(groupProjects)
                .build();

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Successfully get group dashboard")
                .data(gurumGroupDashBoardResDto)
                .build();

        return ResponseEntity.ok().body(responseDto);
    }



}
