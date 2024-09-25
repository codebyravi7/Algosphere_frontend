import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance or use the existing setup
const axiosInstance = axios.create();

export const setupInterceptors = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 500) {
        // Navigate to your custom error page when 500 occurs
        navigate("/error500"); // Assuming you have an error page route
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
