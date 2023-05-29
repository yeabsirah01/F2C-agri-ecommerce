// const Profilee = () => {
//
//   console.log(_initialValues);
//   return (
//     <div className="createProduct">
//       <h1 className="title">My Profile</h1>
//
//       <div style={formContainerStyle}>
//         <Text>First Name: {_initialValues.firstName}</Text>
//         <Text>Last Name: {_initialValues.lastName}</Text>
//         <Text>Address: {_initialValues.address}</Text>
//         <Text>Pin Code: {_initialValues.pinCode}</Text>
//         <Text>Role: {_initialValues.role}</Text>
//         <Text>Region: {_initialValues.region}</Text>
//         <Text>Gender: {_initialValues.gender}</Text>
//         <Text>Email: {_initialValues.email}</Text>
//         <Text>Password: {_initialValues.password}</Text>
//         <Text>Phone: {_initialValues.phone}</Text>
//         {role !== "Admin" ? (
//           <>
//             <Text>
//               Payment Info Number: {_initialValues.paymentInfo.number}
//             </Text>
//             <Text>Subscription: {_initialValues.subscription.status}</Text>
//             <Text>Payment Info PDT: {_initialValues.paymentInfo.pdt}</Text>
//           </>
//         ) : null}
//       </div>

//       <div className="avatar">
//         <img
//           src={`http://localhost:5000/${_initialValues.profilePicture}`}
//           alt={"altText"}
//           crossOrigin="cross-origin"
//         />
//       </div>
//     </div>
//   );
// };

// export default Profilee;

// import { useEffect, useState } from "react";
// import axios from "axios";
import axiosConfig from "../../../axiosConfig";
import { Formik, Form } from "formik";
// import { useEffect } from "react";
// import { useState } from "react";
import * as Yup from "yup";
import placeholderImage from "../../../assets/Default_ava.png";

// import Button from "../../../components/button/";
import ImageUploader from "../../../components/imageUploader";
import {
  TextInput,
  SelectInput,
  TextAreaInput,
} from "../../../components/inputs";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./../../createProduct/styles.css";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  LoadingOverlay,
  Modal,
  Image,
  Button,
  Text,
  Paper,
  Badge,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useSelector } from "react-redux";

import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const PRIMARY_COL_HEIGHT = rem(500);

