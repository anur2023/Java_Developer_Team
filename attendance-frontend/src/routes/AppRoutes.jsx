<<<<<<< HEAD
import { useState } from "react";
import CourseList from "../pages/course/CourseList";
import CreateCourse from "../pages/course/CreateCourse";
import CourseDetails from "../pages/course/CourseDetails";

export default function AppRoutes() {
  const [view, setView] = useState("list");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  if (view === "create") {
    return (
      <CreateCourse
        onBack={() => setView("list")}
        onCreated={() => setView("list")}
      />
    );
  }

  if (view === "details" && selectedCourseId) {
    return (
      <CourseDetails
        courseId={selectedCourseId}
        onBack={() => setView("list")}
      />
    );
  }

  return (
    <CourseList
      onAddNew={() => setView("create")}
      onViewDetails={(id) => {
        setSelectedCourseId(id);
        setView("details");
      }}
    />
  );
}
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import UserDashboard from '../pages/user/UserDashboard';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
>>>>>>> 4f4c08786476e15a054865f602298f7a756255db
