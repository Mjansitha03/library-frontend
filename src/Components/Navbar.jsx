import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { roleTheme } from "../../Utils/roleTheme";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import NotificationBell from "./notification/NotificationBell";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role ?? "guest";
  const theme = roleTheme[role];

  if (role === "admin" || role === "librarian") return null;

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const CommonLinks = () => (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/books">Books</NavItem>
      <NavItem to="/reviews/all">Reviews</NavItem>
      <NavItem to="/announcements">Announcements</NavItem>
    </>
  );

  return (
    <nav className={`${theme.bg} shadow sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className={`${theme.badge} p-2 rounded`}>📘</div>
          <div>
            <h1 className="font-semibold">LibraryHub</h1>
            <p className="text-xs text-gray-500">Smart LMS</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <CommonLinks />
          {role === "guest" ? (
            <>
              <Link
                to="/sign-in"
                className="px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link to="/sign-up" className="px-4 py-2 rounded bg-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
              <NotificationBell />
              <ProfileDropdown
                user={user}
                logout={logout}
                theme={theme}
                profileRef={profileRef}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
              />
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          {role === "user" && <NotificationBell />}
          {role === "user" && (
            <ProfileDropdown
              user={user}
              logout={logout}
              theme={theme}
              profileRef={profileRef}
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
            />
          )}
          <button onClick={() => setOpen(!open)}>
            <IoMenu size={26} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 py-4 space-y-3 bg-white shadow-md">
          <CommonLinks />
          {role === "guest" && (
            <>
              <Link to="/sign-in" className="block px-4 py-2 hover:bg-gray-100">
                Login
              </Link>
              <Link to="/sign-up" className="block px-4 py-2 hover:bg-gray-100">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const ProfileDropdown = ({
  user,
  logout,
  theme,
  profileRef,
  profileOpen,
  setProfileOpen,
}) => (
  <div className="relative" ref={profileRef}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        setProfileOpen((p) => !p);
      }}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${theme.bgLight}`}
    >
      <FaUser className={theme.text} />
    </button>

    {profileOpen && (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50"
      >
        <div className="px-4 py-3 bg-gray-50">
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <p className="font-medium text-blue-600 mt-2">
            <NavItem to="/user/my-profile">My Profile</NavItem>
            <NavItem to="/user">My DashBoard</NavItem>
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    )}
  </div>
);

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-2 py-1 ${isActive ? "font-semibold text-blue-600" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default Navbar;
