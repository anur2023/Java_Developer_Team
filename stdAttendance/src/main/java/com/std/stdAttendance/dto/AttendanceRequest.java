package com.std.stdAttendance.dto;

import com.std.stdAttendance.entity.Status;

import java.time.LocalDate;

public class AttendanceRequest {

    private Long studentId;
    private Long courseId;
    private LocalDate date;
    private Status status;

    // getters & setters
}