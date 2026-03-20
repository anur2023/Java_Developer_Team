package com.std.stdAttendance.service;

import com.std.stdAttendance.entity.Course;
import com.std.stdAttendance.entity.User;
import com.std.stdAttendance.repository.CourseRepository;
import com.std.stdAttendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Course createCourse(Course course) {
        User teacher = userRepository.findById(course.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + course.getTeacherId()));

        if (!"TEACHER".equals(teacher.getRole())) {
            throw new RuntimeException("User with ID " + course.getTeacherId() + " is not a teacher");
        }
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));

        if (updatedCourse.getTeacherId() != null) {
            User teacher = userRepository.findById(updatedCourse.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + updatedCourse.getTeacherId()));

            if (!"TEACHER".equals(teacher.getRole())) {
                throw new RuntimeException("User with ID " + updatedCourse.getTeacherId() + " is not a teacher");
            }
            course.setTeacherId(updatedCourse.getTeacherId());
        }

        if (updatedCourse.getCourseName() != null && !updatedCourse.getCourseName().isBlank()) {
            course.setCourseName(updatedCourse.getCourseName());
        }

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) throw new RuntimeException("Course not found with ID: " + id);
        courseRepository.deleteById(id);
    }
}