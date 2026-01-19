import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaStar, FaHistory, FaBookmark } from "react-icons/fa";

const links = [
  { to: ".", label: "Books", icon: <FaBook /> },
  { to: "reservations", label: "Reservations", icon: <FaBookmark /> },
  { to: "history", label: "History", icon: <FaHistory /> },
  { to: "my-reviews", label: "My Reviews", icon: <FaStar /> },
];

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex justify-center">
      <div className="w-full max-w-7xl px-4 py-6 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow p-4 h-fit">
          <nav className="space-y-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "."}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-blue-700 hover:bg-blue-100"
                  }`
                }
              >
                <span className="text-lg">{l.icon}</span>
                <span>{l.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-xl shadow p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default UserLayout;
