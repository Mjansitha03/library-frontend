import { FaStar, FaTrash, FaEdit, FaBookOpen } from "react-icons/fa";
import { useState } from "react";
import { deleteBook } from "../../Services/bookApi";
import AddBookModal from "./AddBookModal";
import { roleTheme } from "../../../Utils/roleTheme";

const BookCard = ({ book, refresh }) => {
  const theme = roleTheme.admin;
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this book permanently?")) return;
    await deleteBook(book._id);
    refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col">
      <img
        src={book.image || "https://via.placeholder.com/300"}
        alt={book.title}
        className="h-48 w-full object-cover rounded-t-2xl"
      />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold flex items-center gap-2">
          <FaBookOpen className="text-red-600" />
          {book.title}
        </h3>

        <p className="text-sm text-gray-600">{book.author}</p>

        <div className="flex justify-between text-xs mt-2 text-gray-500">
          <span>ISBN: {book.isbn}</span>
          <span>{book.genre}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              book.availableCopies > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.availableCopies > 0 ? "Available" : "Unavailable"}
          </span>

          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar /> {book.averageRating || 0}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className={`${theme.button} flex-1 text-white py-2 rounded-xl flex items-center justify-center gap-2`}
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {editOpen && (
        <AddBookModal
          close={() => setEditOpen(false)}
          refresh={refresh}
          bookData={book}
        />
      )}
    </div>
  );
};

export default BookCard;
