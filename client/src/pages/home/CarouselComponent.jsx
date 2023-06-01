import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "../../components/productCard/productCard";

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Perform the API call or data fetching here to get the products
        const response = await fetch("YOUR_API_ENDPOINT");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isAutoPlaying, products]);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <Carousel
      selectedItem={currentIndex}
      onChange={handleCarouselChange}
      autoPlay={isAutoPlaying}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
