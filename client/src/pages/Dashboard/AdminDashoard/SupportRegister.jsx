import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosConfig from "../../../axiosConfig";
import { toast } from "react-toastify";
import Button from "../../../components/button";
import { SelectInput, TextInput } from "../../../components/inputs";

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  role: "CustomerSupport",
  region: "select",
  gender: "select",
  email: "",
  password: "",
  confirm: "",
  phone: "",
};

const regionOptions = [
  "Amhara",
  "Afar",
  "Benishangul-Gumuz",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "SNNP",
  "Tigray",
]; // Updated variable name

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  address: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  region: Yup.string().notOneOf(["select"], "Required"), // Updated method name
  gender: Yup.string().notOneOf(["select"], "Required"), // Updated method name
  email: Yup.string()
    .required("Required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    ),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password doesn't match")
    .required("Required"),
  phone: Yup.string().required("Required"),
});

const SupportRegister = () => {
  // Fixed missing "=" sign
  const handleSubmit = async (formData) => {
    try {
      await axiosConfig.post("/auth/register", formData);
      toast.success("User registered successfully", {
        toastId: "register-success",
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        toastId: "register-error",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <Form className="loginForm form">
          <TextInput
            label="First Name *"
            placeholder="Enter first name"
            name="firstName"
          />
          <TextInput
            label="Last Name *"
            placeholder="Enter last name"
            name="lastName"
          />
          <TextInput
            label="Address *"
            placeholder="Enter address"
            name="address"
          />
          <SelectInput
            label="Region *"
            options={regionOptions}
            placeholder="Select region"
            size={6}
            name="region"
          />
          <SelectInput
            label="Gender *"
            options={["Male", "Female", "Others"]}
            placeholder="Select gender"
            size={6}
            name="gender"
          />
          <TextInput
            label="Email *"
            placeholder="Enter email"
            type="email"
            name="email"
          />
          <TextInput
            label="Phone number *"
            placeholder="Enter phone number"
            type="tel"
            name="phone"
          />
          <TextInput
            label="Password *"
            placeholder="Enter password"
            type="password"
            size={6}
            name="password"
          />
          <TextInput
            label="Confirm Password *"
            placeholder="Confirm password"
            type="password"
            size={6}
            name="confirm"
          />

          <Button label="Sign Up" />
          <p className="loginForm__footer" style={{ gridColumn: `span 12` }}>
            Already have an account?{" "}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default SupportRegister;
