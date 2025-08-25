import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from "./Product";
import SignUp from "./SignUp";
import NavbarComponent from "./NavbarComponent";
import ToDoList from "./ToDoList";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import ProductList from "./ProductList";
import CreateNewProduct from "./CreateNewProduct";
import UpdateProduct from "./UpdateProduct";
import WishList from "./WishList";



export let userContext = createContext();
const Child = () => {
   // variables declaration
    let [userData, setUserData] = useState("VIJAY");
  
    // return statement starts here
  return (
    <userContext.Provider value={{ userData }}>
       <div>

      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<ProductList />}/>
            <Route path="/product/CreateNewProduct" element={<CreateNewProduct />} />
            <Route path="/product/productCount" element={<Product />} />
            <Route path="/product/UpdateProduct/:id" element={<UpdateProduct />} />
          <Route path="/product/wishlist" element={<WishList />} />
          <Route path="/todoList" element={<ToDoList />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
    </userContext.Provider>
  
  );
};

export default Child;
