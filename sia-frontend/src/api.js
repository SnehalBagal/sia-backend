import axios from "axios";

const API = axios.create({
  baseURL: "https://sia-backend-khcp.onrender.com"
});

export default API;