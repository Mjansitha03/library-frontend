import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={14}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

export default RatingStars;
