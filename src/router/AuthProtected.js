import React from "react";
import { useProfile } from "../Components/Hooks/UserHook";
import { Navigate } from "react-router-dom";
function AuthProtected(props) {
  const { userProfile, loading } = useProfile();
  return !userProfile ? <Navigate to="/login" /> : props.children;
}

export default AuthProtected;
