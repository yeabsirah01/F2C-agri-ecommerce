import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text, Badge } from "@mantine/core";
import axiosConfig from "../../../axiosConfig";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosConfig.get(`/orders/${id}`);
        console.log(response);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);
  const handleBackClick = () => {
    window.history.back();
  };

  if (!order) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <button onClick={handleBackClick}>Back</button>
      {order.products &&
        order.products.map((product) => (
          <span key={product._id}>{product.name}</span>
        ))}
      <Badge
        style={{ marginTop: 10 }}
        color={order.status === "pending" ? "orange" : "teal"}
        variant="light"
      >
        {order.status}
      </Badge>
      <Text>
        <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
        {order.sellerInfo.firstName}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Buyer:</span>{" "}
        {order.buyerInfo.firstName}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
        {order.shippingDetails.address}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>City:</span>{" "}
        {order.shippingDetails.city}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>State:</span>{" "}
        {order.shippingDetails.state}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Zip Code:</span>{" "}
        {order.shippingDetails.zipCode}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Ticket Number:</span>{" "}
        {order.paymentInfo.ticketNumber}
      </Text>
      <Badge
        style={{ marginTop: 10 }}
        color={order.status === "pending" ? "orange" : "teal"}
        variant="light"
      >
        {order.status}
      </Badge>
      <Text style={{ marginTop: 10 }}>
        <span style={{ fontWeight: "bold" }}>Created At:</span>{" "}
        {order.createdAt}
      </Text>
    </>
  );
};

export default OrderDetails;
