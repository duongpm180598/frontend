import axios from 'axios';

// content type

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;

// config
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    const { message } = error.response.data;
    return message ? Promise.reject(message) : Promise.reject(error);
  }
);

const setAuthorization = () => {
  const tokenStr = localStorage.getItem('token');
  const token = tokenStr ? JSON.parse(tokenStr) : null;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common['Authorization'];
};

class APIClient {
  getWithToken = (url, params) => {
    setAuthorization();
    let response;

    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  createWithToken = (url, data) => {
    setAuthorization();
    return axios.post(url, data);
  };

  updateWithToken = (url, data) => {
    setAuthorization();
    return axios.put(url, data);
  };

  deleteWithToken = (url, id) => {
    setAuthorization();
    return id ? axios.delete(`${url}/${id}`) : axios.delete(url);
  };

  get = (url, params) => {
    removeAuthorization();
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  create = (url, data) => {
    removeAuthorization();
    return axios.post(url, data);
  };

  update = (url, data) => {
    removeAuthorization();
    return axios.put(url, data);
  };

  delete = (url, config) => {
    removeAuthorization();
    return axios.delete(url, { ...config });
  };
}

export { APIClient };
