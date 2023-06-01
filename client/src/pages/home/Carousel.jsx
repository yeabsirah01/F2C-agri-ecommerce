import React, { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/productCard";

const Carousel = ({ products, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, interval);

    return () => clearInterval(timer);
  }, [products.length, interval]);

  return (
    <div className="carousel">
      {products.map((product, index) => (
        <div
          key={product._id}
          className={`carousel__card ${index === currentIndex ? "active" : ""}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
