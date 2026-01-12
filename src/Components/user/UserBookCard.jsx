import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import RatingStars from "../books/RatingStars";
import { requestBorrow } from "../../Services/borrowRequestApi";
import { reserveBook } from "../../Services/reservationApi";

const UserBookCard = ({ book, refreshBooks }) => {
  const [loading, setLoading] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [requested, setRequested] = useState(book.requestedByUser || false);

  useEffect(() => {
    // Sync requested state from backend data
    setRequested(book.requestedByUser || false);
  }, [book.requestedByUser]);

  const canBorrow =
    book.availableCopies > 0 && !book.borrowedByUser && !requested && !loading;

  const handleBorrow = async () => {
    if (!canBorrow) return;

    try {
      setLoading(true);
      const res = await requestBorrow(book._id);

      if (res.status === 200 || res.status === 201) {
        setRequested(true); // Lock button for this user
        alert(res.data.message || "Borrow request sent successfully");

        // Refresh books to persist state after success
        if (typeof refreshBooks === "function") {
          refreshBooks();
        }
      } else {
        throw new Error(res.data?.message || "Borrow request failed");
      }
    } catch (err) {
      alert(
        err?.response?.data?.message || err.message || "Borrow request failed"
      );
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

        {/* Borrow Button */}
        <button
          disabled={!canBorrow}
          onClick={handleBorrow}
          className="mt-3 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
        >
          {loading
            ? "Processing..."
            : book.borrowedByUser
            ? "Borrowed"
            : requested
            ? "Requested"
            : "Borrow"}
        </button>

        {/* Reserve Button */}
        {book.availableCopies === 0 && !book.borrowedByUser && !requested && (
          <button
            disabled={loading || reserved}
            onClick={handleReserve}
            className="mt-2 py-2 rounded bg-yellow-500 text-white flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            <FaBookmark />
            {reserved ? "Reserved (24h Hold)" : "Reserve"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserBookCard;
