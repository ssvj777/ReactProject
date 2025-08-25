import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const CreateNewProduct = () => {
  let paperStyle = {
    width: 350,
    margin: "124px auto",
    padding: "20px",
  };

  let [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://picsum.photos/400/300?random=6",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  // let handleChange = (e) => {
  //   let { name, value } = e.target;

  //   let fieldName = name.split("rating.")[1];

  //   if (name.includes("rating.")) {
  //     setNewProduct({
  //       ...newProduct,
  //       rating: { ...newProduct.rating, [fieldName]: value },
  //     });
  //   } else {
  //     setNewProduct({
  //       ...newProduct,
  //       [name]: value,
  //     });
  //   }
  // };

  let handleChange = (e) => {
    let { name, value } = e.target;

    let currentNumber = parseInt(newProduct.image.split("?random=")[1]);

    let nextNumber = currentNumber + 1;

    let ratingName = name.split(".")[1];

    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: { ...newProduct.rating, [ratingName]: value },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
        image: `https://picsum.photos/400/300?random=${nextNumber}`,
      });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    // Extract current image number
    let currentNumber = parseInt(newProduct.image.split("?random=")[1]);

    // Increment or randomize it
    let nextNumber = currentNumber + 1;
    // Or for random: let nextNumber = Math.floor(Math.random() * 1000) + 1;

    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Product Created Successfully",
      });
      setNewProduct({
        title: "",
        price: "",
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: `https://picsum.photos/400/300?random=${nextNumber}`,
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };

  return (
    <Paper elevation={22} style={paperStyle}>
      <Typography variant="h5" textAlign={"center"}>
        Create new Products
      </Typography>

      <Grid
        component="form"
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "17px" }}
      >
        <TextField
          name="title"
          label="Title"
          variant="standard"
          fullWidth
          value={newProduct.title}
          onChange={handleChange}
        />
        <TextField
          value={newProduct.price}
          name="price"
          label="Price"
          variant="standard"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          value={newProduct.category}
          name="category"
          label="Category"
          variant="standard"
          fullWidth
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.rate}
              name="rating.rate"
              type="number"
              label="Rate"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.count}
              name="rating.count"
              type="number"
              label="Count"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button variant="contained" fullWidth type="submit">
          Add Product
        </Button>
      </Grid>
    </Paper>
  );
};

export default CreateNewProduct;
