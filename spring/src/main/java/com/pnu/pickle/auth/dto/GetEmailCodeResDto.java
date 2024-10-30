package com.pnu.pickle.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetEmailCodeResDto {
    @Schema(description = "이메일 인증코드(6자리)", example = "123593")
    private final String auth_code;
}
