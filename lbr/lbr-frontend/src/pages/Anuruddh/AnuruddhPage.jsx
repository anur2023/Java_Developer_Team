import { useState } from "react";
import {
    registerUser,
    loginUser,
    testUser,
    getBooks,
    getBookById,
    searchBooks,
    borrowBook,
    returnBook,
} from "../../Apis/Anuruddh_api";

function AnuruddhPage() {
    const [output, setOutput] = useState("");

    // 🔹 separate states for better learning
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [input, setInput] = useState("");

    // ================= USERS =================

    const handleRegister = async () => {
        const res = await registerUser(registerData);
        setOutput(JSON.stringify(res, null, 2));
    };

    const handleLogin = async () => {
        const res = await loginUser(loginData);
        setOutput(JSON.stringify(res, null, 2));
    };

    const handleTest = async () => {
        const res = await testUser();
        setOutput(JSON.stringify(res, null, 2));
    };

    // ================= BOOKS =================

    const handleGetBooks = async () => {
        const res = await getBooks();
        setOutput(JSON.stringify(res, null, 2));
    };

    const handleGetBookById = async () => {
        const res = await getBookById(input);
        setOutput(JSON.stringify(res, null, 2));
    };

    const handleSearch = async () => {
        const res = await searchBooks(input);
        setOutput(JSON.stringify(res, null, 2));
    };

    // ================= BORROW =================

    const handleBorrow = async () => {
        const [userId, bookId] = input.split(",");
        const res = await borrowBook(userId, bookId);
        setOutput(JSON.stringify(res, null, 2));
    };

    const handleReturn = async () => {
        const res = await returnBook(input);
        setOutput(JSON.stringify(res, null, 2));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>API Practice Page</h1>

            {/* 🔹 REGISTER */}
            <h3>Register</h3>
            <input placeholder="Name" onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
            <input placeholder="Password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
            <select onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleRegister}>Register</button>

            <hr />

            {/* 🔹 LOGIN */}
            <h3>Login</h3>
            <input placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <input placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <button onClick={handleLogin}>Login</button>

            <button onClick={handleTest}>Test API</button>

            <hr />

            {/* 🔹 COMMON INPUT */}
            <h3>Other APIs</h3>
            <input
                placeholder="Enter id / keyword / userId,bookId"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <br /><br />

            <button onClick={handleGetBooks}>Get All Books</button>
            <button onClick={handleGetBookById}>Get Book By ID</button>
            <button onClick={handleSearch}>Search Book</button>

            <br /><br />

            <button onClick={handleBorrow}>Borrow (userId,bookId)</button>
            <button onClick={handleReturn}>Return (recordId)</button>

            <hr />

            {/* 🔹 OUTPUT */}
            <h3>Response:</h3>
            <pre style={{ background: "#eee", padding: "10px" }}>
        {output}
      </pre>
        </div>
    );
}

export default AnuruddhPage;