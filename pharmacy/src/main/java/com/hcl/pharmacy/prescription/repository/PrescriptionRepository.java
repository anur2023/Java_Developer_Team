package com.hcl.pharmacy.prescription.repository;

import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.prescription.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findByUser(User user);

    List<Prescription> findByStatus(Prescription.PrescriptionStatus status);
}