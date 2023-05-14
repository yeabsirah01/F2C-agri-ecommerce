import { Header } from "@mantine/core";

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

import AllUsers from "../../pages/Dashboard/AdminDashoard/AllUsers";
import UserDetails from "../../pages/Dashboard/AdminDashoard/UserDetails";
import WaitlistTable from "../../pages/Dashboard/AdminDashoard/Waitlist";
import AllOrders from "../../pages/Dashboard/AdminDashoard/AllOrders";
import Orders from "../../pages/Dashboard/FarmerDashboard/Orders";
import FarmerDashboards from "../../pages/Dashboard/FarmerDashboard/FarmerDashboard";
import React from "react";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";

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

  const { role, firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} hiddenBreakpoint="sm" hidden={!opened}>
          {/* Navbar content */}
          <div className="sidebar">
            <ul className="navItems">
              <li>
                <Burger opened={opened} onClick={() => setOpened(!opened)} />
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/updateuserinfo">My Profile</Link>
              </li>

              {role === "Farmer" && (
                <>
                  <li>
                    <Link to="/dashboard/create">Create product</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/farmerdashboard">
                      Farmer Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">profile</Link>
                  </li>
                </>
              )}
              {role === "Admin" && (
                <>
                  <li>
                    <Link to="/dashboard/waitlist">Waitlist</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/users">All Users</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/allorders">All Orders</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/dashboard/cart">Cart</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
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
      {/* Your application here */}
      <div>
        <Routes>
          <Route exact path="dashboard/allorders" element={<AllOrders />} />
          <Route exact path="dashboard/waitlist" element={<WaitlistTable />} />
          <Route exact path="dashboard/users" element={<AllUsers />} />
          <Route
            exact
            path="dashboard/updateuserinfo"
            element={<UpdateUserInfo />}
          />
          <Route path="dashboard/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </AppShell>
  );
}

export default AdminPanel;
