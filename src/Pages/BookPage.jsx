import { useState, useEffect } from "react";
import { getAllBooks } from "../Services/bookApi.js";
import { getMyBorrowRequests } from "../Services/borrowRequestApi.js";
import Pagination from "../Components/Pagination";
import UserBookCard from "../Components/user/UserBookCard";

const LIMIT = 8;

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const [booksRes, requestsRes] = await Promise.all([
        getAllBooks(),
        getMyBorrowRequests(), 
      ]);

      const userRequests = requestsRes.data
        .filter(r => r.type === "borrow" && r.status === "pending") 
        .map(r => r.book._id.toString());

      const updatedBooks = booksRes.data.map(book => ({
        ...book,
        requestedByUser: userRequests.includes(book._id.toString()),
      }));

      setBooks(updatedBooks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const start = (page - 1) * LIMIT;
  const paginatedBooks = books.slice(start, start + LIMIT);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Library Books</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedBooks.map(book => (
          <UserBookCard key={book._id} book={book} refreshBooks={fetchBooks} />
        ))}
      </div>
      {books.length > LIMIT && (
        <Pagination total={books.length} page={page} setPage={setPage} limit={LIMIT} />
      )}
    </div>
  );
};

export default BookPage;
