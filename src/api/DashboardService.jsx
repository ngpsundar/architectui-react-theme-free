import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { handleApiResponse } from "./apiHandler";

export const getdashboardsummary = async () => {
  try {

    const response = await apiClient.get(
      API_ENDPOINTS.DASHBOARD.getSummaryAdmin
    );

    const result = handleApiResponse(response);
    console.log("✅ Dashboard Summary API result:", result);

    if (!result?.data) {
      throw new Error("No dashboard summary data found.");
    }

    return result.data; // expected shape: { latestTransactions: [...] }
  } catch (error) {
    console.error("Dashboard Summary fetch error:", error);
    throw error.response?.data?.message || error.message || "Failed to fetch dashboard summary.";
  }
};


export const getTransactionsdashboardsummary = async () => {
  try {

    const response = await apiClient.get(
      API_ENDPOINTS.DASHBOARD.gettransacttypes
    );

    const result = handleApiResponse(response);
    console.log("✅ Dashboard Summary API result:", result);

    if (!result?.data) {
      throw new Error("No dashboard summary data found.");
    }

    return result.data; // expected shape: { latestTransactions: [...] }
  } catch (error) {
    console.error("Dashboard Summary fetch error:", error);
    throw error.response?.data?.message || error.message || "Failed to fetch dashboard summary.";
  }
};


export const getaccountdetailsbyID = async (accountId) => {
  try {

    const response = await apiClient.get(
      `${API_ENDPOINTS.DASHBOARD.getaccoundetailsbyID}/${accountId}`
    );

    const result = handleApiResponse(response);
    console.log("✅ account details Summary API result:", result);

    if (!result?.data) {
      throw new Error("No account details data found.");
    }

    return result.data; // expected shape: { latestTransactions: [...] }
  } catch (error) {
    console.error("Dashboard Summary fetch error:", error);
    throw error.response?.data?.message || error.message || "Failed to fetch dashboard summary.";
  }
};

 