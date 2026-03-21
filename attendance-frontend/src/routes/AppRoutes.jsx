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