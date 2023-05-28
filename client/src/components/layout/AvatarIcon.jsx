import { Menu, Text, Avatar } from "@mantine/core";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, firstName, profilePicture, subscription } = useSelector(
    (state) => state.user
  );
  const [avatarUrl, setAvatarUrl] = useState(
    "http://localhost:5000/1682238562698-DABU3586.JPEG"
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

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div>
          <div style={styles}>
            <img
              src={
                profilePicture
                  ? `http://localhost:5000/${profilePicture}`
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
        <Menu.Item>Hello {firstName}</Menu.Item>

        {role !== "Consumer" && (
          <Menu.Item
            icon={<IconDashboard size={14} />}
            onClick={() => navigate("/dashboard")}
          >
            {role} Dashboard
          </Menu.Item>
        )}
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
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        {role === "Consumer" ? (
          <Menu.Item
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
  );
}

export default AvatarIcon;
