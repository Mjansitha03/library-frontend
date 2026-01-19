import { requestReturn } from "../../Services/borrowRequestApi";
import { FaClock } from "react-icons/fa";

const BookList = ({ books, refresh }) => {
  const handleReturn = async (borrowId) => {
    try {
      await requestReturn(borrowId);
      alert("Return request sent successfully");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Return request failed");
    }
  };

  if (!books.length)
    return <p className="text-gray-500 text-sm">No books found.</p>;

  return (
    <div className="space-y-4">
      {books.map((b) => {
        const isOverdue = b.dueDate && new Date(b.dueDate) < new Date() && !b.returnDate;

        const showOverdueBadge = isOverdue && !b.finePaid;

        let bgColor = "bg-white";
        if (b.status === "borrowed") bgColor = "bg-green-50";
        if (b.status === "pending-return") bgColor = "bg-yellow-50";

        return (
          <div key={b._id} className="relative">
            {showOverdueBadge && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FaClock size={12} /> Overdue
              </span>
            )}

            <div className={`${bgColor} p-4 rounded-xl shadow flex gap-4`}>
              <img
                src={b.book.image}
                alt={b.book.title}
                className="w-24 h-32 object-cover rounded"
              />

              <div className="flex-1 flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{b.book.title}</h3>
                  <p className="text-sm text-gray-500">{b.book.author}</p>
                  <p className="text-sm mt-1">
                    Due: {new Date(b.dueDate).toDateString()}
                  </p>
                </div>

                {b.status === "borrowed" && b.canReturn && (
                  <button
                    onClick={() => handleReturn(b._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-10 mt-10 rounded"
                  >
                    Return
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
