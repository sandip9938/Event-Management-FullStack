import axios from "axios";

// ✅ Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: "http://localhost:8091/backend", // Adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Important for authentication & CORS handling
});

// ✅ Interceptor to attach Authorization token to every request (if available)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return config;
});

export default apiClient;
