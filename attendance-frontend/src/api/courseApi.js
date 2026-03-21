const BASE_URL = "http://localhost:5000/api";

export const getAllCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getCourseById = async (id) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createCourse = async (courseData) => {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const updateCourse = async (id, courseData) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteCourse = async (id) => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, { method: "DELETE" });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const getAllTeachers = async () => {
  const res = await fetch(`${BASE_URL}/users/teachers`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export default { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getAllTeachers };