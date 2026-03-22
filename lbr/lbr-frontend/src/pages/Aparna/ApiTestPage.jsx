// lbr-frontend/src/pages/Aparna/ApiTestPage.jsx
// Sirf testing ke liye — dekho kaunsi API kaam kar rahi hai

import { useState } from "react";
import {
  getAllUsers, getUserById, getUsersByRole, deleteUser,
  getAllBooks, getBookById, searchBooks, addBook, updateBook, deleteBook,
  getAllBorrowRecords, getBorrowRecordsByUser, getBorrowRecordsByBook, getActiveBorrows,
} from "../../Apis/Aparna_api";

// ── chota helper component — har API ka ek box ──
function ApiBox({ title, onTest, inputFields = [] }) {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await onTest(inputs);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.boxTitle}>{title}</h3>

      {/* agar input chahiye toh dikhao */}
      {inputFields.map((field) => (
        <input
          key={field.name}
          placeholder={field.placeholder}
          style={styles.input}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, [field.name]: e.target.value }))
          }
        />
      ))}

      <button onClick={handleTest} style={styles.button} disabled={loading}>
        {loading ? "Testing..." : "Test API"}
      </button>

      {/* error dikhao */}
      {error && (
        <div style={styles.error}>
          ❌ Error: {error}
        </div>
      )}

      {/* result dikhao */}
      {result && (
        <pre style={styles.result}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

// ── Main Test Page ──
function ApiTestPage() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const saveToken = () => {
    localStorage.setItem("token", token);
    alert("Token saved!");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🔧 API Test Page</h1>
      <p style={styles.sub}>Sabhi APIs ko yahan test karo</p>

      {/* Token input — pehle ye bharo */}
      <div style={styles.tokenBox}>
        <h2>Step 1: Token Daalo (Login karke token lo)</h2>
        <p style={{ color: "#888", fontSize: "13px" }}>
          Pehle Postman ya browser se <code>POST /api/users/login</code> karo,
          phir token yahan paste karo.
        </p>
        <textarea
          rows={3}
          style={{ ...styles.input, width: "100%", fontFamily: "monospace" }}
          placeholder="eyJhbGciOiJIUzI1NiJ9..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={saveToken} style={styles.saveBtn}>
          💾 Token Save Karo
        </button>
      </div>

      {/* ── USER APIs ── */}
      <h2 style={styles.sectionTitle}>👤 USER APIs</h2>
      <div style={styles.grid}>

        <ApiBox
          title="GET /api/users — Sab Users"
          onTest={() => getAllUsers()}
        />

        <ApiBox
          title="GET /api/users/{id} — Ek User"
          inputFields={[{ name: "id", placeholder: "User ID daalo (e.g. 1)" }]}
          onTest={({ id }) => getUserById(id)}
        />

        <ApiBox
          title="GET /api/users/role/{role} — Role se Users"
          inputFields={[{ name: "role", placeholder: "ADMIN ya STUDENT" }]}
          onTest={({ role }) => getUsersByRole(role)}
        />

        <ApiBox
          title="DELETE /api/users/{id} — User Delete Karo"
          inputFields={[{ name: "id", placeholder: "Delete karne wala User ID" }]}
          onTest={({ id }) => deleteUser(id)}
        />
      </div>

      {/* ── BOOK APIs ── */}
      <h2 style={styles.sectionTitle}>📚 BOOK APIs</h2>
      <div style={styles.grid}>

        <ApiBox
          title="GET /api/books — Sab Books"
          onTest={() => getAllBooks()}
        />

        <ApiBox
          title="GET /api/books/{id} — Ek Book"
          inputFields={[{ name: "id", placeholder: "Book ID daalo" }]}
          onTest={({ id }) => getBookById(id)}
        />

        <ApiBox
          title="GET /api/books/search?keyword= — Search"
          inputFields={[{ name: "keyword", placeholder: "keyword daalo (e.g. Java)" }]}
          onTest={({ keyword }) => searchBooks(keyword)}
        />

        <ApiBox
          title="POST /api/books — Nayi Book Add Karo"
          inputFields={[
            { name: "title",    placeholder: "Title" },
            { name: "author",   placeholder: "Author" },
            { name: "isbn",     placeholder: "ISBN (10 ya 13 digit)" },
            { name: "quantity", placeholder: "Quantity (number)" },
          ]}
          onTest={({ title, author, isbn, quantity }) =>
            addBook({ title, author, isbn, quantity: Number(quantity) })
          }
        />

        <ApiBox
          title="PUT /api/books/{id} — Book Update Karo"
          inputFields={[
            { name: "id",       placeholder: "Book ID" },
            { name: "title",    placeholder: "Naya Title" },
            { name: "author",   placeholder: "Naya Author" },
            { name: "isbn",     placeholder: "Naya ISBN" },
            { name: "quantity", placeholder: "Nayi Quantity" },
          ]}
          onTest={({ id, title, author, isbn, quantity }) =>
            updateBook(id, { title, author, isbn, quantity: Number(quantity) })
          }
        />

        <ApiBox
          title="DELETE /api/books/{id} — Book Delete Karo"
          inputFields={[{ name: "id", placeholder: "Delete karne wali Book ID" }]}
          onTest={({ id }) => deleteBook(id)}
        />
      </div>

      {/* ── BORROW RECORD APIs ── */}
      <h2 style={styles.sectionTitle}>📋 BORROW RECORD APIs</h2>
      <div style={styles.grid}>

        <ApiBox
          title="GET /api/borrow-records — Sab Records"
          onTest={() => getAllBorrowRecords()}
        />

        <ApiBox
          title="GET /api/borrow-records/active — Active Borrows"
          onTest={() => getActiveBorrows()}
        />

        <ApiBox
          title="GET /api/borrow-records/user/{userId}"
          inputFields={[{ name: "userId", placeholder: "User ID daalo" }]}
          onTest={({ userId }) => getBorrowRecordsByUser(userId)}
        />

        <ApiBox
          title="GET /api/borrow-records/book/{bookId}"
          inputFields={[{ name: "bookId", placeholder: "Book ID daalo" }]}
          onTest={({ bookId }) => getBorrowRecordsByBook(bookId)}
        />
      </div>
    </div>
  );
}

// ── Simple inline styles — koi CSS file nahi chahiye ──
const styles = {
  page: {
    fontFamily: "monospace",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "4px",
  },
  sub: {
    color: "#666",
    marginBottom: "24px",
  },
  tokenBox: {
    background: "#fff3cd",
    border: "1px solid #ffc107",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "32px",
  },
  sectionTitle: {
    borderBottom: "2px solid #333",
    paddingBottom: "6px",
    marginBottom: "16px",
    marginTop: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "16px",
  },
  box: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
  },
  boxTitle: {
    fontSize: "13px",
    marginBottom: "10px",
    color: "#333",
    wordBreak: "break-all",
  },
  input: {
    display: "block",
    width: "calc(100% - 16px)",
    padding: "7px 8px",
    marginBottom: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "13px",
  },
  button: {
    background: "#333",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  saveBtn: {
    background: "#ffc107",
    color: "#333",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "8px",
    fontSize: "13px",
  },
  error: {
    background: "#fdecea",
    color: "#c0392b",
    padding: "8px",
    borderRadius: "4px",
    marginTop: "10px",
    fontSize: "13px",
  },
  result: {
    background: "#eafaf1",
    color: "#1a5c38",
    padding: "10px",
    borderRadius: "4px",
    marginTop: "10px",
    fontSize: "12px",
    overflowX: "auto",
    maxHeight: "200px",
    overflowY: "auto",
  },
};

export default ApiTestPage;