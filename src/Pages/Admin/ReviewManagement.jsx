import { useEffect, useState, useMemo } from "react";
import api from "../../Services/Api";
import ReviewModeration from "../../Components/admin/ReviewModeration";
import Pagination from "../../Components/Pagination";

const PAGE_LIMIT = 6; // reviews per page

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState("pending"); // "pending" | "approved"
  const [page, setPage] = useState(1);

  const load = async () => {
    const res = await api.get("/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Filter reviews based on selected tab
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) =>
      tab === "approved" ? r.isApproved : !r.isApproved
    );
  }, [reviews, tab]);

  // Pagination logic
  const startIndex = (page - 1) * PAGE_LIMIT;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + PAGE_LIMIT
  );

  // Reset page when tab changes
  useEffect(() => {
    setPage(1);
  }, [tab]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-5">
        {["pending", "approved"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t === "pending" ? "Pending" : "Approved"}
          </button>
        ))}
      </div>

      {/* REVIEWS GRID */}
      {paginatedReviews.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedReviews.map((review) => (
            <ReviewModeration key={review._id} review={review} refresh={load} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No {tab === "approved" ? "approved" : "pending"} reviews available
        </p>
      )}

      {/* PAGINATION */}
      {filteredReviews.length > PAGE_LIMIT && (
        <Pagination
          total={filteredReviews.length}
          page={page}
          setPage={setPage}
          limit={PAGE_LIMIT}
        />
      )}
    </div>
  );
};

export default ReviewManagement;
