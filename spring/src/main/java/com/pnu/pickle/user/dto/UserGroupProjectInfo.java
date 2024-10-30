package com.pnu.pickle.user.dto;

import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.entity.MemberGroupRole;
import com.pnu.pickle.project.entity.Project;
import com.pnu.pickle.user.dto.jolgwa.ProjectOverviewInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class UserGroupProjectInfo {
    @Schema(description = "사용자가 속한 그룹 id", nullable = false, example = "1")
    private Long id;
    @Schema(description = "사용자가 속한 그룹 이름", nullable = false, example = "졸과그룹")
    private String groupName;
    @Schema(description = "사용자의 그룹 권한", nullable = false, example = "OWNER")
    private MemberGroupRole authority;
    @Schema(description = "사용자가 속한 그룹의 프로젝트 리스트", nullable = false, example = "")
    private List<ProjectOverviewInfo> projects;

    public static UserGroupProjectInfo create(GroupMembership membership,  List<ProjectOverviewInfo> projects) {
        return new UserGroupProjectInfo(membership.getGroup().getId(), membership.getGroup().getName(), membership.getAuthority(), projects);
    }
}
