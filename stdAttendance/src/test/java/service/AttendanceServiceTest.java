package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.Attendance;
import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.entity.Course;
import com.std.stdAttendance.repository.AttendanceRepository;
import com.std.stdAttendance.repository.UserRepository;
import com.std.stdAttendance.repository.CourseRepository;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock
    private AttendanceRepository attendanceRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private AttendanceService attendanceService;

    private Attendance attendance;

    @BeforeEach
    void setup() {
        attendance = new Attendance();
        attendance.setStudentId(1L);
        attendance.setCourseId(101L);
        attendance.setStatus("PRESENT");
    }

    // ✅ TEST 1: Successful Attendance Mark
    @Test
    void testMarkAttendanceSuccess() {

        User student = new User();
        student.setId(1L);
        student.setRole("STUDENT");

        Course course = new Course();
        course.setId(101L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(courseRepository.findById(101L)).thenReturn(Optional.of(course));
        when(attendanceRepository.save(any())).thenReturn(attendance);

        Attendance result = attendanceService.markAttendance(attendance);

        assertNotNull(result);
        verify(attendanceRepository, times(1)).save(attendance);
    }

    // ❌ TEST 2: Student Not Found
    @Test
    void testMarkAttendanceStudentNotFound() {

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                attendanceService.markAttendance(attendance));

        assertEquals("Student not found", ex.getMessage());
    }

    // ❌ TEST 3: Invalid Role
    @Test
    void testMarkAttendanceInvalidRole() {

        User user = new User();
        user.setId(1L);
        user.setRole("ADMIN"); // ❌ not student

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                attendanceService.markAttendance(attendance));

        assertEquals("User is not a student", ex.getMessage());
    }

    // ❌ TEST 4: Invalid Status
    @Test
    void testInvalidStatus() {

        attendance.setStatus("LATE"); // ❌ invalid

        User student = new User();
        student.setId(1L);
        student.setRole("STUDENT");

        Course course = new Course();
        course.setId(101L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(student));
        when(courseRepository.findById(101L)).thenReturn(Optional.of(course));

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                attendanceService.markAttendance(attendance));

        assertEquals("Invalid status", ex.getMessage());
    }

    // ✅ TEST 5: Attendance Percentage
    @Test
    void testAttendancePercentage() {

        Attendance a1 = new Attendance();
        a1.setStatus("PRESENT");

        Attendance a2 = new Attendance();
        a2.setStatus("ABSENT");

        Attendance a3 = new Attendance();
        a3.setStatus("PRESENT");

        when(attendanceRepository.findByStudentIdAndCourseId(1L, 101L))
                .thenReturn(Arrays.asList(a1, a2, a3));

        double result = attendanceService.getAttendancePercentage(1L, 101L);

        assertEquals(66.66, result, 1); // allow small precision error
    }

    @Test
    void testEmptyAttendancePercentage() {
        when(attendanceRepository.findByStudentIdAndCourseId(1L, 101L))
                .thenReturn(List.of());

        double result = attendanceService.getAttendancePercentage(1L, 101L);

        assertEquals(0, result);
    }
}