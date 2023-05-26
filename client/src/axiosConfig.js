import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
  // baseURL: `https://f2-c-agri-ecommerce.vercel.app/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Resource-Policy": "cross-origin",
  },
});

export default axiosConfig;
