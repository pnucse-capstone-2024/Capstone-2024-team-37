package com.pnu.pickle.user.dto;

import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class UserGroupInfo {
    private Long id;
    private MemberGroupRole authority;

    public static UserGroupInfo create(GroupMembership membership) {
        return new UserGroupInfo(membership.getGroup().getId(), membership.getAuthority());
    }
}
