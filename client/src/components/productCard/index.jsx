// import React, { useCallback, useEffect, useState } from "react";
// import ProductCard from "./productCard";

// const ProductCards = ({ products, setProducts }) => {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterValue, setFilterValue] = useState("select");
//   const filter = useCallback((filterValue, products) => {
//     if (filterValue === "select") {
//       setFilteredProducts(products);
//     } else {
//       const data = products.filter((p) => p.category === filterValue);
//       setFilteredProducts(data);
//     }
//   }, []);

//   useEffect(() => {
//     filter(filterValue, products);
//   }, [filterValue, products, filter]);

//   return (
//     <div className="productCards">
//       <div className="input" style={{ gridColumn: "1/-1" }}>
//         <select
//           style={{ marginLeft: "auto", width: "350px" }}
//           onChange={(e) => setFilterValue(e.target.value)}
//           value={filterValue}
//         >
//           <option value="select">Filter</option>
//           {["Fruits", "Vegetables", "Vines"].map((option) => (
//             <option key={option}>{option}</option>
//           ))}
//         </select>
//       </div>
//       {filteredProducts.map((product) => (
//         <ProductCard
//           product={product}
//           key={product._id}
//           deleteProduct={(id) => {
//             const newProducts = products.filter((p) => p._id !== id);
//             setProducts(newProducts);
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default React.memo(ProductCards);
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./productCard";
import {
  Slider,
  Select,
  RangeSlider,
  Pagination,
  Burger,
  CloseButton,
} from "@mantine/core";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
// import { MantineLogo } from "@mantine/ds";
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
        <div className="input">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <p>Sort by</p>
          <Select
            label="Product Category"
            style={{ marginLeft: "auto", width: "auto" }}
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            data={["select", "Fruits", "Vegetables", "Vines"].map((option) => ({
              value: option,
              label: option,
            }))}
          />
          <div>
            <div>
              <div>
                <div style={{ marginRight: "16px" }}>
                  Price range: {filterPriceRange[0]} Birr -{" "}
                  {filterPriceRange[1]} Birr
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterPriceRange[0]}
                    onChange={handleMinPriceChange}
                  />
                  <span> - </span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterPriceRange[1]}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <Select
            label="Date"
            style={{ marginLeft: "auto", width: "auto" }}
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
