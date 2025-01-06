import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token && token !== "ERR") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Phiên làm việc hết hạn, vui lòng đăng nhập lại!");
        sessionStorage.setItem("authToken", "");
      }
      else if (error.response.status === 403) {
        toast.error("Bạn không có quyền truy cập vào tài nguyên này!");
      }
      else if (error.response.status === 400) {
        toast.error("Thao tác không thành công, vui lòng thử lại!");
      }
      else {
        sessionStorage.setItem("authToken", "");
        toast.error("Phiên làm việc đã hết hạn, đăng nhập lại!");
        setTimeout(window.location.href = "/login", 5000);
      }
    } else {
      sessionStorage.setItem("authToken", "");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
