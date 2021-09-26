import request from '../utils/request';
import {
	objectToUrlString
} from "../utils/params.js";

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
	return request.post("/customer/app/estate/addEstate", params)
}

//获取房屋详情
export function getHouse(params) {
	return request.get("/customer/app/estate/queryEstateDetail/" + params)
}

//获取房屋
export function getHouseStep(params) {
	return request.get("/pm/app/project/getEstateEditFlag?estateId=" + params)
}

//编辑房屋
export function editHouse(params) {
	return request.put("/customer/app/estate/updateEstate", params)
}

//设置默认房屋
export function setDefault(params) {
	return request.put("/customer/app/estate/setDefaultEstate/" + params)
}

//获取服务卡操作记录
export function getLogs(params) {
	return request.get("/pm/app/serve/log/" + params)
}

//获取我的装修服务设计图内容
export function getMyDesignServe(params) {
	return request.get("/pm/app/serve/design/myDesignServe/" + params)
}

//获取我的装修服务设计类型
export function getDesignServeMenu(params) {
	return request.get("/pm/app/serve/design/designServeMenu/" + params)
}

//获取我的装修服务进度
export function getMyService(params) {
	return request.get("/pm/app/project/myService?projectId=" + params.projectId + "&processId=" + params.processId)
}

//获取我的装修服务管家数据
export function getStewardService(params) {
	return request.get("/pm/app/butler/getByProjectId/" + params)
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
	return request.get("/pm/app/specialMsg/all?projectId=" + params)
}

//获取装修消息数量
export function getMsgNum(params) {
	return request.get("/pm/app/specialMsg/count?projectId=" + params)
}

//获取抢单审核详情
export function getGrabDetail(params) {
	return request.get("/app/employeeInfo/myInfo?zeusId=" + params)
}

//确认抢单人员
export function sureGrab(params) {
	return request.post("/pm/app/snatch/server/confirm", params)
}

//更换抢单人员
export function replaceGrab(params) {
	return request.post("/pm/app/snatch/server/change", params)
}

//获取量房交付报告
export function getAmountDetail(params) {
	return request.get("/pm/app/measure/measurePictures/" + params.serveId+'/'+params.type)
}

//驳回量房交付报告
export function replaceAmount(params) {
	return request.post("/pm/app/measure/modifyMeasurePlan", params)
}

//确认量房交付报告
export function sureAmount(params) {
	return request.post("/pm/app/measure/agreeMeasurePlan", params)
}

//获取验房交付报告
export function getCheckResultDetail(params) {
	return request.get("/pm/app/user/inspectEstate/report/" + params)
}

//获取验房交付报告规则详情
export function getResultNorm(params) {
	return request.get("/pm/app/user/inspectEstate/rule/" + params)
}

//获取验房交付报告问题详情
export function getResultProblem(params) {
	return request.get("/pm/app/user/inspectEstate/problem/" + params)
}

//获取服务人员关联商品
export function getSkuList(params) {
	return request.get("/product/app/products/relation/related/skus/list",params)
}

//获取施工交付内容
export function getComplateDetail(params) {
	return request.get(`/pm/app/worker/decoration/trend/getCompletionLogById/${params.projectId}/${params.serveId}`)
}

//确认验房验房交付
export function confirmCheckResult(params) {
	return request.post("/pm/app/user/inspectEstate/confirmReport/" + params)
}

//获取亲友团列表-房屋下的
export function friendListByEstateId(params) {
	return request.get("/customer/app/relative/listByEstateId", {
		params
	})
}

//添加亲友团
export function addFriends(params) {
	return request.post("/customer/app/relative/add", params)
}

//删除亲友
export function deleteFriends(params) {
	return request.post("/customer/app/relative/delete", params)
}

//SKU商品表格
export function getProductsSkusPage(params) {
	const str = objectToUrlString(params)
	return request.get("/product/app/products/skus/page?" + str)
}

//获取服务类默认商品
export function getServiceSku(params) {
	const str = objectToUrlString(params)
	return request.get("/pm/app/project/getServiceSku?" + str)
}

//根据条件查询交付文件列表
export function getDesignList(params) {
	const str = objectToUrlString(params)
	return request.get("/pm/app/serve/design/listByQuery?" + str)
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
	return request.post(`/pm/app/serve/design/confirmStageDeliver/${serveCardId}`)
}
// C端 业主要求修改设计图
export function reviseStageDeliver(serveCardId) {
	return request.post(`/pm/app/serve/design/reviseStageDeliver/${serveCardId}`)
}


//---------------------业主要货相关-----------------------

//要货明细列表
export function inventoryList(params) {
	return request.get(`/order-center/app/goods/stock/inventoryDetails/list`, {
		params
	})
}

//APP-申请退库存
export function goodsBack(params) {
	return request.post("/order-center/app/goods/return/create", params)
}


//c端APP-仓库-已收货申请退款
export function goodsRefund(params) {
	return request.post("/order-center/app/goods/stock/overall/applyRefund", params)
}

//要货左侧品类列表
export function categoryList(params) {
	return request.get("/order-center/app/goods/stock/category/list", {params})
}

//要货左侧品类列表对应商品
export function inventoryDetails(params) {
	return request.get("/order-center/app/goods/stock/inventoryDetails/list", {params})
}

//APP-要货-申请要货
export function goodsApply(params) {
	return request.post("/order-center/app/goods/require/create", params)
}

// 获取工序费用
export function sellList(params) {
	return request.get(`/pm/app/actuary/sell/list/${params.projectId}/${params.type}/${params.obtainType}`)
}
//c端APP-仓库-待收货-确认收货
export function confirmGoods(params) {
	return request.put("/order-center/app/goods/stock/confirm/goods", params)
}
//APP-要货-要货记录列表
export function requireList(params) {
	return request.get("/order-center/app/goods/require/list", {params})
}
//APP-要货-要货记录详情
export function requireListDetail(params) {
	return request.get("/order-center/app/goods/require/detail", { params })
}
// 查看线上交底
export function serverInfo(serveId) {
	return request.get(`/pm/app/serve/design/serverInfo/${serveId}`)
}
// C端APP-要货-用户确认
export function requireConfirm(params) {
	return request.put(`/order-center/app/goods/require/confirm`, params)
}

// app支付运费/搬运费
export function payFreight(params) {
	return request.post(`/order-center/app/order/payFreight`, params)
}
// 查看设计报告 
export function serverReports(serveCardId) {
	return request.get(`/pm/app/serve/design/serverReports/${serveCardId}`)
}

// 确认设计报告 
export function confirmDesignReport(serveCardId) {
	return request.post(`/pm/app/serve/design/confirmDesignReport/${serveCardId}`)
}

// 查询装修动态 客户端-轮播图
export function getCarouselMsg(projectId) {
	return request.get(`/pm/app/decorate/calendar/getCarouselMsg/${projectId}`)
}

// 搜索商品列表（这个是真实接口）
export function productList(data) {
	return request.post(`/product/app/search/query`, data)
}