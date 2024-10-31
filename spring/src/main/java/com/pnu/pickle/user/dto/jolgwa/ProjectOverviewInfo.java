package com.pnu.pickle.user.dto.jolgwa;

import com.pnu.pickle.project.entity.Project;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ProjectOverviewInfo {
    @Schema(description = "사용자가 속한 그룹의 프로젝트 id", nullable = false, example = "1")
    private Long id;
    @Schema(description = "사용자가 속한 그룹의 프로젝트 이름", nullable = false, example = "졸업과제프로젝트")
    private String projectName;

    public static ProjectOverviewInfo fromProject(Project project) {
        return new ProjectOverviewInfo(project.getId(), project.getName());
    }
}
