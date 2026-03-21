const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

/** POST /users/register */
export function register({ name, email, password, role }) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
}

/** POST /users/login */
export function login({ email, password }) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/** GET /users */
export function getAllUsers() {
  return request("/users");
}

/** PUT /users/:id */
export function updateUser(id, data) {
  return request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/** DELETE /users/:id */
export function deleteUser(id) {
  return request(`/users/${id}`, { method: "DELETE" });
}
