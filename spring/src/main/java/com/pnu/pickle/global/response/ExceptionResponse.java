package com.pnu.pickle.global.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "예외 응답")
public class ExceptionResponse extends BaseResponse{
    @Schema(description = "예외 클래스")
    private final String exception;
    @Schema(description = "오류 메시지")
    private final String message;

    public ExceptionResponse(String exception, String message) {
        super(true);
        this.exception = exception;
        this.message = message;
    }
}
