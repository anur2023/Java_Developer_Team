const BASE_URL = "http://localhost:5000/api";

// 🔐 Token helper
const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
});

// ================= USERS =================

// REGISTER
export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// LOGIN
export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.role);
    return result;
};

// TEST
export const testUser = async () => {
    const res = await fetch(`${BASE_URL}/users/test`, {
        headers: authHeader(),
    });
    return res.json();
};

// ================= BOOKS =================

// GET ALL BOOKS
export const getBooks = async () => {
    const res = await fetch(`${BASE_URL}/books`, {
        headers: authHeader(),
    });
    return res.json();
};

// GET BOOK BY ID
export const getBookById = async (id) => {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
        headers: authHeader(),
    });
    return res.json();
};

// SEARCH BOOK
export const searchBooks = async (keyword) => {
    const res = await fetch(`${BASE_URL}/books/search?keyword=${keyword}`, {
        headers: authHeader(),
    });
    return res.json();
};

// ================= BORROW =================

// BORROW BOOK
export const borrowBook = async (userId, bookId) => {
    const res = await fetch(
        `${BASE_URL}/borrow?userId=${userId}&bookId=${bookId}`,
        {
            method: "POST",
            headers: authHeader(),
        }
    );
    return res.json();
};

// RETURN BOOK
export const returnBook = async (recordId) => {
    const res = await fetch(
        `${BASE_URL}/return?recordId=${recordId}`,
        {
            method: "POST",
            headers: authHeader(),
        }
    );
    return res.json();
};