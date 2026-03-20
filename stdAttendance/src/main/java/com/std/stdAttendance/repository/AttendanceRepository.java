package com.std.stdAttendance.repository;

import com.std.stdAttendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByCourseId(Long courseId);

    List<Attendance> findByStudentIdAndCourseId(Long studentId, Long courseId);

    List<Attendance> findByCourseIdAndDate(Long courseId, LocalDate date);

    // Duplicate attendance check ke liye
    List<Attendance> findByStudentIdAndCourseIdAndDate(Long studentId, Long courseId, LocalDate date);
}