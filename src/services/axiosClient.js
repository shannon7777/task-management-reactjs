import axios from "axios";
import useAuth from "../hooks/useAuth";

const axiosClient = axios.create({
  baseURL: `http://localhost:5000/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
  },
});

// axiosClient.interceptors.request.use(
//   (config) => {
//     const {
//       auth: { accessToken },
//     } = useAuth();
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
