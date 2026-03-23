package com.hcl.pharmacy.cart.repository;

import com.hcl.pharmacy.cart.entity.Cart;
import com.hcl.pharmacy.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);
}