import request from '../utils/request';

//获取设计图列表
export function designList(params) {
	return request.get(`/app/Design/list`, params);
}
//获取我的房屋列表
export function queryEstates(params) {
	return request.get("/customer/app/estate/queryEstates", params)
}

//添加房屋
export function addHouse(params) {
	return request.post("/customer/app/estate/addEstate",params )
}

//获取房屋详情
export function getHouse(params) {
	return request.get("/customer/app/estate/queryEstateDetail/"+params )
}

//编辑房屋
export function editHouse(params) {
	return request.put("/customer/app/estate/updateEstate",params )
}

//设置默认房屋
export function setDefault(params) {
	return request.put("/customer/app/estate/setDefaultEstate/"+params )
}

//获取抢单审核详情
export function getGrabDetail(params) {
	return request.get("/pm/snatch/server/"+params )
}

//确认抢单人员
export function sureGrab(params) {
	return request.post("/pm/snatch/confirm",params )
}

//更换抢单人员
export function replaceGrab(params) {
	return request.post("/pm/snatch/server/change",params )
}

//获取亲友团列表-房屋下的
export function friendListByEstateId(params) {
	return request.get("/customer/app/relative/listByEstateId", {params})
}

//添加亲友团
export function addFriends(params) {
	return request.post("/customer/app/relative/add",params )
}

//删除亲友
export function deleteFriends(params) {
	return request.post("/customer/app/relative/delete",params )
}

//SKU商品表格
export function getProductsSkusPage(params) {
	return request.get("/product/web/products/skus/page", params)
}
