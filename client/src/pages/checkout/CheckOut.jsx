import React, { useEffect, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Text,
  Modal,
  Card,
  Table,
  Input,
  Select,
  Textarea,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { clearCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import "./form.css";
import yenepaylogo from "../../assets/yenepay logo.png";
import chappalogo from "../../assets/chappa logo.png";

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

  // // // If there are no errors, move to next step
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

    console.log(query);

    if (query.clear_cart === "true") {
      const orderData = {
        ...savedOrder,
        products:
          prods?.map((prod) => ({
            name: prod?.name,
            quantity: prod?.quantity || 0,
          })) || [],
        productsTotalPrice:
          prods?.reduce(
            (sum, prod) =>
              sum + (Number(prod?.price) || 0) * (prod?.quantity || 0),
            0
          ) || 0,
        sellerInfo: prods?.[0]?.createdBy || null,
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
      // localStorage.removeItem("order");
    }
  }, []);

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

  const handleShippingChange = (event) => {
    const { name, value } = event.target;
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

  const region = [
    { value: "Amhara", label: "Amhara" },
    { value: "Afar", label: "Afar" },
    { value: "Benishangul-Gumuz", label: "Benishangul-Gumuz" },
    { value: "Dire Dawa", label: "Dire Dawa" },
    { value: "Gambela", label: "Gambela" },
    { value: "Harari", label: "Harari" },
    { value: "Oromia", label: "Oromia" },
    { value: "Sidama", label: "Sidama" },
    { value: "Somali", label: "Somali" },
    { value: "SNNP", label: "SNNP" },
    { value: "Tigray", label: "Tigray" },
  ];
  return (
    <>
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <Select
            id="state"
            name="state"
            placeholder="Select region"
            value={order.shippingDetails.state}
            onChange={(value) =>
              handleShippingChange({
                target: {
                  name: "state",
                  value,
                },
              })
            }
            data={region}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <Input
            type="text"
            id="city"
            name="city"
            value={order.shippingDetails.city}
            onChange={handleShippingChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <Input
            type="text"
            id="address"
            name="address"
            value={order.shippingDetails.address}
            onChange={handleShippingChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Additional detail</label>
          <Textarea
            type="text"
            id="zipCode"
            name="zipCode"
            value={order.shippingDetails.zipCode}
            onChange={handleShippingChange}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="ticketNumber">Ticket Number:</label>
          <input
            type="text"
            id="ticketNumber"
            name="ticketNumber"
            value={order.paymentInfo.ticketNumber}
            onChange={handlePaymentChange}
          />
        </div> */}
        <div className="form-group button-group">
          <button className="btn-back" type="button">
            Back
          </button>
          <button className="btn-submit" type="submit">
            Next step
          </button>
        </div>
      </form>
      <Modal
        opened={modalOpen}
        onClose={handleCloseModal}
        title="Order Status"
        size="20"
      >
        <div className="receipt-container">
          <h2>✅ Paid Successfully</h2>
          {Object.entries(Ticket).map(([key, value]) => (
            <div key={key} className="receipt-item">
              <div className="key">{key}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

function PaymentStep({ onPrev, onNext }) {
  const [formData, setFormData] = useState({
    cardType: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const errors = {};
    if (!formData.cardType) errors.cardType = "Card type is required";

    // If there are no errors, move to the next step
    if (Object.keys(errors).length === 0) onNext();
    else setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Added form element with onSubmit handler */}
      <div className="order-form">
        <div className="form-group">
          <h2 className="form-heading">Payment</h2>
        </div>
        <div className="form-group radio-group">
          <div
            className={`radio-card ${
              formData.cardType === "yenepay" ? "selected" : ""
            }`}
          >
            <Card shadow="xs" className="card-wrapper">
              <label htmlFor="yenepay" className="card-label">
                <input
                  type="radio"
                  id="yenepay"
                  name="cardType"
                  value="yenepay"
                  checked={formData.cardType === "yenepay"}
                  onChange={(e) =>
                    setFormData({ ...formData, cardType: e.target.value })
                  }
                />
                <div className="card-image">
                  <img src={yenepaylogo} alt="yenepay" />
                </div>
                <div className="card-text">Yene Pay</div>
              </label>
            </Card>
          </div>
          <div
            className={`radio-card ${
              formData.cardType === "mastercard"
                ? "selected disabled"
                : "disabled"
            }`}
          >
            <Card shadow="xs" className="card-wrapper">
              <label htmlFor="mastercard" className="card-label">
                <input
                  type="radio"
                  id="mastercard"
                  name="cardType"
                  value="mastercard"
                  checked={formData.cardType === "mastercard"}
                  onChange={(e) =>
                    setFormData({ ...formData, cardType: e.target.value })
                  }
                  disabled
                />
                <div className="card-image">
                  <img src={chappalogo} alt="Mastercard" />
                </div>
                <div className="card-text">Chapa</div>
                <div className="unavailable-text">Currently Not Available</div>
              </label>
            </Card>
          </div>
        </div>
        <div className="form-group button-group">
          <button className="btn-back" type="button" onClick={onPrev}>
            Back
          </button>
          <button className="btn-submit" type="submit">
            Next step
          </button>
        </div>
      </div>
    </form>
  );
}

function OrderSummaryStep({ onPrev }) {
  const { _id } = useSelector((state) => state.user);
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
        .post(`/products/checkout/${prods[0].createdBy._id}`, {
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
      toast.error(error?.response?.data?.msg);
    }
    console.log(product, seller);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const calculateTotalPriceWithTax = () => {
    const totalPrice = calculateTotalPrice();
    const tax = totalPrice * 0.15;
    return totalPrice + tax;
  };

  const orderss = JSON.parse(localStorage.getItem("order"));

  // console.log(product);
  // console.log(product, response);
  return (
    <div className="container">
      <div className="order-summary">
        <Card shadow="xs" className="summary-table">
          <h3> Order Summary</h3>
          <Table striped>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>
                    {product.quantity}
                    {product.stock.unit}
                  </td>
                  <td>
                    <>{product.price} Birr</>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total Price</td>
                <td>
                  <strong>{calculateTotalPrice().toFixed(2)} Birr</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="2">Total Price + tax</td>
                <td>
                  <strong>
                    {calculateTotalPriceWithTax().toFixed(2)} Birr
                  </strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Card>
      </div>
      <div className="buyer-details">
        <Card shadow="xs" className="details-card">
          <h3>Shipping details</h3>
          <Text>Region: {orderss.shippingDetails.state}</Text>
          <Text>Address: {orderss.shippingDetails.address}</Text>
          <Text>City: {orderss.shippingDetails.city}</Text>
          <Text>Description: {orderss.shippingDetails.zipCode}</Text>
        </Card>
      </div>
      <div className="seller-details">
        <Card shadow="xs" className="details-card">
          <h3>Farmer Detail</h3>
          <Text>
            Name: {seller.firstName} {seller.lastName}
          </Text>
          <Text>Region: {seller.region}</Text>
          <Text>Address: {seller.address}</Text>
          <Text>Phone: {seller.phone}</Text>
          {seller.paymentInfo && (
            <>
              <Text>Yenepay Account: {seller.paymentInfo.number}</Text>
            </>
          )}
        </Card>
      </div>

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
    <div style={{ marginTop: 75 }}>
      <Stepper
        style={{ width: 1000, marginLeft: 300, marginBottom: 40 }}
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
    </div>
  );
}

export default CheckOut;
