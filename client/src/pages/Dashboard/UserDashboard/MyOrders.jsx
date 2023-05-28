import { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Button, Card, Text, Title } from "@mantine/core";
import axiosConfig from "../../../axiosConfig";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

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

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <p>hey</p>
      {orders.map((order) => (
        <Card
          key={order._id}
          shadow="sm"
          padding="sm"
          radius="md"
          style={{ marginBottom: 10 }}
        >
          <Title order={2} style={{ marginBottom: 10 }}>
            Order Number: {order.orderNumber}
          </Title>
          <Text>Seller: {order.sellerInfo}</Text>
          <Text>Buyer: {order.buyerInfo}</Text>
          <Text>Address: {order.shippingDetails.address}</Text>
          <Text>City: {order.shippingDetails.city}</Text>
          <Text>State: {order.shippingDetails.state}</Text>
          <Text>Zip Code: {order.shippingDetails.zipCode}</Text>
          <Text>Ticket Number: {order.paymentInfo.ticketNumber}</Text>
          <Badge
            style={{ marginTop: 10 }}
            color={order.status === "pending" ? "orange" : "teal"}
            variant="light"
          >
            {order.status}
          </Badge>
          <Text style={{ marginTop: 10 }}>Created At: {order.createdAt}</Text>
          <div>
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={() => updateOrderStatus(order._id, "delivered")}
                disabled={
                  order.status === "delivered" || order.status === "pending"
                }
                variant="outline"
                color="teal"
                radius="sm"
                style={{ marginRight: 10 }}
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyOrders;
