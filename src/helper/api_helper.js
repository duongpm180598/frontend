import axios from "axios";

// content type

axios.defaults.headers.post["Content-Type"] = "application/json";

// config
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    const { message } = error.response.data;
    return Promise.reject(message);
  }
);

const setAuthorization = () => {
  const tokenStr = localStorage.getItem("token");
  const token = tokenStr ? JSON.parse(tokenStr) : null;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common["Authorization"];
};

class APIClient {
  getWithToken = (url, params) => {
    setAuthorization();
    let response;

    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
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
    return axios.put(url + "/" + data.id, data);
  };

  deleteWithToken = (url, id) => {
    setAuthorization();
    return axios.delete(`${url}/${id}`);
  };

  get = (url, params) => {
    removeAuthorization();
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
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
