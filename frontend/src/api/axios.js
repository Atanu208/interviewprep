import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Your Spring Boot base API
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
