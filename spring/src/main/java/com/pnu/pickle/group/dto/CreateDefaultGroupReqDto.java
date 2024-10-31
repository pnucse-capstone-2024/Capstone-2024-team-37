package com.pnu.pickle.group.dto;

import com.pnu.pickle.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateDefaultGroupReqDto {
    private Long userId;
    private String userUsername;

    public CreateDefaultGroupReqDto(User user) {
    }

    public static CreateDefaultGroupReqDto from(User user){
        return new CreateDefaultGroupReqDto(user.getId(), user.getUsername());
    }
}
