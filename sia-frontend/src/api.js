import axios from "axios";

const API = axios.create({
  baseURL: "https://sia-backend-production-4dcd.up.railway.app"
});

export default API;