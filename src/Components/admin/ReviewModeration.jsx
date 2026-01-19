import { useState } from "react";
import { approveReview, deleteReview } from "../../Services/reviewApi";
import { roleTheme } from "../../../Utils/roleTheme";
import RatingStars from "../books/RatingStars";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const ReviewModeration = ({ review, refresh }) => {
  const theme = roleTheme.admin;
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const MAX_LENGTH = 150;
  const isLong = review.comment?.length > MAX_LENGTH;
  const preview = isLong
    ? review.comment.slice(0, MAX_LENGTH) + "..."
    : review.comment;

  const handleApprove = async () => {
    setLoading(true);
    await approveReview(review._id);
    refresh();
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteReview(review._id);
    refresh();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div>
        <h4 className="font-semibold text-gray-900 line-clamp-1">
          {review.book?.title}
        </h4>
        <p className="text-xs text-gray-500 mb-2 truncate">
          by {review.book?.author}
        </p>
      </div>

      <RatingStars rating={review.rating} />

      <p className="text-sm text-gray-700 mt-3 leading-relaxed break-words flex-1">
        {expanded ? review.comment : preview}
        {isLong && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 cursor-pointer ml-1 font-medium hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </span>
        )}
      </p>

      <span
        className={`inline-block mt-4 text-xs font-medium px-3 py-1 rounded-full w-fit
          ${
            review.isApproved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }
        `}
      >
        {review.isApproved ? "Approved" : "Pending Approval"}
      </span>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        {!review.isApproved && (
          <button
            onClick={handleApprove}
            disabled={loading}
            className={`${theme.button} text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-60`}
          >
            <FaCheckCircle />
            Approve
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-60"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewModeration;
