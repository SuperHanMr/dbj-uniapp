import request from '../utils/request';

export function getUserInfo(params){
    return request.post(`/getUserInfo`,params);
}
export function getShoppingCartInfo(userId){
	return request.get(`/product/web/products/shoppingCart/userIds/${userId}`,{})
}
export function deleteProduct(params){
	return request.delete(`/product/web/products/shoppingCart`,{ data: params })
}
export function setBuyCount(params){
	return request.put(`/product/web/products/shoppingCart/changeBuyCount`,params)
}
export function clearDisabled(params){
	return request.put(`/product/web/products/shoppingCart/clear`,params)
}
export function getGoodsSpec(skuId){
	return request.get(`/product/web/products/skus/${skuId}/properties`,{})
}
export function setGoodsSku(params){
	return request.put(`/product/web/products/shoppingCart/changeSku`,params)
}
export function createcollection(params){
	return request.post(`/web/collection/lists`,params)
}