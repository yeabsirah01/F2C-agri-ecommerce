import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Paper,
  Title,
  Text,
  Avatar,
  Group,
  Badge,
  Divider,
  CheckIcon,
  Switch,
  Button,
} from "@mantine/core";
import axiosConfig from "../../../axiosConfig";
import { useSelector } from "react-redux";
import Default_avator from "../../../assets/Default_ava.png";
import { toast } from "react-toastify";
import { useWindowScroll } from "@mantine/hooks";

const UserDetails = () => {
  const { role } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosConfig.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [id]);

  const handleBackClick = () => {
    window.history.back();
  };
  const handleDisableClick = async () => {
    try {
      const res = await axiosConfig.put(`/users/disable/${id}`, {
        isActive: !user.isActive, // toggle the isActive value
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      ); // Prompt user for confirmation

      if (confirmed) {
        await axiosConfig.delete(`/users/${id}`);
        // Add any additional logic or actions you want to perform after deletion
        toast.success("User deleted successfully");
        window.location.href = "http://localhost:3000/dashboard/users";
      } else {
        toast.info("Deletion cancelled");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the user");
    }
  };

  const renderUserInfo = () => {
    if (!user) return null;
    console.log(user);
    const isDisabled = role !== "Admin";
    const labelText = isDisabled
      ? "You must be an admin to enable and disable user"
      : "enable and disable user account";
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "100px",
          // textAlign: "center",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <div
          style={{ gridColumn: "1", display: "grid", gap: "10px", width: 400 }}
        >
          <Button
            onClick={handleBackClick}
            style={{ alignSelf: "start", width: 130 }}
          >
            Back
          </Button>
          <img
            style={{
              borderRadius: "4%",
              width: "190px",
              height: "220px",
            }}
            src={
              user.profilePicture
                ? `http://localhost:5000/${user.profilePicture}`
                : Default_avator
            }
            crossOrigin="cross-origin"
            alt="Profile "
            radius={30}
            sizes="xl"
          />
          <div>
            <Switch
              description={labelText}
              disabled={isDisabled}
              checked={user.isActive}
              onChange={handleDisableClick}
              label={user.isActive ? "Enabled" : "Disabled"}
              style={{ marginBottom: 20, marginTop: 20 }}
            />
            {role === "Admin" && (
              <Button
                onClick={handleDelete}
                style={{ alignSelf: "start", width: 130 }}
              >
                Delete User
              </Button>
            )}
            {user.role === "Farmer" && (
              <>
                <Divider />

                <Link
                  to={`/dashboard/farmerproduct/${user._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button style={{ justifySelf: "center" }}>
                    {" "}
                    Farmer Products
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            gridColumn: "2",
            gap: "10px",
            width: 350,
            backgroundColor: "rgb(94 204 64 / 20%)",
          }}
        >
          <Title order={2}>{`${user.firstName} ${user.lastName}`}</Title>
          <Badge
            variant="filled"
            color={user.role === "Farmer" ? "teal" : "blue"}
          >
            {user.role}
          </Badge>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "5px",
            }}
          >
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                First Name:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.firstName}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Last Name:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.lastName}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Email:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.email}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Address:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.address}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Phone:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.phone}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Gender:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.gender}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Address:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.address}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Region:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.region}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Active status:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#902E11" }}>
                {user.isActive ? "Active Account" : "Disabled Account"}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Email Verified:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#902E11" }}>
                {user.isVerified ? "Verfied" : "Not Verified"}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Subscription:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {user.subscription.status}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Subscription started date:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(user.subscription.startDate))}
              </span>
            </Text>
            <Text>
              <span style={{ fontWeight: "normal", color: "#555555" }}>
                Subscription End date:
              </span>{" "}
              <span style={{ fontWeight: "bold", color: "#333333" }}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(user.subscription.endDate))}
              </span>
            </Text>
          </div>

          <Divider />
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        display: "grid",

        minHeight: "100vh",
      }}
    >
      <Paper
        style={{
          width: 1200,
        }}
        // padding="sm"
      >
        {renderUserInfo()}
      </Paper>
    </div>
  );
};

export default UserDetails;
