const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL 

const getAccessToken = () => localStorage.getItem("vendorbridge.accessToken");

const request = async (path, options = {}) => {
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = isFormData
    ? { ...(options.headers || {}) }
    : {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };

  const token = getAccessToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Debug logging for failed requests
    try {
      // Show request details
      // eslint-disable-next-line no-console
      console.error("API Request Failed:", {
        url: `${API_BASE_URL}${path}`,
        method: (options && options.method) || "GET",
        headers,
        body: options && options.body,
        status: response.status,
        response: payload,
      });
    } catch (e) {
      // ignore logging errors
    }

    const message = payload?.message || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export { API_BASE_URL, request, getAccessToken };
