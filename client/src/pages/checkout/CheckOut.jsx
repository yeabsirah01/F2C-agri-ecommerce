import React, { useEffect, useState } from "react";
import { Stepper, Button, Group, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { clearCart } from "../../features/cartSlice";
import { toast } from "react-toastify";

function ShippingDetailsStep({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.country) errors.country = "Country is required";

    // If there are no errors, move to next step
    if (Object.keys(errors).length === 0) onNext();
    else setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text size="xl" weight={500} mb="sm">
        Shipping Details
      </Text>
      <label>
        Name
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <div>{errors.name}</div>}
      </label>
      <label>
        Address
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        {errors.address && <div>{errors.address}</div>}
      </label>
      <label>
        City
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        {errors.city && <div>{errors.city}</div>}
      </label>
      <label>
        Country
        <input
          type="text"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />
        {errors.country && <div>{errors.country}</div>}
      </label>
      <Group position="center" mt="xl">
        <Button variant="default">Back</Button>
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
}

function PaymentStep({ onPrev, onNext }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const errors = {};
    if (!formData.cardNumber) errors.cardNumber = "Card number is required";
    if (!formData.expiryDate) errors.expiryDate = "Expiry date is required";
    if (!formData.cvv) errors.cvv = "CVV is required";

    // If there are no errors, move to next step
    if (Object.keys(errors).length === 0) onNext();
    else setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text size="xl" weight={500} mb="sm">
        Payment
      </Text>
      <label>
        Card number
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData({ ...formData, cardNumber: e.target.value })
          }
        />
        {errors.cardNumber && <div>{errors.cardNumber}</div>}
      </label>
      <label>
        Expiry date
        <input
          type="text"
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
        />
        {errors.expiryDate && <div>{errors.expiryDate}</div>}
      </label>
      <label>
        CVV
        <input
          type="text"
          value={formData.cvv}
          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
        />
        {errors.cvv && <div>{errors.cvv}</div>}
      </label>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
}

function OrderSummaryStep({ onPrev }) {
  const { products, totalCartAmount } = useSelector((state) => state.cart);
  console.log(products);

  const newItemsArray = products.map((product) => {
    const item = {
      ItemId: product._id,
      ItemName: product.name,
      UnitPrice: product.price,
      Quantity: product.quantity,
    };
    return item;
  });

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const query = {};
    location.search
      .slice(1)
      .split("&")
      .forEach((v) => {
        query[v.split("=")[0]] = v.split("=")[1];
      });
    if (query.clear_cart === "true") {
      axiosConfig.patch("/products/none", { products });
      dispatch(clearCart());
      toast.success("Product ordered successfully", { toastId: "ordered" });
    }
    // eslint-disable-next-line
  }, [location.search, dispatch]);

  const checkOut = async () => {
    try {
      const { data } = await axiosConfig
        .post("/products/checkout", {
          newItemsArray,
        })
        .then(function (response) {
          if (response.data) {
            window.location = response.data.redirectUrl;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(data);
      console.log(data);
      window.location = data.payment_url;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div>
      <Text size="xl" weight={500} mb="sm">
        Order Summary
      </Text>
      <Text>
        {" "}
        {products._id}
        {products.name}
      </Text>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={checkOut}>Place Order</Button>
      </Group>
    </div>
  );
}

function CheckOut() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <ShippingDetailsStep onNext={handleNext} />;
      case 1:
        return <PaymentStep onPrev={handlePrev} onNext={handleNext} />;
      case 2:
        return <OrderSummaryStep onPrev={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Stepper
        active={activeStep + 1}
        onStepClick={(step) => setActiveStep(step - 1)}
        breakpoint="sm"
      >
        <Stepper.Step
          label="Shipping Details"
          description="Enter your shipping information"
        />
        <Stepper.Step label="Payment" description="Enter payment details" />
        <Stepper.Step label="Order Summary" description="Review your order" />
      </Stepper>
      {renderStep(activeStep)}
    </>
  );
}

export default CheckOut;
