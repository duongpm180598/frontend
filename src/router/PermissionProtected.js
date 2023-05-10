import React from 'react';
import { Navigate } from 'react-router-dom';
import { userRole } from '../Services/auth.service';
function PermissionProtected(props) {
  const role = userRole();
  return props.role.some((x) => x === role) ? props.children : <Navigate to="/permission-denied" />;
}

export default PermissionProtected;
