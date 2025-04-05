package com.sp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor  // ✅ Default constructor required by JPA
@AllArgsConstructor // ✅ Constructor for full initialization
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key, auto-generated

    @NotBlank(message = "Username is required")
    private String username; // User's display name

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email; // User's email (used for login/communication)

    @NotBlank(message = "Password is required")
    private String password; // Hashed password (ensure secure storage in practice)

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER; // User's role, defaults to USER

    
}
