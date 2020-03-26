import axios from "axios";

// 全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

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