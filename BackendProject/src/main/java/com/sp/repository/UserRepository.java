package com.sp.repository;

import com.sp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 🔍 Find a user by username.
     * Used during authentication or profile lookup.
     */
    Optional<User> findByUsername(String username);

    /**
     * 🔍 Find a user by email.
     * Useful for registration, login (if email is used), or password recovery.
     */
    Optional<User> findByEmail(String email);

    /**
     * ✅ Check if a username already exists.
     * Helps in avoiding duplicate usernames during registration.
     */
    boolean existsByUsername(String username);

    /**
     * ✅ Check if an email already exists.
     * Helps in avoiding duplicate emails during registration.
     */
    boolean existsByEmail(String email);
} 