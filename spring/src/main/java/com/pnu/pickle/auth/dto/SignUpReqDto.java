package com.pnu.pickle.auth.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class SignUpReqDto {

    @NotBlank(message = "이메일 입력은 필수입니다.")
    @Email
    @Schema(description = "사용자 이메일", nullable = false, example = "yungs0917@gmail.com")
    private final String email;

    @NotBlank
    @Size(max = 8, message = "닉네임은 최대 8자 입니다.")
    @Schema(description = "사용자 닉네임(고유값)", nullable = false, example = "유승훈")
    private final String username;

    @NotBlank
    @Size(min = 8, max = 20, message = "비밀번호는 최소 8자 이상, 최대 20자 이하여야 합니다.")
    @Schema(description = "비밀번호(최소 8자이상, 최대 20자 이하)", nullable = false, example = "test123!")
    private final String password;
}
