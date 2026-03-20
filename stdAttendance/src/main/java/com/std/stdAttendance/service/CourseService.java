package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.Course;
import com.std.stdAttendance.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create Course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Update Course
    public Course updateCourse(Long id, Course updatedCourse) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setCourseName(updatedCourse.getCourseName());
        course.setTeacherId(updatedCourse.getTeacherId());

        return courseRepository.save(course);
    }

    // Delete Course
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}