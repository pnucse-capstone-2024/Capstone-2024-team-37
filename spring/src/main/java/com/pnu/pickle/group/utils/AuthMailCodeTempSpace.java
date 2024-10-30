package com.pnu.pickle.group.utils;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@Data
@RequiredArgsConstructor
public class AuthMailCodeTempSpace {
    private final Map<String, Boolean> mailCodeToAuthenticationCompletedMap = new HashMap<>();
}
