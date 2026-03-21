const BASE_URL = "http://localhost:8080/api";

// Get all courses
export const getAllCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw await res.json();
  return res.json();
};

// Get course by ID
export const getCourseById = async (id) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`);
  if (!res.ok) throw await res.json();
  return res.json();
};

// Create course
export const createCourse = async (courseData) => {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

// Update course
export const updateCourse = async (id, courseData) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

// Delete course
export const deleteCourse = async (id) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

// Get all teachers (for dropdown)
export const getAllTeachers = async () => {
  const res = await fetch(`${BASE_URL}/users/teachers`);
  if (!res.ok) throw await res.json();
  return res.json();
};