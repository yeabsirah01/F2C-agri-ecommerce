import { Table, Input, Select, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
import noImage from "../../../assets/no-image.png";

const AllProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axiosConfig.get("/products/");
      setProducts(data);
    };
    getAllProducts();
  }, [id]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCategory("");
  };
  const deleteProduct = (id) => {
    const newProducts = products.filter((p) => p._id !== id);
    setProducts(newProducts);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory === "" || product.category === filterCategory)
  );

  console.log(products);
  const rows = filteredProducts.map((element, index) => (
    <tr
      key={element._id}
      style={{
        backgroundColor: index % 2 === 0 ? "#555555" : "#00000000",
        color: index % 2 === 0 ? "#c7ecc5" : "#f2f2f2",
      }}
    >
      <td width={150}>
        {" "}
        <Link to={`/${element._id}`}>
          <img
            style={{ width: 50 }}
            src={
              element.image ? `http://localhost:5000/${element.image}` : noImage
            }
            alt={element.name}
            crossOrigin="cross-origin"
          />
        </Link>
      </td>
      <td
        style={{
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {element.name}
      </td>
      <td>{element.category}</td>
      <td>{element.price} Birr</td>
      <td>
        {element.stock.value} {element.stock.unit}
      </td>
      <td>{element.createdBy ? element.createdBy.firstName : null}</td>
      <td>
        <Button
          color="red"
          label="Delete Product"
          onClick={() => {
            axiosConfig.delete("/products/" + element._id);
            deleteProduct(element._id);
          }}
        >
          Delete Product
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <Input
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name"
          variant="filled"
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          value={filterCategory}
          onChange={handleCategoryChange}
          placeholder="Filter by category"
          data={[
            { value: "", label: "All" },
            { value: "ፍራፍሬዎች", label: "ፍራፍሬዎች" },
            { value: "አትክልቶች", label: "አትክልቶች" },
            { value: "ጥራጥሬ", label: "ጥራጥሬ" },
            { value: "እህል", label: "እህል" },
            { value: "ቅመም", label: "ቅመም" },
            { value: "ቡና", label: "ቡና" },
            { value: "የእንስሳት ተዋዕፆ", label: "የእንስሳት ተዋዕፆ" },
            { value: "እንስሳት", label: "እንስሳት" },
          ]}
          variant="filled"
          style={{ width: 200, marginRight: 16 }}
        />
        <Button variant="outline" color="green.7" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
      <Table striped verticalSpacing="lg" horizontalSpacing="xs">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>In stock</th>
            <th>Farmer Name</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default AllProducts;
