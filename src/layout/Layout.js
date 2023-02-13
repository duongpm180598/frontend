import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
const Layout = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default Layout;
