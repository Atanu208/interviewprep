import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const t = localStorage.getItem("token");
      setIsAuthenticated(!!t);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            {/* Removed "Flashcards App" link */}
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/flashcards"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  All Flashcards
                </Link>
                <Link
                  to="/analytics"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Analytics
                </Link>
                <Link
                  to="/practice"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Practice
                </Link>
                
              </>
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
