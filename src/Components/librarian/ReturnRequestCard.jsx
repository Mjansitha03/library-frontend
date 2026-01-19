import { motion } from "framer-motion";

const ReturnRequestCard = ({ request, theme, onConfirm, loadingId }) => {
  const r = request;

  const statusConfig = {
    pending: {
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      badge: "bg-yellow-200 text-yellow-800",
    },
    completed: {
      bg: "bg-green-50",
      border: "border-green-500",
      badge: "bg-green-200 text-green-800",
    },
    rejected: {
      bg: "bg-red-50",
      border: "border-red-500",
      badge: "bg-red-200 text-red-800",
    },
  };
  const currentStatus = statusConfig[r.status] || statusConfig.pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col sm:flex-row gap-4 items-center p-4 rounded-xl shadow-sm hover:shadow-md transition border-l-4 ${currentStatus.border} ${currentStatus.bg}`}
    >
      <img
        src={r.book?.image}
        alt={r.book?.title}
        className="w-20 h-28 object-cover rounded"
      />

      <div className="flex-1 space-y-1 text-center sm:text-left">
        <h4 className="font-semibold truncate">{r.book?.title}</h4>

        <p className="text-sm text-gray-600">
          User: <span className="font-medium">{r.user?.name}</span>
        </p>

        <p className="text-xs text-gray-500">
          Requested: {new Date(r.createdAt).toLocaleString()}
        </p>

        {r.approvedAt && (
          <p className="text-xs text-green-600">
            Librarian confirmed: {new Date(r.approvedAt).toLocaleString()}
          </p>
        )}

        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${currentStatus.badge} w-fit`}
        >
          {r.status.toUpperCase()}
        </span>
      </div>

      {r.status === "pending" ? (
        <button
          disabled={loadingId === r._id}
          onClick={() => onConfirm(r._id)}
          className={`px-4 py-2 rounded-lg text-white text-sm w-full sm:w-auto mt-2 sm:mt-0 ${
            loadingId === r._id
              ? "bg-gray-400 cursor-not-allowed"
              : theme.button
          }`}
        >
          {loadingId === r._id ? "Processing..." : "Confirm"}
        </button>
      ) : (
        <span className="text-green-600 font-medium text-sm mt-2 sm:mt-0">
          ✔ Completed
        </span>
      )}
    </motion.div>
  );
};

export default ReturnRequestCard;
