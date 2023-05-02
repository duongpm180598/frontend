import React from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '../redux/selector';
import { Navigate } from 'react-router-dom';
function Protected(props) {
  const cart = useSelector(getCart);
  return !(cart.length && cart[0].id) ? <Navigate to="/" /> : props.children;
}

export default Protected;
