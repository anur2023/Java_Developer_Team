package com.std.stdAttendance.integration;

import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.entity.Course;
import com.std.stdAttendance.repository.UserRepository;
import com.std.stdAttendance.repository.CourseRepository;
import com.std.stdAttendance.service.AttendanceService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")  // ✅ uses H2 config
class AttendanceIntegrationTest {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    // ✅ FULL FLOW TEST
    @Test
    void testFullAttendanceFlow() {

        // 1️⃣ Create Student
        User student = new User();
        student.setName("Riya");
        student.setEmail("riya@test.com");
        student.setPassword("123");
        student.setRole("STUDENT");

        student = userRepository.save(student);

        // 2️⃣ Create Course
        Course course = new Course();
        course.setCourseName("Math");


        course = courseRepository.save(course);

        // 3️⃣ Mark Attendance
        Attendance attendance = new Attendance();
        attendance.setStudentId(student.getId());
        attendance.setCourseId(course.getId());
        attendance.setStatus("PRESENT");
        attendance.setDate(LocalDate.now());

        Attendance saved = attendanceService.markAttendance(attendance);

        // 4️⃣ Verify
        assertNotNull(saved.getId());
        assertEquals("PRESENT", saved.getStatus());
    }
}