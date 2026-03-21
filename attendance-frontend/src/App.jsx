import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceList from "./pages/attendance/AttendanceList";
import AttendanceReport from "./pages/attendance/AttendanceReport";
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('attendance-list');
  const [userName, setUserName] = useState('Test User');
  const [userRole, setUserRole] = useState('STUDENT');

  useEffect(() => {
    // FORCE SET TO STUDENT - Clear everything first
    localStorage.clear();
    localStorage.setItem('token', 'dummy-token-for-testing');
    localStorage.setItem('userName', 'Test Student');
    localStorage.setItem('userRole', 'STUDENT');
    localStorage.setItem('userId', '3');

    setUserRole('STUDENT');
    setUserName('Test Student');
  }, []);

  // Toggle between TEACHER and STUDENT
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

    // Force reload
    window.location.reload();
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'mark-attendance':
        return <MarkAttendance />;
      case 'attendance-list':
        return <AttendanceList />;
      case 'attendance-report':
        return <AttendanceReport />;
      default:
        return <AttendanceList />;
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
      <div className="app-layout">
        <Navbar userName={userName} userRole={userRole} />

        {/* Role Toggle Button */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: userRole === 'TEACHER' ? '#e74c3c' : '#2ecc71',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          fontWeight: 'bold',
          fontSize: '15px',
          border: '2px solid white'
        }}
             onClick={toggleRole}
        >
          Current: {userRole}<br/>
          🔄 Switch to {userRole === 'TEACHER' ? 'STUDENT' : 'TEACHER'}
        </div>

        <div className="app-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <button className="sidebar-toggle">←</button>
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">
                {userRole === 'TEACHER' && (
                    <li className="sidebar-menu-item">
                      <div
                          className={`sidebar-link ${currentPage === 'mark-attendance' ? 'active' : ''}`}
                          onClick={() => handleNavigation('mark-attendance')}
                      >
                        <span className="sidebar-icon">✓</span>
                        <span className="sidebar-label">Mark Attendance</span>
                      </div>
                    </li>
                )}

                <li className="sidebar-menu-item">
                  <div
                      className={`sidebar-link ${currentPage === 'attendance-list' ? 'active' : ''}`}
                      onClick={() => handleNavigation('attendance-list')}
                  >
                    <span className="sidebar-icon">📋</span>
                    <span className="sidebar-label">
                    {userRole === 'STUDENT' ? 'My Attendance' : 'Attendance List'}
                  </span>
                  </div>
                </li>

                <li className="sidebar-menu-item">
                  <div
                      className={`sidebar-link ${currentPage === 'attendance-report' ? 'active' : ''}`}
                      onClick={() => handleNavigation('attendance-report')}
                  >
                    <span className="sidebar-icon">📈</span>
                    <span className="sidebar-label">
                    {userRole === 'STUDENT' ? 'My Report' : 'Reports'}
                  </span>
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
  );
}

export default App;
