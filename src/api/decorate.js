import request from '../utils/request';
import {
	objectToUrlString
} from "../utils/params.js";

//获取设计图列表
export function designList(params) {
	return request.get(`/app/Design/list`, params);
}
//获取我的房屋列表
export function queryEstates(params, hideToast = false,
	ignoreLogin = false) {
	return request.get("/customer/app/estate/queryEstates", {
		params,
		data: {
			hideToast,
			ignoreLogin
		}
	})
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
	return request.get("/pm/app/project/myService?projectId=" + params.projectId )
}

//获取我的装修服务管家数据
export function getStewardService(params) {
	return request.get("/pm/app/butler/getByServeCardId/" + params)
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

//根据房产id获取装修消息数量
export function getMsgNumByHouse(params) {
	return request.get("/pm/app/specialMsg/count/estate?estateId=" + params)
}


//获取抢单审核详情
export function getGrabDetail(params) {
	return request.get("/app/employeeInfo/personInfo?zeusId=" + params)
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
	return request.get("/pm/app/measure/measurePictures/" + params.serveId + '/' + params.type + '?status=' + params
		.status || 0)
}

//驳回量房交付报告
export function replaceAmount(params) {
	return request.post("/pm/app/measure/modifyMeasurePlan", params)
}

//确认量房交付报告
export function sureAmount(params) {
	return request.post("/pm/app/measure/agreeMeasurePlan", params)
}

//查询是否有精算报告
export function getActuaryReport(params) {
	return request.get("/pm/app/actuary/isPass/new/" + params.projectId+'/'+params.serveId)
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

//获取服务人员挂载商品
export function getSkuList(params) {
	// const str = objectToUrlString(params)
	return request.post("/serve-product/web/serveProduct/spu" , params)
}

//查询业主与服务者服务状态
export function getServiceStatus(params) {
	return request.get("/pm/app/serve/serverStatus/" + params)
}

//个人主页关注推荐
export function queryAttention(params) {
	return request.post("/app/base/interactive/add", params)
}

//查询个人主页关注推荐
export function getAttention(params) {
	const str = objectToUrlString(params)
	return request.get("/app/base/interactive/participated?" + str)
}

//查询个人主页评价
export function getComments(params) {
	return request.get("/pm/app/commentSetting/getComments", {params})
}

//查询同行评价列表
export function getPeerCommentsList(params) {
	return request.get("/pm/app/commentSetting/getPeerListComments",{params})
}


//查询设计师 前10名排行榜 榜单信息
export function getDesignRank(index, code) {
  console.log(index, code)
  let params = {code: code}
  if(!index) {
    return request.get("/app/designRank/getTop10Ranking", {params})
  }else {
    return request.get(`/app/designChart/getListByCode`, {params})
  }
}

export function getJoinedRankings(params) {
	return request.get(`/app/designChart/joinedRankings?zeusId=`+params)
}


//设计师榜单说明
export function getChartInstructions(params = {}) {
	return request.get(`/app/designChart/getChartInstructions`, params)
}

// 设计师榜单tab
export function getTabList(params = {}) {
	return request.get(`/app/designChart/getTabList`, params)
}

// 设计师tab其它榜单
export function getListByCode(params = {}) {
	return request.get(`/app/designChart/getListByCode`, params)
}

//查询设计师个人主页评价
export function getDesignComments(params) {
	// const str = objectToUrlString(params)
	return request.get("/pm/app/commentSetting/v2/getComments", {
		params
	})
}

//获取个人主页案例列表
export function getCaseList(params) {
	return request.post("/app/case/new/personal/page", params)
}

//获取个人主页同行评价
export function getPeerComments(params) {
	return request.get(`/pm/app/commentSetting/getPeerComments?refUserId=`+params)
}

//查询服务中是否可以换人
export function checkServeingChange(params) {
	return request.get(`/pm/app/serve/serveing/change/check/${params}`)
}

//更换服务人员
export function replaceServe(params) {
	return request.post("/pm/app/serve/serveing/change", params)
}

//查询变更单列表
export function getListChangeOrders(params,id) {
	return request.get("/pm/web/changeOrder/list/owner?stateType="+params+'&projectId='+id)
}

//拒绝变更单申请
export function rejectChangeOrder(params) {
	return request.post("/pm/app/changeOrder/doRejectChangeOrder",params)
}

//查询拒绝变更单原因
export function rejectReson(params) {
	return request.get("/pm/app/changeOrder/listRejectReasons?type=2")
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
	return request.get("/order-center/app/goods/stock/category/list", {
		params
	})
}

//要货左侧品类列表对应商品
export function inventoryDetails(params) {
	return request.get("/order-center/app/goods/stock/inventoryDetails/list", {
		params
	})
}

//APP-要货-申请要货
export function goodsApply(params) {
	return request.post("/order-center/app/goods/require/create", params)
}

// 获取工序费用
export function sellList(params) {
	if (params.isBOM === '1') {
		return request.get(`/pm/app/actuary/sell/other/list/${params.projectId}/${params.type}`)
	} else if (params.obtainType == 0 || params.obtainType == 1 || params.obtainType == 2) {
		return request.get(`/pm/app/actuary/sell/list/${params.projectId}/${params.type}/${params.obtainType}`)
	}
	return request.get(`/pm/app/actuary/sell/list/${params.projectId}/${params.type}`)
}

// //部分购买全部购买
// export function sellList(params) {
// 	return request.get(`/pm/app/actuary/sell/list/${params.projectId}/${params.type}/`)
// }

//c端APP-仓库-待收货-确认收货
export function confirmGoods(params) {
	return request.put("/order-center/app/goods/stock/confirm/goods", params)
}
//APP-要货-要货记录列表
export function requireList(params) {
	return request.get("/order-center/app/goods/require/list", {
		params
	})
}
//APP-要货-要货记录详情
export function requireListDetail(params) {
	return request.get("/order-center/app/goods/require/detail", {
		params
	})
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

// 确认新设计报告
export function confirmNewDesignReport(serveCardId) {
	return request.post(`/pm/app/serve/design/confirmFinish/${serveCardId}`)
}


// 查询装修动态 客户端-轮播图
export function getCarouselMsg(projectId) {
	return request.get(`/pm/app/decorate/calendar/getCarouselMsg/${projectId}`)
}

// 搜索商品列表（这个是真实接口）
export function productList(data) {
	return request.post(`/product/app/search/query`, data)
}


// 判断当前登录人是否是业主
export function judgeOwner(params) {
	return request.get(`/order-center/app/goods/stock/judgeOwner`, {
		params
	})
}

// 是否可以操作（换人申请中是否可以操作）
export function isAllowOperate(serveId) {
	return request.get(`/pm/app/worker/service/isAllowOperate/${serveId}`, {
		params
	})
}

//---------------------设计服务面积变更-----------------------
// 查询面积变更单
export function getAreaChangeOrder(params) {
	return request.get(`/pm/app/changeOrder/getAreaChangeOrder`, {
		params
	})
}

// 面积变更单详情
export function getAreaChangeOrderDetail(params) {
	return request.get(`/pm/app/changeOrder/getAreaChangeOrderDetail`, {
		params
	})
}

// 业主拒绝变更单
export function refuseAreaChangeOrder(params) {
	return request.post(`/pm/app/areaChangeOrder/refuse`, params)
}