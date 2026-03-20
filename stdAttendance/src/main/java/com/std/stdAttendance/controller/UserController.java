package com.std.stdAttendance.controller;

import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        User savedUser = userService.register(user);
        savedUser.setPassword(null); // hide password
        return savedUser;
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User loggedUser = userService.login(user.getEmail(), user.getPassword());
        loggedUser.setPassword(null); // hide password
        return loggedUser;
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get Students
    @GetMapping("/students")
    public List<User> getStudents() {
        return userService.getStudents();
    }

    // Get Teachers
    @GetMapping("/teachers")
    public List<User> getTeachers() {
        return userService.getTeachers();
    }

    // Update
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}