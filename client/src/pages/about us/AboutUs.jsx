import React from "react";
import { Container, Paper, Text, Badge, Avatar, Image } from "@mantine/core";

const AboutUsPage = () => {
  return (
    <Container size="md">
      <Paper padding="lg">
        <Text size="xl" align="center" style={{ marginBottom: "1rem" }}>
          Welcome to MOFER - Ethiopian Farmer-to-Consumer Agri Ecommerce
          Platform
        </Text>

        {/* <img
          src="../../assets/final logo green.png"
          alt="MOFER Logo"
          width={200}
          height={200}
          style={{ display: "block", margin: "0 auto", marginBottom: "2rem" }}
        /> */}

        <Text size="md" style={{ marginBottom: "1rem" }}>
          At MOFER, we connect Ethiopian farmers directly with consumers through
          our innovative agricultural e-commerce platform. Our goal is to
          empower farmers and provide consumers with fresh, high-quality produce
          while supporting local communities.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          With MOFER, you can browse a wide variety of agricultural products,
          including fruits, vegetables, grains, and dairy products, all sourced
          directly from local farmers. Our platform ensures that the produce you
          receive is fresh, ethically produced, and delivered straight to your
          doorstep.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          We take pride in promoting sustainable agriculture practices and
          fostering a direct connection between farmers and consumers. By
          eliminating intermediaries, we enable farmers to earn a fair income
          and consumers to access farm-fresh products at affordable prices.
        </Text>

        <Text size="md" style={{ marginBottom: "1rem" }}>
          Join us in supporting Ethiopian farmers and experiencing the joy of
          locally sourced, organic produce. Start browsing our wide range of
          products today and help build a sustainable future for agriculture in
          Ethiopia.
        </Text>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Badge color="blue" variant="light">
            Contact us for more information
          </Badge>
        </div>
        {/* 
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            src="/founder-avatar.png"
            alt="Founder Avatar"
            radius="xl"
            size={100}
            style={{ marginRight: "1rem" }}
          />
          <div>
            <Text size="lg" style={{ marginBottom: "0.5rem" }}>
              John Doe
            </Text>
            <Text size="sm" color="gray">
              Founder, MOFER
            </Text>
          </div>
        </div> */}
      </Paper>
    </Container>
  );
};

export default AboutUsPage;
