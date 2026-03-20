package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail().toLowerCase()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String rawPassword) {
        if (email == null || email.isBlank()) throw new RuntimeException("Email is required");
        if (rawPassword == null || rawPassword.isBlank()) throw new RuntimeException("Password is required");

        User user = userRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getStudents() {
        return userRepository.findByRole("STUDENT");
    }

    public List<User> getTeachers() {
        return userRepository.findByRole("TEACHER");
    }

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(updatedUser.getEmail().toLowerCase()) &&
                userRepository.findByEmail(updatedUser.getEmail().toLowerCase()).isPresent()) {
            throw new RuntimeException("Email already in use by another account");
        }

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail().toLowerCase());
        user.setRole(updatedUser.getRole().toUpperCase());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) throw new RuntimeException("User not found");
        userRepository.deleteById(id);
    }
}