package com.pnu.pickle.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class SignInResDto {

    @Schema(description = "JSON Web Token", example = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaWNrbGUiLCJzdWIiOiJKV1QgVG9rZW4iLCJ1c2VybmFtZSI6InNldW5ndW4iLCJpYXQiOjE3MjM1OTU3NzQsImV4cCI6MTcyMzYyNTc3NH0.HbW4k_mNgx1cLFN1gKQZ30KQOMOfxOtsqttVb1MTzQk")
    private final String jwt;

    public SignInResDto(String jwt) {
        this.jwt = jwt;
    }
}
