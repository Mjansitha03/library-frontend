import { useEffect, useState } from "react";
import { getAllApprovedReviews } from "../Services/reviewApi";
import ReviewCard from "../Components/books/ReviewCard";
import Pagination from "../Components/Pagination";

const LIMIT = 8;

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await getAllApprovedReviews();
        setReviews(res.data);
        setPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const start = (page - 1) * LIMIT;
  const paginated = reviews.slice(start, start + LIMIT);

  return (
    <div
      className="
        max-w-7xl mx-auto
        px-6 py-10
        min-h-screen
      "
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        All Reviews
      </h2>

      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginated.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>

          {reviews.length > LIMIT && (
            <Pagination
              total={reviews.length}
              page={page}
              setPage={setPage}
              limit={LIMIT}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllReviews;
