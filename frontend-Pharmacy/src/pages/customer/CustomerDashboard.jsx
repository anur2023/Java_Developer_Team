import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const CustomerDashboard = () => {
    const user = useSelector((state) => state.auth.user);

    // 🔐 Protect page
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "CUSTOMER") {
        return <h3 className="text-center mt-5">Access Denied 🚫</h3>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-success">Customer Dashboard</h2>
            <p>Welcome, {user.email} 👋</p>

            <div className="row mt-4">

                {/* Cart */}
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm text-center p-3">
                        <h5>🛒 My Cart</h5>
                        <p>View and manage your cart items</p>
                        <Link to="/cart" className="btn btn-success btn-sm">
                            Go to Cart
                        </Link>
                    </div>
                </div>

                {/* Orders (future) */}
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm text-center p-3">
                        <h5>📦 My Orders</h5>
                        <p>Track your orders</p>
                        <button className="btn btn-secondary btn-sm" disabled>
                            Coming Soon
                        </button>
                    </div>
                </div>

                {/* Profile */}
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm text-center p-3">
                        <h5>👤 Profile</h5>
                        <p>View your profile details</p>
                        <button className="btn btn-secondary btn-sm" disabled>
                            Coming Soon
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboard;