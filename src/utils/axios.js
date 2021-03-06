import axios from 'axios'
import router from '../router'

// 判断当前环境,NODE_ENV的值来区分开发环境和生产环境
// production生产环境(上线的环境),development开发环境(内部环境)
const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? '/api' : 'http://121.89.205.189/api',
  timeout: 6000 // 网络超时时间
})

request.interceptors.request.use((config) => {
  // 在请求之前做些什么
  // 携带token,让后端验证
  config.headers.common.token = localStorage.getItem('token') || ''
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器 ---- 在拿到接口的数据之前都会执行的代码 --- 隐藏loading的动画效果/验证token
request.interceptors.response.use((response) => {
  // 在响应时做些什么
  // 判断token如果失效或者无效,重新登录
  if (response.data.code === '10119') {
    router.push('/login')
  }
  return response
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})

// 暴露自定义的axios
export default request
