package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.*;
        import com.std.stdAttendance.repository.AttendanceRepository;
import com.std.stdAttendance.repository.CourseRepository;
import com.std.stdAttendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CourseRepository courseRepo;

    public Attendance markAttendance(Long studentId, Long courseId, LocalDate date, Status status) {

        if (attendanceRepo
                .findByStudentIdAndCourseIdAndDate(studentId, courseId, date)
                .isPresent()) {
            throw new RuntimeException("Attendance already marked!");
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(userRepo.findById(studentId).orElseThrow());
        attendance.setCourse(courseRepo.findById(courseId).orElseThrow());
        attendance.setDate(date);
        attendance.setStatus(status);

        return attendanceRepo.save(attendance);
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return attendanceRepo.findByStudentId(studentId);
    }

    public double getPercentage(Long studentId, Long courseId) {

        List<Attendance> list =
                attendanceRepo.findByStudentIdAndCourseId(studentId, courseId);

        long total = list.size();
        long present = list.stream()
                .filter(a -> a.getStatus() == Status.PRESENT)
                .count();

        return total == 0 ? 0 : (present * 100.0) / total;
    }
}