// lbr-frontend/src/App.jsx

import { useState } from "react";
import AuthPage from "./pages/Aparna/AuthPage";
import ApiTestPage from "./pages/Aparna/ApiTestPage";
import AnuruddhPage from "./pages/Anuruddh/AnuruddhPage";

function App() {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
      !!localStorage.getItem("token")
  );

  // Track which page to show: "aparna" or "anuruddh"
  const [activePage, setActivePage] = useState("aparna");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // If not logged in, show AuthPage
  if (!isLoggedIn) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in, show navigation tabs + selected page
  return (
      <div>
        {/* Top Navigation Bar */}
        <div style={styles.navbar}>
          <div style={styles.navLeft}>
            <span style={styles.statusBadge}>✅ Logged In</span>

            {/* Tab Navigation */}
            <button
                onClick={() => setActivePage("aparna")}
                style={{
                  ...styles.tabButton,
                  ...(activePage === "aparna" ? styles.tabActive : {}),
                }}
            >
              📚 Aparna's API Test
            </button>

            <button
                onClick={() => setActivePage("anuruddh")}
                style={{
                  ...styles.tabButton,
                  ...(activePage === "anuruddh" ? styles.tabActive : {}),
                }}
            >
              🧪 Anuruddh's Practice
            </button>
          </div>

          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>

        {/* Content Area - Show selected page */}
        <div style={styles.content}>
          {activePage === "aparna" && <ApiTestPage />}
          {activePage === "anuruddh" && <AnuruddhPage />}
        </div>
      </div>
  );
}

// Inline styles for navigation
const styles = {
  navbar: {
    padding: "10px 20px",
    background: "#2c3e50",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  statusBadge: {
    color: "#2ecc71",
    fontFamily: "monospace",
    fontWeight: "bold",
    marginRight: "10px",
  },
  tabButton: {
    background: "transparent",
    color: "#ecf0f1",
    border: "2px solid transparent",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  tabActive: {
    background: "#34495e",
    borderColor: "#3498db",
    color: "#fff",
  },
  logoutButton: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  content: {
    minHeight: "calc(100vh - 60px)",
  },
};

export default App;
