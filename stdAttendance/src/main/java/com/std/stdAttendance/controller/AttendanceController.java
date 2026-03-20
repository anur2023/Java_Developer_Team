package com.std.stdAttendance.controller;

import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // ✅ Mark Attendance
    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }

    // ✅ Get All Attendance
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    // ✅ Get by Student
    @GetMapping("/student/{studentId}")
    public List<Attendance> getByStudent(@PathVariable Long studentId) {
        return attendanceService.getByStudent(studentId);
    }

    // ✅ Get by Course
    @GetMapping("/course/{courseId}")
    public List<Attendance> getByCourse(@PathVariable Long courseId) {
        return attendanceService.getByCourse(courseId);
    }

    // ✅ Get by Course & Date
    @GetMapping("/course/{courseId}/date/{date}")
    public List<Attendance> getByCourseAndDate(
            @PathVariable Long courseId,
            @PathVariable String date) {

        return attendanceService.getByCourseAndDate(
                courseId,
                LocalDate.parse(date)
        );
    }

    // ✅ Get Attendance Percentage
    @GetMapping("/percentage")
    public double getPercentage(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {

        return attendanceService.getAttendancePercentage(studentId, courseId);
    }
}