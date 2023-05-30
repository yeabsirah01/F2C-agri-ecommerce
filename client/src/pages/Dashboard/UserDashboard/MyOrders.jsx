import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Group,
  Input,
  Select,
  Text,
  Title,
} from "@mantine/core";
import axiosConfig from "../../../axiosConfig";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [sortDate, setSortDate] = useState("");
  useEffect(() => {
    axiosConfig.get(`/orders/myorders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

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
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });
  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <div>
        <Group
          position="apart"
          align="center"
          style={{
            gap: "2rem",
            marginTop: "20px",
            // marginBottom: "20px",
            // backgroundColor: " #d1e2b8",
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
      </div>

      {sortedOrders.map((order) => (
        <Accordion
          key={order._id}
          multiple={false}
          transitionDuration={500}
          variant="separated"
          styles={{
            item: {
              // styles added to all items
              backgroundColor: "#fff",
              border: `2px solid #ededed`,

              // styles added to expanded item
              "&[data-active]": {
                backgroundColor: "#ccc",
              },
            },

            chevron: {
              // styles added to chevron when it should rotate
              "&[data-rotate]": {
                transform: "rotate(-90deg)",
              },
            },
          }}
        >
          <Accordion.Item value="customization">
            <Accordion.Control>
              <Title
                order={2}
                style={{
                  fontSize: "15px",
                  marginBottom: 10,
                  fontWeight: "normal",
                }}
              >
                Order Number:{" "}
                <span style={{ marginRight: 50 }}>{order.orderNumber}</span>
                Created At:{" "}
                <span style={{ marginRight: 50 }}>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }).format(new Date(order.createdAt))}
                </span>
                <span>
                  <Badge
                    style={{ marginTop: 10 }}
                    color={order.status === "pending" ? "orange" : "teal"}
                    variant="light"
                  >
                    {order.status}
                  </Badge>
                </span>
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "10px",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
                  <span>{order.sellerInfo.firstName}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Buyer:</span>{" "}
                  <span>{order.buyerInfo.firstName}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                  <span>{order.shippingDetails.address}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>City:</span>{" "}
                  <span>{order.shippingDetails.city}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>State:</span>{" "}
                  <span>{order.shippingDetails.state}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    Additional address:
                  </span>{" "}
                  <span>{order.shippingDetails.zipCode}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Products:</span>{" "}
                  {order.products.map((product) => (
                    <span key={product.id}>{product.name} | </span>
                  ))}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Ticket Number:</span>{" "}
                  <span>{order.paymentInfo.ticketNumber}</span>
                </div>
              </div>

              <Badge
                style={{ marginBottom: "10px" }}
                color={order.status === "pending" ? "orange" : "teal"}
                variant="light"
              >
                {order.status}
              </Badge>

              <div>
                <span style={{ fontWeight: "bold" }}>Created At:</span>{" "}
                <span>{order.createdAt}</span>
              </div>

              <div style={{ marginTop: "10px" }}>
                <Button
                  onClick={() => updateOrderStatus(order._id, "delivered")}
                  disabled={
                    order.status === "delivered" || order.status === "pending"
                  }
                  variant="outline"
                  color="teal"
                  radius="sm"
                  style={{ marginRight: "10px" }}
                >
                  Mark as Delivered
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order._id, "undelivered")}
                  disabled={order.status !== "undelivered"}
                  variant="outline"
                  color="red"
                  radius="sm"
                >
                  Mark as Undelivered
                </Button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export default MyOrders;
