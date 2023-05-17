import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
import ProductCards from "../../../components/productCard";

const AllProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axiosConfig.get("/products/");
      setProducts(data);
    };
    getAllProducts();
  }, [id]);
  return <ProductCards products={products} setProducts={setProducts} />;
};

export default AllProducts;
