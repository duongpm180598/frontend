import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './../pages/home/Home';
import Page from './../pages/page/Page';
import Page404 from './../pages/page404/Page404';
import Login from '../pages/login/Login';
import AuthProtected from './AuthProtected';
import Register from '../pages/register/Register';
import ManageComponent from '../pages/manage/manage';
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
          path="/page"
          element={
            <AuthProtected>
              <Page></Page>
            </AuthProtected>
          }
        />
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/manager" element={<ManageComponent />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default StreetRouter;
