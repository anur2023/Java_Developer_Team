package com.hcl.pharmacy.prescription.controller;

import com.hcl.pharmacy.prescription.dto.PrescriptionRequest;
import com.hcl.pharmacy.prescription.dto.PrescriptionResponse;
import com.hcl.pharmacy.prescription.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // Submit a new prescription
    @PostMapping
    public ResponseEntity<PrescriptionResponse> submitPrescription(
            @Valid @RequestBody PrescriptionRequest request) {
        return ResponseEntity.ok(prescriptionService.submitPrescription(request));
    }

    // Get prescriptions by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PrescriptionResponse>> getPrescriptionsByUser(
            @PathVariable Long userId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByUser(userId));
    }

    // Get prescription by ID
    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionResponse> getPrescriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }

    // Get all prescriptions (pharmacist/admin)
    @GetMapping
    public ResponseEntity<List<PrescriptionResponse>> getAllPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    // Get pending prescriptions (pharmacist/admin)
    @GetMapping("/pending")
    public ResponseEntity<List<PrescriptionResponse>> getPendingPrescriptions() {
        return ResponseEntity.ok(prescriptionService.getPendingPrescriptions());
    }

    // Approve prescription (pharmacist/admin)
    @PatchMapping("/{id}/approve")
    public ResponseEntity<PrescriptionResponse> approvePrescription(
            @PathVariable Long id,
            @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(prescriptionService.approvePrescription(id, remarks));
    }

    // Reject prescription (pharmacist/admin)
    @PatchMapping("/{id}/reject")
    public ResponseEntity<PrescriptionResponse> rejectPrescription(
            @PathVariable Long id,
            @RequestParam(required = false) String remarks) {
        return ResponseEntity.ok(prescriptionService.rejectPrescription(id, remarks));
    }
}