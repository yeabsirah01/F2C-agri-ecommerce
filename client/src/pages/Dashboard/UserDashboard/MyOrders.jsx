import { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Card, Text, Title } from "@mantine/core";
import axiosConfig from "../../../axiosConfig";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosConfig.get(`/orders/myorders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

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
        </Card>
      ))}
    </div>
  );
};

export default MyOrders;
