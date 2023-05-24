import { Breadcrumbs, Header } from "@mantine/core";

import AvatarIcon from "./AvatarIcon";
import CartIcon from "../../pages/cart/cartIcon";
import {
  createStyles,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import Login from "./../../pages/auth/Loginn";
import SignUp from "../../pages/auth/SignUp";
import { AppShell, Navbar } from "@mantine/core";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { MediaQuery } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateProduct from "../../pages/createProduct/index";
import Profile from "../../pages/profile";

import UpdateUserInfo from "../../pages/Dashboard/UserDashboard/UpdateUserInfo";
import Profilee from "../../pages/Dashboard/UserDashboard/Profilee";

import AllUsers from "../../pages/Dashboard/AdminDashoard/AllUsers";
import UserDetails from "../../pages/Dashboard/AdminDashoard/UserDetails";
import WaitlistTable from "../../pages/Dashboard/AdminDashoard/Waitlist";
import AllOrders from "../../pages/Dashboard/AdminDashoard/AllOrders";
import Orders from "../../pages/Dashboard/FarmerDashboard/Orders";
import FarmerDashboards from "../../pages/Dashboard/FarmerDashboard/FarmerDashboard";
import React from "react";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../pages/Dashboard/AdminDashoard/AdminDashboard";

import {
  IconBuildingStore,
  IconUserCircle,
  IconDashboard,
  IconClockPause,
  IconUsers,
  IconBasket,
  IconPower,
} from "@tabler/icons-react";
import ViewFarmerProduct from "../../pages/Dashboard/AdminDashoard/ViewFarmerProducts";
import AllProducts from "../../pages/Dashboard/AdminDashoard/AllProducts";
import SupportScreen from "../../pages/Dashboard/AdminDashoard/SupportScreen";

const useStyles = createStyles((theme) => ({
  link: {
    primaryShade: 1,
    backgroundColor: theme.backgroundColor,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.lt,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

function AdminPanel() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const isLoggedIn = true;
  //   console.log(props.isLoggedIn);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const isAuthenticated = useSelector((state) => !!state.user.token);

  function handleLoginModalClose() {
    setShowLoginModal(false);
  }

  function handleLoginButtonClick() {
    setShowLoginModal(true);
  }
  function handleSignUpModalClose() {
    setShowSignUpModal(false);
  }

  function handleSignUpButtonClick() {
    setShowSignUpModal(true);
  }

  function Breadcrumbs() {
    const { pathname } = useLocation();
    const parts = pathname.split("/").filter((part) => part !== "");
    return (
      <div>
        {parts.map((part, index) => (
          <span key={index} style={{ color: "white" }}>
            {index > 0 && " > "}
            <a
              href={`/${parts.slice(0, index + 1).join("/")}`}
              style={{ color: "white" }}
            >
              {part}
            </a>
          </span>
        ))}
      </div>
    );
  }
  const { role, firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = React.useState(false);

  const [activeElement, setActiveElement] = useState(null);

  const handleElementClick = (element) => {
    setActiveElement(element);
  };

  return (
    <AppShell
      bg="#353439"
      padding="md"
      navbar={
        <Navbar
          width={{ base: 200 }}
          hiddenBreakpoint="sm"
          hidden={!opened}
          bg="#393534"
        >
          {/* Navbar content */}
          <div className="sidebar">
            <ul className="navItems">
              <li>
                <Link to="/dashboard/profile">
                  <div
                    className={`navBox ${
                      activeElement === "profile" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("profile")}
                  >
                    <IconUserCircle size={24} />
                    <Text style={{ marginLeft: 8 }}>My Profile</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/allproducts">
                  <div
                    className={`navBox ${
                      activeElement === "products" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("products")}
                  >
                    <IconBuildingStore size={24} />
                    <Text style={{ marginLeft: 8 }}>All Products</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admindashboard">
                  <div
                    className={`navBox ${
                      activeElement === "dashboard" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("dashboard")}
                  >
                    <IconDashboard size={24} />
                    <Text style={{ marginLeft: 8 }}>Dashboard</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/waitlist">
                  <div
                    className={`navBox ${
                      activeElement === "waitlist" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("waitlist")}
                  >
                    <IconClockPause size={24} />
                    <Text style={{ marginLeft: 8 }}>Waitlist</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <div
                    className={`navBox ${
                      activeElement === "users" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("users")}
                  >
                    <IconUsers size={24} />
                    <Text style={{ marginLeft: 8 }}>All Users</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/support">
                  <div
                    className={`navBox ${
                      activeElement === "support" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("support")}
                  >
                    <IconUsers size={24} />
                    <Text style={{ marginLeft: 8 }}>support</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/allorders">
                  <div
                    className={`navBox ${
                      activeElement === "orders" ? "active" : ""
                    }`}
                    onClick={() => handleElementClick("orders")}
                  >
                    <IconBasket size={24} />
                    <Text style={{ marginLeft: 8 }}>All Orders</Text>
                  </div>
                </Link>
              </li>
              <li>
                <Button
                  onClick={() => dispatch(logout())}
                  leftIcon={<IconPower size={24} />}
                  variant="link"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </Navbar>
      }
      header={
        <Header
          height={70}
          p="xs"
          style={{ position: "fixed", top: 0, left: 0, right: 0 }}
        >
          <Box pb={0}>
            <Header height={70} px="md" bg="#77AB59">
              <Group position="apart" sx={{ height: "100%" }}>
                <img
                  src={"./Logo.png"}
                  alt={"abebe"}
                  style={{ width: 200, height: 50 }}
                />

                <Group className={classes.hiddenMobile}>
                  {isAuthenticated ? (
                    <>
                      <AvatarIcon />
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleLoginButtonClick}
                      >
                        Log in
                      </Button>
                      <Button
                        variant="filled"
                        onClick={handleSignUpButtonClick}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </Group>

                <Burger
                  opened={drawerOpened}
                  onClick={toggleDrawer}
                  className={classes.hiddenDesktop}
                />
              </Group>
            </Header>
            {showLoginModal && <Login onClose={handleLoginModalClose} />}
            {showSignUpModal && <SignUp onClose={handleSignUpModalClose} />}
            {/* ----------------------------------------- */}
          </Box>
        </Header>
      }
    >
      <style>
        {`
          .navBox {
            color:#F2F2F2;
            display: flex;
            align-items: center;
            padding: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .navBox:hover {
            background-color: #8B8A8D;
            color: #111111;
          }

          .navBox.active {
            background-color: #77AB59;
            color:#111111
          }

          .appcomponent{
            
            background-color: #353439;
            color:#F2F2F2;
          }

          .abe{
            margin-left: 100px;
            color:#F2F2F2
          }
        `}
      </style>
      <div>
        <Breadcrumbs color="blue.3" className="abe" />
      </div>
      {/* Your application here */}
      <div className="appcomponent">
        <Routes>
          <Route
            exact
            path="dashboard/admindashboard"
            element={<AdminDashboard />}
          />
          <Route exact path="dashboard/allorders" element={<AllOrders />} />
          <Route exact path="dashboard/profile" element={<Profilee />} />
          <Route exact path="dashboard/waitlist" element={<WaitlistTable />} />
          <Route exact path="dashboard/users" element={<AllUsers />} />
          <Route exact path="dashboard/allproducts" element={<AllProducts />} />
          <Route exact path="dashboard/support" element={<SupportScreen />} />
          <Route
            exact
            path="dashboard/updateuserinfo"
            element={<UpdateUserInfo />}
          />
          <Route
            exact
            path="dashboard/farmerproduct/:id"
            element={<ViewFarmerProduct />}
          />
          <Route path="dashboard/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </AppShell>
  );
}

export default AdminPanel;
