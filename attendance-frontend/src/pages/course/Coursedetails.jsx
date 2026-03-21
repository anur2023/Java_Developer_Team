import { useState, useEffect } from "react";
import { getCourseById, updateCourse, getAllTeachers } from "../../api/courseApi";

const styles = {
  page: { minHeight: "100vh", background: "#f8f7f4", padding: "40px 24px", fontFamily: "'Georgia', serif" },
  maxW: { maxWidth: "560px", margin: "0 auto" },
  backBtn: { display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#888", fontSize: "13px", fontFamily: "'Courier New', monospace", cursor: "pointer", padding: "0", marginBottom: "20px", letterSpacing: "0.5px" },
  titleRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px", gap: "12px" },
  title: { fontSize: "28px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px", letterSpacing: "-0.5px" },
  subtitle: { fontSize: "13px", color: "#888", margin: "0", fontFamily: "'Courier New', monospace" },
  editBtn: { background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 18px", fontSize: "12px", fontFamily: "'Courier New', monospace", fontWeight: "600", letterSpacing: "0.8px", cursor: "pointer", whiteSpace: "nowrap" },
  card: { background: "#fff", border: "1.5px solid #e8e5e0", borderRadius: "12px", padding: "32px" },
  metaGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" },
  metaItem: {},
  metaLabel: { fontSize: "10px", fontFamily: "'Courier New', monospace", fontWeight: "600", letterSpacing: "1.2px", textTransform: "uppercase", color: "#aaa", marginBottom: "6px" },
  metaValue: { fontSize: "16px", fontWeight: "700", color: "#1a1a1a" },
  metaValueSub: { fontSize: "13px", color: "#888", fontFamily: "'Courier New', monospace" },
  divider: { border: "none", borderTop: "1px solid #f0ede8", margin: "24px 0" },
  // Form styles
  formGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "1.2px", textTransform: "uppercase", color: "#555", marginBottom: "8px", fontFamily: "'Courier New', monospace" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0ddd8", borderRadius: "8px", fontSize: "15px", fontFamily: "'Georgia', serif", color: "#1a1a1a", background: "#fafaf8", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
  inputFocus: { borderColor: "#1a1a1a", background: "#fff" },
  inputError: { borderColor: "#e53e3e", background: "#fff8f8" },
  select: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0ddd8", borderRadius: "8px", fontSize: "15px", fontFamily: "'Georgia', serif", color: "#1a1a1a", background: "#fafaf8", outline: "none", boxSizing: "border-box", appearance: "none", cursor: "pointer" },
  fieldError: { fontSize: "12px", color: "#e53e3e", marginTop: "5px", fontFamily: "'Courier New', monospace" },
  saveBtn: { width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", fontFamily: "'Courier New', monospace", letterSpacing: "1px", cursor: "pointer", marginTop: "8px" },
  cancelBtn: { width: "100%", padding: "12px", background: "none", color: "#888", border: "1.5px solid #e0ddd8", borderRadius: "8px", fontSize: "13px", fontFamily: "'Courier New', monospace", letterSpacing: "0.8px", cursor: "pointer", marginTop: "8px" },
  alert: { padding: "12px 16px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px", fontFamily: "'Courier New', monospace" },
  alertSuccess: { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" },
  alertError: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" },
  loading: { textAlign: "center", padding: "60px 0", color: "#888", fontFamily: "'Courier New', monospace" },
  badge: { display: "inline-block", background: "#f0ede8", color: "#555", borderRadius: "20px", padding: "3px 12px", fontSize: "11px", fontFamily: "'Courier New', monospace", fontWeight: "600", letterSpacing: "0.5px" },
};

export default function CourseDetails({ courseId, onBack }) {
  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [teacherMap, setTeacherMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ courseName: "", teacherId: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    Promise.all([getCourseById(courseId), getAllTeachers()])
      .then(([c, t]) => {
        setCourse(c);
        setTeachers(t);
        const map = {};
        t.forEach((x) => { map[x.id] = x.name; });
        setTeacherMap(map);
        setFormData({ courseName: c.courseName, teacherId: String(c.teacherId) });
      })
      .catch(() => setAlert({ type: "error", msg: "Course load nahi ho saka." }))
      .finally(() => setLoading(false));
  }, [courseId]);

  const validate = () => {
    const errs = {};
    if (!formData.courseName.trim()) errs.courseName = "Course name required hai";
    else if (formData.courseName.trim().length < 2) errs.courseName = "Minimum 2 characters";
    if (!formData.teacherId) errs.teacherId = "Teacher select karo";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    setAlert(null);
    try {
      const updated = await updateCourse(courseId, {
        courseName: formData.courseName.trim(),
        teacherId: Number(formData.teacherId),
      });
      setCourse(updated);
      setEditing(false);
      setAlert({ type: "success", msg: "Course successfully update ho gaya!" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({ type: "error", msg: err?.error || "Update nahi ho saka." });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  };

  if (loading) return <div style={styles.page}><div style={styles.loading}>Loading course details...</div></div>;

  return (
    <div style={styles.page}>
      <div style={styles.maxW}>
        {onBack && (
          <button style={styles.backBtn} onClick={onBack}>← Back to Courses</button>
        )}

        {/* Title row */}
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>{course?.courseName}</h1>
            <p style={styles.subtitle}>// course id #{courseId}</p>
          </div>
          {!editing && (
            <button style={styles.editBtn} onClick={() => setEditing(true)}>EDIT</button>
          )}
        </div>

        {alert && (
          <div style={{ ...styles.alert, ...(alert.type === "success" ? styles.alertSuccess : styles.alertError) }}>
            {alert.msg}
          </div>
        )}

        <div style={styles.card}>
          {!editing ? (
            // ── View Mode ──
            <>
              <div style={styles.metaGrid}>
                <div style={styles.metaItem}>
                  <p style={styles.metaLabel}>Course Name</p>
                  <p style={styles.metaValue}>{course?.courseName}</p>
                </div>
                <div style={styles.metaItem}>
                  <p style={styles.metaLabel}>Teacher</p>
                  <p style={styles.metaValue}>{teacherMap[course?.teacherId] || "—"}</p>
                  <p style={styles.metaValueSub}>ID #{course?.teacherId}</p>
                </div>
                <div style={styles.metaItem}>
                  <p style={styles.metaLabel}>Created On</p>
                  <p style={{ ...styles.metaValue, fontSize: "14px" }}>{formatDate(course?.createdAt)}</p>
                </div>
                <div style={styles.metaItem}>
                  <p style={styles.metaLabel}>Status</p>
                  <span style={styles.badge}>ACTIVE</span>
                </div>
              </div>
            </>
          ) : (
            // ── Edit Mode ──
            <form onSubmit={handleSave} noValidate>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="courseName">Course Name</label>
                <input
                  id="courseName"
                  name="courseName"
                  type="text"
                  style={{
                    ...styles.input,
                    ...(focusedField === "courseName" ? styles.inputFocus : {}),
                    ...(errors.courseName ? styles.inputError : {}),
                  }}
                  value={formData.courseName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("courseName")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="off"
                />
                {errors.courseName && <p style={styles.fieldError}>{errors.courseName}</p>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="teacherId">Assign Teacher</label>
                <select
                  id="teacherId"
                  name="teacherId"
                  style={{ ...styles.select, ...(errors.teacherId ? styles.inputError : {}) }}
                  value={formData.teacherId}
                  onChange={handleChange}
                >
                  <option value="">— Select teacher —</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.email})</option>
                  ))}
                </select>
                {errors.teacherId && <p style={styles.fieldError}>{errors.teacherId}</p>}
              </div>

              <button
                type="submit"
                style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
                disabled={saving}
              >
                {saving ? "Saving..." : "SAVE CHANGES"}
              </button>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={() => {
                  setEditing(false);
                  setErrors({});
                  setFormData({ courseName: course.courseName, teacherId: String(course.teacherId) });
                }}
                disabled={saving}
              >
                CANCEL
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}