import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "./Loading";

const UpdateProduct = () => {
  let paperStyle = {
    width: 350,
    margin: "100px auto",
    padding: "20px",
  };

  let navigate = useNavigate();

  let [UpdateProduct, setUpdateProduct] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setUpdateProduct(res.data));
  }, []);

  // let handleChange = (e) => {
  //   let { name, value } = e.target;

  //   let fieldName = name.split("rating.")[1];

  //   if (name.includes("rating.")) {
  //     setUpdateProduct({
  //       ...UpdateProduct,
  //       rating: { ...UpdateProduct.rating, [fieldName]: value },
  //     });
  //   } else {
  //     setUpdateProduct({
  //       ...UpdateProduct,
  //       [name]: value,
  //     });
  //   }
  // };

  let handleChange = (e) => {
    let { name, value } = e.target;

    let ratingName = name.split(".")[1];

    if (name.includes("rating.")) {
      setUpdateProduct({
        ...UpdateProduct,
        rating: { ...UpdateProduct.rating, [ratingName]: value },
      });
    } else {
      setUpdateProduct({
        ...UpdateProduct,
        [name]: value,
      });
    }
  };

  let handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdateProduct),
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Product Updated Successfully",
      });
      navigate("/");
    });
  };

  if (UpdateProduct !== null) {
    return (
      <Paper elevation={22} style={paperStyle}>
        <Typography variant="h5" textAlign={"center"}>
          Update Product
        </Typography>

        <Grid
          component="form"
          onSubmit={handleUpdate}
          style={{ display: "grid", gap: "17px" }}
        >
          <TextField
            name="title"
            label="Title"
            variant="standard"
            fullWidth
            value={UpdateProduct.title}
            onChange={handleChange}
          />
          <TextField
            value={UpdateProduct.price}
            name="price"
            label="Price"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={UpdateProduct.category}
            name="category"
            label="Category"
            variant="standard"
            fullWidth
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={UpdateProduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rate"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={UpdateProduct.rating.count}
                name="rating.count"
                type="number"
                label="Count"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button variant="contained" fullWidth type="submit">
            Update Product
          </Button>
        </Grid>
      </Paper>
    );
  } else {
    return <Loading />;
  }
};

export default UpdateProduct;
