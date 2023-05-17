import { useState, useEffect } from "react";
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
} from "@mantine/core";
import axiosConfig from "../../../axiosConfig";

const UserDetails = () => {
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

  const renderUserInfo = () => {
    if (!user) return null;
    const isDisabled = user.role === "Admin";
    const labelText = isDisabled
      ? "You must be an admin to enable and disable user"
      : "enable and disable user account";

    return (
      <>
        <button onClick={handleBackClick}>Back</button>
        <Group>
          <Avatar src={user.avatarUrl} alt={user.firstName} />
          <Title order={2}>{`${user.firstName} ${user.lastName}`}</Title>
          <Badge color={user.role === "Farmer" ? "teal" : "blue"}>
            {user.role}
          </Badge>
        </Group>

        <Divider />

        <Text>{`Email: ${user.email}`}</Text>
        <Text>{`Address: ${user.address}`}</Text>
        <Text>{`Phone: ${user.phone}`}</Text>

        {user.role === "Farmer" && (
          <>
            <Divider />

            <Title order={3}>Sale History</Title>
            {/* display farmer's sale history here */}
          </>
        )}

        <Divider />

        <Link
          to={`/dashboard/farmerproduct/${user._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Prods
        </Link>

        <Switch
          description={labelText}
          disabled={isDisabled}
          checked={user.isActive}
          onChange={handleDisableClick}
          label={user.isActive ? "Enabled" : "Disabled"}
        />
      </>
    );
  };
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Paper padding="lg">{renderUserInfo()}</Paper>
    </div>
  );
};

export default UserDetails;
