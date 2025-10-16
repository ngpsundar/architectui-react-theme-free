import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { handleApiResponse } from "./apiHandler";

export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
    });

    const result = handleApiResponse(response);
    console.log("✅ Full API result:", result);

    // If backend sent token inside `result.data`
    if (!result.data) {
      throw new Error("Login response missing token data.");
    }

    return result.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.message
      ? error
      : { message: error.response?.data?.message || "Login failed." };
  }
};
