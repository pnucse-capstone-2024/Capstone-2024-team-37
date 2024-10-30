package com.pnu.pickle.project.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@Data
public class RealObj {
    private String domain;
    private List<PickleContainerInfoToMQ> container;
}
