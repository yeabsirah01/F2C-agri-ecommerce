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
import { useParams, useNavigate, Link } from "react-router-dom";
import "./../../createProduct/styles.css";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, LoadingOverlay, Modal, Image, Text } from "@mantine/core";
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
  paymentInfo: "",
  subscription: "",
};

const Profilee = () => {
  const [isLoading, setIsLoading] = useState(false);
  //
  const [_initialValues, setInitialValues] = useState(initialValues);

  const { _id, role } = useSelector((state) => state.user);

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

  //   ???????????

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const formImageStyle = {
    borderRadius: "50%",
    width: "10%",
  };

  console.log(_initialValues);
  return (
    <div className="createProduct">
      <h1 className="title">My Profile</h1>
      <h1>
        <Link to={`/dashboard/updateuserinfo`}>update</Link>
      </h1>

      <div style={formContainerStyle}>
        <Text>First Name: {_initialValues.firstName}</Text>
        <Text>Last Name: {_initialValues.lastName}</Text>
        <Text>Address: {_initialValues.address}</Text>
        <Text>Pin Code: {_initialValues.pinCode}</Text>
        <Text>Role: {_initialValues.role}</Text>
        <Text>Region: {_initialValues.region}</Text>
        <Text>Gender: {_initialValues.gender}</Text>
        <Text>Email: {_initialValues.email}</Text>
        <Text>Password: {_initialValues.password}</Text>
        <Text>Phone: {_initialValues.phone}</Text>
        {role !== "Admin" ? (
          <>
            <Text>
              Payment Info Number: {_initialValues.paymentInfo.number}
            </Text>
            <Text>Subscription: {_initialValues.subscription.status}</Text>
            <Text>Payment Info PDT: {_initialValues.paymentInfo.pdt}</Text>
          </>
        ) : null}
      </div>

      <div className="avatar">
        <img
          src={`http://localhost:5000/${_initialValues.profilePicture}`}
          alt={"altText"}
          crossOrigin="cross-origin"
        />
      </div>
    </div>
  );
};

export default Profilee;
