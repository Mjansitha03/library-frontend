// import { useEffect, useState } from "react";
// import { getAllBooks } from "../Services/bookApi.js";
// import { getMyBorrowedBooks } from "../Services/borrowApi.js";
// import Pagination from "../Components/Pagination";
// import UserBookCard from "../Components/user/UserBookCard";

// const LIMIT = 8;

// const BookPage = () => {
//   const [books, setBooks] = useState([]);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const fetchBooks = async () => {
//   try {
//     setLoading(true);

//     const [bookRes, borrowRes] = await Promise.all([
//       getAllBooks(),
//       getMyBorrowedBooks(),
//     ]);

//     // Filter out invalid borrowed books and get their IDs
//     const borrowedIds = borrowRes.data
//       .filter((b) => b && b._id)
//       .map((b) => b._id.toString());

//     const updatedBooks = bookRes.data.map((book) => ({
//       ...book,
//       requestedByUser: borrowedIds.includes(book._id?.toString()),
//     }));

//     setBooks(updatedBooks);
//     setBorrowedBooks(borrowRes.data);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const start = (page - 1) * LIMIT;
//   const paginatedBooks = books.slice(start, start + LIMIT);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         Loading books...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
//       <h2 className="text-3xl font-bold text-center mb-6">Library Books</h2>

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {paginatedBooks.map((book) => (
//           <UserBookCard
//             key={book._id}
//             book={book}
//             refreshBooks={fetchBooks} // persist requested state
//           />
//         ))}
//       </div>

//       {books.length > LIMIT && (
//         <Pagination
//           total={books.length}
//           page={page}
//           setPage={setPage}
//           limit={LIMIT}
//         />
//       )}
//     </div>
//   );
// };

// export default BookPage;


// BookPage.jsx
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
        getMyBorrowRequests(), // fetch all borrow requests for current user
      ]);

      const userRequests = requestsRes.data
        .filter(r => r.type === "borrow" && r.status === "pending") // only pending borrows
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
