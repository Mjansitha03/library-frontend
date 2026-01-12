import Api from "./Api";

// USER DASHBOARD STATS
export const getUserStats = () => {
  return Api.get("/user-stats/me");
};
