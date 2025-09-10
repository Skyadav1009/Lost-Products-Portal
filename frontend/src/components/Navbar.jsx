import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Lost & Found
      </Link>

      {/* Links */}
      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/report-lost">Report Lost</Link>
        <Link to="/report-found">Report Found</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* Username pill */}
            <span className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-full shadow-sm">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded ml-2 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
