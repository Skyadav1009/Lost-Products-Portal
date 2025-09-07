import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Lost & Found</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/report-lost">Report Lost</Link>
        <Link to="/report-found">Report Found</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
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
