package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.entity.Course;
import com.std.stdAttendance.repository.AttendanceRepository;
import com.std.stdAttendance.repository.UserRepository;
import com.std.stdAttendance.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Attendance markAttendance(Attendance attendance) {
        User student = userRepository.findById(attendance.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + attendance.getStudentId()));

        if (!"STUDENT".equals(student.getRole())) {
            throw new RuntimeException("User with ID " + attendance.getStudentId() + " is not a student");
        }

        courseRepository.findById(attendance.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + attendance.getCourseId()));

        if (attendance.getDate() == null) {
            attendance.setDate(LocalDate.now());
        }

        if (attendance.getDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("Attendance date cannot be in the future");
        }

        List<Attendance> existing = attendanceRepository
                .findByStudentIdAndCourseIdAndDate(
                        attendance.getStudentId(),
                        attendance.getCourseId(),
                        attendance.getDate()
                );
        if (!existing.isEmpty()) {
            throw new RuntimeException("Attendance already marked for student ID "
                    + attendance.getStudentId() + " in course ID "
                    + attendance.getCourseId() + " on " + attendance.getDate());
        }

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public List<Attendance> getByStudent(Long studentId) {
        userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getByCourse(Long courseId) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
        return attendanceRepository.findByCourseId(courseId);
    }

    public List<Attendance> getByCourseAndDate(Long courseId, LocalDate date) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
        if (date == null) throw new RuntimeException("Date is required");
        return attendanceRepository.findByCourseIdAndDate(courseId, date);
    }

    public double getAttendancePercentage(Long studentId, Long courseId) {
        userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        List<Attendance> records =
                attendanceRepository.findByStudentIdAndCourseId(studentId, courseId);

        if (records.isEmpty()) return 0.0;

        long presentCount = records.stream()
                .filter(a -> "PRESENT".equals(a.getStatus()))
                .count();

        return Math.round((presentCount * 100.0) / records.size() * 100.0) / 100.0;
    }
}