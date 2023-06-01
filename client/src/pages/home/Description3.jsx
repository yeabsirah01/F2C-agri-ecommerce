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
import image from "../../assets/farmer (1).jfif";

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

export function Description3() {
  const { classes } = useStyles();
  return (
    <div>
      <Container size={1600}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Benefits for <span className={classes.highlight}>Consumer</span>{" "}
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
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Freshness: </b> –Access to fresh, locally sourced products.
                and confirmed reliably.
              </List.Item>
              <List.Item>
                <b>Variety:</b> – Wide range of choices and unique offerings.
              </List.Item>
              <List.Item>
                <b> Competitive pricing:</b> – Fair prices and cost savings.
              </List.Item>
              <List.Item>
                <b> Connection: </b> – Direct interaction with farmers.
              </List.Item>
              <List.Item>
                <b> Convenience: </b> – Easy and accessible shopping experience.
              </List.Item>
              <List.Item>
                <b> Transparency: </b> – Information and trust in product
                origins.
              </List.Item>
              <List.Item>
                <b> Support: </b> – Contributing to local farmers and
                communities.
              </List.Item>
            </List>
          </div>
          <Image width={600} src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
