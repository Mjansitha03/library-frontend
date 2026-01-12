import { useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import Api from "../Services/Api";


const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await Api.get("/notifications");
      const data = Array.isArray(res.data) ? res.data : res.data.notifications || [];

      // Map to include title and createdBy for modal overlay
      setNotifications(
        data.map((n) => ({
          _id: n._id,
          message: n.message,
          title: n.title || "Announcement",
          createdBy: n.createdBy || null,
          isRead: n.isRead,
          createdAt: n.createdAt,
        }))
      );
    } catch (err) {
      console.error("Notification fetch failed", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await Api.put(`/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Mark read failed", err);
    }
  };

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    // Admin doesn't need notifications
    if (user.role === "admin") {
      setNotifications([]);
      setLoading(false);
      return;
    }

    fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        fetchNotifications,
        markAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;