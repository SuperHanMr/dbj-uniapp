import request from '../utils/request';
import axios from 'axios'
export function getClassifyList (areaId) {
  return request.get('/product/app/prod-categories/front/tree/area/' + areaId)
}
export function getGoodsList (params) {
  return request.post('/product/app/search/query', params)
}
export function getHomeGoodsList (params) {
  return request.post('/product/app/search/recommend/home', params)
}
export function getAddressInfo(houseId) {
  return request.get(`/customer/app/estate/queryEstateDetail/${houseId}`);
}
export function getDetailInfo(params) {
  return request.post('/app/purchase/check', params);
  // return axios.post('http://rap2api.taobao.org/app/mock/290704/test-good', params);
}
export function payOrder(params) {
  let version = uni.getAccountInfoSync().miniProgram.version || 'develop';
	return request.post(`/order-center/app/order/createOrder?v=${version}`, params)
}
export function getProductID(params) {
  return request.get("/pm/web/project/getProjectIdByEstateId", {params});
}

