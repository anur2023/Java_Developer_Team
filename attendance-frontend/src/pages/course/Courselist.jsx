import { useState, useEffect } from "react";
import { getAllCourses, deleteCourse, getAllTeachers } from "../../api/courseApi";
import "./CourseList.css";

export default function CourseList({ onAddNew, onViewDetails }) {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesData, teachersData] = await Promise.all([
        getAllCourses(),
        getAllTeachers(),
      ]);
      setCourses(coursesData);
      // Teacher ID → name map
      const map = {};
      teachersData.forEach((t) => { map[t.id] = t.name; });
      setTeachers(map);
    } catch {
      setAlert({ type: "error", msg: "Data load nahi ho saka. Server check karo." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCourse(deleteTarget.id);
      setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setAlert({ type: "success", msg: `"${deleteTarget.courseName}" delete ho gaya.` });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: "error", msg: err?.error || "Delete nahi ho saka." });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const filtered = courses.filter((c) =>
    c.courseName.toLowerCase().includes(search.toLowerCase()) ||
    (teachers[c.teacherId] || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="course-list-page">
      {/* Header */}
      <div className="list-header">
        <div className="list-title-group">
          <h1 className="list-title">Courses</h1>
          <p className="list-subtitle">// {courses.length} course{courses.length !== 1 ? "s" : ""} total</p>
        </div>
        {onAddNew && (
          <button className="add-course-btn" onClick={onAddNew}>
            + NEW COURSE
          </button>
        )}
      </div>

      {/* Alert */}
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.msg}
        </div>
      )}

      {/* Search */}
      {!loading && courses.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by course name or teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="loading-state">
          <span className="loading-dots">Loading courses</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◻</div>
          <p className="empty-title">
            {search ? "No results found" : "No courses yet"}
          </p>
          <p className="empty-msg">
            {search ? `"${search}" se koi match nahi mila` : "Pehla course add karo upar se"}
          </p>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map((course, idx) => (
            <div
              className="course-card"
              key={course.id}
              onClick={() => onViewDetails && onViewDetails(course.id)}
            >
              <p className="course-card-index">#{String(idx + 1).padStart(2, "0")}</p>
              <h3 className="course-card-name">{course.courseName}</h3>
              <p className="course-card-teacher">
                Teacher: {teachers[course.teacherId] || `ID #${course.teacherId}`}
              </p>
              <div className="course-card-footer">
                <span className="course-card-date">
                  {formatDate(course.createdAt)}
                </span>
                <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn-edit"
                    onClick={() => onViewDetails && onViewDetails(course.id)}
                  >
                    VIEW
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => setDeleteTarget(course)}
                  >
                    DEL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="confirm-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p className="confirm-title">Delete Course?</p>
            <p className="confirm-msg">
              "{deleteTarget.courseName}" permanently delete ho jaayega.
              Yeh action undo nahi ho sakta.
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "DELETE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}