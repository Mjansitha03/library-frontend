import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import RatingStars from "../books/RatingStars";
import { requestBorrow } from "../../Services/borrowRequestApi";
import { reserveBook } from "../../Services/reservationApi";

const UserBookCard = ({ book, refreshBooks }) => {
  const [loading, setLoading] = useState(false);
  const [reserved, setReserved] = useState(book.reservedByUser || false);
  const [requested, setRequested] = useState(book.requestedByUser || false);

  useEffect(() => {
    setRequested(book.requestedByUser || false);
    setReserved(book.reservedByUser || false);
  }, [book]);

  const canBorrow =
    !loading &&
    !requested &&
    !book.borrowedByUser &&
    (book.availableCopies > 0 || book.reservationStatus === "notified");

  const handleBorrow = async () => {
    if (!canBorrow) return;

    try {
      setLoading(true);
      const res = await requestBorrow(book._id);
      alert(res.data.message || "Borrow request sent");

      if (typeof refreshBooks === "function") {
        refreshBooks();
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Borrow failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    if (reserved || loading) return;

    try {
      setLoading(true);
      await reserveBook(book._id);
      setReserved(true);
      alert("Book reserved successfully");

      if (typeof refreshBooks === "function") {
        refreshBooks();
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <img
        src={book.image}
        alt={book.title}
        className="h-60 w-full object-cover rounded"
      />

      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <RatingStars rating={book.averageRating || 0} />
          <p className="text-sm mt-2">
            Available: <b>{book.availableCopies}</b>
          </p>
        </div>

        <button
          disabled={!canBorrow}
          onClick={handleBorrow}
          className={`mt-3 py-2 rounded text-white ${
            canBorrow
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {requested
            ? "Requested"
            : book.reservationStatus === "notified"
            ? "Borrow (Reserved)"
            : book.availableCopies === 0
            ? "Unavailable"
            : "Borrow"}
        </button>

        {book.availableCopies === 0 && !book.borrowedByUser && !requested && (
          <button
            disabled={reserved || loading}
            onClick={handleReserve}
            className="mt-2 py-2 rounded bg-yellow-500 text-white flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            <FaBookmark />
            {reserved ? "Reserved" : "Reserve"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserBookCard;
