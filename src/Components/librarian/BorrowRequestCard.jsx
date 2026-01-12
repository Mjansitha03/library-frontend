const BorrowRequestCard = ({ request, onApprove, onReject }) => {
  const r = request;

  const duration =
    r.borrowRef?.borrowDate && r.borrowRef?.returnDate
      ? Math.ceil(
          (new Date(r.borrowRef.returnDate) - new Date(r.borrowRef.borrowDate)) /
            (1000 * 60 * 60 * 24)
        )
      : null;

  const statusConfig = {
    pending: { border: "border-yellow-400", bg: "bg-yellow-50", badge: "bg-yellow-200 text-yellow-800" },
    approved: { border: "border-green-500", bg: "bg-green-50", badge: "bg-green-200 text-green-800" },
    completed: { border: "border-blue-500", bg: "bg-blue-50", badge: "bg-blue-200 text-blue-800" },
    rejected: { border: "border-red-500", bg: "bg-red-50", badge: "bg-red-200 text-red-800" },
  };

  const currentStatus = statusConfig[r.status] || statusConfig.pending;

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-xl shadow-sm hover:shadow-md transition border-l-4 ${currentStatus.border} ${currentStatus.bg}`}
    >
      <h4 className="font-semibold text-base sm:text-lg truncate">{r.book?.title}</h4>

      <p className="text-xs sm:text-sm text-gray-600 truncate">
        {r.user?.name} • {r.user?.email}
      </p>

      <p className="text-xs text-gray-400">
        Requested: {new Date(r.createdAt).toLocaleString()}
      </p>

      {r.approvedAt && (
        <p className="text-xs text-green-600">
          Approved: {new Date(r.approvedAt).toLocaleString()} <br />
          By: {r.approvedBy?.name}
        </p>
      )}

      {duration && <p className="text-xs text-blue-600">Borrow Duration: {duration} days</p>}

      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded ${currentStatus.badge} w-fit`}
      >
        {r.status.toUpperCase()}
      </span>

      {r.status === "pending" && (
        <div className="mt-2 flex flex-wrap gap-2">
          {onApprove && (
            <button
              onClick={() => onApprove(r)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              Approve & Checkout
            </button>
          )}
          {onReject && (
            <button
              onClick={() => onReject(r)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
            >
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowRequestCard;
