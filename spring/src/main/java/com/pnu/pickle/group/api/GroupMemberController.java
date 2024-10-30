package com.pnu.pickle.group.api;

import com.pnu.pickle.auth.service.AuthService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import com.pnu.pickle.group.dto.groupMember.ChangeMemberGroupRoleDto;
import com.pnu.pickle.group.dto.groupMember.DeleteMemberDto;
import com.pnu.pickle.group.dto.groupMember.InviteMemberDto;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.group.exception.InvalidMemberException;
import com.pnu.pickle.group.exception.RoleException;
import com.pnu.pickle.group.service.GroupService;
import com.pnu.pickle.user.entity.User;
import com.pnu.pickle.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "그룹 멤버 컨트롤러", description = "그룹멤버와 관련된 API입니다.")
@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupMemberController {
    private final UserService userService;
    private final GroupService groupService;
    private final AuthService authService;

    @PostMapping("/invite-member")
    @Operation(
            summary = "그룹멤버 초대 API",
            description = "아직 이메일 전송 서버가 마련되지 않아, 우선 초대하려는 사람의 이메일이 시스템 내에 있으면 무조건 그룹에 초대됩니다."
    )
    public ResponseEntity<String> inviteMember(@RequestBody InviteMemberDto inviteMemberDto) {
        if(!userService.checkMemberExistsByEmail(inviteMemberDto.getEmail())){
            throw new InvalidMemberException("No Member in Service");
        }

        User targetUser = userService.getMemberByEmail(inviteMemberDto.getEmail());
        Long groupId = groupService.inviteMemberToGroup(targetUser, inviteMemberDto);

        return ResponseEntity.ok().body("member invited");
    }

    @PostMapping("/change-member-role")
    @Operation(
            summary = "그룹멤버 권한 수정 API",
            description = "Owner는 Admin, Member의 권한을 변경가능하며, Admin은 Member의 권한을 변경가능합니다."
    )
    public ResponseEntity<BaseAPIResponseDto> changeMemberRole(HttpServletRequest request, @RequestBody ChangeMemberGroupRoleDto changeMemberGroupRoleDto) {
        GroupMembership groupMembership = authService.getUserGroupMembershipByToken(request, changeMemberGroupRoleDto.getGroupId());
        MemberGroupRole role = groupMembership.getAuthority();

        GroupMembership targetUserOriginMembership = groupService.getUserGroupMembershipByUsername(changeMemberGroupRoleDto.getUsername(), changeMemberGroupRoleDto.getGroupId());
        MemberGroupRole targetUserOriginRole = targetUserOriginMembership.getAuthority();

        if (role == MemberGroupRole.MEMBER) {
            throw new RoleException("Member can't change group role");
        }

        if (role.ordinal() > targetUserOriginRole.ordinal()){
            throw new RoleException("Admin can't change owner's role");
        }

        targetUserOriginMembership.setAuthority(changeMemberGroupRoleDto.getRole());

        groupService.setUserGroupMembership(targetUserOriginMembership);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Member role changed")
                .build();

        return ResponseEntity.ok().body(responseDto);
    }

    @DeleteMapping("/delete-member")
    @Operation(
            summary = "그룹 멤버 삭제 API",
            description = "멤버 username과 그룹 아이디를 전달받아, 해당 그룹에서 멤버를 삭제합니다."
    )
    public ResponseEntity<BaseAPIResponseDto> deleteMember(@RequestBody DeleteMemberDto deleteMemberDto) {
        if(!userService.checkMemberExistsByUsername(deleteMemberDto.getUsername())){
            throw new InvalidMemberException("No Member in Service");
        }

        User targetUser = userService.getMemberByUsername(deleteMemberDto.getUsername());
        groupService.deleteMemberFromGroup(targetUser, deleteMemberDto);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("member deleted")
                .build();

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseDto);
    }
}
