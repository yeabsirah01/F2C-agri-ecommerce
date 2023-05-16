import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const BadgeCard = ({ image, title, description, country, badges }) => {
  const { classes, theme } = useStyles();

  const features = badges.map((badge) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm">{country}</Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [days, setDays] = useState(30);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    setFee(days * 1); // Set fee to $1 per day
  }, [days]);

  const handleDaysChange = (event) => {
    setDays(Number(event.target.value));
  };

  const handleSubscription = async () => {
    try {
      const response = await axiosConfig.post("/subscribe", { days });
      alert(response.data.message);
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while processing your subscription. Please try again later."
      );
    }
  };

  return (
    <Modal
      title="Subscribe"
      opened={isOpen}
      onClose={onClose}
      closeButtonLabel="Close"
      actions={[
        { type: "button", label: "Cancel", onClick: onClose },
        { type: "submit", label: "Subscribe", onClick: handleSubscription },
      ]}
    >
      <p>Select number of days:</p>
      <input type="number" value={days} onChange={handleDaysChange} />
      <p>Fee: ${fee}</p>
      <BadgeCard
        image="path_to_image"
        title="Card Title"
        country="Card Country"
        description="Card Description"
        badges={[
          { emoji: "🌟", label: "Feature 1" },
          { emoji: "⚡️", label: "Feature 2" },
        ]}
      />
    </Modal>
  );
};

export default SubscriptionModal;
