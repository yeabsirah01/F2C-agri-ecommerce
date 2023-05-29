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

function MainComponent({ user }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

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
              {/* <Route
            path="/success"
            element={
              <OrderSuccess ticketNumber="123456" paymentHandler="YenePay" />
            }
          /> */}
            </Routes>
            <ChatBox userInfo={userInfo} />
          </div>
          {/* <TawkToWidget /> */}
        </>
      )}
    </>
  );
}

export default MainComponent;
