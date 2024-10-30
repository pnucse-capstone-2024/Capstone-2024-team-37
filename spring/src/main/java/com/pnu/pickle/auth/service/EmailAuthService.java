package com.pnu.pickle.auth.service;

import com.pnu.pickle.group.utils.AuthMailCodeTempSpace;
import com.pnu.pickle.group.utils.RandomNumberGenerator;
import com.pnu.pickle.user.dao.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailAuthService {
    private final UserRepository userRepository;
    private final AuthMailCodeTempSpace authMailCodeTempSpace;

    public Boolean checkEmailDuplication(String email) {
        return userRepository.existsByEmail(email);
    }

    public String createMailAuthCode(){
        String code = RandomNumberGenerator.randomNumber(6);
        // 임시 코드 발급 함수
        while(authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().containsKey(code)){
            code = RandomNumberGenerator.randomNumber(6);
        }

        authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().put(code, false);

        return code;
    }

    public Boolean checkValidAuthCodeFromClient(String code){
        Boolean result = authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().containsKey(code);
        if(result){
            authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().put(code, true);
        }
        return result;
    }

    public Boolean checkValidAuthCodeFromServer(String code){
        Boolean result = authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().get(code);
        if(result == null){
            return false;
        }
        authMailCodeTempSpace.getMailCodeToAuthenticationCompletedMap().remove(code);
        return result;
    }
}
