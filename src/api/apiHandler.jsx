export const handleApiResponse = (response) => {
  const apiResponse = response?.data ?? response;

  if (!apiResponse) throw new Error("Empty response from API");

  // Map PascalCase -> camelCase
  const success = apiResponse.Success;
  const message = apiResponse.Message;
  const data = apiResponse.Data ?? null;
  const errorCode = apiResponse.ErrorCode ?? null;
  const timestamp = apiResponse.Timestamp ?? new Date().toISOString();

  if (success) {
    return { success, message, data, timestamp };
  } else {
    throw { success, message, errorCode };
  }
};
