import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.VUE_APP_baseUrl;
axios.timeout = 40 * 1000;
axios.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, t: Date.now() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const httpGet = function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

const httpPost = function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

export default {httpGet,httpPost}