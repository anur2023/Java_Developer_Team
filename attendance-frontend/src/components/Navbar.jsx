import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName, userRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1>Attendance System</h1>
                </div>

                <div className="navbar-right">
                    <div className="navbar-user-info">
                        <span className="user-name">{userName || 'User'}</span>
                        <span className="user-role">{userRole || 'Student'}</span>
                    </div>

                    <button className="navbar-logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
