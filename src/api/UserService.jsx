import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { handleApiResponse } from "./apiHandler";

export const userinfodetails = async (_userid) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USERS.DETAIL(_userid), {
      _userid
    });

    const result = handleApiResponse(response);
    console.log("✅ Full API result:", result);

    // If backend sent token inside `result.data`
    if (!result.data) {
      throw new Error("User INfor fetched succesfully.");
    }

    return result.data;
  } catch (error) {
    console.error("UserINfor Error:", error);
    throw error.message
      ? error
      : { message: error.response?.data?.message || "UserInfo Feteching failed." };
  }
};

// ✅ Update Mobile API
export const updateMobile = async (userId, mobileNumber) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.USERS.mobileUpdate(userId), 
      { value: mobileNumber }
    );

    const result = handleApiResponse(response);
    console.log("✅ Mobile update response:", result);
    return result.data;
  } catch (error) {
    console.error("❌ Mobile update failed:", error);
    throw error.message
      ? error
      : { message: error.response?.data?.message || "Failed to update mobile number." };
  }
};

// ✅ Update Email API
export const updateEmail = async (userId, email) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.USERS.emailUpdate(userId), 
      { value: email }
    );

    const result = handleApiResponse(response);
    console.log("✅ Email update response:", result);
    return result.data;
  } catch (error) {
    console.error("❌ Email update failed:", error);
    throw error.message
      ? error
      : { message: error.response?.data?.message || "Failed to update email address." };
  }
};
export const userkycdetails = async (_userid) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USERS.kyclist(_userid), {
      _userid
    });

    const result = handleApiResponse(response);
    console.log("✅ Full API result:", result);

    if (!result.data) {
      throw new Error("User KYC fetched successfully.");
    }

    return result.data;
  } catch (error) {
    console.error("User KYC Error:", error);
    throw error.message
      ? error
      : { message: error.response?.data?.message || "User KYC fetching failed." };
  }
};