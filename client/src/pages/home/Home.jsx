import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosConfig from "../../axiosConfig";
import ProductCards from "../../components/productCard";
import { BrowseOurMarket } from "./BrowseOurMarket";
import CarouselComponent from "./CarouselComponent";
// import { CarouselComponent } from "./CarouselComponent";
import { Description1 } from "./Description1";
import { Description2 } from "./Description2";
import { Description3 } from "./Description3";
import { Features } from "./Features";
import { WelcomeHeader } from "./WelcomeHeader";
// import "./style.css";

const Home = () => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     const { data } = await axiosConfig.get("/products");
  //     setProducts(data);
  //   };
  //   getAllProducts();
  // }, []);
  // return <ProductCards products={products} setProducts={setProducts} />;

  return (
    <>
      <WelcomeHeader />
      <Description2 />
      <Description1 />
      <Description3 />

      <Features />
      <BrowseOurMarket />
      <CarouselComponent />
    </>
  );
};

export default Home;
