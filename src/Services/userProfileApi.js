import Api from "./Api";

export const getMyProfile = () => Api.get("/users/me");

export const updateMyProfile = (data) =>
  Api.put("/users/me", data);
