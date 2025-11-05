// src/config/apiConfig.js

// ✅ Base URL (e.g. from environment or hardcoded for now)
export const BASE_URL = "http://localhost:5000/";

// ✅ Define API endpoint paths here
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}auth/api/v1/Auth/login`,
    REGISTER: `${BASE_URL}auth/api/v1/Auth/register`,
    LOGOUT: `${BASE_URL}auth/api/v1/Auth/logout`,
    PROFILE: `${BASE_URL}auth/api/v1/Auth/profile`,
  },
  USERS: {
    LIST: `${BASE_URL}users`,
    DETAIL: (id) => `${BASE_URL}account/api/v1/Account/user/${id}`,
    mobileUpdate: (id) => `${BASE_URL}account/api/v1/Account/mobile/${id}`,
    emailUpdate: (id) => `${BASE_URL}account/api/v1/Account/email/${id}`,
    kyclist: (id) => `${BASE_URL}account/api/v1/Account/userkyc/${id}`,
  },
  TRANSACTIONS: {
    CREATE: `${BASE_URL}transaction/api/v1/Transactions/create`,
    HISTORY5: (accountID) => `${BASE_URL}transaction/api/v1/Transactions/accTran/${accountID}`,
  },
  NOTIFICATIONS: {
     LIST: (userId, pageNumber = 1, pageSize = 10, sortBy = "createdAt", sortDesc = true) =>
    `${BASE_URL}reporting/api/v1/Notifications/GetNotifications/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDesc=${sortDesc}`,
    UPDATEO: `${BASE_URL}reporting/api/v1/Notifications/mark-read`,
    UPDATEM: `${BASE_URL}reporting/api/v1/Notifications/mark-many-read`,
  },
  // 🧩 Add more groups as your app grows
};
