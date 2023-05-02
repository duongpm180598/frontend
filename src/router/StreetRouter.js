import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './../pages/home/Home';
import Page404 from './../pages/page404/Page404';
import Login from '../pages/login/Login';
import AuthProtected from './AuthProtected';
import Register from '../pages/register/Register';
import ManageComponent from '../pages/manage/Manage';
import DetailProduct from '../Components/Common/DetailProduct';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Payments from '../pages/payment/Payment';
import Order from '../pages/order/Order';
import Protected from './Protected';
import DetailOrder from '../pages/detailOrder/DetailOrder';
import CreateProduct from '../Components/Admin/CreateProduct';
import AddImage from '../Components/Admin/AddImage';
import ImportProduct from '../pages/import-product/ImportProduct';
import Statistic from '../pages/statistics/Statistic';
import PermissionProtected from './PermissionProtected';
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
              <Protected>
                <Checkout></Checkout>
              </Protected>
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

        <Route path="/detail-order/:slug" element={<DetailOrder />} />

        <Route
          path="/order"
          element={
            <AuthProtected>
              {/* <PermissionProtected> */}
              <Order></Order>
              {/* </PermissionProtected> */}
            </AuthProtected>
          }
        />

        <Route
          path="/payments"
          element={
            <AuthProtected>
              <Payments />
            </AuthProtected>
          }
        />
        <Route
          path="/manager"
          element={
            <AuthProtected>
              <ManageComponent />
            </AuthProtected>
          }
        >
          <Route index element={<CreateProduct />} />
          <Route path="add-image" element={<AddImage />} />
          <Route path="order" element={<Order />} />
        </Route>

        <Route path="/product-detail/:slug" element={<DetailProduct />} />
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/import"
          element={
            <AuthProtected>
              <ImportProduct />
            </AuthProtected>
          }
        ></Route>
        <Route
          path="/statistic"
          element={
            <AuthProtected>
              <Statistic />
            </AuthProtected>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default StreetRouter;
