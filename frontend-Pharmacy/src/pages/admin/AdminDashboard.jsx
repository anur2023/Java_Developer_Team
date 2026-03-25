import React from "react";

const AdminDashboard = () => {
    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            <p>Welcome Admin 👨‍💼</p>

            <div className="card p-3 mt-3">
                <h5>Admin Services</h5>
                <ul>
                    <li>Manage Medicines</li>
                    <li>View Orders</li>
                    <li>Manage Users</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;