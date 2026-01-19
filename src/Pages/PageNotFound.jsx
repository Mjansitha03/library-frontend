import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { roleTheme } from "../../Utils/roleTheme";

const roleHomeRoute = {
  guest: "/",
  user: "/user",
  librarian: "/librarian",
  admin: "/admin",
};

const PageNotFound = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";
  const theme = roleTheme[role];
  const homePath = roleHomeRoute[role];

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${theme.bg}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-lg w-full text-center bg-white rounded-2xl shadow-2xl p-8 overflow-hidden"
      >
        {/* Animated Glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-${theme.primary}-200 blur-3xl`}
        />

        {/* 404 */}
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-7xl font-extrabold ${theme.text}`}
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link
            to={homePath}
            className={`inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-medium transition ${theme.button}`}
          >
            <FiArrowLeft />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className={`px-5 py-2.5 rounded-lg font-medium border transition ${theme.hoverBg}`}
          >
            Go Back
          </button>
        </div>

        {/* Floating Role Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`mt-6 inline-block px-3 py-1 text-sm rounded-full ${theme.badge}`}
        >
          {role.toUpperCase()} MODE
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
