import axios from "axios";

const api = axios.create({
  baseURL: "https://nero-x-aplikasi-billing-dan-manajemen-seee.onrender.com/api",
});

export default api;
