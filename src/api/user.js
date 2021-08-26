import request from '../utils/request';

export function getUserInfo(params){
    return request.post(`/getUserInfo`,params);
}
export function getShoppingCartProductInfo(params){
	return request.get(`/product/app/products/shoppingCart/userIds/${params}`,{})
}
export function oauthGomeInfo (params) {
	return request.post('/app/oauth/gome/info/' ,params)
}