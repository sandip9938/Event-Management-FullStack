import apiClient from "./apiClient"; // ✅ Correct import

const API_URL = "/events"; // ✅ Fix: Avoid duplicate `/api`

/**
 * Fetches all events from the backend.
 * @returns {Promise<Array>} - List of events
 */
export const getEvents = async () => {
  try {
    const response = await apiClient.get(API_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Failed to fetch events");
  }
};

/**
 * Creates a new event.
 * @param {Object} eventData - The data for the new event
 * @returns {Promise<Object>} - Created event details
 */
export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Failed to create event");
  }
};

/**
 * Updates an existing event.
 * @param {string} eventId - The ID of the event to update
 * @param {Object} updatedData - The updated event data
 * @returns {Promise<Object>} - Updated event details
 */
export const updateEvent = async (eventId, updatedData) => {
  try {
    const response = await apiClient.put(`${API_URL}/${eventId}`, updatedData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Failed to update event");
  }
};

/**
 * Deletes an event.
 * @param {string} eventId - The ID of the event to delete
 * @returns {Promise<string>} - Deleted event's ID (useful for UI state updates)
 */
export const deleteEvent = async (eventId) => {
  try {
    await apiClient.delete(`${API_URL}/${eventId}`);
    return eventId;
  } catch (error) {
    return Promise.reject(error.response?.data?.message || "Failed to delete event");
  }
};
