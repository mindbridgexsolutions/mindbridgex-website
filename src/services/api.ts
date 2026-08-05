import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding authorization tokens in future updates
API.interceptors.request.use(
  (config) => {
    // You can attach JWT bearer tokens here when user login session is active
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;