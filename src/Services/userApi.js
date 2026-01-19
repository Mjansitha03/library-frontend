import Api from "./Api";

export const getAllUsers = () => Api.get("/users");

export const updateUserRole = (userId, role) =>
  Api.put(`/users/${userId}/role`, { role });

export const deleteUser = (userId) => Api.delete(`/users/${userId}`);
