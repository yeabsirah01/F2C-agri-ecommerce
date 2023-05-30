import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { Slider, Select, RangeSlider, Pagination, Burger } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

const ProductCards = ({ products, setProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterCategory, setFilterCategory] = useState("select");
  const [filterPriceRange, setFilterPriceRange] = useState([0, 100]);
  const [filterDate, setFilterDate] = useState("newest");
  const [priceFilterActive, setPriceFilterActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [leftValue, setLeftValue] = useState("30px");
  const changeLeft = () => {
    setLeftValue((prevLeftValue) =>
      prevLeftValue === "-20px" ? "30px" : "-20px"
    );
  };

  const filter = useCallback(
    (category, priceRange, date, products, searchQuery) => {
      let data = [...products];

      // Filter by category
      if (category !== "select") {
        data = data.filter((p) => p.category === category);
      }

      // Filter by price range
      if (priceFilterActive) {
        data = data.filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        data = data.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort by date
      if (date === "newest") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }

      // Slice the data based on the current page number and the number of items to be displayed per page
      const startIndex = (page - 1) * 8;
      const endIndex = startIndex + 8;
      const slicedData = data.slice(startIndex, endIndex);

      setFilteredProducts(slicedData);
    },
    [priceFilterActive, page]
  );

  useEffect(() => {
    filter(filterCategory, filterPriceRange, filterDate, products, searchQuery);
  }, [
    filterCategory,
    filterPriceRange,
    filterDate,
    products,
    filter,
    searchQuery,
  ]);

  const handleMinPriceChange = (event) => {
    const minValue = parseFloat(event.target.value);
    setFilterPriceRange([minValue, filterPriceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const maxValue = parseFloat(event.target.value);
    setFilterPriceRange([filterPriceRange[0], maxValue]);
  };

  const [opened, { toggle }] = useDisclosure(false);
  const handleClick = () => {
    toggle();
    changeLeft();
  };
  return (
    <div className="productCards">
      <Burger className="burger" opened={opened} onClick={handleClick} />
      {opened && (
        <div className="inputtt">
          <div>
            <input
              style={{ marginTop: 20 }}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            label="Product Category"
            style={{ marginLeft: "auto", width: "auto", marginTop: 20 }}
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            data={[
              "select",
              "ፍራፍሬዎች",
              "አትክልቶች",
              "ጥራጥሬ",
              "እህል",
              "ቅመም",
              "ቡና",
              "የእንስሳት ተዋዕፆ",
              "እንስሳት",
            ].map((option) => ({
              value: option,
              label: option,
            }))}
          />
          <div>
            <div>
              <div>
                <div style={{ width: 150, marginRight: "16px", marginTop: 20 }}>
                  Price range:
                </div>
                <div>
                  <input
                    style={{ width: 40 }}
                    type="number"
                    min={0}
                    placeholder="Min"
                    value={filterPriceRange[0]}
                    onChange={handleMinPriceChange}
                  />
                  <span> - </span>
                  <input
                    style={{ width: 40 }}
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={filterPriceRange[1]}
                    onChange={handleMaxPriceChange}
                  />{" "}
                  Birr
                </div>
              </div>
            </div>
          </div>
          <Select
            label="Date"
            style={{ marginLeft: "auto", width: "auto", marginTop: 20 }}
            placeholder="Sort by date"
            value={filterDate}
            onChange={(value) => setFilterDate(value)}
            data={[
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
            ]}
          />
        </div>
      )}

      <div
        className="products"
        style={{
          // display: "flex",
          // flexWrap: "wrap",
          left: leftValue,
          // justifyContent: "space-between",
          // margin: "16px -8px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              width: "100%",
              marginBottom: "29px",

              padding: "0 15px",
            }}
          >
            <ProductCard
              product={product}
              deleteProduct={(id) => {
                const newProducts = products.filter((p) => p._id !== id);
                setProducts(newProducts);
              }}
            />
          </div>
        ))}
        <div className="pagination-wrapper" style={{ marginTop: "16px" }}>
          <Pagination
            variant="dots"
            color="gray"
            fullWidth
            total={filteredProducts.length}
            page={page}
            onChange={(newPage) => setPage(newPage)}
            itemsPerPage={8}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCards);
