import { useEffect, useState } from "react";
import { getAdminAnalytics } from "../../Services/adminAnalyticsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaUsers,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaStar,
  FaBook,
  FaChartLine,
  FaUndoAlt,
  FaComments,
} from "react-icons/fa";
import { roleTheme } from "../../../Utils/roleTheme";
import { motion } from "framer-motion";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const COLORS = ["#EF4444", "#22C55E", "#3B82F6", "#FACC15", "#8B5CF6"];

const AdminAnalytics = () => {
  const theme = roleTheme.admin;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAdminAnalytics();
        setData(res.data);
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-32 text-gray-500 animate-pulse">
        Loading analytics dashboard...
      </p>
    );
  }

  if (!data || !data.topStats) {
    return (
      <p className="text-center mt-32 text-red-500">
        Failed to load analytics.
      </p>
    );
  }

  const {
    topStats,
    bottomStats,
    collectionByGenre = [],
    popularBooks = [],
    borrowingTrend = [],
  } = data;

  const formattedBorrowingTrend = borrowingTrend.map((item) => ({
    ...item,
    month: MONTHS[item._id] || "Unknown",
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-4 sm:p-6 space-y-10 ${theme.bgLight} min-h-screen`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
        <FaChartLine className={theme.text} />
        Analytics Dashboard
      </h1>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Utilization Rate"
          value={`${topStats.utilizationRate || 0}%`}
          icon={<FaChartLine />}
        />
        <StatCard
          title="Total Transactions"
          value={topStats.totalTransactions || 0}
          icon={<FaExchangeAlt />}
        />
        <StatCard
          title="Total Members"
          value={topStats.totalMembers || 0}
          icon={<FaUsers />}
        />
        <StatCard
          title="Late Fees"
          value={`₹${topStats.lateFees?.toLocaleString() || 0}`}
          icon={<FaMoneyBillWave />}
        />
      </motion.div>

      <Section
        title="Collection by Genre"
        icon={<FaBook className={theme.text} />}
      >
        <div className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={collectionByGenre}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="45%"
                innerRadius="40%"
                outerRadius="65%"
                paddingAngle={3}
                label={({ percent }) =>
                  percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {collectionByGenre.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <Section
        title="Most Popular Books"
        icon={<FaBook className={theme.text} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularBooks.map((book, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-xl border bg-gradient-to-br from-white to-gray-50 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{book.author}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <FaExchangeAlt /> Borrowed
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {book.borrowCount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        title="Borrowing Trend (Last 7 Months)"
        icon={<FaChartLine className={theme.text} />}
      >
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={formattedBorrowingTrend}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="Average Rating"
          value={bottomStats.averageRating || 0}
          icon={<FaStar />}
        />
        <StatCard
          title="Return Rate"
          value={`${bottomStats.returnRate || 0}%`}
          icon={<FaUndoAlt />}
        />
        <StatCard
          title="Total Reviews"
          value={bottomStats.totalReviews || 0}
          icon={<FaComments />}
        />
      </div>
    </motion.div>
  );
};

const Section = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="bg-white p-4 sm:p-6 rounded-2xl shadow-md"
  >
    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {children}
  </motion.div>
);

const StatCard = ({ title, value, icon }) => {
  const theme = roleTheme.admin;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 sm:p-6 rounded-2xl shadow-md bg-white flex items-center gap-4"
    >
      <div
        className={`p-3 sm:p-4 rounded-xl ${theme.bgLight} ${theme.text} text-xl sm:text-2xl`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
