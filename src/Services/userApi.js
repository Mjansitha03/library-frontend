import Api from "./Api";

// Get all users (admin)
export const getAllUsers = () => Api.get("/users");

// Update user role (admin)
export const updateUserRole = (userId, role) =>
  Api.put(`/users/${userId}/role`, { role });

// Delete user (admin)
export const deleteUser = (userId) => Api.delete(`/users/${userId}`);
  