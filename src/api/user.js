import request from '../utils/request';

export function getUserInfo(params) {
	return request.post(`/getUserInfo`, params);
}
export function getShoppingCartInfo() {
	return request.get(`/product/app/products/shoppingCart`, {})
}
export function deleteProduct(params) {
	return request.delete(`/product/app/products/shoppingCart`, {
		data: params
	})
}
export function setBuyCount(params) {
	return request.put(`/product/app/products/shoppingCart/changeBuyCount`, {...params,
		hideToast: true})
}
export function clearDisabled(params) {
	return request.put(`/product/app/products/shoppingCart/clear`, params)
}
export function getGoodsSpec(skuId, areaId) {
	return request.get(`/product/app/products/skus/${skuId}/area/${areaId}/properties`, {})
}
export function setGoodsSku(params) {
	return request.put(`/product/app/products/shoppingCart/changeSku`, params)
}
export function createcollection(params) {
	return request.post(`/app/base/interactive/add/list`, params)
}
export function getBalance() {
  return request.get(`/wallet/app/customer/query/giftCardAmount`, {});
}
export function getBillingDetails(params) {
  return request.get(`/wallet/app/customer/query/giftCardAccountFlow`, {params});
}
export function getActivity(params) {
  return request.get(`/market/app/activity/list`, {params});
}
export function createCardOrder(params) {
	return request.post(`/order-center/app/order/createCardOrder`, params)
}