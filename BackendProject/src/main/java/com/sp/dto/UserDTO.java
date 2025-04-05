package com.sp.dto;

import com.sp.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ✅ DTO for transferring user information without exposing sensitive data like passwords.
 * Commonly used for sending user details in API responses.
 */

@Data // ✅ Lombok: generates getters, setters, toString, equals, and hashCode
@AllArgsConstructor // ✅ Constructor with all arguments
@NoArgsConstructor // ✅ Default no-args constructor
public class UserDTO {

    private Long id;         // ✅ Unique ID of the user
    private String username; // ✅ Username (used for login/display)
    private String email;    // ✅ User's email address
    private Role role;       // ✅ Enum representing user role (e.g., USER, ADMIN)
}
