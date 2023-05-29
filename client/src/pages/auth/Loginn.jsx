import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Box } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";

import { login } from "../../features/userSlice";
import { toast } from "react-toastify";
import { setLoading } from "../../features/loadingSlice";
import Loading from "../../components/layout/Loading";
import SignUp from "./SignUp";
import { useState } from "react";

function Login({ onClose }) {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(true, {
    onOpen: () => {
      console.log("Opened");
    },
    onClose: () => {
      console.log("Closed");
    },
  });

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
    },
  });
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosConfig.post("/auth/login", formData);
      dispatch(login(data));

      onClose();
      toast.success("Logged in successfully !", {});
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        toastId: "login-error",
      });
    }
    dispatch(setLoading(false));
  };

  const [showSignup, setShowSignup] = useState(false);
  const handleSignupClick = () => {
    close(); // Close the entire modal
    setShowSignup(true); // Open the sign-up modal
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        c="#8ce99a"
        my="0"
        py="0"
      >
        <Loading isLoading={isLoading} />
        <div c="blue.6" ta="center">
          <h2
            style={{
              color: "red",
              padding: 0,
              margin: 0,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            LOG IN
          </h2>
        </div>

        <Box size={32} maw={340} mx="auto" position="absolute" left="90">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              data-autofocus
              variant="filled"
              withAsterisk
              label="Email"
              placeholder="example@mail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              variant="filled"
              label="Password"
              placeholder="pass123"
              mt="sm"
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="xl">
              <Button variant="outline" color="Green" type="submit" size="md">
                Log in
              </Button>
              <p
                className="loginForm__footer"
                style={{ gridColumn: "span 12" }}
              >
                Don't have an account?{" "}
                <button onClick={handleSignupClick} type="button">
                  Sign up
                </button>
              </p>
            </Group>
          </form>
        </Box>
      </Modal>
      {showSignup && <SignUp onClose={() => setShowSignup(false)} />}{" "}
      {/* Render the Signup component when showSignup is true */}
    </>
  );
}

export default Login;
