// lbr-frontend/src/App.jsx

import { useState } from "react";
import AuthPage from "./pages/Aparna/AuthPage";
import ApiTestPage from "./pages/Aparna/ApiTestPage";

function App() {
  // agar token pehle se hai toh seedha test page dikhao
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // login nahi hai → AuthPage dikhao
  // login hai → ApiTestPage dikhao
  return (
    <div>
      {isLoggedIn ? (
        <>
          {/* Logout button */}
          <div style={{ padding: "10px 20px", background: "#333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#fff", fontFamily: "monospace" }}>✅ Logged In</span>
            <button
              onClick={handleLogout}
              style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontFamily: "monospace" }}
            >
              Logout
            </button>
          </div>
          <ApiTestPage />
        </>
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;