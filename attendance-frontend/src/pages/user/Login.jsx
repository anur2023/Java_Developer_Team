import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/userApi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const data = await login(form);
      // ✅ backend seedha user object deta hai, data.user nahi
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb orb-1" />
        <div className="auth-orb orb-2" />
      </div>

      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="11" height="11" rx="2" fill="currentColor" opacity="1"/>
              <rect x="15" y="2" width="11" height="11" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="2" y="15" width="11" height="11" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="15" y="15" width="11" height="11" rx="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span className="brand-name">AttendEase</span>
        </div>

        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="auth-error">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}