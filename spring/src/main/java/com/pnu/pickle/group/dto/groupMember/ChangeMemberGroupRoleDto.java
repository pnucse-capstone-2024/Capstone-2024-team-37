package com.pnu.pickle.group.dto.groupMember;

import com.pnu.pickle.group.entity.MemberGroupRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangeMemberGroupRoleDto {
    @Schema(description = "현재 그룹 아이디", nullable = false, example = "1")
    private final Long groupId;
    @Schema(description = "권한을 변경하려고하는 사람의 유저네임", nullable = false, example = "seung")
    private final String username;
    @Schema(description = "변경하고자하는 권한(OWNER, ADMIN, MEMBER)", nullable = false, example = "ADMIN")
    private final MemberGroupRole role;
}
