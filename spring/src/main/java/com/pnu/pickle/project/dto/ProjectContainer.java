package com.pnu.pickle.project.dto;

import com.pnu.pickle.project.entity.ContainerEnv;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectContainer {
    private Long containerId;
    private String containerTemplateName;
    private String containerStack;
    private String containerDomain;
    private String filename;
    private Long portIndex;
    private List<ContainerEnv> containerEnvs;
}
