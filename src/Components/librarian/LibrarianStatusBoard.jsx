import {
  FaBookOpen,
  FaUsers,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { roleTheme } from "../../../Utils/roleTheme";

const StatCard = ({ icon, label, value }) => {
  const theme = roleTheme.librarian;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center hover:shadow-md transition">
      <div className={`p-3 rounded-full text-xl ${theme.bg} ${theme.text}`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

const LibrarianStatusBoard = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<FaBookOpen />}
        label="Active Borrows"
        value={stats.activeBorrows}
      />
      <StatCard
        icon={<FaCheckCircle />}
        label="Available Books"
        value={stats.availableBooks}
      />
      <StatCard
        icon={<FaUsers />}
        label="Active Members"
        value={stats.activeMembers}
      />
      <StatCard
        icon={<FaExclamationCircle />}
        label="Overdue Items"
        value={stats.overdueItems}
      />
    </div>
  );
};

export default LibrarianStatusBoard;


