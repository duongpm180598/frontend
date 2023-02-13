import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./../pages/home/Home";
import Page from "./../pages/page/Page";
import Page404 from "./../pages/page404/Page404";

function StreetRouter() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/page" element={<Page />} />
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default StreetRouter;
