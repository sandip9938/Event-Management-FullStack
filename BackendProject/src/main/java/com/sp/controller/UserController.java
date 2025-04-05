package com.sp.controller;

import com.sp.dto.UserDTO;
import com.sp.model.User;
import com.sp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // ✅ Constructor injection for UserService
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET all users - returns a list of UserDTOs to avoid exposing full User entity (e.g., passwords)
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole()))
                .collect(Collectors.toList());
    }

    // ✅ GET single user by ID - wraps result in ResponseEntity
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);

        // ✅ Convert to DTO before sending
        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole());

        return ResponseEntity.ok(userDTO);
    }

    // ✅ POST - Register a new user (used only if bypassing /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }
}
