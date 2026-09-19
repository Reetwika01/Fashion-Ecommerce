import axios from "axios";

const api = axios.create({
    baseURL: "https://fashion-ecommerce-dnv8.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});


// Add JWT token automatically to every request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("accessToken");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Handle common API errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response) {

            if (error.response.status === 401) {
                console.log("Unauthorized - Token expired or invalid");

localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");

                // optional redirect
                // window.location.href = "/login";
            }

            if (error.response.status === 403) {
                console.log("Forbidden - Access denied");
            }

        } else {
            console.log("Server not reachable");
        }

        return Promise.reject(error);
    }
);


export default api;