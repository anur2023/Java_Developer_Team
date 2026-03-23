package com.hcl.pharmacy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation errors (@Valid failures)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> response = buildError(
                HttpStatus.BAD_REQUEST, "Validation failed", fieldErrors);
        return ResponseEntity.badRequest().body(response);
    }

    // Handle RuntimeException (business logic errors)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        HttpStatus status = resolveStatus(ex.getMessage());
        Map<String, Object> response = buildError(status, ex.getMessage(), null);
        return ResponseEntity.status(status).body(response);
    }

    // Handle all other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> response = buildError(
                HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // Infer HTTP status from message keywords
    private HttpStatus resolveStatus(String message) {
        if (message == null) return HttpStatus.INTERNAL_SERVER_ERROR;
        String lower = message.toLowerCase();
        if (lower.contains("not found"))        return HttpStatus.NOT_FOUND;
        if (lower.contains("already registered")
                || lower.contains("already exists")) return HttpStatus.CONFLICT;
        if (lower.contains("invalid")
                || lower.contains("unauthorized")) return HttpStatus.UNAUTHORIZED;
        if (lower.contains("insufficient")
                || lower.contains("cannot cancel")) return HttpStatus.BAD_REQUEST;
        return HttpStatus.BAD_REQUEST;
    }

    private Map<String, Object> buildError(HttpStatus status, String message, Object details) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        if (details != null) body.put("details", details);
        return body;
    }
}