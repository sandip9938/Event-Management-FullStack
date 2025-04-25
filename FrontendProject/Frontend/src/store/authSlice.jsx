import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/apiClient";

// ✅ Store user in localStorage for persistence
const storeUser = (userData) => localStorage.setItem("user", JSON.stringify(userData));
const removeUser = () => localStorage.removeItem("user");

// ✅ Safely retrieve user from localStorage (if exists)
const initialUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
})();

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userData); // ✅ Fixed API call
      storeUser(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Async thunk for register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("api/auth/register", userData); // ✅ Fixed API call
      storeUser(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: initialUser, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      removeUser(); // Clear user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export `logout` action
export const { logout } = authSlice.actions;

// ✅ Export reducer
export default authSlice.reducer;
