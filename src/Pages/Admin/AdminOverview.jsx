// import { useEffect, useState } from "react";
// import { roleTheme } from "../../../Utils/roleTheme";
// import {
//   FaBook,
//   FaUser,
//   FaArrowUp,
//   FaArrowDown,
//   FaClock,
//   FaClipboardList,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// import {
//   fetchAdminStats,
//   fetchAdminAnalytics,
//   fetchRecentActivity,
// } from "../../Services/adminApi";

// const PAGE_LIMIT = 5;

// /* ================= STAT CARD ================= */
// const StatCard = ({ label, value, theme, icon }) => (
//   <div className={`p-6 rounded-xl shadow ${theme.bg} hover:scale-105 transition`}>
//     <div className="flex items-center gap-4">
//       <div className={`text-3xl ${theme.text}`}>{icon}</div>
//       <div>
//         <p className="text-gray-500 text-sm">{label}</p>
//         <h2 className={`text-3xl font-bold ${theme.text}`}>
//           {typeof value === "number" ? value.toLocaleString() : value}
//         </h2>
//       </div>
//     </div>
//   </div>
// );

// /* ================= ACTIVITY ITEM ================= */
// const ActivityItem = ({ activity }) => {
//   let icon, color;

//   switch (activity.type) {
//     case "Borrowed":
//       icon = <FaArrowUp />;
//       color = "text-green-500";
//       break;
//     case "Returned":
//       icon = <FaArrowDown />;
//       color = "text-blue-500";
//       break;
//     case "Review":
//       icon = <FaClipboardList />;
//       color = "text-yellow-500";
//       break;
//     default:
//       icon = <FaClock />;
//       color = "text-gray-400";
//   }

//   return (
//     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
//       <div className="flex items-center gap-3">
//         <div className={`${color} text-lg`}>{icon}</div>
//         <p className="text-sm text-gray-700">
//           <span className="font-semibold">{activity.user}</span>{" "}
//           {activity.type}{" "}
//           <span className="font-medium">{activity.book}</span>
//         </p>
//       </div>
//       <p className="text-xs text-gray-400">
//         {new Date(activity.date).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// /* ================= ADMIN OVERVIEW ================= */
// const AdminOverview = () => {
//   const theme = roleTheme.admin;

//   const [stats, setStats] = useState({
//     books: 0,
//     users: 0,
//     borrows: 0,   // UI-friendly name
//     overdue: 0,
//     lateFees: 0,
//   });

//   const [activities, setActivities] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalActivities, setTotalActivities] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const loadOverview = async (currentPage) => {
//     setLoading(true);
//     try {
//       const statsRes = await fetchAdminStats();
//       const analyticsRes = await fetchAdminAnalytics();
//       const activityRes = await fetchRecentActivity(currentPage, PAGE_LIMIT);

//       setStats({
//         books: statsRes.books,
//         users: statsRes.users,
//         borrows: statsRes.borrowed, // ✅ FIXED MAPPING
//         overdue: statsRes.overdue,
//         lateFees: analyticsRes?.topStats?.lateFees || 0,
//       });

//       setActivities(activityRes.activities || []);
//       setTotalActivities(activityRes.total || 0);
//     } catch (error) {
//       console.error("Admin overview error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOverview(page);
//   }, [page]);

//   const totalPages = Math.max(1, Math.ceil(totalActivities / PAGE_LIMIT));

//   if (loading) {
//     return (
//       <p className="text-center text-gray-500 animate-pulse">
//         Loading overview...
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Admin Overview</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         <StatCard label="Total Books" value={stats.books} theme={theme} icon={<FaBook />} />
//         <StatCard label="Active Users" value={stats.users} theme={theme} icon={<FaUser />} />
//         <StatCard label="Active Borrows" value={stats.borrows} theme={theme} icon={<FaArrowUp />} />
//         <StatCard label="Overdue Books" value={stats.overdue} theme={theme} icon={<FaClock />} />
//         <StatCard label="Late Fees" value={`₹${stats.lateFees.toLocaleString()}`} theme={theme} icon={<FaMoneyBillWave />} />
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>

