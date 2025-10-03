import axios from "axios";

const api = axios.create({
  baseURL: "https://academiq-api-latest.onrender.com:8080",
  // Backend Spring Boot API runs on port 8080 with /api prefix
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const user = JSON.parse(userDetails);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear user data
      localStorage.removeItem("userDetails");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
