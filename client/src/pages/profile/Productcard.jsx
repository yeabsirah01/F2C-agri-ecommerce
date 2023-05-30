import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeProduct } from "../../features/cartSlice";
import noImage from "../../assets/no-image.png";
import axiosConfig from "../../axiosConfig";
import { Button, Grid } from "@mantine/core";

const ProductCard = ({ product, cartItem, deleteProduct }) => {
  const { _id, role } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid gutter="md">
      <Grid.Col span={3}>
        <div className="product__image__new">
          <Link to={`/${product._id}`}>
            <img
              src={
                product.image
                  ? `http://localhost:5000/${product.image}`
                  : noImage
              }
              alt={product.name}
              crossOrigin="cross-origin"
            />
          </Link>
        </div>
      </Grid.Col>
      <Grid.Col span={9}>
        <div className="product__details__new">
          <div className="data">
            <h3 className="title">{product.name}</h3>
            <p className="stock">
              {product.stock.value} {product.stock.unit} left
            </p>
          </div>
          <p className="price"> {product.price} ETB</p>
          {cartItem ? (
            <>
              <Button
                label={product.quantity + product.stock.unit}
                size="sm"
                disabled
              />
              <Button
                label="Delete"
                size={1}
                onClick={() => {
                  dispatch(removeProduct(product));
                }}
              />
            </>
          ) : product.createdBy === _id || role === "Admin" ? (
            <>
              {role !== "Admin" ? (
                <Button
                  label="Edit Product"
                  onClick={() => {
                    navigate(`/edit/${product._id}`);
                  }}
                >
                  {" "}
                  Edit
                </Button>
              ) : null}
              <Button
                color="red"
                label="Delete Product"
                onClick={() => {
                  axiosConfig.delete("/products/" + product._id);
                  deleteProduct(product._id);
                }}
              >
                Delete
              </Button>
            </>
          ) : null}
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default ProductCard;
