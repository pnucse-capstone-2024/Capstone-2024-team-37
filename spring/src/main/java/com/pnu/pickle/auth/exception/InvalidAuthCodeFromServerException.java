package com.pnu.pickle.auth.exception;

public class InvalidAuthCodeFromServerException extends RuntimeException{
    public InvalidAuthCodeFromServerException(String message) {
        super(message);
    }
}
