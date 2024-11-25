import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for flexibility
  timeout: 10000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const controlers = {
  Customer: "api/Customer/",
  testCustomer: "api/Customer/",
  ClubLevel: "api/ClubLevel/",
  shop: "api/Shop/",
  invoice: "api/Invoice/",
  survay: "api/Survey/",
  company: "api/Company/",
  account: "Api/Account/",
};

// Add interceptors for request and response
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add `companyId` header for all requests
    if (config.headers) {
      config.headers.set("companyId", "40"); // Use AxiosHeaders method
    }

    // Conditionally add Authorization header
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers?.get("requiresAuth")) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    // Remove custom `requiresAuth` property to avoid sending it with the request
    if (config.headers) {
      config.headers.delete("requiresAuth");
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
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
