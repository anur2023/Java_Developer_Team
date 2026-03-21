import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const isTeacher = user.role === "teacher";

  const teacherActions = [
    {
      label: "Manage students",
      desc: "Add, edit, or remove student records",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 19c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      to: "/students",
      accent: "#6366f1",
    },
    {
      label: "Manage courses",
      desc: "Create and organise your courses",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 8h8M7 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      to: "/courses",
      accent: "#10b981",
    },
    {
      label: "Mark attendance",
      desc: "Record present / absent for a session",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 11l4.5 4.5L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      to: "/attendance/mark",
      accent: "#f59e0b",
    },
    {
      label: "View reports",
      desc: "Attendance stats and student reports",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M6 16V10M10 16V6M14 16v-4M18 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      to: "/attendance/report",
      accent: "#ec4899",
    },
  ];

  const studentActions = [
    {
      label: "My attendance",
      desc: "View your attendance by course",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="4" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 2v3M15 2v3M3 9h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      to: "/attendance",
      accent: "#6366f1",
    },
    {
      label: "My report",
      desc: "See percentage and detailed report",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M6 16V10M10 16V6M14 16v-4M18 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      to: "/attendance/report",
      accent: "#10b981",
    },
  ];

  const actions = isTeacher ? teacherActions : studentActions;

  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  return (
    <div className="dashboard-page">
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="11" height="11" rx="2" fill="currentColor"/>
              <rect x="15" y="2" width="11" height="11" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="2" y="15" width="11" height="11" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="15" y="15" width="11" height="11" rx="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span>AttendEase</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Dashboard
          </Link>

          {isTeacher && (
            <>
              <Link to="/students" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 16c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Students
              </Link>
              <Link to="/courses" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Courses
              </Link>
              <Link to="/attendance/mark" className="nav-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9l3.5 3.5L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Mark attendance
              </Link>
            </>
          )}

          <Link to="/attendance" className="nav-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 1v3M12 1v3M2 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Attendance
          </Link>

          <Link to="/attendance/report" className="nav-item">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 14V9M7.5 14V4M11 14v-5M14.5 14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Reports
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{initials}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M6.5 3H3a1 1 0 00-1 1v9a1 1 0 001 1h3.5M11 5.5l3 3-3 3M14 8.5H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1>Good to see you, {user.name.split(" ")[0]} 👋</h1>
            <p>Here's what you can do today</p>
          </div>
          <div className="role-badge" data-role={user.role}>
            {user.role}
          </div>
        </header>

        <div className="action-grid">
          {actions.map((a) => (
            <Link to={a.to} key={a.label} className="action-card" style={{ "--accent": a.accent }}>
              <div className="action-icon">{a.icon}</div>
              <div className="action-text">
                <span className="action-label">{a.label}</span>
                <span className="action-desc">{a.desc}</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="info-strip">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {isTeacher
            ? "As a teacher you have full CRUD access to students, courses, and attendance records."
            : "As a student you can view your attendance records and percentage for all enrolled courses."}
        </div>
      </main>
    </div>
  );
}
