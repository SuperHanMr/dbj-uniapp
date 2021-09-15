import request from '../utils/request';
import axios from 'axios'
export function getClassifyList (data) {
  return request.get('/product/web/prod-categories/front/tree')
}
export function getGoodsList (data) {
  return request.get('/product/web/products/skus/page')
}
export function getAddressInfo(houseId) {
  return request.get(`/customer/app/estate/queryEstateDetail/${houseId}`);
}
export function getDetailInfo(params) {
  // return request.post('/app/purchase/check', params);
  return axios.post('http://rap2api.taobao.org/app/mock/290704/test', params);
}