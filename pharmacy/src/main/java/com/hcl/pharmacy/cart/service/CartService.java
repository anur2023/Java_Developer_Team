package com.hcl.pharmacy.cart.service;

import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.auth.repository.UserRepository;
import com.hcl.pharmacy.cart.dto.CartRequest;
import com.hcl.pharmacy.cart.dto.CartResponse;
import com.hcl.pharmacy.cart.dto.CartItemResponse;
import com.hcl.pharmacy.cart.entity.Cart;
import com.hcl.pharmacy.cart.entity.CartItem;
import com.hcl.pharmacy.cart.repository.CartRepository;
import com.hcl.pharmacy.cart.repository.CartItemRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get or Create Cart
    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));
    }

    // 🔹 Add to Cart
    public CartResponse addToCart(CartRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository
                .findByCartAndMedicineId(cart, request.getMedicineId())
                .orElse(null);

        if (item != null) {
            // If already exists → increase quantity
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            // New item
            item = new CartItem(cart, request.getMedicineId(), request.getQuantity());
        }

        cartItemRepository.save(item);

        return buildCartResponse(cart);
    }

    // 🔹 Remove item
    @Transactional
    public CartResponse removeFromCart(CartRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository
                .findByCartAndMedicineId(cart, request.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // 🔥 Main logic
        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
            cartItemRepository.save(item);
        } else {
            cartItemRepository.delete(item);
        }

        return buildCartResponse(cart);
    }

    // 🔹 Get Cart
    public CartResponse getCart(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = getOrCreateCart(user);

        return buildCartResponse(cart);
    }

    // 🔹 Convert to DTO
    private CartResponse buildCartResponse(Cart cart) {

        List<CartItem> items = cartItemRepository.findByCart(cart);

        List<CartItemResponse> itemResponses = items.stream()
                .map(i -> new CartItemResponse(i.getMedicineId(), i.getQuantity()))
                .collect(Collectors.toList());

        return new CartResponse(cart.getUser().getId(), itemResponses);
    }
}