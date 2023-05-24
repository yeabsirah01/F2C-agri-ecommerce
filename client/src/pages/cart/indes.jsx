import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";
import Button from "../../components/button";
import ProductCard from "../../components/productCard/productCard";
import { clearCart } from "../../features/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";
import { useEffect } from "react";
import CartItem from "./cartitems";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Cart = ({ onClose }) => {
  const { _id } = useSelector((state) => state.user);
  const { products, totalCartAmount } = useSelector((state) => state.cart);

  const newItemsArray = products.map((product) => {
    const item = {
      ItemId: product._id,
      ItemName: product.name,
      UnitPrice: product.price,
      Quantity: product.quantity,
    };
    return item;
  });
  // console.log(products[0].createdBy);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const checkOut = async () => {
    await navigate(`/products/checkout/${products[0].createdBy}`);

    onClose();
  };

  const [opened, { open, close }] = useDisclosure(true, {
    onOpen: () => {
      console.log("Opened");
    },
    onClose: () => {
      console.log("Closed");
    },
  });

  const totalPrice = products
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  console.log(totalPrice);

  return (
    // <div className="cart">
    // 	<div className="productCards">
    // 		{products.map(p => (
    // 			<ProductCard product={p} cartItem key={p._id} />
    // 		))}
    // 		<div
    // 			className="checkout"
    // 			style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center" }}
    // 		>
    // 			{products.length ? (
    // 				<Button label="Checkout" onClick={checkOut} />
    // 			) : (
    // 				<h1>Cart is Empty</h1>
    // 			)}
    // 		</div>
    // 	</div>
    // </div>
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        c="#8ce99a"
        my="0"
        py="0"
      >
        <div c="blue.6" ta="center">
          <h2
            style={{
              color: "red",
              padding: 0,
              margin: 0,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Cart
          </h2>
        </div>
        <div className="cartItems">
          {products.map((product) => {
            // return <CartItem product={product} />;
            return <CartItem product={product} cartItem key={product._id} />;
          })}
        </div>

        <div className="total">
          {" "}
          Total Price: <span className="price">{totalPrice} </span> ETB
        </div>

        <div
          className="checkout"
          style={{
            gridColumn: "1/-1",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {products.length ? (
            <Button label="Checkout" onClick={checkOut} />
          ) : (
            <h1>Cart is Empty</h1>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
