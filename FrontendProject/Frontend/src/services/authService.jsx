import apiClient from "./apiClient"; // ✅ Correct import

const API_URL = "/auth"; // ✅ Fix: Avoid duplicate `/api`

// ✅ Login function
export const login = async (credentials) => {
  try {
    const response = await apiClient.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Login failed");
  }
};

// ✅ Register function
export const register = async (userData) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Registration failed");
  }
};

// ✅ Logout function
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect user to login page
};
