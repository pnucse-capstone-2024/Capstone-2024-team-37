package com.pnu.pickle.project.dto;

import com.pnu.pickle.project.entity.ProjectType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubmitProjectOverviewReqDto {
    private String domain;
    private String projectName;
    private String projectDescription;
    private ProjectType projectType;
}
