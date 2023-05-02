import React from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '../redux/selector';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../Services/auth.service';
function PermissionProtected(props) {
  return isAdmin() == 'ADMIN' ? <Navigate to="/error-url" /> : props.children;
}

export default PermissionProtected;
