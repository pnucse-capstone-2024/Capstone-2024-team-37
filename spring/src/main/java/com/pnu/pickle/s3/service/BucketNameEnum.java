package com.pnu.pickle.s3.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BucketNameEnum {

    AVATAR("pickle-avatar"),
    PROJECT("pickle-project");

    private final String bucketName;
}
