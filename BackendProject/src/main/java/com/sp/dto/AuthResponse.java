package com.sp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ✅ DTO used to send authentication responses such as JWT token, username, and messages.
 * Supports multiple constructors for different response scenarios.
 */

@Data // ✅ Generates getters, setters, equals, hashCode, toString
@AllArgsConstructor // ✅ Generates constructor with all three fields
public class AuthResponse {
    
    private String token;
    private String username;
    private String message;

    // ✅ Constructor for token + username (e.g., on successful login)
    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    // ✅ Constructor for just a message (e.g., registration success or errors)
    public AuthResponse(String message) {
        this.message = message;
    }

    // ❌ These are redundant due to @Data — you can remove manual getters/setters if present
}
