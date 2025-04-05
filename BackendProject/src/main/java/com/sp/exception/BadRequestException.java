package com.sp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * ✅ Custom exception to represent HTTP 400 Bad Request errors.
 * Automatically maps to a 400 response when thrown in a controller.
 */

@ResponseStatus(HttpStatus.BAD_REQUEST) // ✅ Tells Spring to return 400 when this exception is thrown
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message); // ✅ Pass custom error message to RuntimeException
    }
}
