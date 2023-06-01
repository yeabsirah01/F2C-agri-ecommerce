import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosConfig from "../axiosConfig";

const initialState = {
  _id: "",
  name: "",
  token: "",
};

let interceptor;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
      updateCookieInLocalStorage(action.payload.token);
      setupRequestInterceptor(action.payload.token);
      return action.payload;
    },
    logout: (state) => {
      Cookies.remove("user");
      clearRequestInterceptor();
      return initialState;
    },
  },
});

const updateCookieInLocalStorage = (token) => {
  localStorage.setItem("cookie", token);
};

const setupRequestInterceptor = (token) => {
  interceptor = axiosConfig.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });
};

const clearRequestInterceptor = () => {
  axiosConfig.interceptors.request.eject(interceptor);
};

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

// Register event handler for page refresh
window.onbeforeunload = () => {
  const token = Cookies.get("user")?.token;
  if (token) {
    updateCookieInLocalStorage(token);
  }
};
