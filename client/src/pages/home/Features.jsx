import React from "react";
import { createStyles, Text, SimpleGrid, Container, rem } from "@mantine/core";
import { IconTruck, IconCertificate, IconCoin } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: rem(100),
    width: rem(160),
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: "green",
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

function Feature({ icon: Icon, title, description, className, ...others }) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={rem(38)} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: "Direct access to fresh produce",
    description:
      "locally sourced produce: Farmer-to-consumer agri e-commerce platforms provide consumers with direct access to fresh and locally sourced produce. By eliminating intermediaries like wholesalers and retailers, ",
  },
  {
    icon: IconCertificate,
    title: "Transparency and traceability: ",
    description:
      "Agri e-commerce platforms often prioritize transparency and traceability, providing consumers with detailed information about the origin, cultivation practices, and handling of the produce they purchase.",
  },
  {
    icon: IconCoin,
    title: "Enhanced Efficiency:",
    description:
      " Conducting agricultural transactions online eliminates the need for physical visits to markets or retail stores, saving time and effort for both farmers and consumers.",
  },
];

export function Features() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
