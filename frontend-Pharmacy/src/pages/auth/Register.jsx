import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "CUSTOMER"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                form
            );

            setMessage("✅ Registered Successfully");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {
            setMessage(err.response?.data?.message || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>

                <h3 className="text-center mb-3">Register</h3>

                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        className="form-control mb-2"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        className="form-control mb-2"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        className="form-control mb-2"
                        placeholder="Phone"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        className="form-control mb-3"
                        placeholder="Address"
                        onChange={handleChange}
                    />

                    <select
                        name="role"
                        className="form-control mb-3"
                        onChange={handleChange}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="PHARMACIST">Pharmacist</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                    <button className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-3 small">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;