import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api", // change to your backend URL
    baseURL: "https://digilians-backend.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// // Optional: interceptors for auth tokens
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // if you use auth
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default api;
