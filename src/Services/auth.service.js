import { APIClient } from '../helper/api_helper';
// import jwt_decode from "jsonwebtoken";
import jwt_decode from 'jwt-decode';
const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem('token');
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// check role user

export const userRole = () => {
  const token = localStorage.getItem('token') || '';
  if (token) {
    const { role } = jwt_decode(token);
    return role;
  }
  return null;
};

// Login Method
export const Login = (url, data) => api.create(url, data);
export const Register = (url, data) => api.create(url, data);
export const Logout = (url) => {
  return api.deleteWithToken(url);
};
