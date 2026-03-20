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

    // ✅ Mark Attendance (FULL VALIDATION)
    public Attendance markAttendance(Attendance attendance) {

        // 🔹 Check student exists
        User student = userRepository.findById(attendance.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 🔹 Check role = STUDENT
        if (!student.getRole().equals("STUDENT")) {
            throw new RuntimeException("User is not a student");
        }

        // 🔹 Check course exists
        Course course = courseRepository.findById(attendance.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // 🔹 Validate status
        if (!attendance.getStatus().equals("PRESENT") &&
                !attendance.getStatus().equals("ABSENT")) {
            throw new RuntimeException("Invalid status");
        }

        // 🔹 If date not given → set today
        if (attendance.getDate() == null) {
            attendance.setDate(LocalDate.now());
        }

        return attendanceRepository.save(attendance);
    }

    // ✅ Get All Attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // ✅ Get Attendance by Student
    public List<Attendance> getByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    // ✅ Get Attendance by Course
    public List<Attendance> getByCourse(Long courseId) {
        return attendanceRepository.findByCourseId(courseId);
    }

    // ✅ Get Attendance by Course & Date
    public List<Attendance> getByCourseAndDate(Long courseId, LocalDate date) {
        return attendanceRepository.findByCourseIdAndDate(courseId, date);
    }

    // ✅ Calculate Attendance %
    public double getAttendancePercentage(Long studentId, Long courseId) {

        List<Attendance> records =
                attendanceRepository.findByStudentIdAndCourseId(studentId, courseId);

        if (records.isEmpty()) {
            return 0;
        }

        long presentCount = records.stream()
                .filter(a -> a.getStatus().equals("PRESENT"))
                .count();

        return (presentCount * 100.0) / records.size();
    }
}