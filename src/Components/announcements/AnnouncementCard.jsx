import { FaBell } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";

const AnnouncementCard = ({ announcement }) => {
  const dateObj = new Date(announcement.createdAt);

  const fullDate = dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 px-2 sm:px-0">
      {/* DATE HEADER */}
      <h2 className="text-sm sm:text-base font-semibold text-gray-600 flex items-center gap-2">
        <FaCalendar className="text-blue-600" />
        {fullDate}
      </h2>

      {/* CARD */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-blue-50 border border-blue-100 sm:border-l-4 sm:border-l-blue-600 rounded-xl shadow-sm hover:shadow-md transition">
        {/* ICON */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
          <FaBell className="text-base sm:text-lg" />
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-2 min-w-0">
          {/* TITLE */}
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
            {announcement.title}
          </h3>

          {/* MESSAGE */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
            {announcement.message}
          </p>

          {/* FOOTER */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize font-medium">
              {announcement?.createdBy?.role || "system"}
            </span>

            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
