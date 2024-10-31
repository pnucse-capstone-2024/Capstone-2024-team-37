package com.pnu.pickle.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserGroupProjectInfoResDto {
    @Schema(description = "사용자 그룹_프로젝트 리스트", nullable = false, example = "")
    private List<UserGroupProjectInfo> userGroupInfoList = new ArrayList<>();
}
