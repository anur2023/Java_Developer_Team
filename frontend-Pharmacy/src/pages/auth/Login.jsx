import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { saveUser } from "../../utils/storage";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: "",
        password: ""
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
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );

            // ✅ Save user (Redux + localStorage)
            saveUser(res.data);
            dispatch(loginSuccess(res.data));

            setMessage("✅ Login successful");

            // ✅ Role-based redirect
            const role = res.data.role;

            setTimeout(() => {
                if (role === "CUSTOMER") {
                    navigate("/customer");   // better than /cart
                } else if (role === "ADMIN") {
                    navigate("/admin");
                } else if (role === "PHARMACIST") {
                    navigate("/pharmacist");
                }
            }, 800);

        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed ❌");
        }

        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>

                <h3 className="text-center mb-3 text-success">Login</h3>

                {message && (
                    <div className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-3 small">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
};

export default Login;