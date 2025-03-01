import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change to 5000
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Add interceptor to include token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request config:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
  });
  return config;
});

// Add response interceptor for error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Request was made and server responded with status code
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request Error:", error.request);
    } else {
      // Error occurred while setting up request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
