import request from '../utils/request';

export function getUserInfo(params){
    return request.post(`/getUserInfo`,params);
}
export function getShoppingCartInfo(id){
	return request.get(`/product/web/products/shoppingCart/userIds/${id}`,{})
}
export function deleteProduct(params){
	return request.delete(`/product/web/products/shoppingCart`,{params})
}
export function setBuyCount(params){
	return request.put(`/product/web/products/shoppingCart/changeBuyCount`,params)
}
export function clearDisabled(params){
	return request.put(`/product/web/products/shoppingCart/clear`,params)
}