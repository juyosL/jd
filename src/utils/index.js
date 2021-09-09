import request from './axios'
// 轮播图
export function getBannerList () {
  return request({ url: '/banner/list' })
}
// 秒杀产品列表 count页码,默认值为1 limitNum每页显示个数,默认值为6
export function getSeckillList (params) {
  return request({ url: '/pro/seckilllist', params })
}
// 商品列表 count页码,默认值为1 limitNum每页显示个数,默认值为10
export function getProList (params) {
  return request({ url: '/pro/list', params })
}
// 获取商品详情,proid string类型
export function getProDetail (proid) {
  return request({ url: '/pro/detail/' + proid })
}
// 发送手机短信 /user/dosendmsgcode
export function dosendmsgcode (params) {
  return request.post('/user/dosendmsgcode', params)
}
// 验证验证码 tel手机号,telcode验证码
export function docheckcode (params) {
  return request.post('/user/docheckcode', params)
}
// 验证手机号是否有
export function docheckphone (params) {
  return request.post('/user/docheckphone', params)
}
// 设置密码完成注册 tel手机号,password密码
export function dofinishregister (params) {
  return request.post('/user/dofinishregister', params)
}
// 登录 loginname手机号/账户名/邮箱,password密码
export function dologin (params) {
  return request.post('/user/login', params)
}
// 添加购物车 token,userid,proid,num
export function addCart (params) {
  return request.post('/cart/add', params)
}
// 更改商品数量 token,cartid,num
export function updatenumCart (params) {
  return request.post('/cart/updatenum', params)
}
// 删除购物车一个商品 token,cartid
export function removeCart (params) {
  return request.post('/cart/remove', params)
}
// 查看购物车 token,userid
export function getCartList (params) {
  return request.post('/cart/list', params)
}
// 更新当前购物车勾选状态 token,cartid,flag(Boolean)
export function selectone (params) {
  return request.post('/cart/selectone', params)
}
// 更新购物车所有勾选状态 token,userid,type(Boolean)
export function selectall (params) {
  return request.post('/cart/selectall', params)
}
// 删除购物车勾选数据 token,userid
export function deleteCart (params) {
  return request({ url: '/order/deleteCartItem', params })
}
// 添加订单 token,userid
export function addOrder (params) {
  return request.post('/order/addOrder', params)
}
// 抛出方法
export default {
  getBannerList,
  getSeckillList,
  getProList,
  getProDetail,
  dosendmsgcode,
  docheckcode,
  docheckphone,
  dofinishregister,
  dologin,
  addCart,
  getCartList,
  updatenumCart,
  removeCart,
  addOrder,
  selectone,
  selectall,
  deleteCart
}
