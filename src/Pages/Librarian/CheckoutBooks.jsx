import { useEffect, useState } from "react";
import { getAllUsers } from "../../Services/userApi";
import { getAllBooks } from "../../Services/bookApi";
import { checkoutBook } from "../../Services/borrowApi";
import { roleTheme } from "../../../Utils/roleTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckoutBooks = () => {
  const theme = roleTheme.librarian;
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [borrowRequestId, setBorrowRequestId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (location.state) {
      setSelectedUser(location.state.userId);
      setSelectedBook(location.state.bookId);
      setBorrowRequestId(location.state.requestId);
    }
  }, [location.state]);

  const loadData = async () => {
    const u = await getAllUsers();
    const b = await getAllBooks();
    setUsers(u.data);
    setBooks(b.data.filter((x) => x.availableCopies > 0));
  };

  const checkout = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await checkoutBook({
        userId: selectedUser,
        bookId: selectedBook,
        borrowRequestId,
      });

      alert("Book checkout successful");

      setSelectedBook("");
      setSelectedUser("");
      setBorrowRequestId(null);

      navigate("/librarian/borrow-request");
    } catch (err) {
      const message = err.response?.data?.message || "Checkout failed";
      alert(message);

      if (message === "Book already borrowed by user") {
        setSelectedBook("");
        setSelectedUser("");
        setBorrowRequestId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-7"
    >
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Checkout Book
        </h2>
        <p className="text-sm text-gray-500">
          Assign a book to a library member
        </p>
      </div>

      {borrowRequestId && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          ✔ Borrow request auto-selected
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Library Member
          </label>
          <select
            className="w-full border p-3 rounded-lg"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Available Book
          </label>
          <select
            className="w-full border p-3 rounded-lg"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            <option value="">Select book</option>
            {books.map((b) => (
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={checkout}
          disabled={!selectedUser || !selectedBook || loading}
          className={`${theme.button} px-8 py-2.5 rounded-lg text-white disabled:opacity-50`}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </motion.div>
  );
};

export default CheckoutBooks;
