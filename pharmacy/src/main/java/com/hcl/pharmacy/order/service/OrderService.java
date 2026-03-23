package com.hcl.pharmacy.order.service;

import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.auth.repository.UserRepository;
import com.hcl.pharmacy.order.dto.OrderRequest;
import com.hcl.pharmacy.order.dto.OrderResponse;
import com.hcl.pharmacy.order.entity.Order;
import com.hcl.pharmacy.order.entity.OrderItem;
import com.hcl.pharmacy.order.repository.OrderRepository;
import com.hcl.pharmacy.product.entity.Medicine;
import com.hcl.pharmacy.product.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    // Place a new order
    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus(Order.OrderStatus.PENDING);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Medicine medicine = medicineRepository.findById(itemReq.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found: " + itemReq.getMedicineId()));

            if (medicine.getStockQuantity() < itemReq.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + medicine.getName());
            }

            // Deduct stock
            medicine.setStockQuantity(medicine.getStockQuantity() - itemReq.getQuantity());
            medicineRepository.save(medicine);

            OrderItem item = new OrderItem(order, medicine.getId(),
                    medicine.getName(), itemReq.getQuantity(), medicine.getPrice());
            orderItems.add(item);
            total = total.add(item.getSubtotal());
        }

        order.setTotalAmount(total);
        order.setItems(orderItems);
        orderRepository.save(order);

        return toResponse(order);
    }

    // Get orders by user
    public List<OrderResponse> getOrdersByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Get order by ID
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return toResponse(order);
    }

    // Get all orders (admin)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Update order status (pharmacist/admin)
    public OrderResponse updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.valueOf(status.toUpperCase()));
        orderRepository.save(order);
        return toResponse(order);
    }

    // Cancel order
    @Transactional
    public OrderResponse cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() == Order.OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel a delivered order");
        }

        // Restore stock
        for (OrderItem item : order.getItems()) {
            medicineRepository.findById(item.getMedicineId()).ifPresent(medicine -> {
                medicine.setStockQuantity(medicine.getStockQuantity() + item.getQuantity());
                medicineRepository.save(medicine);
            });
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);
        return toResponse(order);
    }

    // Convert to response DTO
    private OrderResponse toResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setUserEmail(order.getUser().getEmail());
        response.setStatus(order.getStatus().name());
        response.setTotalAmount(order.getTotalAmount());
        response.setDeliveryAddress(order.getDeliveryAddress());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setCreatedAt(order.getCreatedAt());

        if (order.getItems() != null) {
            List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream().map(item -> {
                OrderResponse.OrderItemResponse ir = new OrderResponse.OrderItemResponse();
                ir.setMedicineId(item.getMedicineId());
                ir.setMedicineName(item.getMedicineName());
                ir.setQuantity(item.getQuantity());
                ir.setUnitPrice(item.getUnitPrice());
                ir.setSubtotal(item.getSubtotal());
                return ir;
            }).collect(Collectors.toList());
            response.setItems(itemResponses);
        }

        return response;
    }
}