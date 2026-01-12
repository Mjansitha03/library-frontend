import Api from "./Api";

/* ================= ADMIN STATS ================= */
export const fetchAdminStats = async () => {
  const res = await Api.get("/admin/stats");
  return res.data; // ✅ FIX: return data only
};

/* ================= ADMIN ANALYTICS ================= */
export const fetchAdminAnalytics = async () => {
  const res = await Api.get("/admin/analytics");
  return res.data; // ✅ FIX
};

/* ================= RECENT ACTIVITY ================= */
export const fetchRecentActivity = async (page = 1, limit = 5) => {
  const res = await Api.get(
    `/admin/recent-activity?page=${page}&limit=${limit}`
  );
  return res.data; // ✅ FIX
};
