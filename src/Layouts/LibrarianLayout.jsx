import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCheckCircle,
  FaBookReader,
  FaBullhorn,
  FaCalendarCheck,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../Context/AuthContext";
import { roleTheme } from "../../Utils/roleTheme";
import { label } from "framer-motion/client";

const navLinks = [
  { to: "", label: "Checkout", icon: <FaBook /> },
  { to: "returns", label: "Returns", icon: <FaCheckCircle /> },
  { to: "borrow-request", label: "Requests", icon: <FaBookReader /> },
  { to: "announcements", label: "Announcements", icon: <FaBullhorn /> },
  { to: "reservations", label: "Reservations", icon: <FaCalendarCheck /> },
  { to: "overdue", label: "Overdue", icon: <FaClock /> },
];

const LibrarianLayout = () => {
  const theme = roleTheme.librarian;
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-30 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded-2xl shadow flex items-center justify-between">
            <nav className="flex overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === ""}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition rounded-xl
                    ${
                      isActive
                        ? `${theme.button} text-white shadow`
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4 px-4">
              <div className="hidden sm:flex flex-col text-right leading-tight">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.name || "Librarian"}
                </span>
                <span className="text-xs text-gray-400">Librarian</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LibrarianLayout;
