package com.std.stdAttendance.controller;

import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<Attendance> markAttendance(@Valid @RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.markAttendance(attendance));
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getByStudent(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Attendance>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(attendanceService.getByCourse(courseId));
    }

    @GetMapping("/course/{courseId}/date/{date}")
    public ResponseEntity<List<Attendance>> getByCourseAndDate(
            @PathVariable Long courseId,
            @PathVariable String date) {
        return ResponseEntity.ok(
                attendanceService.getByCourseAndDate(courseId, LocalDate.parse(date))
        );
    }

    @GetMapping("/percentage")
    public ResponseEntity<Double> getPercentage(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {
        return ResponseEntity.ok(
                attendanceService.getAttendancePercentage(studentId, courseId)
        );
    }
}