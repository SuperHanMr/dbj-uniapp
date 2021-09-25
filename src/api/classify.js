import request from '../utils/request';
import axios from 'axios'
export function getClassifyList (params) {
  return request.get('/product/app/prod-categories/front/tree')
}
export function getGoodsList (params) {
  return request.post('/product/app/search/query', params)
}
export function getAddressInfo(houseId) {
  return request.get(`/customer/app/estate/queryEstateDetail/${houseId}`);
}
export function getDetailInfo(params) {
  return request.post('/app/purchase/check', params);
  // return axios.post('http://rap2api.taobao.org/app/mock/290704/test-good', params);
}
export function payOrder(params) {
	return request.post("/order-center/app/order/createOrder", params)
}
export function getProductID(params) {
  return request.get("/pm/web/project/getProjectIdByEstateId", {params});
}

