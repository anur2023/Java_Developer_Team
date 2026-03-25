import React from "react";

const PharmacistDashboard = () => {
    return (
        <div className="container mt-4">
            <h2>Pharmacist Dashboard</h2>
            <p>Welcome Pharmacist 👨‍⚕️</p>

            <div className="card p-3 mt-3">
                <h5>Pharmacist Services</h5>
                <ul>
                    <li>Approve Prescriptions</li>
                    <li>Check Orders</li>
                    <li>Update Stock</li>
                </ul>
            </div>
        </div>
    );
};

export default PharmacistDashboard;