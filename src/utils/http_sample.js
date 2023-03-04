import axios from "axios";
axios.defaults.headers["Content-Type"] = "application/json; charset=UTF-8";

export default function request(options) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const service = axios.create({
      // axios中请求配置有baseURL选项，表示请求URL公共部分
      baseURL: process.env.VUE_APP_baseUrl, //baseURL 将会被加在 url 前面。
      // 超时
      timeout: 10000,
      withCredentials: true, // 是否允许带cookie这些
    });
    // request拦截器
    service.interceptors.request.use(
      async (config) => {
        switch (config.method) {
          case "get":
            config.params = config.params;
            break;
          case "post":
            config.headers["Content-Type"] =
              "application/x-www-form-urlencoded; charset=UTF-8";
            config.data = JSON.stringify(config.data);
            break;
          default:
        }
        return config;
      },
      (error) => {
        Toast.clear();
        console.log(error);
        Promise.reject(error);
      } //请求拦截器的报错处理
    );

    // 响应拦截器
    service.interceptors.response.use(
      (res) => {
        const handleErrCode = res.data.code;
        if (handleErrCode === "10000") {
          resolve(res.data);
        } else {
          console.log("其他状态码的处理逻辑");
          reject(res.data);
        }
      },
      (error) => {
        Toast.clear();
        console.log("err" + error);
        let { message } = error;
        if (message == "Network Error") {
          message = "网络异常，请检查网络";
        } else if (message.includes("timeout")) {
          message = "系统接口请求超时，请检查网络";
        } else if (message.includes("Request failed with status code")) {
          message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Toast({
          message: message,
          type: "error",
          duration: 5 * 1000,
        });
        return reject(error);
      }
    );
    service(options);
  });
}
