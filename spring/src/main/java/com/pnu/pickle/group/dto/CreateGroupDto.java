package com.pnu.pickle.group.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateGroupDto {
    private final String groupName;
    private final String groupDescription;
}
