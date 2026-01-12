const NotificationOverlay = ({ notification, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          ✖
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 break-words">
          {notification.title}
        </h3>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {notification.message}
        </p>

        <div className="mt-6 text-xs text-gray-400 flex justify-between">
          <span className="capitalize">
            From {notification.createdBy?.role || "Admin"}
          </span>
          <span>{new Date(notification.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationOverlay;
