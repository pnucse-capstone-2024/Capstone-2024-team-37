package com.pnu.pickle.auth.api;

import com.pnu.pickle.auth.dto.GetEmailCodeResDto;
import com.pnu.pickle.auth.service.EmailAuthService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "이메일 컨트롤러", description = "회원가입 시 이메일 인증코드 발급 및 인증코드 인증 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailController {
    private final EmailAuthService emailAuthService;

    @GetMapping("/get-code")
    @Operation(
            summary = "인증코드 발급 API",
            description = "인증코드 발급 기능이며, 6자리의 난수로 응답합니다."
    )
    @Parameters({
        @Parameter(name = "email", description = "인증코드를 받으려는 이메일")
    })
    public ResponseEntity<BaseAPIResponseDto<GetEmailCodeResDto>> getMailAuthCode(@RequestParam String email) {
        String result = emailAuthService.createMailAuthCode();
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("Random code send to your email")
                .data(new GetEmailCodeResDto(result))
                .build();
        return ResponseEntity.ok().body(responseDto);
    }

    @GetMapping("/check-valid")
    @Operation(
            summary = "인증코드 인증 API",
            description = "인증코드 인증 기능이며, 필수 정보로 이메일, 비밀번호가 필요하며 성공 시 jwt를 발급합니다."
    )
    @Parameters({
            @Parameter(name = "code", description = "인증코드")
    })
    public ResponseEntity<BaseAPIResponseDto<Boolean>> checkMailAuthCodeValid(@RequestParam String code) {
        Boolean result = emailAuthService.checkValidAuthCodeFromClient(code);
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .data(result)
                .build();
        return ResponseEntity.ok().body(responseDto);
    }
}
