

import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api", // Adjust based on your Laravel server
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;
