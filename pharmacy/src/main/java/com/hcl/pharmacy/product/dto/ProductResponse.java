package com.hcl.pharmacy.product.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String manufacturer;
    private String imageUrl;
    private LocalDate expiryDate;
    private boolean prescriptionRequired;
    private String categoryName;

    public ProductResponse() {}

    public ProductResponse(Long id, String name, String description, BigDecimal price,
                           Integer stockQuantity, String manufacturer, String imageUrl,
                           LocalDate expiryDate, boolean prescriptionRequired, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.manufacturer = manufacturer;
        this.imageUrl = imageUrl;
        this.expiryDate = expiryDate;
        this.prescriptionRequired = prescriptionRequired;
        this.categoryName = categoryName;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public Integer getStockQuantity() { return stockQuantity; }
    public String getManufacturer() { return manufacturer; }
    public String getImageUrl() { return imageUrl; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public boolean isPrescriptionRequired() { return prescriptionRequired; }
    public String getCategoryName() { return categoryName; }
}