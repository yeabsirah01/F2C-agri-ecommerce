import React from "react";
import { Button, Group, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  incrementQuantity,
  decrementQuantity,
} from "../../features/cartSlice";
import noImage from "../../assets/no-image.png";
import "./styles.css";
import { IconTrash } from "@tabler/icons-react";

export const CartItem = ({ product, cartItem, deleteProduct }) => {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch(decrementQuantity(product._id));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product._id));
  };

  return (
    <div className="cartItemContainer">
      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <img
          src={
            product.image
              ? `https://f2-c-agri-ecommerce.vercel.app/${product.image}`
              : noImage
          }
          alt={product.name}
          width={80}
          height={65}
          crossOrigin="cross-origin"
        />
        <div style={{ marginLeft: 10, fontSize: "15px" }}>
          <Text size="xl">{product.name}</Text>
          <Group position="left">
            <Button
              className="btnn"
              variant="outline"
              size="xs"
              onClick={handleDecrement}
            >
              -
            </Button>
            <Text>
              {product.quantity} {product.stock.unit}
            </Text>
            <Button
              className="btnn"
              variant="outline"
              size="xs"
              onClick={handleIncrement}
            >
              +
            </Button>
            <div
              style={{ color: "red" }}
              variant="outline"
              size="xs"
              onClick={() => {
                dispatch(removeProduct(product));
              }}
            >
              <IconTrash />
            </div>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
