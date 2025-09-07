import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios"; // Axios instance with auth support

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // ✅ Save user + token
      login(res.data.user, res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Redirect
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
