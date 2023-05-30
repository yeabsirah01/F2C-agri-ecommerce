import React, { useEffect, useState } from "react";
import { Card, Button } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { useSelector } from "react-redux";
import {
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  rem,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import logo from "../../assets/final logo green.png";

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: 300,
    height: 500,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: "feture 2", icon: IconUsers },
  { label: "feture 1", icon: IconGauge },
  { label: "feture 3", icon: IconManualGearbox },
  { label: "feture 4", icon: IconGasStation },
];

export function SubscriptionCard({
  days,
  name,
  discountPercentage,
  month,
  year,
}) {
  const unitPrice = getUnitPrice(days);
  const finalPrice = unitPrice * (days / 30) * (1 - discountPercentage / 100);

  async function handleClick() {
    const item = {
      ItemId: days,
      ItemName: name,
      UnitPrice: finalPrice,
      Quantity: 1,
    };
    try {
      const response = await axiosConfig.post("/subscribe", item);
      if (response.data) {
        window.location = response.data.redirectUrl;
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while processing your subscription. Please try again later."
      );
    }
  }

  function getUnitPrice(days) {
    switch (days) {
      case 30:
      case 180:
      case 366:
        return 100;
      default:
        return 1;
    }
  }

  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      className={classes.card}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        // backgroundColor:"#77AB59"
        boxShadow: "1px 12px 20px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "12px",

          backgroundImage: "linear-gradient(to bottom right, #FFFFFF, #F8F8F8)",
          zIndex: -1,
        }}
      ></div>

      <Card.Section className={classes.imageSection}>
        <Image src={logo} alt="LOGO" />
      </Card.Section>

      <Group position="apart" mt="md" style={{ marginTop: "52px" }}>
        <div>
          {!year ? (
            <Text fw={500}>{month}-Month Subscription</Text>
          ) : (
            <Text fw={500}>{year}-Year Subscription</Text>
          )}
          <Text fz="xs" c="dimmed">
            Subscription Pckage
          </Text>
        </div>
        {!discountPercentage ? null : (
          <Badge variant="outline">Discount: {discountPercentage}%</Badge>
        )}
      </Group>

      {/* <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>
      </Card.Section> */}

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              Price: {finalPrice.toFixed(2)} Birr
            </Text>
          </div>

          <Button
            variant="outline"
            onClick={handleClick}
            radius="xl"
            style={{ flex: 1 }}
          >
            Subscribe
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

function SubscriptionPage() {
  const { role, firstName, profilePicture, subscription } = useSelector(
    (state) => state.user
  );
  console.log(subscription);
  const { status, endDate, startDate } = subscription ?? {};
  const isActive = status === "active";
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div style={{ marginTop: "52px" }}>
      {isActive ? (
        <p>Your subscription is currently active.</p>
      ) : (
        <p>Your subscription has expired.</p>
      )}

      {isActive && <p>You have {daysLeft} days left in your subscription.</p>}

      <div style={styles.subscriptionContainer}>
        <SubscriptionCard
          days={30}
          month={1}
          name="Monthly Subscription"
          discountPercentage={0}
        />
        <SubscriptionCard
          month={6}
          days={180}
          name="6 Month Subscription"
          discountPercentage={10}
        />
        <SubscriptionCard
          year={1}
          days={366}
          name="Yearly Subscription"
          discountPercentage={20}
        />
      </div>
    </div>
  );
}

const styles = {
  subscriptionContainer: {
    paddingLeft: "100px",
    paddingRight: "100px",
    height: "70vh",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
};

export default SubscriptionPage;
