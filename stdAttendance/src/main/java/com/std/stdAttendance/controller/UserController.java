package com.std.stdAttendance.controller;

import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        User savedUser = userService.register(user);
        savedUser.setPassword(null);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> loginRequest) {
        User loggedUser = userService.login(
                loginRequest.get("email"),
                loginRequest.get("password")
        );
        loggedUser.setPassword(null);
        return ResponseEntity.ok(loggedUser);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getStudents() {
        return ResponseEntity.ok(userService.getStudents());
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getTeachers() {
        return ResponseEntity.ok(userService.getTeachers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @Valid @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        updated.setPassword(null);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}