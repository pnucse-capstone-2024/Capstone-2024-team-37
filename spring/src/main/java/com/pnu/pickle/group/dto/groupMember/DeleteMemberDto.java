package com.pnu.pickle.group.dto.groupMember;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DeleteMemberDto {
    private final Long groupId;
    private final String username;
}
