import axios from "axios";

// Backend API base URL (adjust if deployed to Render/Heroku/Vercel etc.)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage
API.interceptors.request.use(
  (req) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle expired/invalid token responses globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("user"); // clear invalid session
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(err);
  }
);

export default API;
