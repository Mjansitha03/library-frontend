import Api from "./Api";

export const fetchAdminStats = async () => {
  const res = await Api.get("/admin/stats");
  return res.data;
};

export const fetchAdminAnalytics = async () => {
  const res = await Api.get("/admin/analytics");
  return res.data;
};

export const fetchRecentActivity = async (page = 1, limit = 5) => {
  const res = await Api.get(
    `/admin/recent-activity?page=${page}&limit=${limit}`,
  );
  return res.data;
};
