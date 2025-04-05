package com.sp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ✅ This DTO is used to capture authentication and registration input from the user.
 * Includes fields for username, email, and password.
 */

@Data // ✅ Lombok generates getters, setters, toString(), equals(), and hashCode()
@AllArgsConstructor // ✅ Lombok generates an all-arguments constructor
public class AuthRequest {

    private String username;
    private String userEmail;
    private String password;

    // ❌ You don't need manual getters & setters when using Lombok @Data

    // 🔧 Optionally, you could add validation annotations like @NotBlank or @Email if using @Valid in controller
}
