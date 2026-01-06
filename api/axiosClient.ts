import axios from "axios";

// https://backend-master-production-ec14.up.railway.app/
// http://localhost:5292

export const axiosClient = axios.create({
    baseURL: "https://backend-master-production-ec14.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
})