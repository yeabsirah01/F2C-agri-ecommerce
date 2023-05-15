// import { useEffect, useState } from "react";
// import axios from "axios";
import axiosConfig from "../../../axiosConfig";
import { Formik, Form } from "formik";
// import { useEffect } from "react";
// import { useState } from "react";
import * as Yup from "yup";

import Button from "../../../components/button/";
import ImageUploader from "../../../components/imageUploader";
import {
  TextInput,
  SelectInput,
  TextAreaInput,
} from "../../../components/inputs";
import { useParams, useNavigate } from "react-router-dom";
import "./../../createProduct/styles.css";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, LoadingOverlay, Modal, Image } from "@mantine/core";
import { useSelector } from "react-redux";

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
};

const UpdateUserInfo = ({ user }) => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //
  const [_initialValues, setInitialValues] = useState(initialValues);
  const { id } = useParams();
  const { _id } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const token = `Bearer ${localStorage.getItem("cookie")}`;
      const { data } = await axiosConfig.get(`/users/${_id}`, {
        headers: {
          Authorization: token,
          "content-type": "multipart/form-data",
        },
      });
      setInitialValues(data);
    };
    getUser();
  }, [_id]);
  const [profilePicture, setprofilePicture] = useState("");

  const handleSubmit = async (formData) => {
    const _formData = new FormData();
    _formData.append("firstName", formData.firstName);
    _formData.append("lastName", formData.lastName);
    _formData.append("address", formData.address);
    _formData.append("pinCode", formData.pinCode);
    _formData.append("role", formData.role);
    _formData.append("region", formData.region);
    _formData.append("gender", formData.gender);
    _formData.append("email", formData.email);
    _formData.append("profilePicture", profilePicture);

    _formData.append("phone", formData.phone);
    const headers = { "Content-Type": "multipart/form-data" };
    try {
      await axiosConfig.put(`/users/${_id}`, _formData, {
        headers,
      });
      toast.success("User Info updated");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Something went wrong",
        "login-error"
      );
    }
  };

  //   ???????????

  return (
    <div className="createProduct">
      <h1 className="title">Edit Product</h1>
      <Formik
        initialValues={_initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        {() => {
          return (
            <Form className="form">
              <TextInput
                name="firstName"
                label="First Name *"
                placeholder="Enter your first name"
              />
              <TextInput
                name="lastName"
                label="Last Name *"
                placeholder="Enter your last name"
              />
              <TextInput
                name="address"
                label="Address *"
                placeholder="Enter your address"
              />
              <TextInput
                name="pinCode"
                label="Pin Code *"
                placeholder="Enter your pin code"
              />
              <SelectInput
                label="Role *"
                options={["Admin", "Manager", "Employee"]}
                placeholder="Select your role"
                name="role"
              />
              <TextInput
                name="region"
                label="Region *"
                placeholder="Enter your region"
              />
              <SelectInput
                label="Gender *"
                options={["Male", "Female", "Other"]}
                placeholder="Select your gender"
                name="gender"
              />
              <TextInput
                name="email"
                label="Email *"
                placeholder="Enter your email"
              />
              <TextInput
                name="password"
                label="Password *"
                placeholder="Enter your password"
                type="password"
              />
              <TextInput
                name="phone"
                label="Phone *"
                placeholder="Enter your phone number"
                type="tel"
              />{" "}
              <Button
                label="Cancel"
                style={{
                  gridColumnStart: "4",
                  gridColumnEnd: "7",
                }}
                type="reset"
                onClick={() => {
                  navigate("/");
                }}
              />
              <Button
                label="Edit"
                style={{
                  gridColumnStart: "7",
                  gridColumnEnd: "10",
                }}
              />
            </Form>
          );
        }}
      </Formik>
      <ImageUploader
        image={_initialValues.profilePicture}
        onChange={(profilePicture) => {
          setprofilePicture(profilePicture);
        }}
      />
    </div>
  );
};

export default UpdateUserInfo;
