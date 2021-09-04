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
// 抛出方法
export default {
  getBannerList,
  getSeckillList,
  getProList,
  getProDetail
}
