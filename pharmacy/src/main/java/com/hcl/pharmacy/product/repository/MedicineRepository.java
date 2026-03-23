package com.hcl.pharmacy.product.repository;

import com.hcl.pharmacy.product.entity.Medicine;
import com.hcl.pharmacy.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByCategory(Category category);

    List<Medicine> findByNameContainingIgnoreCase(String name);

    List<Medicine> findByPrescriptionRequired(boolean prescriptionRequired);

    List<Medicine> findByStockQuantityGreaterThan(int quantity);
}