import { useEffect, useState } from "react";
import { getAllReservations } from "../../Services/reservationApi";
import { FaBook, FaUser, FaEnvelope, FaClock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { roleTheme } from "../../../Utils/roleTheme";
import Pagination from "../../Components/Pagination";

const theme = roleTheme.librarian;
const LIMIT = 9; 

const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "notified":
      return "bg-blue-100 text-blue-800";
    case "in-progress":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "expired":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const LibrarianReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const loadReservations = async () => {
    try {
      const res = await getAllReservations();
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  
  const filtered = reservations.filter(
    (r) =>
      r.book?.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setPage(1);
  }, [search]);


  const startIndex = (page - 1) * LIMIT;
  const paginatedReservations = filtered.slice(
    startIndex,
    startIndex + LIMIT
  );


  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-[60vh] ${theme.bg}`}
      >
        <ImSpinner2 className={`text-4xl animate-spin ${theme.text}`} />
      </div>
    );
  }

  return (
    <div className={`space-y-6 p-4 sm:p-6 ${theme.bg}`}>
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`text-2xl font-semibold ${theme.text}`}>
          📚 Book Reservations
        </h1>

        <input
          type="text"
          placeholder="Search by book or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border rounded-lg px-3 py-2 w-full sm:w-64
            focus:outline-none focus:ring-2 focus:ring-${theme.ring}`}
        />
      </div>

     
      {paginatedReservations.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No reservations found.
        </p>
      ) : (
        <>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {paginatedReservations.map((r) => (
              <div
                key={r._id}
                className={`bg-white rounded-xl shadow-md border p-4 sm:p-5
                  h-full flex flex-col justify-between
                  hover:shadow-lg transition ${theme.hoverBg}`}
              >
               
                <div className="space-y-4">
                 
                  <div className="flex justify-between items-start gap-3">
                    <h2 className="font-semibold text-base sm:text-lg flex items-start gap-2 break-words">
                      <FaBook className={`${theme.text} mt-1 shrink-0`} />
                      <span className="line-clamp-2">
                        {r.book?.title}
                      </span>
                    </h2>

                    <span
                      className={`px-2 sm:px-3 py-1 text-xs rounded-full
                        font-medium capitalize whitespace-nowrap
                        ${statusColor(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                    <p className="flex items-center gap-2">
                      <FaUser className={`${theme.text} shrink-0`} />
                      <span className="font-medium">User:</span>
                      <span className="truncate">{r.user?.name}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaEnvelope className={`${theme.text} shrink-0`} />
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{r.user?.email}</span>
                    </p>
                  </div>
                </div>

              
                <div className="pt-4 mt-4 border-t text-xs sm:text-sm text-gray-500 space-y-1">
                  <p className="flex items-center gap-2">
                    <FaClock className={`${theme.text} shrink-0`} />
                    <span>
                      Reserved:{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </span>
                  </p>

                  {r.expiresAt && (
                    <p className="text-red-600 font-semibold">
                      Expires:{" "}
                      {new Date(r.expiresAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            total={filtered.length}
            page={page}
            setPage={setPage}
            limit={LIMIT}
          />
        </>
      )}
    </div>
  );
};

export default LibrarianReservation;
