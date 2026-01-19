import Api from "./Api";

export const getUserStats = () => {
  return Api.get("/user-stats/me");
};
