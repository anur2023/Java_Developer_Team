package com.hcl.pharmacy.admin.service;

import com.hcl.pharmacy.auth.entity.Role;
import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.auth.repository.UserRepository;
import com.hcl.pharmacy.order.entity.Order;
import com.hcl.pharmacy.order.repository.OrderRepository;
import com.hcl.pharmacy.prescription.entity.Prescription;
import com.hcl.pharmacy.prescription.repository.PrescriptionRepository;
import com.hcl.pharmacy.product.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // Dashboard summary stats
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", userRepository.count());
        stats.put("totalMedicines", medicineRepository.count());
        stats.put("totalOrders", orderRepository.count());
        stats.put("pendingOrders",
                orderRepository.findByStatus(Order.OrderStatus.PENDING).size());
        stats.put("pendingPrescriptions",
                prescriptionRepository.findByStatus(Prescription.PrescriptionStatus.PENDING).size());

        return stats;
    }

    // Get all users
    public List<Map<String, Object>> getAllUsers() {
        return userRepository.findAll().stream().map(user -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", user.getId());
            map.put("name", user.getName());
            map.put("email", user.getEmail());
            map.put("role", user.getRole().name());
            map.put("phone", user.getPhone());
            map.put("createdAt", user.getCreatedAt());
            return map;
        }).collect(Collectors.toList());
    }

    // Get user by ID
    public Map<String, Object> getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("name", user.getName());
        map.put("email", user.getEmail());
        map.put("role", user.getRole().name());
        map.put("phone", user.getPhone());
        map.put("address", user.getAddress());
        map.put("createdAt", user.getCreatedAt());
        return map;
    }

    // Update user role
    public Map<String, Object> updateUserRole(Long userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(Role.valueOf(role.toUpperCase()));
        userRepository.save(user);

        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("role", user.getRole().name());
        map.put("message", "Role updated successfully");
        return map;
    }

    // Delete user
    public Map<String, String> deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return response;
    }

    // Get low-stock medicines (quantity <= threshold)
    public List<Map<String, Object>> getLowStockMedicines(int threshold) {
        return medicineRepository.findAll().stream()
                .filter(m -> m.getStockQuantity() <= threshold)
                .map(m -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", m.getId());
                    map.put("name", m.getName());
                    map.put("stockQuantity", m.getStockQuantity());
                    map.put("price", m.getPrice());
                    return map;
                }).collect(Collectors.toList());
    }
}