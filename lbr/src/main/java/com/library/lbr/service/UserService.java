package com.library.lbr.service;

import com.library.lbr.config.JwtUtil;
import com.library.lbr.entity.User;
import com.library.lbr.exception.DuplicateEmailException;
import com.library.lbr.exception.InvalidCredentialsException;
import com.library.lbr.exception.ResourceNotFoundException;
import com.library.lbr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register new user
    public Map<String, Object> register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateEmailException(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return buildAuthResponse(jwtUtil.generateToken(saved.getEmail(), saved.getRole()), saved);
    }

    // Login
    public Map<String, Object> login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return buildAuthResponse(jwtUtil.generateToken(user.getEmail(), user.getRole()), user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    // Get users by role
    public List<User> getByRole(String role) {
        return userRepository.findByRole(role.toUpperCase());
    }

    // Delete user
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    // Returns token + user info (no password)
    private Map<String, Object> buildAuthResponse(String token, User user) {
        Map<String, Object> res = new HashMap<>();
        res.put("token", token);
        res.put("type", "Bearer");
        res.put("id", user.getId());
        res.put("name", user.getName());
        res.put("email", user.getEmail());
        res.put("role", user.getRole());
        return res;
    }
}