import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FetchApi from "./Custom-Hook/FetchApi";
import { FaShoppingCart } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductList = () => {
  let navigate = useNavigate();

  let { fetchData, error, loading, setFetchData } = FetchApi(
    "https://fakestoreapi.com/products"
  );

  let handleDelete = (deleteProductId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, Cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://fakestoreapi.com/products/${deleteProductId}`)
            .then(() => {
              let remainingProductContents = fetchData.filter(
                (product) => product.id !== deleteProductId
              );
              setFetchData(remainingProductContents);
            });
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Product is Safe :)",
            icon: "error",
          });
        }
      });
  };

  // let cartState = useSelector((state) => {
  //   return state.cart;
  // });

  let wishListProducts = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();

  let addToCart = (product) => {
    let checkproduct = wishListProducts.some(
      (wishListProduct) => wishListProduct.id === product.id
    );

    if (!checkproduct) {
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Product Added to WishList Cart",
      });
      dispatch(addItem(product));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product Already Added! :)",
      });
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {fetchData.length !== 0 && (
          <section className="productList">
            <h1>Products List</h1>
            <div className="products">
              {fetchData.map((product) => {
                return (
                  <div key={product.id}>
                    <Card style={{ width: "25rem", height: "auto" }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        style={{
                          width: "25rem",
                          height: "10rem",
                          padding: "10px",
                          alignItems: "div ",
                        }}
                      />
                      <Card.Body className="product-content">
                        <Card.Title className="productTitle">
                          {product.title}
                        </Card.Title>

                        <Card.Text>
                          {product.description
                            .split(" ")
                            .slice(0, 28)
                            .join(" ") + "..."}
                        </Card.Text>
                        <Card.Footer
                          style={{
                            display: "flex",
                            gap: "1px",
                            justifyContent: "space-around",
                          }}
                        >
                          <Card.Title>Price : ${product.price}</Card.Title>
                          <Card.Title> | </Card.Title>
                          <Card.Title>
                            Rating : {product.rating.rate}
                          </Card.Title>
                        </Card.Footer>
                        <div className="productButtons">
                          <Button
                            variant="primary"
                            onClick={() => {
                              addToCart(product);
                            }}
                          >
                            {" "}
                            Add to Cart <FaShoppingCart />{" "}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              navigate(`/product/UpdateProduct/${product.id}`);
                            }}
                          >
                            {" "}
                            Edit <MdEditSquare />{" "}
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              handleDelete(product.id);
                            }}
                          >
                            {" "}
                            Delete <AiFillDelete />{" "}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {error && <h1>{error}</h1>}
      </div>
    );
  }
};

export default ProductList;
