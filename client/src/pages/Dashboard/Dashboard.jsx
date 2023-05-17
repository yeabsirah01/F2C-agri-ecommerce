// import "./styles.css";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { SiShopify } from "react-icons/si";
import NavItem from "./navItem";
import React from "react";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
// const Dashboard = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const { role, firstName } = useSelector((state) => state.user);

//   return (
//     <div className={isOpen ? "layout open" : "layout"}>
//       <div className="sidebar">
//         <ul className="navItems">
//           {isOpen ? (
//             <VscChromeClose onClick={toggleSidebar} className="hamburger" />
//           ) : (
//             <GiHamburgerMenu onClick={toggleSidebar} className="hamburger" />
//           )}
//           <NavItem Icon={AiFillHome} label="Home" to="/" />

//           {role === "Farmer" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Create product" to="create" />
//               <NavItem Icon={FaUserCircle} label="Profile" to="profile" />
//             </>
//           )}
//           {role === "Admin" && (
//             <>
//               <NavItem Icon={MdAddCircle} label="Waitlist" to="wait" />
//             </>
//           )}
//           <NavItem Icon={FaShoppingCart} label="Cart" to="cart" />
//         </ul>
//         <div className="logout">
//           <BiLogOutCircle
//             onClick={() => {
//               dispatch(logout());
//             }}
//           />
//         </div>
//       </div>
//       <div className="content">
//         <header>
//           <div>
//             <SiShopify />
//             <p>Shoplify</p>
//           </div>
//           <p>Hi, {firstName}</p>
//         </header>
//         {children}
//       </div>
//     </div>
//   );
// };
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Burger,
  ScrollArea,
} from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import CreateProduct from "./../../pages/createProduct/index";
import Profile from "./../../pages/profile";
import WaitlistTable from "./AdminDashoard/Waitlist";
import UpdateUserInfo from "./UserDashboard/UpdateUserInfo";
import AllUsers from "./AdminDashoard/AllUsers";
import UserDetails from "./AdminDashoard/UserDetails";
import MyOrders from "./UserDashboard/MyOrders";
import Orders from "./FarmerDashboard/Orders";
import FarmerDashboards from "./FarmerDashboard/FarmerDashboard";
import Profilee from "./UserDashboard/Profilee";
// import { useSelector } from "react-redux";
import { useState } from "react";
import { createStyles, Group, Code, getStylesRef, rem } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter((part) => part !== "");

  return (
    <div>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && " > "}
          <a href={`/${parts.slice(0, index + 1).join("/")}`}>{part}</a>
        </span>
      ))}
    </div>
  );
}

function Dashboard({ children }) {
  const { role, firstName } = useSelector((state) => state.user);
  const data = [
    { link: "/dashboard/myorders", label: "My Orders", icon: IconBellRinging },
    { link: "/dashboard/profilee", label: "My profile", icon: IconReceipt2 },
  ];

  if (role === "Farmer") {
    data.push(
      {
        link: "/dashboard/create",
        label: "Create Product",
        icon: IconFingerprint,
      },
      {
        link: "/dashboard/farmerdashboard",
        label: "Farmer Dashboard",
        icon: IconKey,
      },
      {
        link: "/dashboard/profile",
        label: "Profile",
        icon: IconDatabaseImport,
      },
      { link: "/dashboard/orders", label: "Orders", icon: Icon2fa }
    );
  }
  // if (role === "Admin") {
  //   data.push(
  //     { link: "/dashboard/waitlist", label: "Waitlist", icon: IconSettings },
  //     { link: "/dashboard/users", label: "All users", icon: IconSettings }
  //   );
  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, setOpened] = React.useState(false);

  const salesData = [
    { date: new Date("2022-01-01"), amount: 1000 },
    { date: new Date("2022-02-01"), amount: 1500 },
    { date: new Date("2022-03-01"), amount: 2000 },
    // ... etc.
  ];

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <AppShell
      navbar={
        <Navbar height={700} width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
            <Group className={classes.header} position="apart">
              {/* <MantineLogo size={28} /> */}
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <Link to="/dashboard/profilee" className={classes.link}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Profileee</span>
            </Link>

            <a
              href="#"
              className={classes.link}
              onClick={() => {
                navigate("/");
                dispatch(logout());
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
    >
      <div>
        <Breadcrumbs />
      </div>
      <div>
        <Routes>
          <Route exact path="/create" element={<CreateProduct />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/myorders" element={<MyOrders />} />
          <Route exact path="/farmerdashboard" element={<FarmerDashboards />} />
          <Route exact path="/orders" element={<Orders />} />

          <Route exact path="/users" element={<AllUsers />} />
          <Route exact path="/profilee" element={<Profilee />} />
          <Route exact path="/updateuserinfo" element={<UpdateUserInfo />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </AppShell>
  );
}

export default Dashboard;

//   <Navbar width={{ base: 200 }} hiddenBreakpoint="sm" hidden={!opened}>
//   {/* Navbar content */}
//   <div className="sidebar">
//     <ul className="navItems">
//       <li>
//         <Burger opened={opened} onClick={() => setOpened(!opened)} />
//       </li>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/dashboard/profilee">My Profile</Link>
//       </li>
//       <li>
//         <Link to="/dashboard/myorders">My Orders</Link>
//       </li>
//       {role === "Farmer" && (
//         <>
//           <li>
//             <Link to="/dashboard/create">Create product</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/farmerdashboard">
//               Farmer Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/profile">profile</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/orders">Orders</Link>
//           </li>
//         </>
//       )}
//       {role === "Admin" && (
//         <>
//           <li>
//             <Link to="/dashboard/waitlist">Waitlist</Link>
//           </li>
//           <li>
//             <Link to="/dashboard/users">All Users</Link>
//           </li>
//         </>
//       )}
//       <li>
//         <Link to="/dashboard/cart">Cart</Link>
//       </li>
//       <li>
//         <button onClick={() => dispatch(logout())}>Logout</button>
//       </li>
//     </ul>
//   </div>
// </Navbar>
