package com.pnu.pickle.global.response;

import lombok.Getter;

@Getter
public class BaseResponse {
    private final Boolean error;

    public BaseResponse(Boolean error) {
        this.error = error;
    }
}
