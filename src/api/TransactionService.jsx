import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { handleApiResponse } from "./apiHandler";

export const getLast5Transactions = async (accountId) => {
  try {
    if (!accountId) throw new Error("Invalid account ID");

    const response = await apiClient.get(
      API_ENDPOINTS.TRANSACTIONS.HISTORY5(accountId)
    );

    const result = handleApiResponse(response);
    console.log("✅ Transactions API result:", result);

    if (!result?.data) {
      throw new Error("No transaction data found.");
    }

    return result.data; // expected shape: { latestTransactions: [...] }
  } catch (error) {
    console.error("Transaction fetch error:", error);
    throw error.response?.data?.message || error.message || "Failed to fetch transactions.";
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.TRANSACTIONS.CREATE,
      transactionData
    );
    return handleApiResponse(response);
  } catch (error) {
    console.error("Create Transaction Error:", error);
    throw error;
  }
};