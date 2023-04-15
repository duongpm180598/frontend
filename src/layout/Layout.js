import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';
import Content from './Content';
import Footer from './Footer.jsx';
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
