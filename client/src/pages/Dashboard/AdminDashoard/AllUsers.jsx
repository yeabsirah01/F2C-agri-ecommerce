import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Input, Button } from "@mantine/core";
import axiosConfig from "../../../axiosConfig";
import Default_avator from "../../../assets/Default_ava.png";

import {
  Avatar,
  Badge,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const jobColors = {
  Consumer: "red",
  Farmer: "green",
  Admin: "blue",
  CustomerSupport: "yellow",
  Transporter: "gray",
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { _id, role } = useSelector((state) => state.user);
  const thStyle = {
    color: "blue",
    fontWeight: "bold",
    // Add any other desired styles
  };

  const namecolor = role === "Admin" ? "gray.0" : "gray.8";
  const emailcolor = role === "Admin" ? "gray.0" : "dark.6";
  const phonecolor = role === "Admin" ? "gray.0" : "dark.5";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosConfig.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = useMantineTheme();
  const rows = filteredUsers.map((user) => (
    <tr key={user.firstName}>
      <td>
        <Link
          to={`/dashboard/user/${user._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Group spacing="sm">
            <img
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
              }}
              src={
                user.profilePicture
                  ? `https://f2-c-agri-ecommerce.vercel.app/${user.profilePicture}`
                  : Default_avator
              }
              crossOrigin="cross-origin"
              alt="Profile "
              radius={30}
            />
            <Text fz="md" fw={500} color={namecolor}>
              {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
            </Text>
          </Group>
        </Link>
      </td>

      <td>
        <Badge
          color={jobColors[user.role]}
          variant={theme.colorScheme === "dark" ? "light" : "filled"}
        >
          {user.role}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm" color={emailcolor}>
          {user.email}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed" color={phonecolor}>
          {user.phone}
        </Text>
      </td>
      {/* <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td> */}
    </tr>
  ));

  return (
    <div>
      <Input
        label="Search by name"
        placeholder="Type here"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ color: "#F03E3E", fontSize: "17px" }}>User</th>
              <th style={{ color: "#F03E3E", fontSize: "17px" }}>Role</th>
              <th style={{ color: "#F03E3E", fontSize: "17px" }}>Email</th>
              <th style={{ color: "#F03E3E", fontSize: "17px" }}>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default AllUsers;
