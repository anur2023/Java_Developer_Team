<Route path="/" element={<Login />} />
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceList from "./pages/attendance/AttendanceList";
import AttendanceReport from "./pages/attendance/AttendanceReport";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import UserDashboard from "./pages/user/UserDashboard";
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('attendance-list');
  const [userName, setUserName] = useState('Test User');
  const [userRole, setUserRole] = useState('STUDENT');

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('token', 'dummy-token-for-testing');
    localStorage.setItem('userName', 'Test Student');
    localStorage.setItem('userRole', 'STUDENT');
    localStorage.setItem('userId', '3');
    setUserRole('STUDENT');
    setUserName('Test Student');
  }, []);

  const toggleRole = () => {
    localStorage.clear();
    if (userRole === 'TEACHER') {
      localStorage.setItem('userRole', 'STUDENT');
      localStorage.setItem('userId', '3');
      localStorage.setItem('userName', 'Test Student');
      setUserRole('STUDENT');
      setUserName('Test Student');
    } else {
      localStorage.setItem('userRole', 'TEACHER');
      localStorage.setItem('userId', '1');
      localStorage.setItem('userName', 'Test Teacher');
      setUserRole('TEACHER');
      setUserName('Test Teacher');
    }
    localStorage.setItem('token', 'dummy-token-for-testing');
    window.location.reload();
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'mark-attendance': return <MarkAttendance />;
      case 'attendance-list': return <AttendanceList />;
      case 'attendance-report': return <AttendanceReport />;
      default: return <AttendanceList />;
    }
  };

  return (
    <Routes>

    {/* Default */}
    <Route path="/" element={<Login />} />

    {/* Your pages */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<UserDashboard />} />

    {/* Teammates' pages */}
    <Route path="/*" element={
      <div className="app-layout">
        <Navbar userName={userName} userRole={userRole} />

        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            background: userRole === 'TEACHER' ? '#e74c3c' : '#2ecc71',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
            border: '2px solid white'
          }}
          onClick={toggleRole}
        >
          Current: {userRole}
          <br />
          🔄 Switch to {userRole === 'TEACHER' ? 'STUDENT' : 'TEACHER'}
        </div>

        <div className="app-content">
          <aside className="sidebar">
            <button className="sidebar-toggle">←</button>
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">

                {userRole === 'TEACHER' && (
                  <li>
                    <div onClick={() => setCurrentPage('mark-attendance')}>
                      ✓ Mark Attendance
                    </div>
                  </li>
                )}

                <li>
                  <div onClick={() => setCurrentPage('attendance-list')}>
                    📋 Attendance
                  </div>
                </li>

                <li>
                  <div onClick={() => setCurrentPage('attendance-report')}>
                    📈 Report
                  </div>
                </li>

              </ul>
            </nav>
          </aside>

          <main className="main-content">
            {renderPage()}
          </main>
        </div>
      </div>
    } />

  </Routes>
  );
}

export default App;