//         {activities.length ? (
//           <>
//             <div className="grid gap-2 max-h-96 overflow-y-auto">
//               {activities.map((act, i) => (
//                 <ActivityItem key={i} activity={act} />
//               ))}
//             </div>

//             <div className="flex justify-center items-center gap-3 mt-4">
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               <span className="text-sm">
//                 Page {page} of {totalPages}
//               </span>

//               <button
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center bg-white p-4 rounded shadow">
//             No recent activity
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOverview;


import { useEffect, useState } from "react";
import { roleTheme } from "../../../Utils/roleTheme";
import {
  FaBook,
  FaUser,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  fetchAdminStats,
  fetchAdminAnalytics,
  fetchRecentActivity,
} from "../../Services/adminApi";

const PAGE_LIMIT = 5;

/* ================= STAT CARD ================= */
const StatCard = ({ label, value, theme, icon }) => (
  <div className={`p-6 rounded-xl shadow ${theme.bg} hover:scale-105 transition`}>
    <div className="flex items-center gap-4">
      <div className={`text-3xl ${theme.text}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className={`text-3xl font-bold ${theme.text}`}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </h2>
      </div>
    </div>
  </div>
);

/* ================= ACTIVITY ITEM ================= */
const ActivityItem = ({ activity }) => {
  let icon, color;

  switch (activity.type) {
    case "Borrowed":
      icon = <FaArrowUp />;
      color = "text-green-500";
      break;
    case "Returned":
      icon = <FaArrowDown />;
      color = "text-blue-500";
      break;
    case "Review":
      icon = <FaClipboardList />;
      color = "text-yellow-500";
      break;
    default:
      icon = <FaClock />;
      color = "text-gray-400";
  }

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`${color} text-lg`}>{icon}</div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{activity.user}</span>{" "}
          {activity.type}{" "}
          <span className="font-medium">{activity.book}</span>
        </p>
      </div>
      <p className="text-xs text-gray-400">
        {new Date(activity.date).toLocaleString()}
      </p>
    </div>
  );
};

/* ================= ADMIN OVERVIEW ================= */
const AdminOverview = () => {
  const theme = roleTheme.admin;

  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    borrows: 0,
    overdue: 0,
    lateFees: 0,
  });

  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalActivities, setTotalActivities] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadOverview = async (currentPage) => {
    setLoading(true);
    try {
      const statsRes = await fetchAdminStats();
      const analyticsRes = await fetchAdminAnalytics();
      const activityRes = await fetchRecentActivity(currentPage, PAGE_LIMIT);

      setStats({
        books: statsRes.books,
        users: statsRes.users,                 // ✅ Active Users
        borrows: statsRes.activeBorrows,       // ✅ FIXED
        overdue: statsRes.overdue,
        lateFees: analyticsRes?.topStats?.lateFees || 0,
      });

      setActivities(activityRes.activities || []);
      setTotalActivities(activityRes.total || 0);
    } catch (error) {
      console.error("Admin overview error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview(page);
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(totalActivities / PAGE_LIMIT));

  if (loading) {
    return (
      <p className="text-center text-gray-500 animate-pulse">
        Loading overview...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard label="Total Books" value={stats.books} theme={theme} icon={<FaBook />} />
        <StatCard label="Active Users" value={stats.users} theme={theme} icon={<FaUser />} />
        <StatCard label="Active Borrows" value={stats.borrows} theme={theme} icon={<FaArrowUp />} />
        <StatCard label="Overdue Books" value={stats.overdue} theme={theme} icon={<FaClock />} />
        <StatCard label="Late Fees" value={`₹${stats.lateFees.toLocaleString()}`} theme={theme} icon={<FaMoneyBillWave />} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>

        {activities.length ? (
          <>
            <div className="grid gap-2 max-h-96 overflow-y-auto">
              {activities.map((act, i) => (
                <ActivityItem key={i} activity={act} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-3 mt-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center bg-white p-4 rounded shadow">
            No recent activity
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
