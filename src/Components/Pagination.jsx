import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ total, page, setPage, limit = 10 }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const getVisiblePages = () => {
    const maxVisible = totalPages <= 3 ? totalPages : 3;
    let start = Math.max(page - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1
          ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        <FaChevronLeft />
        Prev
      </button>

      {getVisiblePages().map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`min-w-[40px] px-3 py-2 rounded-lg border text-sm transition
            ${
              p === page
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-gray-100"
            }
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-1
          ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }
        `}
      >
        Next
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
