import { FaBell } from "react-icons/fa";
import { useState } from "react";
import { useNotifications } from "../../Context/NotificationContext";
import NotificationModal from "./NotificationModal";
import NotificationOverlay from "./NotificationOverlay";

const NotificationBell = () => {
  const { notifications, unreadCount, fetchNotifications } =
    useNotifications();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Notifications"
      >
        <FaBell size={18} className="text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setOpen(false)}
          onSelect={(notif) => setSelected(notif)}
          refresh={fetchNotifications}
        />
      )}

      {selected && (
        <NotificationOverlay
          notification={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

export default NotificationBell;
