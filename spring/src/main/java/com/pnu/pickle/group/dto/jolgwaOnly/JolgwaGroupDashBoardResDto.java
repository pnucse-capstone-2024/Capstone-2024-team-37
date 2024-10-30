package com.pnu.pickle.group.dto.jolgwaOnly;

import com.pnu.pickle.group.dto.groupMember.GroupParticipant;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class JolgwaGroupDashBoardResDto {
    @Schema(description = "그룹 이름", nullable = false, example = "seunghunGroup")
    public String groupName;
    @Schema(description = "그룹 설명", nullable = false, example = "group for sunwoo")
    public String groupDescription;
    @Schema(description = "그룹에 참가한 사용자들", nullable = false, example = "[]")
    List<GroupParticipant> groupParticipants;
}
