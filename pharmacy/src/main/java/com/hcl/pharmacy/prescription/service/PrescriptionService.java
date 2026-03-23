package com.hcl.pharmacy.prescription.service;

import com.hcl.pharmacy.auth.entity.User;
import com.hcl.pharmacy.auth.repository.UserRepository;
import com.hcl.pharmacy.prescription.dto.PrescriptionRequest;
import com.hcl.pharmacy.prescription.dto.PrescriptionResponse;
import com.hcl.pharmacy.prescription.entity.Prescription;
import com.hcl.pharmacy.prescription.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private UserRepository userRepository;

    // Upload / submit prescription
    public PrescriptionResponse submitPrescription(PrescriptionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Prescription prescription = new Prescription();
        prescription.setUser(user);
        prescription.setImageUrl(request.getImageUrl());
        prescription.setDoctorName(request.getDoctorName());
        prescription.setPatientName(request.getPatientName());
        prescription.setStatus(Prescription.PrescriptionStatus.PENDING);

        prescriptionRepository.save(prescription);
        return toResponse(prescription);
    }

    // Get prescriptions by user
    public List<PrescriptionResponse> getPrescriptionsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return prescriptionRepository.findByUser(user)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Get prescription by ID
    public PrescriptionResponse getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return toResponse(prescription);
    }

    // Get all prescriptions (pharmacist/admin)
    public List<PrescriptionResponse> getAllPrescriptions() {
        return prescriptionRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Get pending prescriptions
    public List<PrescriptionResponse> getPendingPrescriptions() {
        return prescriptionRepository.findByStatus(Prescription.PrescriptionStatus.PENDING)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Approve prescription
    public PrescriptionResponse approvePrescription(Long id, String remarks) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        prescription.setStatus(Prescription.PrescriptionStatus.APPROVED);
        prescription.setRemarks(remarks);
        prescriptionRepository.save(prescription);
        return toResponse(prescription);
    }

    // Reject prescription
    public PrescriptionResponse rejectPrescription(Long id, String remarks) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        prescription.setStatus(Prescription.PrescriptionStatus.REJECTED);
        prescription.setRemarks(remarks);
        prescriptionRepository.save(prescription);
        return toResponse(prescription);
    }

    // Convert entity to DTO
    private PrescriptionResponse toResponse(Prescription prescription) {
        PrescriptionResponse response = new PrescriptionResponse();
        response.setId(prescription.getId());
        response.setUserId(prescription.getUser().getId());
        response.setUserEmail(prescription.getUser().getEmail());
        response.setImageUrl(prescription.getImageUrl());
        response.setDoctorName(prescription.getDoctorName());
        response.setPatientName(prescription.getPatientName());
        response.setStatus(prescription.getStatus().name());
        response.setRemarks(prescription.getRemarks());
        response.setCreatedAt(prescription.getCreatedAt());
        return response;
    }
}