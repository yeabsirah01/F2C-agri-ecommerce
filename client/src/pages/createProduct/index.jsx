import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Button from "../../components/button";
import ImageUploader from "../../components/imageUploader";
import { TextInput, SelectInput, TextAreaInput } from "../../components/inputs";
import "./styles.css";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axiosConfig from "../../axiosConfig";

const initialValues = {
  category: "select",
  name: "",
  price: "",
  unit: "",
  value: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category is required")
    .oneOf(
      ["ፍራፍሬዎች", "አትክልቶች", "ጥራጥሬ", "እህል", "ቅመም", "ቡና", "የእንስሳት ተዋዕፆ", "እንስሳት"],
      "Category is required"
    ),
  name: Yup.string()

    .min(2)
    .max(20)
    .required("Product name is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .max(10000, "Invalid price")
    .required("Price is required"),
  stock: Yup.number()
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  stockUnit: Yup.string().required("Stock unit is required"),
  description: Yup.string().required("Description is required"),
});

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    const _formData = new FormData();
    _formData.append("category", formData.category);
    _formData.append("name", formData.name);
    _formData.append("price", formData.price);
    _formData.append("value", formData.stock);
    _formData.append("unit", formData.stockUnit);
    _formData.append("description", formData.description);
    _formData.append("image", image);
    const headers = { "Content-Type": "multipart/form-data" };
    try {
      await axiosConfig.post("/products", _formData, { headers });
      toast.success("Product created");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Something went wrong",
        "login-error"
      );
    }
  };

  return (
    <div className="createProduct">
      <h1 className="title">Create New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="form">
              <SelectInput
                backgroundColor
                className="select"
                label="Select category *"
                options={[
                  "ፍራፍሬዎች",
                  "አትክልቶች",
                  "ጥራጥሬ",
                  "እህል",
                  "ቅመም",
                  "ቡና",
                  "የእንስሳት ተዋዕፆ",
                  "እንስሳት",
                ]}
                placeholder="Category"
                name="category"
              />
              <TextInput
                name="name"
                label="Product name *"
                placeholder="Enter product name"
              />

              <TextInput
                name="price"
                type="number"
                label="Product price *"
                placeholder="Product price per KG"
              />
              <TextInput
                name="stock"
                type="number"
                label="Product stock *"
                placeholder="Stock in KG"
              />
              <SelectInput
                label="Select stock unit *"
                options={["KG", "Lt", "Piece"]} // Add the options for stock units
                placeholder="Stock unit"
                name="stockUnit"
              />

              <TextAreaInput
                style={{ width: 500 }}
                name="description"
                placeholder="Enter description"
                label="Description *"
              />
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
                label="Create"
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
        onChange={(image) => {
          setImage(image);
        }}
      />
    </div>
  );
};

export default CreateProduct;
