import { Login, Register, Logout } from '../Services/auth.service';

export function authActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}`;

  return {
    login,
    logout,
    register,
  };

  function login({ email, password }) {
    return Login(baseUrl + '/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.access_token));
        return res;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  function logout() {
    return Logout(baseUrl + '/auth/logout')
      .then((res) => {
        localStorage.removeItem('token');
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  function register(user) {
    return Register(baseUrl + '/users/register', user)
      .then((res) => {
        return res.message;
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
}
