import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import ReturnRequestCard from "../../Components/librarian/ReturnRequestCard";

const ReturnColumn = ({ title, data, color = "text-gray-800", theme, onConfirm, loadingId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

 
  const cardColors = ["bg-white", "bg-gray-50", "bg-blue-50", "bg-green-50", "bg-yellow-50"];

  const filteredData = useMemo(() => {
    return data.filter((r) => {
      const d = new Date(r.createdAt);
      if (startDate && d < new Date(startDate)) return false;
      if (endDate && d > new Date(new Date(endDate).setHours(23, 59, 59))) return false;
      return true;
    });
  }, [data, startDate, endDate]);

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col shadow-lg h-[600px] md:h-[650px]">
    
      <h3 className={`text-lg md:text-xl font-semibold mb-4 ${color}`}>
        {title} ({filteredData.length})
      </h3>

     
      <div className="flex flex-wrap gap-2 mb-4 items-center">
      
        <div className="relative w-full sm:w-auto">
          <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!filteredData.length && (
          <p className="text-center text-sm text-gray-400 mt-10">
            No records
          </p>
        )}

        {filteredData.map((r, idx) => {
          const bgColor = cardColors[idx % cardColors.length];

          return (
            <motion.div
              key={`${r._id}-${r.status}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`${bgColor} rounded-xl p-3 shadow-sm`}
            >
              <ReturnRequestCard
                request={r}
                theme={theme}
                onConfirm={onConfirm}
                loadingId={loadingId}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturnColumn;
