import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.VUE_APP_baseUrl;
axios.timeout = 40 * 1000;
axios.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    console.log(config);
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

const httpRequest = axios.create({});
export default httpRequest;
// export default {httpGet,httpPost}