package com.pnu.pickle.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SignUpResDto {

    @Schema(description = "생성된 기본 그룹 아이디", nullable = false, example = "1")
    private final Long defaultGroupId;

    public SignUpResDto(Long defaultGroupId) {
        this.defaultGroupId = defaultGroupId;
    }

}
