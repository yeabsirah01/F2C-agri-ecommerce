import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import * as Yup from "yup";
import axiosConfig from "../../axiosConfig";
import Button from "../../components/button";
import ImageUploader from "../../components/imageUploader";
import { TextInput, SelectInput, TextAreaInput } from "../../components/inputs";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";

const initialValues = {
  category: "select",
  name: "",
  price: "",
  stock: { unit: "", value: "" },

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
  name: Yup.string().min(2).max(20).required("Product name is required"),
  price: Yup.number().max(10000, "Invalid price").required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  stockUnit: Yup.string().required("Stock unit is required"), // Add validation for stockUnit
  description: Yup.string().required("Description is required"),
});

const EditProduct = () => {
  const [_initialValues, setInitialValues] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axiosConfig.get(`/products/${id}`);
      setInitialValues(data);
      // console.log(_initialValues);
    };
    getProduct();
  }, [id]);
  const [image, setImage] = useState("");
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
      await axiosConfig.put("/products/" + _initialValues._id, _formData, {
        headers,
      });
      toast.success("Product updated");
      // navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Something went wrong",
        "login-error"
      );
    }
  };
  return (
    <div className="createProduct">
      <h1 className="title">Edit Product</h1>
      <Formik
        initialValues={_initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="form">
              <SelectInput
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
        image={_initialValues.image}
        onChange={(image) => {
          setImage(image);
        }}
      />
    </div>
  );
};

export default EditProduct;
