import React, { useState, useEffect } from "react";
import axiosConfig from "../../../axiosConfig";
import {
  Badge,
  Button,
  Group,
  Input,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";

const AllOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [sortDate, setSortDate] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosConfig.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosConfig.patch(`/orders/${orderId}`, { status: newStatus });
      // Update the orders state to reflect the new status
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };
  const resetSort = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSortStatus("");
    setSortDate("");
  };
  // Filter orders based on search query and status
  const filteredOrders = orders.filter((order) => {
    const includesSearchQuery = order.orderNumber
      .toUpperCase()
      .startsWith("MOFER-" + searchQuery.toUpperCase());

    const matchesStatusFilter =
      statusFilter === "" || order.status === statusFilter;
    return includesSearchQuery && matchesStatusFilter;
  });

  // Sort orders based on sort status and date
  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortStatus !== "") {
      return a.status.localeCompare(b.status);
    }
    if (sortDate !== "") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <div
      style={{
        marginBottom: 10,
        display: "flex",
        justifyContent: "center",
        width: "70vw",
      }}
    >
      <div>
        <Group
          position="apart"
          align="center"
          style={{
            gap: "4rem",
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: " #d1e2b8",
          }}
        >
          <Input
            // size="lg"
            icon={<Text>MOFER- </Text>}
            iconWidth={60}
            placeholder="Search by order number"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            data={[
              { label: "All", value: "" },
              { label: "Pending", value: "pending" },
              { label: "Delivered", value: "delivered" },
              { label: "Partially Delivered", value: "deliveredpartially" },
              { label: "Undelivered", value: "undelivered" },
            ]}
          />
          <Button
            variant={sortStatus === "asc" ? "filled" : "light"}
            onClick={() => setSortStatus(sortStatus === "asc" ? "desc" : "asc")}
          >
            Sort by status
          </Button>
          <Button
            variant={sortDate === "asc" ? "filled" : "light"}
            onClick={() => setSortDate(sortDate === "asc" ? "desc" : "asc")}
          >
            Sort by date
          </Button>
          <Button variant="outline" onClick={resetSort}>
            Reset Sort
          </Button>
        </Group>
        <Table striped>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map(
              (
                order,
                index // Add 'index' as the second argument
              ) => (
                <tr
                  key={order.orderNumber}
                  style={{
                    color: index % 2 !== 0 ? "white" : "black",
                    backgroundColor: index % 2 === 0 ? "#e0f3e9" : "#00000000",
                  }}
                  // style={{ color: index % 2 !== 0 ? "white" : "black" }}
                >
                  <td>
                    <Link
                      to={`/dashboard/orders/${order._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Text fz="md" fw={500} color="green.5">
                        {order.orderNumber}
                      </Text>
                    </Link>
                  </td>
                  <td>
                    <Badge
                      color={order.status === "pending" ? "orange" : "teal"}
                      variant="filled"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }).format(new Date(order.createdAt))}
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        updateOrderStatus(order._id, "deliveredpartially")
                      }
                      disabled={
                        order.status === "delivered" ||
                        order.status === "deliveredpartially"
                      }
                      variant="outline"
                      color="teal"
                      radius="sm"
                      style={{ marginRight: 10 }}
                    >
                      Mark as Delivered
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        updateOrderStatus(order._id, "undelivered")
                      }
                      disabled={order.status === "undelivered"}
                      variant="outline"
                      color="red"
                      radius="sm"
                    >
                      Mark as Undelivered
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllOrders;
