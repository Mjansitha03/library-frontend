import { useEffect, useState } from "react";
import { getBorrowHistory } from "../../Services/borrowApi";
import { FaCheckCircle } from "react-icons/fa";

const BorrowHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getBorrowHistory().then((res) =>
      setHistory(res.data || [])
    );
  }, []);

  if (!history.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No history found
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Borrow History
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((b) => (
          <div key={b._id} className="bg-white rounded-xl shadow">
            <img
              src={b.book?.image}
              alt={b.book?.title || "Book"}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">
                {b.book?.title || "Book unavailable"}
              </h3>

              <p className="text-sm text-gray-500">
                {b.book?.author || "—"}
              </p>

              <span className="inline-flex items-center gap-1 mt-3 text-sm text-green-700">
                <FaCheckCircle />
                {b.lateFee > 0 ? "Returned (Late)" : "Returned"}
              </span>

              <p className="text-sm mt-2">
                {b.returnDate
                  ? new Date(b.returnDate).toDateString()
                  : "—"}
              </p>

              {b.lateFee > 0 && (
                <p className="text-red-600 font-medium">
                  Fine: ₹{b.lateFee}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowHistory;
