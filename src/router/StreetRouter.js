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
import ProductStatistic from '../pages/statistics/ProductStatistic';
import PermissionProtected from './PermissionProtected';
import UpdateComponent from '../Components/Admin/Update';
import RevenueStatistic from '../pages/statistics/RevenueStatistic';
import ListProducts from '../Components/Admin/ListProducts';

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
              <Order></Order>
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
          <Route
            path="order"
            element={
              <PermissionProtected role={['SELLER', 'ADMIN']}>
                <Order />
              </PermissionProtected>
            }
          />
          <Route
            path="products"
            element={
              <PermissionProtected role={['WAREHOUSESTAFF', 'ADMIN']}>
                <ListProducts />
              </PermissionProtected>
            }
          />
          <Route
            path="create-product"
            element={
              <PermissionProtected role={['WAREHOUSESTAFF', 'ADMIN']}>
                <CreateProduct />
              </PermissionProtected>
            }
          />
          <Route
            path="update/:id"
            element={
              <PermissionProtected role={['WAREHOUSESTAFF', 'ADMIN']}>
                <UpdateComponent />
              </PermissionProtected>
            }
          />
          <Route
            path="product-statistic"
            element={
              <PermissionProtected role={['ADMIN']}>
                <ProductStatistic />
              </PermissionProtected>
            }
          />
          <Route
            path="revenue-statistic"
            element={
              <PermissionProtected role={['ADMIN']}>
                <RevenueStatistic />
              </PermissionProtected>
            }
          />
        </Route>

        <Route path="/product-detail/:slug" element={<DetailProduct />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default StreetRouter;
