import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for flexibility
  timeout: 20000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const controlers = {
  Auth: "api/Auth",
  Invoice: "api/Invoice",
  EndUser: "api/EndUser",
  Banner: "api/Banner",
  GiftCard: "api/GiftCard",
};

// Ensure you have js-cookie or a similar library installed

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add `companyId` header for all requests
    if (config.headers) {
      config.headers.set("companyId", "40"); // Use AxiosHeaders method
    }

    // Conditionally add Authorization header
    if (config.headers?.auth) {
      // Check if `auth` flag is present
      const token = cookies.get("token"); // Get the token from cookies
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    // Remove custom `auth` property to avoid sending it with the request
    if (config.headers) {
      delete config.headers.auth;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response, // Pass through successful responses
  (error: AxiosError): Promise<AxiosError> => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting...");

      if (typeof window !== "undefined") {
        const currentUrl = new URL(window.location.href);
        const invoiceId = currentUrl.searchParams.get("invoiceId");
        if (invoiceId) {
          cookies.remove("token");
        }
        // Construct the login URL with backUrl if invoiceId exists
        const loginUrl = invoiceId ? `/login?backUrl=${invoiceId}` : "/login";

        // Redirect if not already on the login page
        if (!currentUrl.pathname.includes("/login")) {
          window.location.href = loginUrl;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
