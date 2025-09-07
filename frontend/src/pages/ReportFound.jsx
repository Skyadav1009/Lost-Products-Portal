import { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const ReportFound = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/found", form);
      alert("Found item reported successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Report Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="date" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ReportFound;
