import { useState, useEffect } from "react";
import Api from "../../Services/Api";

const SearchFilterBooks = ({ search, setSearch, genre, setGenre }) => {
  const [books, setBooks] = useState([]);
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    Api.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search by title, author, ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Genres</option>
          {[...new Set(books.map((b) => b.genre))].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Years</option>
          {[...new Set(books.map((b) => b.publicationYear))].sort((a,b)=>b-a).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default SearchFilterBooks;
