import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../../assets/farmer (3).jfif";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(900),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function Description1() {
  const { classes } = useStyles();
  return (
    <div>
      <Container size={1600}>
        <div className={classes.inner}>
          <Image width={600} src={image} className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>
              Benefits for <span className={classes.highlight}>Farmers</span>{" "}
              <br />{" "}
            </Title>
            {/* <Text color="dimmed" mt="md">
              trade your free ecoomerce
            </Text> */}

            <List
              mt={30}
              spacing="sm"
              size="lg"
              icon={
                <ThemeIcon color="teal" size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Direct market access: </b> – Sell products without
                intermediaries.
              </List.Item>
              <List.Item>
                <b>Increased market reach:</b> – Reach a broader customer base.
              </List.Item>
              <List.Item>
                <b> Better price realization:</b> – Set fair prices based on
                demand and costs.
              </List.Item>
              <List.Item>
                <b> Improved market transparency:</b> – Showcase product details
                and build trust.
              </List.Item>
              <List.Item>
                <b> Reduced marketing costs:</b> – Cost-effective promotion and
                advertising.
              </List.Item>
              <List.Item>
                <b>Efficient logistics and order management:</b> – Streamline
                operations.
              </List.Item>
              <List.Item>
                <b>Consumer feedback and loyalty:</b> – Receive insights and
                foster customer relationships.
              </List.Item>
            </List>
          </div>
        </div>
      </Container>
    </div>
  );
}
