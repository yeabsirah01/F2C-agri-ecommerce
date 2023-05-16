import { Accordion, Badge, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosConfig.get(`/orders/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <p>hey</p>
      {orders.map((order) => (
        <Accordion
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
              {order.orderNumber}{" "}
              <Text>
                {/* <span style={{ fontWeight: "bold" }}>Seller:</span>{" "} */}
                {order.products.map((product) => {
                  return <span key={product.id}>{product.name}</span>;
                })}
              </Text>
              <Badge
                style={{ marginTop: 10 }}
                color={order.status === "pending" ? "orange" : "teal"}
                variant="light"
              >
                {order.status}
              </Badge>
            </Accordion.Control>

            <Accordion.Panel>
              <Text>
                <span style={{ fontWeight: "bold" }}>Seller:</span>{" "}
                {order.sellerInfo}
              </Text>
              <Text>
                <span style={{ fontWeight: "bold" }}>Buyer:</span>{" "}
                {order.buyerInfo}
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
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}

export default Orders;
