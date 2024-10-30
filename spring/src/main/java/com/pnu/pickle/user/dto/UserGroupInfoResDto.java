package com.pnu.pickle.user.dto;

import com.pnu.pickle.group.entity.MemberGroupRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserGroupInfoResDto {
    private List<UserGroupInfo> userGroupInfoList = new ArrayList<>();
}
