package com.sp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception to handle unauthorized access attempts.
 * 
 * When this exception is thrown, it returns an HTTP 401 Unauthorized status.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {

    /**
     * Constructor to pass an error message to the base RuntimeException.
     *
     * @param message A descriptive message about the unauthorized access.
     */
    public UnauthorizedException(String message) {
        super(message);
    }
}
