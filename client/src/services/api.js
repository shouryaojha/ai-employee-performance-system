import axios from "axios";

const API = axios.create({
  baseURL:
    "https://ai-employee-performance-api.onrender.com/api",
});

export default API;