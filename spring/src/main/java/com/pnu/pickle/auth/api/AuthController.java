package com.pnu.pickle.auth.api;

import com.pnu.pickle.auth.dto.SignInReqDto;
import com.pnu.pickle.auth.dto.SignInResDto;
import com.pnu.pickle.auth.dto.SignUpReqDto;
import com.pnu.pickle.auth.dto.SignUpResDto;
import com.pnu.pickle.auth.service.AuthService;
import com.pnu.pickle.global.constants.SecurityConstants;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "사용자 인증 컨트롤러", description = "회원가입, 로그인 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    @Operation(
            summary = "회원가입 API",
            description = "회원가입 기능이며, 필수 정보로 이메일, 비밀번호, 유저네임(닉네임)이 필요합니다."
    )
//    @Parameters({
//            @Parameter(name = "memberId", description = "멤버의 ID, path variable"),
//            @Parameter(name = "page", description = "페이지 번호, 1이상이어야 함, query string"),
//            @Parameter(name = "size", description = "(선택적) 페이지당 컨텐츠 개수, 기본 10, query string")
//    })
    public ResponseEntity<BaseAPIResponseDto<SignUpResDto>> signUp(@RequestBody @Valid SignUpReqDto signUpReqDto){
        Long defaultGroupId = authService.signUp(signUpReqDto);
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("SignUp Success!")
                .data(new SignUpResDto(defaultGroupId))
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PostMapping("/sign-in")
    @Operation(
            summary = "로그인 API",
            description = "로그인 기능이며, 필수 정보로 이메일, 비밀번호가 필요하며 성공 시 jwt를 발급합니다."
    )
    public ResponseEntity<BaseAPIResponseDto<SignInResDto>> signIn(@RequestBody @Valid SignInReqDto signInReqDto){
        String jwt = authService.signIn(signInReqDto);
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("SignIn Success!")
                .data(new SignInResDto(jwt))
                .build();
        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, jwt)
                .body(responseDto);
    }

}
