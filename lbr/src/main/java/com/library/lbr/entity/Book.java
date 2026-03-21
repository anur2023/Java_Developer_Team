package com.library.lbr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is required")
    @Column(nullable = false)
    private String author;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "^[0-9]{10}([0-9]{3})?$", message = "Invalid ISBN format")
    @Column(unique = true, nullable = false)
    private String isbn;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    @Column(nullable = false)
    private Integer quantity;

    public Book() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title.trim(); }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author.trim(); }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn.trim(); }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}