import { Menu, Text, Avatar, Button } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconDashboard,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconShoppingBag,
} from "@tabler/icons-react";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../../axiosConfig";
import defaultImage from "../../assets/Default_ava.png";

function AvatarIcon() {
  const [responseStatus, setResponseStatus] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, firstName, profilePicture, subscription, isVerified } =
    useSelector((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState(
    "http://https://f2-c-agri-ecommerce.vercel.app/1682238562698-DABU3586.JPEG"
  );

  const styles = {
    borderRadius: "50%",
    backgroundColor: "#ccc",
    width: "50px",
    height: "50px",
    position: "relative",
    overflow: "hidden",

    top: -7,
  };
  // console.log(subscription);
  const imageStyles = {
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "50% 10%",
    width: "100%",
    height: "100%",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={formContainerStyle}>
      {/* Render email verification overlay */}
      {!isVerified && (
        <div style={overlayStyle}>
          <Text style={{ fontSize: "30px", color: "white" }}>
            Email is not verified. check your inbox
          </Text>
          <Button
            onClick={() => {
              dispatch(logout());
              toast.success("Loggedout succesfully");
              navigate("/");
            }}
          >
            Log out
          </Button>
        </div>
      )}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div>
            <div style={styles}>
              <img
                src={
                  profilePicture
                    ? `https://f2-c-agri-ecommerce.vercel.app/${profilePicture}`
                    : defaultImage
                }
                alt="Avatar"
                style={imageStyles}
                crossOrigin="cross-origin"
              />
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item style={{ position: "relative", left: 100 }}>
            <b> {firstName} </b>
          </Menu.Item>

          {role !== "Consumer" && (
            <Menu.Item
              style={{ backgroundColor: "#49b340", color: "white" }}
              icon={<IconDashboard size={14} />}
              onClick={() => navigate("/dashboard")}
            >
              {role} Dashboard
            </Menu.Item>
          )}
          {role !== "Admin" && (
            <>
              <Menu.Item icon={<IconUserCircle size={14} />}>
                <Link
                  to="/dashboard/profilee"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Profile
                </Link>
              </Menu.Item>
              <Menu.Item icon={<IconShoppingBag size={14} />}>
                {" "}
                <Link
                  to="/dashboard/myorders"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Orders
                </Link>
              </Menu.Item>
            </>
          )}

          <Menu.Divider />

          {role === "Consumer" ? (
            <Menu.Item
              style={{ backgroundColor: "#yellow", color: "black" }}
              icon={<IconArrowsLeftRight size={14} />}
              onClick={() => navigate("/applyfarmer")}
            >
              Upgrade to Farmer
            </Menu.Item>
          ) : null}
          <Menu.Item
            onClick={() => {
              dispatch(logout());
              toast.success("Loggedout succesfully");
              navigate("/");
            }}
            color="red"
            icon={<IconTrash size={14} />}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default AvatarIcon;
