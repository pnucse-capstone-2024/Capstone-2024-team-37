package com.pnu.pickle.global;


import com.pnu.pickle.admin.exception.NoProjectException;
import com.pnu.pickle.auth.exception.DuplicateEmailException;
import com.pnu.pickle.auth.exception.DuplicateUsernameException;
import com.pnu.pickle.auth.exception.InvalidAuthCodeFromServerException;
import com.pnu.pickle.global.response.ExceptionResponse;
import com.pnu.pickle.group.exception.InvalidMemberException;
import com.pnu.pickle.group.exception.RoleException;
import com.pnu.pickle.project.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ExceptionResponse> validException(MethodArgumentNotValidException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(),
            "Validation Failed : " + ex.getBindingResult().getAllErrors().get(0)
                .getDefaultMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({HttpStatusCodeException.class})
    public ResponseEntity<ExceptionResponse> validException(HttpStatusCodeException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, ex.getStatusCode());
    }

    @ExceptionHandler({SQLIntegrityConstraintViolationException.class})
    public ResponseEntity<ExceptionResponse> validException(SQLIntegrityConstraintViolationException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({DuplicateEmailException.class})
    public ResponseEntity<ExceptionResponse> duplicateEmailException(DuplicateEmailException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DuplicateUsernameException.class})
    public ResponseEntity<ExceptionResponse> duplicateUsernameException(DuplicateUsernameException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<ExceptionResponse> badCredentialsException(BadCredentialsException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidAuthCodeFromServerException.class})
    public ResponseEntity<ExceptionResponse> invalidAuthCodeFromServerException(InvalidAuthCodeFromServerException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidMemberException.class})
    public ResponseEntity<ExceptionResponse> invalidMemberException(InvalidMemberException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({RoleException.class})
    public ResponseEntity<ExceptionResponse> invalidRoleException(RoleException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({SubmitProjectRoleException.class})
    public ResponseEntity<ExceptionResponse> invalidSubmitProjectRoleException(SubmitProjectRoleException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DuplicateDomainException.class})
    public ResponseEntity<ExceptionResponse> invalidSuctRoleException(DuplicateDomainException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidSubmitProjectGroupException.class})
    public ResponseEntity<ExceptionResponse> invalidSucoleException(InvalidSubmitProjectGroupException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidContainerSubDomainException.class})
    public ResponseEntity<ExceptionResponse> invalidSuException(InvalidContainerSubDomainException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidProjectIdException.class})
    public ResponseEntity<ExceptionResponse> invalidSuExcetion(InvalidProjectIdException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoProjectException.class})
    public ResponseEntity<ExceptionResponse> invalidSsssuExcetion(NoProjectException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getClass().getName(), ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
