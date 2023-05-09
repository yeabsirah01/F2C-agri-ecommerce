import React, { useEffect, useState } from "react";
import { Stepper, Button, Group, Text, Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { clearCart } from "../../features/cartSlice";
import { toast } from "react-toastify";

function ShippingDetailsStep({ onNext }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { products, totalCartAmount } = useSelector((state) => state.cart);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);

  const query = {};
  location.search
    .slice(1)
    .split("&")
    .forEach((v) => {
      query[v.split("=")[0]] = v.split("=")[1];
    });

  const [order, setOrder] = useState({
    shippingDetails: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    paymentInfo: {
      ticketNumber: "",
    },
  });

  console.log(order);

  const [errors, setErrors] = useState({});

  // // Perform validation
  // const errors = {};
  // if (!order.name) errors.name = "Name is required";
  // if (!order.address) errors.address = "Address is required";
  // if (!order.city) errors.city = "City is required";
  // if (!order.country) errors.country = "Country is required";

  // // If there are no errors, move to next step
  // if (Object.keys(errors).length === 0) onNext();
  // else setErrors(errors);

  const prods = JSON.parse(localStorage.getItem("products"));
  // const cartStateJSON = JSON.stringify(cartState);
  const token = `Bearer ${localStorage.getItem("cookie")}`;
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("order"));

    const query = {};
    location.search
      .slice(1)
      .split("&")
      .forEach((v) => {
        query[v.split("=")[0]] = v.split("=")[1];
      });

    console.log(prods);

    if (query.clear_cart === "true") {
      const orderData = {
        ...savedOrder,
        sellerInfo: prods[0].createdBy,
      };
      console.log(orderData);
      const clearCartAndNotify = async () => {
        // insert the upload post method here

        const response = await axiosConfig.post("/orders", orderData, {
          headers: {
            Authorization: token,
            // "content-type": "multipart/form-data",
          },
        });
        console.log(response.data);
        // do something with the response, such as displaying a success message to the user
        dispatch(clearCart());
        setModalOpen(true);
        toast.success("Product ordered successfully", { toastId: "ordered" });
      };
      clearCartAndNotify();
      localStorage.removeItem("order");
    }
  }, [location.search, dispatch, products]);

  const Ticket = {
    TotalAmount: query.TotalAmount,
    BuyerId: query.BuyerId,
    MerchantOrderId: query.MerchantOrderId,
    MerchantCode: query.MerchantCode,
    MerchantId: query.MerchantId,
    TransactionCode: query.TransactionCode,
    Status: query.Status,
    Currency: query.Currency,
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate(-3); // replace with your desired redirect URL
    // window.location.replace(window.location.href);
  };
  const handleSubmit = async (e) => {
    localStorage.setItem("order", JSON.stringify(order));
    // localStorage.setItem("cartState", cartStateJSON);
    localStorage.setItem("products", JSON.stringify(products));
    // orm validation
    // const errors = {};
    // if (!order.name) errors.name = "Name is required";
    // if (!order.address) errors.address = "Address is required";
    // if (!order.city) errors.city = "City is required";
    // if (!order.country) errors.country = "Country is required";

    // If there are no errors, move to next step
    // if (Object.keys(errors).length === 0)
    onNext();
    // else setErrors(errors);
    // e.preventDefault();
    // try {
    //   const response = await axiosConfig.post("/orders", order);
    //   console.log(response.data);
    //   // do something with the response, such as displaying a success message to the user
    // } catch (error) {
    //   console.log(error);
    //   // handle the error, such as displaying an error message to the user
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      shippingDetails: {
        ...prevOrder.shippingDetails,
        [name]: value,
      },
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      paymentInfo: {
        ...prevOrder.paymentInfo,
        [name]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order Number:
        <input
          type="text"
          name="orderNumber"
          value={order.orderNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Seller Info:
        <input
          type="text"
          name="sellerInfo"
          value={order.sellerInfo}
          onChange={handleChange}
        />
      </label>
      <label>
        Buyer Info:
        <input
          type="text"
          name="buyerInfo"
          value={order.buyerInfo}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={order.shippingDetails.address}
          onChange={handleShippingChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={order.shippingDetails.city}
          onChange={handleShippingChange}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="state"
          value={order.shippingDetails.state}
          onChange={handleShippingChange}
        />
      </label>
      <label>
        Zip Code:
        <input
          type="text"
          name="zipCode"
          value={order.shippingDetails.zipCode}
          onChange={handleShippingChange}
        />
      </label>
      <label>
        Ticket Number:
        <input
          type="text"
          name="ticketNumber"
          value={order.paymentInfo.ticketNumber}
          onChange={handlePaymentChange}
        />
      </label>
      <Group position="center" mt="xl">
        <Button variant="default">Back</Button>
        <Button type="submit">Next step</Button>
      </Group>

      <Modal
        opened={modalOpen}
        onClose={handleCloseModal}
        title="Order Status"
        size="xs"
      >
        <p>successssss</p>
        {Object.entries(Ticket).map(([key, value]) => (
          <>
            <Text weight={500}>{key}</Text>
            <Text>{value}</Text>
          </>
        ))}
      </Modal>
    </form>
  );
}

function PaymentStep({ onPrev, onNext }) {
  const [formData, setFormData] = useState({
    cardNumber: "34",
    expiryDate: "321",
    cvv: "2134",
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
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const dispatch = useDispatch();
  const newItemsArray = products.map((product) => {
    const item = {
      ItemId: product._id,
      ItemName: product.name,
      UnitPrice: product.price,
      Quantity: product.quantity,
    };
    return item;
  });
  const id = newItemsArray[0].ItemId;
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
          // Handle HTTP 401 error
          // Show a message to the user indicating they are not authorized to access the resource
          // Redirect the user to the login page or take any other appropriate action
        } else {
          // Handle other errors
        }
      }
    };
    getProductData();
  }, [id]);

  console.log(product, seller);

  // const creatorId = response.data.createdBy;
  // const creatorResponse = axiosConfig.get(`/users/${creatorId}`);
  // setCreator(creatorResponse.data);

  const checkOut = async () => {
    const prods = JSON.parse(localStorage.getItem("products"));
    // console.log(prods);
    const id = products[0]._id;

    console.log(prods);

    await axiosConfig.put(`/products/${id}`, { products });
    // Handle successful response here

    try {
      const { data } = await axiosConfig
        .post("/products/checkout", {
          newItemsArray,
        })
        .then(function (response) {
          if (response.data) {
            window.location = response.data.redirectUrl;
            console.log(data);
          }
        })

        .catch(function (error) {
          console.log(error);
        });

      console.log(data);
      window.location = data.payment_url;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
    console.log(product, seller);
  };

  // console.log(product);
  // console.log(product, response);
  return (
    <div>
      <Text size="xl" weight={500} mb="sm">
        Order Summary n
      </Text>
      <Text>abebe {product.createdBy}</Text>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      {/* {product}
      {seller} */}
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
  const { products, totalCartAmount } = useSelector((state) => state.cart);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
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
