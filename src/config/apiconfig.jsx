// src/config/apiConfig.js

// ✅ Base URL (e.g. from environment or hardcoded for now)
export const BASE_URL = "http://localhost:5000/auth/api";

// ✅ Define API endpoint paths here
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/v1/Auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    PROFILE: `${BASE_URL}/auth/profile`,
  },
  USERS: {
    LIST: `${BASE_URL}/users`,
    DETAIL: (id) => `${BASE_URL}/users/${id}`,
  },
  TRANSACTIONS: {
    CREATE: `${BASE_URL}/transactions`,
    HISTORY: `${BASE_URL}/transactions/history`,
  },
  // 🧩 Add more groups as your app grows
};
