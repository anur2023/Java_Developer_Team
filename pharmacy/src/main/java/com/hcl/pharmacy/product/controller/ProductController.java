package com.hcl.pharmacy.product.controller;

import com.hcl.pharmacy.product.dto.ProductRequest;
import com.hcl.pharmacy.product.dto.ProductResponse;
import com.hcl.pharmacy.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add medicine (Admin/Pharmacist only)
    @PostMapping
    public ResponseEntity<ProductResponse> addMedicine(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.addMedicine(request));
    }

    // Get all medicines
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllMedicines() {
        return ResponseEntity.ok(productService.getAllMedicines());
    }

    // Get medicine by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getMedicineById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getMedicineById(id));
    }

    // Search medicines by name
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }

    // Get medicines by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getMedicinesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getMedicinesByCategory(categoryId));
    }

    // Update medicine
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateMedicine(@PathVariable Long id,
                                                          @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateMedicine(id, request));
    }

    // Delete medicine
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable Long id) {
        productService.deleteMedicine(id);
        return ResponseEntity.ok("Medicine deleted successfully");
    }
}