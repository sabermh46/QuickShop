import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import HomePage from "./pages/home";
import { useDispatch } from "react-redux";
import Login from "./auth/login";
import User from "./pages/user";
import ShowProductbyCategories from "./component/categories/showProductsbyCat";
import RegisterPage from "./auth/register";
import ProductDetails from "./component/product/productDetails/productDetails";
import SearchResult from "./component/search/SearchResult";
import CartPage from "./component/cart/CartPage";

const App = ()=> {

  const dispatch = useDispatch();

  const userData = localStorage.getItem('user');

  if(userData){
    const user = JSON.parse(userData);
    dispatch({
      type: 'LOAD_USER',
      payload: user
    })
    console.log('dispatched');
  } else {
    console.log('not dispatched');
  }

  return(
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/user" element={<User />}/>
      <Route path="/category" element={<ShowProductbyCategories />} />
      <Route path="/product" element={<ProductDetails/>}/>
      <Route path="/search" element={<SearchResult/>}/>
      <Route path="/cart" element={<CartPage/>}/>
    </Routes>
  );
}

export default App