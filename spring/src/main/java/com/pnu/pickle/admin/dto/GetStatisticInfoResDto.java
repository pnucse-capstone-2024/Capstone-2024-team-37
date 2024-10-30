package com.pnu.pickle.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class GetStatisticInfoResDto {
    private long totalProject;
    private long totalContainer;
}
