package com.hcl.pharmacy.cart.repository;

import com.hcl.pharmacy.cart.entity.CartItem;
import com.hcl.pharmacy.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);

    Optional<CartItem> findByCartAndMedicineId(Cart cart, Long medicineId);

    void deleteByCartAndMedicineId(Cart cart, Long medicineId);
}