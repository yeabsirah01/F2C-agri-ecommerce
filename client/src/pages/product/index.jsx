import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axiosConfig from "../../axiosConfig";
import noImage from "../../assets/no-image.png";
import "./styles.css";
import Button from "../../components/button";
import { Field, Form, Formik } from "formik";
import { SelectInput, TextAreaInput } from "../../components/inputs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/cartSlice";
import * as Yup from "yup";
import Review from "./review";
import { NumberInput } from "@mantine/core";

const weights = [
  "1 KG",
  "2 KG",
  "3 KG",
  "4 KG",
  "5 KG",
  "6 KG",
  "7 KG",
  "8 KG",
  "9 KG",
  "10 KG",
];

const validationSchema = Yup.object().shape({
  quantity: Yup.string()
    .required("quantity is required")
    .notOneOf(["select"], "quantity is required"),
});

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [review, setReview] = useState(0);
  useEffect(() => {
    const getProductData = async () => {
      try {
        const { data: product } = await axiosConfig.get("/products/" + id);
        const { data: seller } = await axiosConfig.get(
          "/users/" + product.createdBy
        );
        setProduct(product);
        setSeller(seller);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("unathorized");
          toast.error("Unauthorized Access! Please log in.");
        } else if (error.response && error.response.status === 402) {
          console.log("Unsubscribed");
          toast.error(
            "Unsubscribed user! Please buy subscription before access."
          );
        } else if (error.response && error.response.status === 428) {
          console.log("Not verfied email");
          toast.error("Email is not verified!! verify before access.");
          // Handle HTTP 402 error
          // Show a message to the user indicating they need to subscribe to access the resource
          // Redirect the user to the subscription page or take any other appropriate action
        } else {
          // Handle other errors
        }
      }
    };
    getProductData();
  }, [id]);

  const dispatch = useDispatch();
  const {
    cart: { products },
    user: { _id: userId },
  } = useSelector((state) => state);

  const addToCart = (formData) => {
    const productInCart = products.find((p) => p._id === product._id);
    const quantityValue = parseInt(formData.quantity);

    if (isNaN(quantityValue)) {
      toast.error("Invalid quantity");
    } else if (quantityValue > +product.stock.value) {
      toast.error("Don't have enough stock");
    } else if (
      productInCart &&
      +productInCart.quantity + quantityValue > +product.stock.value
    ) {
      toast.error("Don't have enough stock");
    } else {
      dispatch(addProduct({ ...product, quantity: quantityValue }));
    }
  };
  const isOwnProduct = product.createdBy === userId;
  const averageReview = (
    product.reviews?.reduce((acc, val) => acc + +val.count, 0) /
      product.reviews?.length || 0
  ).toFixed(1);
  const shouldDisplayReview =
    !isOwnProduct &&
    product.reviews?.every((val) => val.createdBy.id !== userId);

  const submitReview = async (formData) => {
    if (formData.review && review) {
      const { data } = await axiosConfig.put(
        "/products/review/" + product._id,
        {
          count: review,
          text: formData.review,
        }
      );
      setProduct(data);
      toast.success("Review Added");
    } else toast.error("Fill the review");
  };

  let stock = product.stock ? parseInt(product.stock.value) : 0;

  console.log(stock);
  return (
    <div className="productDetails">
      <div className="product__left">
        <div className="product__image">
          <img
            src={
              product.image ? `http://localhost:5000/${product.image}` : noImage
            }
            alt={product.name}
            crossOrigin="cross-origin"
          />
        </div>
        {isOwnProduct || (
          <Formik
            initialValues={{ quantity: "" }}
            validationSchema={validationSchema}
            onSubmit={addToCart}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form className="" onSubmit={handleSubmit}>
                {product.stock ? (
                  <Field name="quantity">
                    {({ field }) => (
                      <NumberInput
                        {...field}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                        label="Quantity"
                        placeholder="Enter Quantity"
                        min={1}
                        max={stock}
                        onChange={(value) => setFieldValue("quantity", value)}
                        error={touched.quantity && errors.quantity}
                        formatter={(value) =>
                          !Number.isNaN(parseFloat(value))
                            ? `${value} ${product.stock.unit}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                              )
                            : product.stock.unit
                        }
                      />
                    )}
                  </Field>
                ) : null}
                <Button label="Add to cart" size={6} type="submit" />
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div className="product__right">
        <h1 className="product__name">
          {product.name} <br /> <span>{product.category}</span>
        </h1>
        {product.stock && (
          <h2 className="product__price">
            <span className="titles">Price : </span> {product.price} ETB{" "}
            <span>
              ({product.stock.value} {product.stock.unit} Left)
            </span>
          </h2>
        )}

        <div className="product__rating">
          <p>{averageReview}</p>
          <AiFillStar />
        </div>
        <p className="product__description">
          <span className="titles">Description : </span>
          {product.description}
        </p>
        <p className="product__description">
          <span className="titles">Created At : </span>
          {product.createdAt
            ? new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(new Date(product.createdAt))
            : null}
        </p>
        <div className="sellerDetails">
          <h4>Seller Details</h4>
          <p className="seller__name">
            <span className="titles">Name : </span>
            {seller.firstName}
          </p>
          <address>
            <p>
              <span className="titles">Phone : </span>
              {seller.phone}{" "}
            </p>
            <p>
              <span className="titles">Region : </span>
              {seller.region}{" "}
            </p>
            <p>
              <span className="titles">Address : </span>
              {seller.address}{" "}
            </p>
          </address>
        </div>
        {shouldDisplayReview && (
          <div className="reviewForm">
            <h2 className="titles">Write a review</h2>
            <div className="reviewStars">
              {[1, 2, 3, 4, 5].map((val) => {
                const setReviewCount = () => setReview(val);
                if (val <= review) {
                  return <AiFillStar onClick={setReviewCount} key={val} />;
                }
                return <AiOutlineStar onClick={setReviewCount} key={val} />;
              })}
            </div>
            <Formik initialValues={{ review: "" }} onSubmit={submitReview}>
              {() => {
                return (
                  <Form
                    className="form"
                    style={{ display: "grid", justifyItems: "center", gap: 10 }}
                  >
                    <TextAreaInput style={{ width: 600 }} name="review" />
                    <Button
                      label="Submit"
                      style={{ alignSelf: "end", justifySelf: "end" }}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
        <div className="reviews">
          <h2>Ratings & Reviews</h2>
          {product.reviews?.map((review) => (
            <Review review={review} key={review._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
