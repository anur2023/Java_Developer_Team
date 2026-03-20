package com.std.stdAttendance.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(
        name = "attendance",
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "course_id", "date"})
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Student ID is required")
    @Positive(message = "Student ID must be a positive number")
    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @NotNull(message = "Course ID is required")
    @Positive(message = "Course ID must be a positive number")
    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @PastOrPresent(message = "Attendance date cannot be in the future")
    @Column(name = "date")
    private LocalDate date;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "PRESENT|ABSENT", message = "Status must be PRESENT or ABSENT")
    @Column(name = "status", nullable = false)
    private String status;

    public Attendance() {}

    public Long getId() { return id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status.trim().toUpperCase(); }
}