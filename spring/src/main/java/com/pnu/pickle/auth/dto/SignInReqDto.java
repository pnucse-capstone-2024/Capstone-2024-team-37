package com.pnu.pickle.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class SignInReqDto {
    @NotBlank(message = "이메일 입력은 필수입니다.")
    @Email
    @Schema(description = "사용자 이메일", nullable = false, example = "yungs0917@gmail.com")
    private final String email;
    @NotBlank
    @Schema(description = "사용자 비밀번호", nullable = false, example = "test123!")
    private final String password;
}
