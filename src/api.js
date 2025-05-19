

import axios from "axios";


const API = axios.create({
    baseURL: "http://127.0.0.1:3000", // Adjust based on your Laravel server
    headers: {
        "Content-Type": "application/json",
    },

});

export default API;
