import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-production-5644.up.railway.app/api/",
});

export default api;
