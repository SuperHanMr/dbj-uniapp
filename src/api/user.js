import request from '../utils/request';

export function getUserInfo(params){
    return request.post(`/getUserInfo`,params);
}
// export function getShoppingCartInfo(userId){
// 	return request.get(`/product/app/products/shoppingCart/userIds/${userId}`,{})
// }
export function getShoppingCartInfo(){
	return request.get(`/product/app/products/shoppingCart`,{})
}
export function deleteProduct(params){
	return request.delete(`/product/app/products/shoppingCart`,{ data: params })
}
export function setBuyCount(params){
	return request.put(`/product/app/products/shoppingCart/changeBuyCount`,params)
}
export function clearDisabled(params){
	return request.put(`/product/app/products/shoppingCart/clear`,params)
}
export function getGoodsSpec(skuId){
	return request.get(`/product/app/products/skus/${skuId}/properties`,{})
}
export function setGoodsSku(params){
	return request.put(`/product/app/products/shoppingCart/changeSku`,params)
}
export function createcollection(params){
	return request.post(`/app/base/interactive/add/list`,params)
}