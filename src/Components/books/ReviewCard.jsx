import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RatingStars from "../books/RatingStars";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const [showFull, setShowFull] = useState(false);
  const maxLength = 150;

  const comment = review.comment || "";
  const isLong = comment.length > maxLength;
  const text = showFull ? comment : comment.slice(0, maxLength);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border shadow-sm hover:shadow-lg
                 transition p-4 sm:p-5 flex flex-col h-full"
    >
      <div className="mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
          {review.book?.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          by {review.book?.author}
        </p>
      </div>

      <div className="relative flex-1">
        <FaQuoteLeft className="absolute -top-1 -left-1 text-gray-200 text-xl" />

        <AnimatePresence mode="wait">
          <motion.p
            key={showFull ? "full" : "short"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm sm:text-base text-gray-700 leading-relaxed break-words pl-5"
          >
            {text}
            {isLong && (
              <span
                onClick={() => setShowFull(!showFull)}
                className="text-blue-600 cursor-pointer ml-1 font-medium hover:underline"
              >
                {showFull ? " Read less" : "... Read more"}
              </span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600
                          flex items-center justify-center text-white font-bold uppercase shadow-sm">
            {review.user?.name?.charAt(0)}
          </div>

          <span className="text-sm font-medium text-gray-800 truncate">
            {review.user?.name}
          </span>
        </div>

        <RatingStars rating={review.rating} />
      </div>
    </motion.div>
  );
};

export default ReviewCard;
