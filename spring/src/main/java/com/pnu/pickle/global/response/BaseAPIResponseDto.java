package com.pnu.pickle.global.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Schema(description = "응답")
@Builder
public class BaseAPIResponseDto<T> {
    @Schema(description = "응답 메세지")
    private String message;
    @Schema(description = "응답 데이터")
    private T data;
}
