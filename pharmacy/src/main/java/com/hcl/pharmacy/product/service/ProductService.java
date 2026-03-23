package com.hcl.pharmacy.product.service;

import com.hcl.pharmacy.product.dto.ProductRequest;
import com.hcl.pharmacy.product.dto.ProductResponse;
import com.hcl.pharmacy.product.entity.Category;
import com.hcl.pharmacy.product.entity.Medicine;
import com.hcl.pharmacy.product.repository.CategoryRepository;
import com.hcl.pharmacy.product.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Add new medicine
    public ProductResponse addMedicine(ProductRequest request) {
        Medicine medicine = new Medicine();
        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setPrice(request.getPrice());
        medicine.setStockQuantity(request.getStockQuantity());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setImageUrl(request.getImageUrl());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setPrescriptionRequired(request.isPrescriptionRequired());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            medicine.setCategory(category);
        }

        medicineRepository.save(medicine);
        return toResponse(medicine);
    }

    // Get all medicines
    public List<ProductResponse> getAllMedicines() {
        return medicineRepository.findAll()
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Get medicine by ID
    public ProductResponse getMedicineById(Long id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        return toResponse(medicine);
    }

    // Search medicines by name
    public List<ProductResponse> searchByName(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name)
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Get medicines by category
    public List<ProductResponse> getMedicinesByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return medicineRepository.findByCategory(category)
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Update medicine
    public ProductResponse updateMedicine(Long id, ProductRequest request) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setPrice(request.getPrice());
        medicine.setStockQuantity(request.getStockQuantity());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setImageUrl(request.getImageUrl());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setPrescriptionRequired(request.isPrescriptionRequired());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            medicine.setCategory(category);
        }

        medicineRepository.save(medicine);
        return toResponse(medicine);
    }

    // Delete medicine
    public void deleteMedicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found");
        }
        medicineRepository.deleteById(id);
    }

    // Convert entity to DTO
    private ProductResponse toResponse(Medicine medicine) {
        String categoryName = medicine.getCategory() != null
                ? medicine.getCategory().getName() : null;
        return new ProductResponse(
                medicine.getId(),
                medicine.getName(),
                medicine.getDescription(),
                medicine.getPrice(),
                medicine.getStockQuantity(),
                medicine.getManufacturer(),
                medicine.getImageUrl(),
                medicine.getExpiryDate(),
                medicine.isPrescriptionRequired(),
                categoryName
        );
    }
}