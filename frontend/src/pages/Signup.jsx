import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old error

    try {
      const res = await API.post("/auth/signup", form);

      // ✅ login immediately after signup
      login(res.data.user, res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/"); // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
