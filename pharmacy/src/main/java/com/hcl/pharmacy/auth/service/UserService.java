package com.hcl.pharmacy.auth.service;

import com.hcl.pharmacy.auth.dto.LoginRequest;
import com.hcl.pharmacy.auth.dto.RegisterRequest;
import com.hcl.pharmacy.auth.dto.AuthResponse;
import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.auth.entity.Role;
import com.hcl.pharmacy.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER USER
    public AuthResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Encrypt password
        if (request.getRole() != null) {
    user.setRole(Role.valueOf(request.getRole().toUpperCase()));
} else {
    user.setRole(Role.CUSTOMER);
}
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        // Save user
        userRepository.save(user);

        // Return response (token will be added later)
        return new AuthResponse(
                "User registered successfully",
                user.getEmail(),
                user.getRole().name()
        );
    }

    // LOGIN USER
    public AuthResponse login(LoginRequest request) {

        // Find user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Return response (token will be added later)
        return new AuthResponse(
                "Login successful",
                user.getEmail(),
                user.getRole().name()
        );
    }
}