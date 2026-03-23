package com.hcl.pharmacy.order.repository;

import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);

    List<Order> findByStatus(Order.OrderStatus status);

    List<Order> findByUserOrderByCreatedAtDesc(User user);
}