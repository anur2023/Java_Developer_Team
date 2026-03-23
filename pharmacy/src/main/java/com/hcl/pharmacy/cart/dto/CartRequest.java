package com.hcl.pharmacy.cart.dto;

import jakarta.validation.constraints.NotNull;

public class CartRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long medicineId;

    @NotNull
    private Integer quantity;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}