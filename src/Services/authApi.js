import Api from "./Api";

export const signIn = (data) =>
  Api.post("/auth/sign-in", data);

export const signUp = (data) =>
  Api.post("/auth/sign-up", data);

export const forgotPassword = (email) =>
  Api.post("/auth/forgot-password", { email });

export const resetPassword = (id, token, password) =>
  Api.post(`/auth/reset-password/${id}/${token}`, { password });



