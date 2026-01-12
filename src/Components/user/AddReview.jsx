import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../../Services/reviewApi";
import { getAllBooks } from "../../Services/bookApi";

const MAX_CHARS = 500;

const AddReview = ({ onCancel, onSuccess }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadBooks(); }, []);

  const loadBooks = async () => {
    const res = await getAllBooks();
    setBooks(res.data);
  };

  const handleSubmit = async () => {
    if (!book) return alert("Please select a book");
    if (rating === 0) return alert("Please select a rating");

    setLoading(true);
    try {
      await addReview({ book, rating, comment });
      setBook(""); setRating(0); setComment("");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow p-4 sm:p-6 space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Write a Review</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Select Book</label>
        <select
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="w-full border rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a book...</option>
          {books.map((b) => <option key={b._id} value={b._id}>{b.title}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={`cursor-pointer transition-colors ${(hover||rating)>=star ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, MAX_CHARS))}
          rows={4}
          placeholder="Write your thoughts about the book..."
          className="w-full border rounded-lg px-3 sm:px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <div className="text-xs text-gray-400 text-right mt-1">{comment.length}/{MAX_CHARS} characters</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition">Cancel</button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;

