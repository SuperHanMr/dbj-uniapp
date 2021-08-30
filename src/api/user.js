import request from '../utils/request';

export function getUserInfo(params){
    return request.post(`/getUserInfo`,params);
}
export function getShoppingCartProductInfo(id){
	return request.get(`/product/app/products/shoppingCart/userIds/${id}`,{})
}