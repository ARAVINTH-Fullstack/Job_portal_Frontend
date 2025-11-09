import axios from "axios";

const BASE_URL = "https://talentbridge-w9yv.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // optional: prevent hanging requests
});

// 🟢 REQUEST INTERCEPTOR: attach correct token based on current_user_type
axiosInstance.interceptors.request.use(
  (config) => {
    // Use the explicitly saved current user type
    const userType = localStorage.getItem("current_user_type");

    // Attach user type to headers for backend or response interceptor
    config.headers["User-Type"] = userType;

    // Select corresponding token
    const token =
      userType === "candidate"
        ? localStorage.getItem("candidate_access_token")
        : userType === "recruiter"
        ? localStorage.getItem("recruiter_access_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🟢 RESPONSE INTERCEPTOR: auto-refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const userType = localStorage.getItem("current_user_type");

        const refreshToken =
          userType === "candidate"
            ? localStorage.getItem("candidate_refresh_token")
            : userType === "recruiter"
            ? localStorage.getItem("recruiter_refresh_token")
            : null;

        if (!refreshToken) throw new Error("No refresh token found");

        // Request new access token
        const refreshResponse = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = refreshResponse.data.access;

        // Save new access token in the correct key
        if (userType === "candidate") {
          localStorage.setItem("candidate_access_token", newAccess);
        } else if (userType === "recruiter") {
          localStorage.setItem("recruiter_access_token", newAccess);
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear all tokens and redirect to login
        ["candidate_access_token", "candidate_refresh_token", "recruiter_access_token", "recruiter_refresh_token", "current_user_type"].forEach(
          (key) => localStorage.removeItem(key)
        );

        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
