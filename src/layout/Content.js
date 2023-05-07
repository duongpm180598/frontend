import React from 'react';
import StreetRouter from '../router/StreetRouter';
import { Outlet } from 'react-router-dom';
function Content() {
  return (
    <>
      <StreetRouter></StreetRouter>
    </>
  );
}

export default Content;
