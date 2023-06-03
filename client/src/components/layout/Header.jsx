import AvatarIcon from "./AvatarIcon";
import CartIcon from "../../pages/cart/cartIcon";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import Login from "./../../pages/auth/Loginn";
import SignUp from "../../pages/auth/SignUp";
import { AppShell, Navbar } from "@mantine/core";
import { useSelector } from "react-redux";
import Logo from "../../assets/final Logo1.png";

const useStyles = createStyles((theme) => ({
  link: {
    primaryShade: 1,
    backgroundColor: theme.backgroundColor,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: 16,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",

    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Take a Tour",
    description: "If you are new here, use the tour ",
  },
  {
    icon: IconCoin,
    title: "FAQ",
    description: "Mostly asked question before",
    href: "/faq",
  },

  {
    icon: IconFingerprint,
    title: "Community",
    description: "The shell’s rounded shape and the grooves on its.",
  },
];

function AppHeader() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const isLoggedIn = true;
  //   console.log(props.isLoggedIn);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const isAuthenticated = useSelector((state) => !!state.user.token);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <a style={{ textDecoration: "none" }} href={item.href}>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </a>
        </div>
      </Group>
    </UnstyledButton>
  ));

  function handleLoginModalClose() {
    setShowLoginModal(false);
  }

  function handleLoginButtonClick() {
    setShowLoginModal(true);
    closeDrawer();
  }
  function handleSignUpModalClose() {
    setShowSignUpModal(false);
  }

  function handleSignUpButtonClick() {
    setShowSignUpModal(true);
    closeDrawer();
  }

  return (
    <Box pb={0}>
      <Header
        withBorder={false}
        height={60}
        p="xs"
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
        px="md"
        bg="#51cf49"
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <img
            src={Logo}
            alt={"logo"}
            style={{ position: "relative", top: -5, width: 80, height: 40 }}
          />

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a href="/" className={classes.link}>
              Home
            </a>

            <a href="/Products" className={classes.link}>
              Products
            </a>
            {isAuthenticated ? (
              <a href="/pricing" className={classes.link}>
                Pricing
              </a>
            ) : null}

            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="/" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Learn
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Learn</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="/aboutus" className={classes.link}>
              About Us
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            {isAuthenticated ? (
              <>
                <CartIcon />
                <div styles={{ position: "relative", top: "70px" }}>
                  <AvatarIcon />
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  color="red.8"
                  onClick={handleLoginButtonClick}
                >
                  Log in
                </Button>
                <Button
                  color="green.9"
                  variant="filled"
                  onClick={handleSignUpButtonClick}
                >
                  Sign up
                </Button>
              </>
            )}
          </Group>

          <Group
            style={{ position: "absolute", right: 50, top: 10 }}
            className={classes.hiddenDesktop}
          >
            {isAuthenticated ? (
              <>
                <div
                  styles={{
                    position: "absolute",
                    left: "400px",
                    top: "700px",
                  }}
                >
                  <CartIcon />
                </div>

                <div styles={{ position: "relative", top: "70px" }}>
                  <AvatarIcon />
                </div>
              </>
            ) : null}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      {showLoginModal && <Login onClose={handleLoginModalClose} />}
      {showSignUpModal && <SignUp onClose={handleSignUpModalClose} />}
      {/* ----------------------------------------- */}

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        bg="#49b340"
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/products" className={classes.link}>
            Products
          </a>
          {isAuthenticated ? (
            <a href="/pricing" className={classes.link}>
              Pricing
            </a>
          ) : null}
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Learn
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <a href="#" className={classes.link}>
            About Us
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {!isAuthenticated ? (
            <Group position="center" grow pb="xl" px="md">
              <Button variant="outline" onClick={handleLoginButtonClick}>
                Log in
              </Button>
              <Button variant="filled" onClick={handleSignUpButtonClick}>
                Sign up
              </Button>
            </Group>
          ) : null}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default AppHeader;
