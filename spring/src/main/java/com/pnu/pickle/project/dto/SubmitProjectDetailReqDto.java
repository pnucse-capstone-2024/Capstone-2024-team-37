package com.pnu.pickle.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubmitProjectDetailReqDto {
    Long projectId;
    List<ProjectTemplate> templates;
}
