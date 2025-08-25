import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiFillDelete } from "react-icons/ai";
import { removeItem } from "../store/cartSlice";
import Swal from "sweetalert2";

const WishList = () => {
  let cartProduct = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();

  let handleDelete = (deleteItemId) => {
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
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(removeItem(deleteItemId));
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Product has been removed...",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Product not removed :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <section className="productList">
        <h1>WishList Cart</h1>
        <div className="products">
          {cartProduct.map((product) => {
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

                    <Card.Text>{product.description.slice(0, 100)}</Card.Text>
                    <Card.Footer
                      style={{
                        display: "flex",
                        gap: "1px",
                        justifyContent: "space-around",
                      }}
                    >
                      <Card.Title>Price : ${product.price}</Card.Title>
                      <Card.Title> | </Card.Title>
                      <Card.Title>Rating : {product.rating.rate}</Card.Title>
                    </Card.Footer>
                    <div className="productButtons">
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
    </div>
  );
};

export default WishList;
