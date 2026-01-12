import { useEffect, useState } from "react";
import { getUserStats } from "../../Services/userStatsApi";
import {
  FaBookOpen,
  FaClipboardList,
  FaBookmark,
  FaExclamationTriangle,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const UserStatusBoard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getUserStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const cards = [
    {
      label: "Active Borrows",
      value: stats.activeBorrows,
      icon: <FaBookOpen />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Borrow Requests",
      value: stats.borrowRequests,
      icon: <FaClipboardList />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Reservations",
      value: stats.reservations,
      icon: <FaBookmark />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Overdues",
      value: stats.overdues,
      icon: <FaExclamationTriangle />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "My Reviews",
      value: stats.reviews,
      icon: <FaStar />,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "Returned Books",
      value: stats.returnedBooks,
      icon: <FaCheckCircle />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-xl shadow p-4 sm:p-6 flex gap-4 hover:shadow-lg transition"
        >
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${c.bg} ${c.color}`}
          >
            {c.icon}
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-500">{c.label}</p>
            <p className="text-xl sm:text-2xl font-bold">{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatusBoard;


