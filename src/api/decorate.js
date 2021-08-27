import request from '../utils/request';

//获取设计图列表
export function designList(params) {
	return request.get(`/app/Design/list`, params);
}
export function queryEstates(params) {
	return request.get("/customer/app/estate/queryEstates", params)
}