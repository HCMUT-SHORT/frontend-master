import axios from "axios";

// https://backend-master-production-5633.up.railway.app
// http://localhost:5292

export const axiosClient = axios.create({
    baseURL: "https://encephalomyelitic-klara-trickiest.ngrok-free.dev",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
})