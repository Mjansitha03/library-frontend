import { useEffect, useState } from "react";
import { getMyReviews, deleteReview } from "../../Services/reviewApi";
import MyReviewCard from "../../Components/user/MyReviewCard";
import AddReview from "../../Components/user/AddReview";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const res = await getMyReviews();
      setReviews(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReviews(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview(id);
    loadReviews();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
          My Reviews
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Review
        </button>
      </div>

      {showAdd && (
        <AddReview
          onCancel={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            loadReviews();
          }}
        />
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {reviews.map(r => (
            <MyReviewCard
              key={r._id}
              review={r}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;



