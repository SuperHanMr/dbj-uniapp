import request from '../utils/request';

//获取设计图列表
export function designList(params) {
	return request.get(`/app/Design/list`, params);
}
export function queryEstates(params) {
	return request.get("/customer/app/estate/queryEstates", params)
}
//添加房屋
export function addHouse(data) {
	return request.post("/customer/app/estate/addEstate", data)
}

//设为默认
export function setDefault(data) {
	return request.put("/customer/app/estate/setDefaultEstate/"+data)
}