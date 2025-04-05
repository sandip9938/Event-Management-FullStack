package com.sp.controller;

import com.sp.config.JwtUtil;
import com.sp.dto.AuthRequest;
import com.sp.dto.AuthResponse;
import com.sp.exception.ResourceNotFoundException;
import com.sp.model.Role;
import com.sp.model.User;
import com.sp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Allows requests from React frontend
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService,
            UserService userService,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Endpoint to register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
        try {
            // Check if user already exists
            userService.getUserByUsername(authRequest.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists!");
        } catch (ResourceNotFoundException e) {
            // Expected: user doesn't exist, so we proceed
        }

        // Create and save new user
        User newUser = new User();
        newUser.setUsername(authRequest.getUsername());
        newUser.setEmail(authRequest.getUserEmail()); // ✅ Set email from request
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword())); // ✅ Encrypt password
        newUser.setRole(Role.USER); // ✅ Assign default role USER

        userService.registerUser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse("User registered successfully!"));
    }

    // ✅ Endpoint for user login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // Authenticate user credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword())
            );

            // If authentication successful, generate JWT
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            String jwt = jwtUtil.generateToken(userDetails);

            // Return token and username
            return ResponseEntity.ok(new AuthResponse(jwt, authRequest.getUsername()));
        } catch (BadCredentialsException e) {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
        }
    }

 
}