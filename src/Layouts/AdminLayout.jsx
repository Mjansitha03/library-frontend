import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaComments,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

import { useAuth } from "../Context/AuthContext";
import { roleTheme } from "../../Utils/roleTheme";

const links = [
  { to: ".", label: "Overview", icon: <FaHome /> },
  { to: "book-management", label: "Books", icon: <FaBook /> },
  { to: "users", label: "Users", icon: <FaUsers /> },
  { to: "reviews", label: "Reviews", icon: <FaComments /> },
  { to: "announcements", label: "Announcements", icon: <FaBell /> },
  { to: "analytics", label: "Analytics", icon: <FaChartBar /> },
];

const AdminLayout = () => {
  const theme = roleTheme.admin;
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-30 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded-2xl shadow flex items-center justify-between overflow-hidden">
            {/* NAV */}
            <nav className="flex overflow-x-auto scrollbar-hide">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "."}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition
                    ${
                      isActive
                        ? `${theme.button} text-white`
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.icon}
                  <span className="hidden sm:inline">{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4 px-4">
              <div className="hidden sm:flex flex-col text-right leading-tight">
                <span className="text-sm font-semibold text-gray-700">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-400">Administrator</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
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

export default AdminLayout;
