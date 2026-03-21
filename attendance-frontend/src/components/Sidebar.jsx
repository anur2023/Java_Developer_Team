import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userRole }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Menu items for Teacher
    const teacherMenuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/students', label: 'Students', icon: '👨‍🎓' },
        { path: '/courses', label: 'Courses', icon: '📚' },
        { path: '/mark-attendance', label: 'Mark Attendance', icon: '✓' },
        { path: '/attendance-list', label: 'Attendance List', icon: '📋' },
        { path: '/attendance-report', label: 'Reports', icon: '📈' },
    ];

    // Menu items for Student
    const studentMenuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/attendance-list', label: 'My Attendance', icon: '📋' },
        { path: '/attendance-report', label: 'My Report', icon: '📈' },
    ];

    // Select menu items based on role
    const menuItems = userRole === 'TEACHER' ? teacherMenuItems : studentMenuItems;

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isCollapsed ? '→' : '←'}
            </button>

            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="sidebar-menu-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive ? 'active' : ''}`
                                }
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
