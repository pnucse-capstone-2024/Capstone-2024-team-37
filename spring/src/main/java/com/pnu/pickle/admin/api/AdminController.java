package com.pnu.pickle.admin.api;

import com.pnu.pickle.admin.dto.GetStatisticInfoResDto;
import com.pnu.pickle.admin.service.AdminService;
import com.pnu.pickle.global.response.BaseAPIResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/statistic")
    @Operation(
            summary = "전체 프로젝트 개수 및 전체 컨테이너 갯수를 반환하는 API-졸업과제",
            description = "전체 프로젝트 개수 및 전체 컨테이너 갯수를 반환합니다."
    )
    public BaseAPIResponseDto<GetStatisticInfoResDto> getStatisticInfo(){
        GetStatisticInfoResDto resDto = adminService.getStatisticInfo();
        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message("")
                .data(resDto)
                .build();
        return responseDto;
    }

    @GetMapping("/access-authority")
    @Operation(
            summary = "사용자가 프로젝트에 접근 가능한지 반환 API-졸업과제",
            description = "사용자가 프로젝트에 접근 가능한지 True/False로 반환합니다."
    )
    public BaseAPIResponseDto getProjectAccessAuthority(@RequestParam String username, @RequestParam String domain) throws IOException {

        Boolean result = adminService.getProjectAccessAuthority(username, domain);

        BaseAPIResponseDto responseDto = BaseAPIResponseDto.builder()
                .message(result ? "User can access project" : "User cannot access project")
                .data(result)
                .build();

        return responseDto;
    }
}
