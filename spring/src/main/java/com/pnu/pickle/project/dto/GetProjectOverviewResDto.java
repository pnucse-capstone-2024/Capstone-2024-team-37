package com.pnu.pickle.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class GetProjectOverviewResDto {
    private String projectName;
    private String projectDefaultDomain;
    private String projectDescription;
    private List<ProjectParticipant> participants;
}
