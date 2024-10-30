package com.pnu.pickle.group.dto.gurumOnly;

import com.pnu.pickle.group.dto.GroupProject;
import com.pnu.pickle.group.dto.groupMember.GroupParticipant;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

//@AllArgsConstructor
@Getter
@Builder
public class GurumGroupDashBoardResDto {

    // 그룹 정보
    private Long groupId;
    private String groupName;
    private String groupProfileImage;
    private String groupDescription;

    // 그룹 참가자 리스트
    @Schema(description = "그룹 참가자 리스트", nullable = false, example = "")
    private final List<GroupParticipant> groupParticipants;

    // 그룹 결제 수단
    @Schema(description = "그룹 결제수단 리스트(개발 중)", example = "{}")
    private final String groupPayments = null;

    // 그룹 프로젝트
    @Schema(description = "그룹 프로젝트 리스트", example = "")
    private final List<GroupProject> groupProjects;
}
