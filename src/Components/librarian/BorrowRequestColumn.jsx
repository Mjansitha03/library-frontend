import { useState, useMemo } from "react";
import BorrowRequestCard from "./BorrowRequestCard";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const BorrowRequestColumn = ({ title, data, color = "text-gray-800", onApprove, onReject }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((r) => {
      const d = new Date(r.createdAt);
      if (startDate && d < new Date(startDate)) return false;
      if (endDate && d > new Date(new Date(endDate).setHours(23, 59, 59))) return false;
      return true;
    });
  }, [data, startDate, endDate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex flex-col shadow-lg h-[600px] md:h-[650px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg md:text-xl font-semibold ${color}`}>
          {title} ({filteredData.length})
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="relative flex-1 min-w-[140px]">
          <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="relative flex-1 min-w-[140px]">
          <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {(startDate || endDate) && (
          <button
            onClick={() => { setStartDate(""); setEndDate(""); }}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!filteredData.length && (
          <p className="text-center text-sm text-gray-400 mt-10">
            No records
          </p>
        )}

        {filteredData.map((r) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <BorrowRequestCard
              request={r}
              onApprove={onApprove}
              onReject={onReject}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BorrowRequestColumn;
