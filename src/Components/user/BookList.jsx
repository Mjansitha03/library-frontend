import { requestReturn } from "../../Services/borrowRequestApi";
import { FaClock } from "react-icons/fa";

const BookList = ({ books, pending = false, refresh }) => {
  const handleReturn = async (borrowId) => {
    await requestReturn(borrowId);
    alert("Return request sent successfully");
    refresh();
  };

  if (!books.length)
    return <p className="text-gray-500 text-sm">No books found.</p>;

  return (
    <div className="space-y-4">
      {books.map((b) => {
        const isOverdue =
          b.dueDate && new Date(b.dueDate) < new Date() && !b.returnDate; // overdue if past due date and not returned

        // Determine background based on status
        let bgColor = "bg-white";
        if (b.status === "borrowed") bgColor = "bg-green-50"; // active borrow
        if (b.status === "pending-return") bgColor = "bg-yellow-50"; // pending return

        return (
          <div key={b._id} className="relative">
            {/* OVERDUE BADGE */}
            {isOverdue && (
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

                {!pending && (
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
