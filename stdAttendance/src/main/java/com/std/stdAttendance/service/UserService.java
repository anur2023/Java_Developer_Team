package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register
    public User register(User user) {

        // Check duplicate email
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Validate role
        if (!user.getRole().equals("STUDENT") && !user.getRole().equals("TEACHER")) {
            throw new RuntimeException("Invalid role");
        }

        return userRepository.save(user);
    }

    // Login
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get Students
    public List<User> getStudents() {
        return userRepository.findByRole("STUDENT");
    }

    // Get Teachers
    public List<User> getTeachers() {
        return userRepository.findByRole("TEACHER");
    }

    // Update User
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check duplicate email (if changed)
        if (!user.getEmail().equals(updatedUser.getEmail()) &&
                userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Validate role
        if (!updatedUser.getRole().equals("STUDENT") && !updatedUser.getRole().equals("TEACHER")) {
            throw new RuntimeException("Invalid role");
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }

    // Delete User
    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);
    }
}