export function Profilee() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    pinCode: "",
    role: "",
    region: "",
    gender: "",
    email: "",
    profilePicture: "",
    phone: "",
    paymentInfo: "",
    subscription: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  //
  const [_initialValues, setInitialValues] = useState(initialValues);

  const { _id, role } = useSelector((state) => state.user);
  const [responseStatus, setResponseStatus] = useState(null);

  const styleText =
    role === "Admin" || role === "Transporter"
      ? { color: "#FFFFFF" }
      : { color: "#333333" };

  const styleText2 =
    role === "Admin" || role === "Transporter"
      ? { color: "#C68642", fontWeight: "bold" }
      : { color: "#8B5A2B", fontWeight: "bold" };
  const styleText3 =
    role === "Admin" || role === "Transporter"
      ? { color: "#FFFFFF", fontWeight: "normal" }
      : { color: "#333333", fontWeight: "normal" };

  const containerStyle = {
    // background: "linear-gradient(45deg, #FFFFFF, #F2F2F2)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",

    borderColor: "#FFFFFF",
    borderRadius: "4px",
    paddingLeft: "80px",
    // Add other styles as needed
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const token = `Bearer ${localStorage.getItem("cookie")}`;
  //     const { status, data } = await axiosConfig.get(`/users/${_id}`, {
  //       headers: {
  //         Authorization: token,
  //         "content-type": "multipart/form-data",
  //       },
  //     });
  //     console.log(status);
  //     setInitialValues(data);
  //     setResponseStatus(data.status);
  //   };
  //   getUser();
  // }, [_id]);
  const [profilePicture, setprofilePicture] = useState("");

  //   ???????????

  const [isEmailVerified, setIsEmailVerified] = useState(false); // Add state for email verification

  useEffect(() => {
    const getUser = async () => {
      const token = `Bearer ${localStorage.getItem("cookie")}`;
      setIsLoading(true);
      try {
        const { status, data } = await axiosConfig.get(`/users/${_id}`, {
          headers: {
            Authorization: token,
            "content-type": "multipart/form-data",
          },
        });
        setInitialValues(data);
        setIsEmailVerified(data.isVerified); // Set email verification status

        console.log(status);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 428) {
          setResponseStatus(428);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);
  console.log(responseStatus);

  // Overlay styles
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const avatar = {
    borderRadius: "50%",
    width: "10%",
  };
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const navigate = useNavigate();
  return (
    <div className="createProduct">
      <h1 className="title">My Profile</h1>

      <div style={formContainerStyle}>
        {/* Render email verification overlay */}
        {responseStatus === 428 && (
          <div style={overlayStyle}>
            <Text style={{ fontSize: "30px", color: "white" }}>
              Email is not verified. check your inbox
            </Text>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </Button>
          </div>
        )}
        <div style={{ paddingLeft: "100px" }}>
          {/* <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon> */}

          <Text fz="20px" c={"#8B5A2B"} className="title">
            My Profile
          </Text>
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            style={{ width: "68vw", borderRadius: "50%" }}
          >
            <div
              style={{
                borderColor: "#FFFFFF",
                borderRadius: "4px",
                paddingRight: "80px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "45px",

                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      transform: "scale(1.4)",
                      // borderRadius: "50%",
                      objectFit: "center",
                    }}
                    src={
                      _initialValues.profilePicture
                        ? `http://localhost:5000/${_initialValues.profilePicture}`
                        : placeholderImage
                    }
                    alt={"Profile imag"}
                    crossOrigin="cross-origin"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  variant="gradient"
                  gradient={{ from: "#00FF00 ", to: "#008000", deg: 90 }}
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  fz="30px"
                  fw={700}
                >
                  {_initialValues.firstName.charAt(0).toUpperCase() +
                    _initialValues.firstName.slice(1)}
                  <span style={{ marginRight: "4px" }}></span>
                  {_initialValues.lastName.charAt(0).toUpperCase() +
                    _initialValues.lastName.slice(1)}
                </Text>
                <Badge fz="15px" color="teal">
                  Role: {_initialValues.role}
                </Badge>
              </div>
              {/* <p style={styleText}>
            Bio: {_initialValues.firstName} is a hardworking and dedicated
            farmer with a deep-rooted passion for the land. Born and raised in a
            farming family, he has been tilling the soil since he was old enough
            to hold a shovel. With years of experience under his belt, John has
            developed an intimate understanding of the cycles of nature and the
            art of nurturing crops.
          </p> */}
            </div>
            <Grid gutter="md">
              <Grid.Col>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center ",
                    paddingLeft: "120px",
                  }}
                >
                  <Button
                    variant="outline"
                    color="green"
                    size="md"
                    style={styleText}
                  >
                    <Link
                      to={`/dashboard/updateuserinfo`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Edit Profile
                    </Link>
                  </Button>
                </div>

                <div style={containerStyle}>
                  <div padding="md" shadow="xs" radius="sm">
                    <Text style={styleText2}>
                      First Name:{" "}
                      <span style={styleText3}>
                        {_initialValues.firstName.charAt(0).toUpperCase() +
                          _initialValues.firstName.slice(1)}
                      </span>
                    </Text>
                    <Text style={styleText2}>
                      Last Name:{" "}
                      <span style={styleText3}>
                        {_initialValues.lastName.charAt(0).toUpperCase() +
                          _initialValues.lastName.slice(1)}
                      </span>
                    </Text>
                    <Text style={styleText2}>
                      Address:{" "}
                      <span style={styleText3}>{_initialValues.address}</span>
                    </Text>
                    <Text style={styleText2}>
                      Region:{" "}
                      <span style={styleText3}>{_initialValues.region}</span>
                    </Text>
                  </div>
                  <div padding="md" shadow="xs" radius="sm">
                    <Text style={styleText2}>
                      Gender:{" "}
                      <span style={styleText3}>{_initialValues.gender}</span>
                    </Text>
                    <Text style={styleText2}>
                      Email:{" "}
                      <span style={styleText3}>{_initialValues.email}</span>
                    </Text>
                    <Text style={styleText2}>
                      Phone:{" "}
                      <span style={styleText3}>{_initialValues.phone}</span>
                    </Text>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                {role === "Consumer" || role === "Farmer" ? (
                  <div
                    style={{
                      background: "linear-gradient(45deg, #FFFFFF, #F2F2F2)",

                      borderColor: "#FFFFFF",
                      borderRadius: "4px",
                    }}
                  >
                    <Text style={styleText2}>
                      Payment Info Number:{" "}
                      <span style={styleText3}>
                        {_initialValues.paymentInfo.number}
                      </span>
                    </Text>
                    <Text style={styleText2}>
                      Subscription:{" "}
                      <span style={styleText3}>
                        {" "}
                        {_initialValues.subscription.status}
                      </span>
                    </Text>
                    <Text style={styleText2}>
                      Payment Info PDT:{" "}
                      <span style={styleText3}>
                        {" "}
                        {_initialValues.paymentInfo.pdt}
                      </span>
                    </Text>
                  </div>
                ) : null}
              </Grid.Col>
              <Grid.Col span={6}>
                {" "}
                <div
                  style={{
                    // background: "linear-gradient(45deg, #FFFFFF, #F2F2F2)",

                    borderColor: "#FFFFFF",
                    borderRadius: "4px",
                  }}
                >
                  sale info{" "}
                </div>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export default Profilee;
