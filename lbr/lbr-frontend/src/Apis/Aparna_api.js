// ─────────────────────────────────────────────
// Aparna_api.js  —  sabhi API calls ek jagah
// ─────────────────────────────────────────────

const BASE_URL = "http://localhost:5000/api";

// localStorage se token uthao
const getToken = () => localStorage.getItem("token");

// har request ke saath ye header bhejo
const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─────────────────────────────────────────────
// USER APIs
// ─────────────────────────────────────────────

// GET /api/users
export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

// GET /api/users/{id}
export const getUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch user");
  return data;
};

// GET /api/users/role/{role}
export const getUsersByRole = async (role) => {
  const response = await fetch(`${BASE_URL}/users/role/${role}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch users by role");
  return data;
};

// DELETE /api/users/{id}
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete user");
  return data;
};

// ─────────────────────────────────────────────
// BOOK APIs
// ─────────────────────────────────────────────

// GET /api/books
export const getAllBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch books");
  return data;
};

// GET /api/books/{id}
export const getBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch book");
  return data;
};

// GET /api/books/search?keyword=
export const searchBooks = async (keyword) => {
  const params = new URLSearchParams();
  if (keyword && keyword.trim() !== "") {
    params.append("keyword", keyword.trim());
  }
  const response = await fetch(`${BASE_URL}/books/search?${params.toString()}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to search books");
  return data;
};

// POST /api/books
export const addBook = async (bookData) => {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(bookData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add book");
  return data;
};

// PUT /api/books/{id}
export const updateBook = async (id, bookData) => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(bookData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update book");
  return data;
};

// DELETE /api/books/{id}
export const deleteBook = async (id) => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete book");
  return data;
};

// ─────────────────────────────────────────────
// BORROW RECORD APIs
// ─────────────────────────────────────────────

// GET /api/borrow-records
export const getAllBorrowRecords = async () => {
  const response = await fetch(`${BASE_URL}/borrow-records`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch borrow records");
  return data;
};

// GET /api/borrow-records/user/{userId}
export const getBorrowRecordsByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/borrow-records/user/${userId}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch user borrow records");
  return data;
};

// GET /api/borrow-records/book/{bookId}
export const getBorrowRecordsByBook = async (bookId) => {
  const response = await fetch(`${BASE_URL}/borrow-records/book/${bookId}`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch book borrow records");
  return data;
};

// GET /api/borrow-records/active
export const getActiveBorrows = async () => {
  const response = await fetch(`${BASE_URL}/borrow-records/active`, {
    method: "GET",
    headers: authHeader(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch active borrows");
  return data;
};