package com.std.stdAttendance.controller;

import com.std.stdAttendance.dto.AttendanceRequest;
import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping("/mark")
    public Attendance mark(@RequestBody AttendanceRequest request) {
        return service.markAttendance(
                request.getStudentId(),
                request.getCourseId(),
                request.getDate(),
                request.getStatus()
        );
    }

    @GetMapping("/student/{id}")
    public List<Attendance> getStudent(@PathVariable Long id) {
        return service.getStudentAttendance(id);
    }

    @GetMapping("/percentage/{studentId}/{courseId}")
    public double getPercentage(@PathVariable Long studentId,
                                @PathVariable Long courseId) {
        return service.getPercentage(studentId, courseId);
    }
}