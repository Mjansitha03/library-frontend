import Api from "./Api";

export const getNotifications = async () => {
  const res = await Api.get("/notifications");
  return res.data;
};

export const markNotificationRead = async (id) => {
  const res = await Api.put(`/notifications/${id}`);
  return res.data;
};

export const markAllNotificationsRead = async () => {
  const res = await Api.patch("/notifications/mark-all-read");
  return res.data;
};

export const clearAllNotifications = async () => {
  const res = await Api.delete("/notifications/clear");
  return res.data;
};
