import request from '../utils/request';
import { objectToUrlString } from "../utils/params.js";

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

//获取服务卡操作记录
export function getLogs(params) {
	return request.get("/pm/app/serve/log/"+params )
}

//获取我的装修服务设计图内容
export function getMyDesignServe(params) {
	return request.get("/pm/app/serve/design/myDesignServe?severId="+params )
}

//获取我的装修服务设计类型
export function getDesignServeMenu(params) {
	return request.get("/pm/app/serve/design/designServeMenu/"+params )
}

//获取我的装修服务设计类型
export function getMyService(params) {
	return request.get("/pm/app/project/myService?projectId="+params.projectId+"&processId="+params.processId )
}

// //获取mqtt信息
// export function getMqtt(params){
// 	return request.get("/app/live/mqtt/mqttProperties" )  
// }

// //获取mqtt鉴权token
// export function getToken(params){
// 	return request.post("/app/live/mqtt/applyToken",params )  
// }

//获取装修消息列表
export function getMsgList(params) {
	return request.get("/pm/app/specialMsg/all?projectId="+params )
}

//获取抢单审核详情
export function getGrabDetail(params) {
	return request.get("/pm/app/snatch/server/"+params )
}

//确认抢单人员
export function sureGrab(params) {
	return request.post("/pm/app/snatch/server/confirm",params )
}

//更换抢单人员
export function replaceGrab(params) {
	return request.post("/pm/app/snatch/server/change",params )
}

//获取量房交付报告
export function getAmountDetail(params) {
	return request.get("/pm/app/measure/measurePictures/"+params )
}

//驳回量房交付报告
export function replaceAmount(params) {
	return request.post("/pm/app/measure/modifyMeasurePlan",params )
}

//确认量房交付报告
export function sureAmount(params) {
	return request.post("/pm/app/measure/agreeMeasurePlan",params )
}

//获取验房交付报告
export function getCheckResultDetail(params) {
	return request.get("/pm/app/user/inspectEstate/report/"+params )
}

//确认验房验房交付
export function confirmCheckResult(params) {
	return request.post("/pm/app/user/inspectEstate/confirmReport/"+params )
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
	return request.get("/product/app/products/skus/page", params)
}

//获取服务类默认商品
export function getServiceSku(params) {
  const str = objectToUrlString(params)
	return request.get("/pm/app/project/getServiceSku?" + str )
}

//根据条件查询交付文件列表
export function getDesignList(params) {
  const str = objectToUrlString(params)
	return request.get("/pm/app/serve/design/listByQuery?" + str )
}

//申请阶段交付 OK
export function applyStageDeliver(data) {
	return request.post("/pm/web/serve/serveCard/applyStageDeliver", data)
}

//根据条件查询设计图阶段交付文件列表
export function designListByQuery(serveCardId) {
	return request.get(`/pm/app/serve/design/listByQuery/${serveCardId}`)
}

//C端 确认阶段交付 
export function confirmStageDeliver(serveCardId) {
	return request.get(`/pm/app/serve/design/confirmStageDeliver/${serveCardId}`)
}
// C端 业主要求修改设计图 
export function reviseStageDeliver(serveCardId) {
	return request.get(`/pm/app/serve/design/reviseStageDeliver/${serveCardId}`)
}