import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './../pages/home/Home';
import Page404 from './../pages/page404/Page404';
import Login from '../pages/login/Login';
import AuthProtected from './AuthProtected';
import Register from '../pages/register/Register';
import ManageComponent from '../pages/manage/manage';
import DetailProduct from '../Components/Common/DetailProduct';
import Cart from '../pages/cart/cart';
import Checkout from '../pages/checkout/checkout';
import Payments from '../pages/payment/Payment';
import Order from '../pages/order/order';
function StreetRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProtected>
              <Home></Home>
            </AuthProtected>
          }
        />

        <Route
          path="/checkout"
          element={
            <AuthProtected>
              <Checkout></Checkout>
            </AuthProtected>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthProtected>
              <Cart></Cart>
            </AuthProtected>
          }
        />

        <Route
          path="/order"
          element={
            <AuthProtected>
              <Order></Order>
            </AuthProtected>
          }
        />

        <Route path="/payments" element={<Payments />} />
        <Route path="/ProductDetail" element={<DetailProduct />} />
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/manager" element={<ManageComponent />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default StreetRouter;
