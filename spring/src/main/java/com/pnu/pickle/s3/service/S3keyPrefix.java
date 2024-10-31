package com.pnu.pickle.s3.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum S3keyPrefix {
    AVATAR("avatar-"),
    PROJECT("project-");

    private final String prefix;
}

