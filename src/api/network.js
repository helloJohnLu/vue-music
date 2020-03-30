import axios from "axios";
import Vue from "vue";

// 全局配置
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://47.88.153.199:4000'
axios.defaults.timeout = 3000

let requestCount = 0;  // 发送请求数
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  requestCount++;  // 每次发送请求，++
  Vue.showLoading();
  return config;
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  requestCount--;  // 每次发送请求，--

  if (requestCount === 0) {
    Vue.hiddenLoading();  // 所有请求都响应才隐藏加载提示
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 封装自己的 get/post 方法
export default {
  get(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      }).then(response => resolve(response.data))
        .catch(error => reject(error))
    });
  },

  post(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    });
  },

  // 并发多个请求
  all(list) {
    return new Promise((resolve, reject) => {
      axios.all(list)
        .then(axios.spread((...result) => {
          resolve(result);
        }))
        .catch(error => reject(error));
    });
  }
}