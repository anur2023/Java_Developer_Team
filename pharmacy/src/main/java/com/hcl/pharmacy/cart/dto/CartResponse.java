package com.hcl.pharmacy.cart.dto;

import java.util.List;

public class CartResponse {

    private Long userId;
    private List<CartItemResponse> items;

    public CartResponse(Long userId, List<CartItemResponse> items) {
        this.userId = userId;
        this.items = items;
    }

    public Long getUserId() { return userId; }

    public List<CartItemResponse> getItems() { return items; }
}