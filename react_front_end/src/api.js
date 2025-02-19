import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Change to your Laravel API URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Needed for Laravel Sanctum
});

export default API;
