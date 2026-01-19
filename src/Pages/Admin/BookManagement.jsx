import { useEffect, useMemo, useState } from "react";
import { getAllBooks } from "../../Services/bookApi";
import BookCard from "../../Components/admin/BookCard";
import AddBookModal from "../../Components/admin/AddBookModal";
import SearchFilterBooks from "../../Components/books/SearchFilterBooks";
import Pagination from "../../Components/Pagination";
import { roleTheme } from "../../../Utils/roleTheme";

const PAGE_LIMIT = 8;

const BookManagement = () => {
  const theme = roleTheme.admin;

  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const fetchBooks = async () => {
    const res = await getAllBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    let data = [...books];

    if (search) {
      data = data.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      data = data.filter((b) =>
        b.genre?.toLowerCase().includes(genre.toLowerCase())
      );
    }

    return data;
  }, [books, search, genre]);

  const startIndex = (page - 1) * PAGE_LIMIT;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + PAGE_LIMIT
  );


  useEffect(() => {
    setPage(1);
  }, [search, genre]);

  return (
    <div className="space-y-6">
     
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">📚 Book Management</h1>
        <button
          onClick={() => setOpen(true)}
          className={`${theme.button} text-white px-4 py-2 rounded-lg`}
        >
          + Add Book
        </button>
      </div>

      {open && (
        <AddBookModal close={() => setOpen(false)} refresh={fetchBooks} />
      )}

    
      <SearchFilterBooks
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
      />

   
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedBooks.length ? (
          paginatedBooks.map((b) => (
            <BookCard key={b._id} book={b} refresh={fetchBooks} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No books found
          </p>
        )}
      </div>

      <Pagination
        total={filteredBooks.length}
        page={page}
        setPage={setPage}
        limit={PAGE_LIMIT}
      />
    </div>
  );
};

export default BookManagement;
