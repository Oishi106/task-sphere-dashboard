import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://task-api-eight-flax.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    // Adjust header name if backend expects something different
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

