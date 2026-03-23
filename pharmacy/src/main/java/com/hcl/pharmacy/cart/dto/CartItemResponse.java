package com.hcl.pharmacy.cart.dto;

public class CartItemResponse {

    private Long medicineId;
    private Integer quantity;

    public CartItemResponse(Long medicineId, Integer quantity) {
        this.medicineId = medicineId;
        this.quantity = quantity;
    }

    public Long getMedicineId() { return medicineId; }
    public Integer getQuantity() { return quantity; }
}