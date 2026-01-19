import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import RatingStars from "../books/RatingStars";

const MyReviewCard = ({ review, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 140;
  const comment = review.comment || "";
  const isLong = comment.length > MAX_LENGTH;
  const text = expanded ? comment : comment.slice(0, MAX_LENGTH);

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        transition
        p-4 sm:p-5
        flex flex-col
        h-full
      "
    >
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
          {review.book?.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mb-2 truncate">
          by {review.book?.author}
        </p>

        <div className="mb-3">
          <RatingStars rating={review.rating} />
        </div>

        <p className="text-gray-700 text-sm leading-relaxed break-words">
          {text}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-blue-600 font-medium hover:underline whitespace-nowrap"
            >
              {expanded ? "Read less" : "...Read more"}
            </button>
          )}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t flex justify-end">
        <button
          onClick={() => onDelete(review._id)}
          className="
            flex items-center gap-2
            text-xs sm:text-sm
            px-3 sm:px-4 py-2
            rounded-lg
            bg-red-50 text-red-600
            hover:bg-red-600 hover:text-white
            transition
          "
        >
          <FaTrash className="text-sm" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyReviewCard;
