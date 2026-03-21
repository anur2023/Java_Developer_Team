import { useState, useEffect } from "react";
import { createCourse, getAllTeachers } from "../../api/courseApi";
import "./CreateCourse.css";

export default function CreateCourse({ onBack, onCreated }) {
  const [formData, setFormData] = useState({ courseName: "", teacherId: "" });
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getAllTeachers()
      .then(setTeachers)
      .catch(() => setAlert({ type: "error", msg: "Teachers load nahi ho sake." }))
      .finally(() => setTeachersLoading(false));
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.courseName.trim()) errs.courseName = "Course name required hai";
    else if (formData.courseName.trim().length < 2) errs.courseName = "Minimum 2 characters chahiye";
    if (!formData.teacherId) errs.teacherId = "Teacher select karo";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setAlert(null);
    try {
      const payload = { courseName: formData.courseName.trim(), teacherId: Number(formData.teacherId) };
      await createCourse(payload);
      setAlert({ type: "success", msg: "Course successfully create ho gaya!" });
      setFormData({ courseName: "", teacherId: "" });
      if (onCreated) setTimeout(onCreated, 1200);
    } catch (err) {
      const msg = err?.error || err?.errors?.courseName || "Course create nahi ho saka.";
      setAlert({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-page">
      <div className="create-course-header">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
        )}
        <h1 className="page-title">New Course</h1>
        <p className="page-subtitle">// add a new course to the system</p>
      </div>

      <div className="course-form-card">
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="courseName">
              Course Name
            </label>
            <input
              id="courseName"
              name="courseName"
              type="text"
              className={`form-input ${errors.courseName ? "error" : ""}`}
              placeholder="e.g. Java Programming"
              value={formData.courseName}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.courseName && <p className="field-error">{errors.courseName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="teacherId">
              Assign Teacher
            </label>
            <select
              id="teacherId"
              name="teacherId"
              className={`form-select ${errors.teacherId ? "error" : ""}`}
              value={formData.teacherId}
              onChange={handleChange}
              disabled={teachersLoading}
            >
              <option value="">
                {teachersLoading ? "Loading teachers..." : "— Select a teacher —"}
              </option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
            {errors.teacherId && <p className="field-error">{errors.teacherId}</p>}
          </div>

          <hr className="divider" />

          <button className="submit-btn" type="submit" disabled={loading || teachersLoading}>
            {loading ? "Creating..." : "CREATE COURSE"}
          </button>
        </form>
      </div>
    </div>
  );
}