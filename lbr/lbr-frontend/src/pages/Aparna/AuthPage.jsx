// lbr-frontend/src/pages/Aparna/AuthPage.jsx

import { useState } from "react";

const BASE_URL = "http://localhost:5000/api";

function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // login ya signup toggle

  // login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ── LOGIN ──
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // token automatically localStorage mein save karo
      localStorage.setItem("token", data.token);

      setSuccess(`Welcome ${data.name}! Token save ho gaya ✅`);

      // thodi der baad test page pe le jao
      setTimeout(() => onLoginSuccess(), 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── SIGNUP ──
  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        // validation errors dikhao
        if (data.fieldErrors) {
          const msgs = Object.values(data.fieldErrors).join(", ");
          throw new Error(msgs);
        }
        throw new Error(data.message || "Signup failed");
      }

      // signup ke baad bhi token save karo
      localStorage.setItem("token", data.token);

      setSuccess(`Account bana! Welcome ${data.name} ✅`);

      setTimeout(() => onLoginSuccess(), 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.heading}>📚 Library Admin</h1>

        {/* Toggle buttons */}
        <div style={styles.toggle}>
          <button
            style={isLogin ? styles.toggleActive : styles.toggleInactive}
            onClick={() => { setIsLogin(true); setError(null); setSuccess(null); }}
          >
            Login
          </button>
          <button
            style={!isLogin ? styles.toggleActive : styles.toggleInactive}
            onClick={() => { setIsLogin(false); setError(null); setSuccess(null); }}
          >
            Signup
          </button>
        </div>

        {/* ── LOGIN FORM ── */}
        {isLogin && (
          <div>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              style={styles.button}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        )}

        {/* ── SIGNUP FORM ── */}
        {!isLogin && (
          <div>
            <input
              style={styles.input}
              type="text"
              placeholder="Name"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password (min 6 characters)"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <select
              style={styles.input}
              value={signupData.role}
              onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button
              style={styles.button}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </div>
        )}

        {/* Error message */}
        {error && <div style={styles.error}>❌ {error}</div>}

        {/* Success message */}
        {success && <div style={styles.success}>✅ {success}</div>}

      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f0f0f0",
    fontFamily: "monospace",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    width: "360px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "22px",
  },
  toggle: {
    display: "flex",
    marginBottom: "20px",
    borderRadius: "6px",
    overflow: "hidden",
    border: "1px solid #333",
  },
  toggleActive: {
    flex: 1,
    padding: "8px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  toggleInactive: {
    flex: 1,
    padding: "8px",
    background: "#fff",
    color: "#333",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "4px",
  },
  error: {
    marginTop: "14px",
    padding: "10px",
    background: "#fdecea",
    color: "#c0392b",
    borderRadius: "6px",
    fontSize: "13px",
  },
  success: {
    marginTop: "14px",
    padding: "10px",
    background: "#eafaf1",
    color: "#1a5c38",
    borderRadius: "6px",
    fontSize: "13px",
  },
};

export default AuthPage;