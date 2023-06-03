import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layout";
import { login } from "./../features/userSlice";
import AuthPage from "./../pages/auth";
import CreateProduct from "./../pages/createProduct";
import EditProduct from "./../pages/createProduct/editProduct";
import Home from "../pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./../pages/profile";
import Cart from "./../pages/cart/indes";
import { setCart } from "./../features/cartSlice";
import Product from "./../pages/product";
import ProductPage from "./../pages/product/productsPage";
import Login from "./../pages/auth/Loginn";
import FooterSocial from "./layout/FooterSocial";
import Header from "./layout/Header";
import Dashboard from "../pages/Dashboard/Dashboard";
import FarmerApplicationForm from "../pages/waitlist/FarmerForm";
import WaitlistTable from "./../pages/Dashboard/AdminDashoard/Waitlist";
import UpdateUserInfo from "../pages/Dashboard/UserDashboard/UpdateUserInfo";
import Checkout from "../pages/checkout/CheckOut";
import TawkToWidget from "./widget/TawkToWidget";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";
import AdminPanel from "./layout/AdminPanel";
import TransporterPanel from "./layout/TransporterPanel";
import ChatBox from "../pages/Dashboard/CustomerSupportDashboard/ChatBox";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { Select } from "@mantine/core";
import { Faq } from "../pages/FAQ/Faq";
import AboutUsPage from "../pages/about us/AboutUs";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require("../locales/en.json"),
    },
    am: {
      translation: require("../locales/am.json"),
    },
    or: {
      translation: require("../locales/or.json"),
    },
    tr: {
      translation: require("../locales/tr.json"),
    },
  },
  lng: "en", // Set the default language
  fallbackLng: "en", // Fallback language if the selected language file is missing
  interpolation: {
    escapeValue: false,
  },
});

function LanguageSwitch() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Select
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100px",
        backgroundColor: "green",
      }}
      data={[
        { label: "English", value: "en" },
        { label: "Amharic", value: "am" },
        { label: "Oromiffa", value: "or" },
        { label: "Tigrigna", value: "tr" },
      ]}
      defaultValue="en"
      onChange={(value) => handleLanguageChange(value)}
      styles={(theme) => ({
        input: {
          // applies styles to selected item

          "&, &:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.green[9]
                : theme.colors.green[9],
            color:
              theme.colorScheme === "dark"
                ? theme.white
                : theme.colors.yellow[2],
          },

          // applies styles to hovered item (with mouse or keyboard)
          "&[data-hovered]": {},
        },
        item: {
          // applies styles to selected item
          "&[data-selected]": {
            "&, &:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.teal[9]
                  : theme.colors.green[2],
              color:
                theme.colorScheme === "dark"
                  ? theme.white
                  : theme.colors.teal[9],
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          "&[data-hovered]": {},
        },
      })}
    />
  );
}

function MainComponent({ user }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  console.log(userInfo.role);
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const cartCookie = Cookies.get("cart");

    if (userCookie) {
      const user = JSON.parse(userCookie);
      dispatch(login(user));
    }

    if (cartCookie) {
      const cart = JSON.parse(cartCookie);
      dispatch(setCart(cart));
    }
  }, [dispatch]);

  return (
    <>
      {userInfo.role === "Admin" ? (
        <AdminPanel />
      ) : userInfo.role === "Transporter" ? (
        <TransporterPanel />
      ) : (
        <>
          <Header />
          <div style={{ marginTop: "0px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<SubscriptionPage />} />
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="create" element={<CreateProduct />} />
                <Route path="updateuserinfo" element={<UpdateUserInfo />} />
                <Route path="wait" element={<WaitlistTable />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route
                path="/applyfarmer"
                element={<FarmerApplicationForm user={user} />}
              />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/checkout/:id" element={<Checkout />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              {/* <Route
            path="/success"
            element={
              <OrderSuccess ticketNumber="123456" paymentHandler="YenePay" />
            }
          /> */}
            </Routes>
            <FooterSocial />
            <LanguageSwitch />
          </div>
        </>
      )}
    </>
  );
}

export default MainComponent;
