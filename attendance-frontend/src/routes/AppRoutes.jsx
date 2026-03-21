import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import UserDashboard from '../pages/user/UserDashboard';
import CourseList from '../pages/course/CourseList';
import CreateCourse from '../pages/course/CreateCourse';
import CourseDetails from '../pages/course/CourseDetails';
import AttendanceList from '../pages/attendance/AttendanceList';
import MarkAttendance from '../pages/attendance/MarkAttendance';
import AttendanceReport from '../pages/attendance/AttendanceReport';

function CourseModule() {
  const [view, setView] = useState("list");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  if (view === "create") return <CreateCourse onBack={() => setView("list")} onCreated={() => setView("list")} />;
  if (view === "details" && selectedCourseId) return <CourseDetails courseId={selectedCourseId} onBack={() => setView("list")} />;
  return <CourseList onAddNew={() => setView("create")} onViewDetails={(id) => { setSelectedCourseId(id); setView("details"); }} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/courses" element={<CourseModule />} />
      <Route path="/attendance" element={<AttendanceList />} />
      <Route path="/attendance/mark" element={<MarkAttendance />} />
      <Route path="/attendance/report" element={<AttendanceReport />} />
    </Routes>
  );
}

export default AppRoutes;