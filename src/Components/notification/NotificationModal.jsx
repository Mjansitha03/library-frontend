import {
  FaExclamationCircle,
  FaCalendarAlt,
  FaBullhorn,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import {
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
} from "../../Services/notificationApi";

const NotificationModal = ({ notifications, onClose, onSelect, refresh }) => {
  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  const getStyle = (title = "") => {
    const t = title.toLowerCase();

    if (t.includes("overdue"))
      return { icon: <FaExclamationCircle className="text-red-600" /> };

    if (t.includes("reminder"))
      return { icon: <FaCalendarAlt className="text-yellow-600" /> };

    return { icon: <FaBullhorn className="text-blue-600" /> };
  };

  const openNotification = async (n) => {
    if (!n.isRead) {
      await markNotificationRead(n._id);
      refresh();
    }
    onSelect(n);
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    refresh();
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    await clearAllNotifications();
    refresh();
  };

  const NotificationItem = ({ n }) => {
    const s = getStyle(n.title);
    const isUnread = !n.isRead;

    return (
      <div
        onClick={() => openNotification(n)}
        className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition
          ${isUnread ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}
          hover:shadow-md`}
      >
        {/* ICON */}
        <div className="flex-shrink-0 mt-1">
          {isUnread ? s.icon : <FaCheckCircle className="text-gray-400" />}
        </div>

        {/* TEXT */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {/* 🔵 UNREAD DOT */}
            {isUnread && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}

            <h4
              className={`truncate ${
                isUnread
                  ? "font-semibold text-gray-900"
                  : "font-medium text-gray-700"
              }`}
            >
              {n.title}
            </h4>
          </div>

          {/* ONE LINE MESSAGE */}
          <p
            className={`text-sm truncate ${
              isUnread ? "text-gray-800" : "text-gray-500"
            }`}
          >
            {n.message}
          </p>

          {n.message.length > 60 && (
            <span className="text-xs text-blue-600 font-medium">
              Read more →
            </span>
          )}

          <p className="text-xs text-gray-400 mt-1">
            {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* PANEL */}
      <div className="relative h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Notifications
          </h2>

          <div className="flex gap-4 text-sm">
            {unread.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-blue-600 hover:underline"
              >
                Mark all read
              </button>
            )}

            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <FaTrash size={12} /> Clear
              </button>
            )}

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {unread.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-gray-400 mb-3">
                UNREAD
              </p>
              <div className="space-y-3">
                {unread.map((n) => (
                  <NotificationItem key={n._id} n={n} />
                ))}
              </div>
            </section>
          )}

          {read.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-gray-400 mb-3">
                READ
              </p>
              <div className="space-y-3">
                {read.map((n) => (
                  <NotificationItem key={n._id} n={n} />
                ))}
              </div>
            </section>
          )}

          {notifications.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-10">
              🎉 You’re all caught up!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
