import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router';

axios.defaults.withCredentials = true
// 添加请求url Map缓存请求项
const pendingRequests = new Map();

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 处理重复请求
    const requestKey = `${config.url}/${JSON.stringify(config.params)}/${JSON.stringify(config.data)}&request_type=${config.method}`;
    if (pendingRequests.has(requestKey)) {
      config.cancelToken = new axios.CancelToken((cancel) => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(`重复的请求被主动拦截: ${requestKey}`);
      });
    } else {
      pendingRequests.set(requestKey, config);
      config.requestKey = requestKey;
    }

    if (store.getters.token) {
      // 让每个请求携带token
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const requestKey = response.config.requestKey;
    pendingRequests.delete(requestKey);

    const res = response.data

    if (res.statusCode === 400) {
      MessageBox.alert('系统未登录，请重新登录', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          router.push('/login');
        })
      })
      return Promise.reject('error')
    } else if (res.statusCode === 500) {
      MessageBox.alert(`${res.errorMessage}`, '错误', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return Promise.reject('error')
    } else if (res.statusCode !== 200) {
      return Promise.reject(response)
    } else {
      return response
    }
  }, error => {
    console.log('err' + error)
    if (axios.isCancel(error)) {
      console.warn(error);
      return Promise.reject(error);
    }
    pendingRequests.clear();

    Message({
      message: '登录异常',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  })

export default service
