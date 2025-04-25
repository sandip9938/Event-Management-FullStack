import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../services/eventService"; // ✅ Correct import

// ✅ Fetch all events (Async Thunk)
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, thunkAPI) => {
    try {
      const events = await getEvents();
      return events;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch events");
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Add sync reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null; // ✅ Clear previous errors
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // ✅ Corrected error handling
      });
  },
});

// ✅ Export reducer
export default eventSlice.reducer;
