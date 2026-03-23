package com.hcl.pharmacy.cart.controller;

import com.hcl.pharmacy.cart.dto.CartRequest;
import com.hcl.pharmacy.cart.dto.CartResponse;
import com.hcl.pharmacy.cart.service.CartService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // 🔹 Add to cart
    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(request));
    }

    // 🔹 Remove from cart
    @PostMapping("/remove")
    public ResponseEntity<CartResponse> removeFromCart(@Valid @RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.removeFromCart(request));
    }

    // 🔹 Get cart by userId
    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }
}