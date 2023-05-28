import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../../axiosConfig";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../components/button/";
import ImageUploader from "../../../components/imageUploader";
import {
  TextInput,
  SelectInput,
  TextAreaInput,
} from "../../../components/inputs";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";
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
  payment: { paymentNumber: "", paymentPdt: "" },
};

const UpdateUserInfo = ({ user }) => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_initialValues, setInitialValues] = useState(initialValues);
  const { id } = useParams();
  const { _id, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profilePicture, setprofilePicture] = useState("");

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
    _formData.append("paymentNumber", formData.paymentNumber);
    _formData.append("paymentPdt", formData.paymentPdt);
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

  return (
    <div className="edit-profile">
      <h1 className="title">Edit Profile</h1>
      <Formik
        initialValues={_initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        {() => {
          return (
            <Form className="form">
              <div className="form-column">
                <div className="image-uploader-container">
                  <ImageUploader
                    image={_initialValues.profilePicture}
                    onChange={(profilePicture) => {
                      setprofilePicture(profilePicture);
                    }}
                  />
                </div>
              </div>
              <div className="form-column">
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
                  name="region"
                  label="Region *"
                  placeholder="Enter your region"
                />

                <TextInput
                  name="email"
                  label="Email *"
                  placeholder="Enter your email"
                />
                <TextInput
                  name="phone"
                  label="Phone *"
                  placeholder="Enter your phone number"
                  type="tel"
                />
                <TextInput
                  name="password"
                  label="Password *"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              {role === "Farmer" && (
                <div className="form-column">
                  <p>Fill this form to accept yeneoay</p>
                  <div className="payment-form">
                    <TextInput
                      name="paymentNumber"
                      label="Payment Number *"
                      placeholder="Enter your payment number"
                    />
                    <TextInput
                      name="paymentPdt"
                      label="Payment PDT *"
                      placeholder="Enter your payment PDT"
                    />
                  </div>
                </div>
              )}
              :<div></div>
              <div className="button-container">
                <Button
                  label="Cancel"
                  className="cancel-button"
                  type="reset"
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <Button label="Edit" className="edit-button" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateUserInfo;
