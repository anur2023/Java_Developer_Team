package com.hcl.pharmacy.cart.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many items belong to one cart
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    private Long medicineId; // From Product module

    private Integer quantity;

    // Constructors
    public CartItem() {}

    public CartItem(Cart cart, Long medicineId, Integer quantity) {
        this.cart = cart;
        this.medicineId = medicineId;
        this.quantity = quantity;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}