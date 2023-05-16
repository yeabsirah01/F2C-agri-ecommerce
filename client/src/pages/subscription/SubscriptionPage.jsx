// import React, { useEffect, useState } from "react";
// import { Card, Button } from "@mantine/core";
// import axiosConfig from "../../axiosConfig";
// import { useSelector } from "react-redux";

// function SubscriptionCard({ days, name, discountPercentage }) {
//   const unitPrice = getUnitPrice(days);
//   const finalPrice = unitPrice * (days / 30) * (1 - discountPercentage / 100);

//   async function handleClick() {
//     const item = {
//       ItemId: days,
//       ItemName: name,
//       UnitPrice: finalPrice,
//       Quantity: 1,
//     };
//     try {
//       const response = await axiosConfig.post("/subscribe", item);
//       if (response.data) {
//         window.location = response.data.redirectUrl;
//         console.log(response.data);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(
//         "An error occurred while processing your subscription. Please try again later."
//       );
//     }
//   }

//   function getUnitPrice(days) {
//     switch (days) {
//       case 30:
//       case 180:
//       case 366:
//         return 100;
//       default:
//         return 1;
//     }
//   }

//   return (
//     <Card shadow="sm" padding="md">
//       <h3>{days}-Day Subscription</h3>
//       <p>Price: {finalPrice.toFixed(2)} Birr</p>
//       <p>Discount: {discountPercentage}% Birr</p>
//       <Button variant="outline" onClick={handleClick}>
//         Subscribe
//       </Button>
//     </Card>
//   );
// }
// function SubscriptionPage() {
//   const { role, firstName, profilePicture, subscription } = useSelector(
//     (state) => state.user
//   );
//   console.log(subscription);
//   const { status, endDate, startDate } = subscription ?? {};
//   const isActive = status === "active";
//   const daysLeft = Math.ceil(
//     (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
//   );
//   return (
//     <>
//       {isActive ? (
//         <p>Your subscription is currently active.</p>
//       ) : (
//         <p>Your subscription has expired.</p>
//       )}

//       {isActive && <p>You have {daysLeft} days left in your subscription.</p>}

//       <div>
//         <SubscriptionCard
//           days={30}
//           name="Monthly Subscription"
//           discountPercentage={0}
//         />
//         <SubscriptionCard
//           days={180}
//           name="6 Month Subscription"
//           discountPercentage={10}
//         />
//         <SubscriptionCard
//           days={366}
//           name="Yearly Subscription"
//           discountPercentage={20}
//         />
//       </div>
//     </>
//   );
// }

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

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: 400,
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

export function SubscriptionCard({ days, name, discountPercentage }) {
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
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{days}-Day Subscription</Text>
          <Text fz="xs" c="dimmed">
            nice
          </Text>
        </div>
        <Badge variant="outline">Discount: {discountPercentage}% Birr</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

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
    <>
      {isActive ? (
        <p>Your subscription is currently active.</p>
      ) : (
        <p>Your subscription has expired.</p>
      )}

      {isActive && <p>You have {daysLeft} days left in your subscription.</p>}

      <div style={styles.subscriptionContainer}>
        <SubscriptionCard
          days={30}
          name="Monthly Subscription"
          discountPercentage={0}
        />
        <SubscriptionCard
          days={180}
          name="6 Month Subscription"
          discountPercentage={10}
        />
        <SubscriptionCard
          days={366}
          name="Yearly Subscription"
          discountPercentage={20}
        />
      </div>
    </>
  );
}

const styles = {
  subscriptionContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default SubscriptionPage;
