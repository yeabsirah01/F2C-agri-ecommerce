import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `https://f2-c-agri-ecommerce.vercel.app/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Resource-Policy": "cross-origin",
  },
});

export default axiosConfig;
