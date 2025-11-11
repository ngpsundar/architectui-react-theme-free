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

export const userKycUploads = async (userId, documentKey, file) => {
  try {
    // ✅ validate inputs
    if (!userId || !documentKey || !file) {
      throw new Error("Missing required parameters for KYC upload.");
    }

    // ✅ create form-data for file upload
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("documentKey", documentKey);
    formData.append("file", file);

    // ✅ make the POST call
    const response = await apiClient.post(
      API_ENDPOINTS.USERS.kycuploads,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ handle response
    const result = handleApiResponse(response);
    console.log("✅ KYC Upload Result:", result);

    if (!result?.data) {
      throw new Error("KYC upload failed. Empty response received.");
    }

    return result.data;
  } catch (error) {
    console.error("❌ User KYC Upload Error:", error);

    // structured error for toast or UI
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "User KYC upload failed.",
    };
  }
};

 export const userKycUploadsChunked = async (
  userId,
  documentKey,
  file,
  chunkSize = 10 * 1024 * 1024, // 10 MB chunks (better for videos)
  maxRetries = 3
) => {
  try {
    if (!userId || !documentKey || !file) {
      throw new Error("Missing required parameters for chunked KYC upload.");
    }

    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadId = null;
    let offset = 0;

    console.log(`🎬 Starting chunked upload for ${file.name} (${totalChunks} chunks)`);

    for (let chunkIndex = 0; offset < file.size; chunkIndex++, offset += chunkSize) {
      const chunk = file.slice(offset, offset + chunkSize);
      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("documentKey", documentKey);
      formData.append("chunkIndex", chunkIndex);
      formData.append("totalChunks", totalChunks);
      formData.append("file", chunk);
 
       if (uploadId) formData.append("uploadId", uploadId);

      // 🔁 Retry logic for unstable networks
      let attempt = 0;
      let success = false;
      while (attempt < maxRetries && !success) {
        try {
          const response = await apiClient.post(
            API_ENDPOINTS.USERS.videokycuploads,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              timeout: 60000, // 1 min per chunk
              onUploadProgress: (progressEvent) => {
                const percent =
                  ((offset + progressEvent.loaded) / file.size) * 100;
                console.log(
                  `📤 Uploading chunk ${chunkIndex + 1}/${totalChunks} (${percent.toFixed(
                    2
                  )}%)`
                );
              },
            }
          );

          const result = handleApiResponse(response);
          if (!uploadId && result?.data?.uploadId) {
            uploadId = result.data.uploadId; // store session ID
          }

          console.log(`✅ Chunk ${chunkIndex + 1}/${totalChunks} uploaded.`);
          success = true;
        } catch (err) {
          attempt++;
          console.warn(
            `⚠️ Retry ${attempt}/${maxRetries} for chunk ${chunkIndex + 1}: ${
              err.message || "unknown error"
            }`
          );
          if (attempt >= maxRetries) throw err;
          await new Promise((res) => setTimeout(res, 2000)); // delay before retry
        }
      }
    }

    // 🔒 Finalize upload session
    console.log("🔒 Finalizing upload...");
    const finalizeResponse = await apiClient.post(
      API_ENDPOINTS.USERS.videokycfinalise,
      { userId, documentKey, uploadId },
      { headers: { "Content-Type": "application/json" } }
    );

    const finalizeResult = handleApiResponse(finalizeResponse);
    if (!finalizeResult?.data) {
      throw new Error("KYC chunked upload finalization failed. Empty response.");
    }

    console.log("🎉 KYC video upload finalized successfully:", finalizeResult.data);
    return finalizeResult.data;
  } catch (error) {
    console.error("❌ User KYC Chunked Upload Error:", error);
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "User KYC chunked upload failed.",
    };
  }
};
