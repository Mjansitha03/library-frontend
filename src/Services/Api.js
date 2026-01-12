import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/sign-in";
    }
    return Promise.reject(err);
  }
);

export default Api;
