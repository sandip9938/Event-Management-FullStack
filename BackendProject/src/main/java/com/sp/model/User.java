package com.sp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor  // ✅ Default constructor required by JPA
@AllArgsConstructor // ✅ Constructor for full initialization
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key, auto-generated

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Username is required")
    private String username; // User's display name

    @Column(unique = true, nullable = false)
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email; // User's email (used for login/communication)

    @Column(nullable = false)
    @NotBlank(message = "Password is required")
    private String password; // Hashed password (ensure secure storage in practice)

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER; // User's role, defaults to USER

    
}
