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
	return request.post(`/order-center/app/order/createOrder`, params)
}

export function payH5(params) {
  return request.post("/order-center/app/pay/gomeConfirmPay", params);
}
export function getProductID(params) {
  return request.get("/pm/web/project/getProjectIdByEstateId", {params});
}
// 套包下单
export function payBundleOrder(params) {
  return request.post(`/order-center/app/order/createPromotionPackageOrder`, params)
}
// 确认订单页获取套包详情
export function getBundleDetail(params) {
  let parmStr = params.skuIds instanceof Array ? params.skuIds.map((id) => {
    return `skuIds=${id}`
  }).join('&') : '';
  return request.get(`/product/app/bundle/${params.bundleId}/property?${parmStr}`);
}
export function checkPay(params) {
  return request.get("/order-center/app/order/queryPayResult", {params});
}

