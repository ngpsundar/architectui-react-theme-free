import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { handleApiResponse } from "./apiHandler";

export const getallNotifications = async (userId, pageNumber = 1, pageSize = 10, sortBy = "createdAt", sortDesc = true) => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.NOTIFICATIONS.LIST(userId),
      { params: { pageNumber, pageSize, sortBy, sortDesc } }
    );
    const result = handleApiResponse(response);
    return result.data; // should include notifys array
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const updateNotifications = async ( id) => {
  try {
    const response = await apiClient.put(
      `${API_ENDPOINTS.NOTIFICATIONS.UPDATEO}/${id}`
    );
    const result = handleApiResponse(response);
    return result.data;
  } catch (error) {
    console.error("Update Notifications Error:", error);
    throw error;
  }
};

export const updateManyNotifications = async (notificationData) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.NOTIFICATIONS.UPDATEM,
      notificationData
    );
   const result = handleApiResponse(response);
    return result.data;
  } catch (error) {
    console.error("Update Notifications Error:", error);
    throw error;
  }
};