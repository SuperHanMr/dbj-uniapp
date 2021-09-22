import request from '../utils/request';



// 
//修改用户资料  (头像 昵称)

export function editUserInfo(params) {
	return request.put(`/customer/app/mycenter/person`,params);
}








//我的-订单列表
export function getOrderList(params) {
	return request.get(`/order-center/app/order/list`, { params });
}

//我的-订单-订单详情
export function getOrderDetail(params) {
	return request.get(`/order-center/app/order/detail`, { params });
}

//我的-订单-取消订单
export function cancelOrder(params) {
	return request.put(`/order-center/app/order/cancelOrder`, params)
}

//我的-订单-确认收货
export function confirmReceiptOrder(params) {
	return request.put(`/order-center/app/order/receive`, params)
}



//app订单支付接口
export function orderPay(params) {
	return request.post(`/order-center/app/order/payOrder`, params);
}


// 我的-订单-退款-退款列表
export function getRefundList(params) {
	return request.get(`/order-center/app/order/refundList`, {
		params
	})
}
//我的-订单-退款-退款详情
export function getRefundDetail(params) {
	return request.get(`/order-center/app/order/refundDetail`, {
		params
	})
}

//我的-订单-整个订单申请退款
export function wholeOrderApplyForRefund(params) {
	return request.post(`/order-center/app/order/overall/applyRefund`,  params)
}
//我的-订单-部分商品申请退款
export function particalOrderApplyForRefund(params) {
	return request.post(`/order-center/app/order/overall/applyRefund`, { params })
}

//我的-订单-申请退款-申请退款原因
export function refundReason(params) {
	return request.get(`/web/codeIterm/getItermsByCodeKey`, { params })
}






//我的-订单-退款-取消退款
export function cancelRefund(params) {
	return request.put(`/order-center/app/order/cancelRefund`, params)
}

//我的-订单-分次支付列表
export function querySplitPayList(params) {
	return request.get(`/order-center/app/order/querySplitPayList`, { params })
}

//我的-订单-分次支付接口
export function splitPay(params) {
	return request.post(`/order-center/app/order/splitPayOrder`, params);
}


// 我的-评价-评价列表
export function getEvationList(params) {
	return request.get(`/pm/app/serve/completeList`, params);
} 

//我的-业主-立即评价
export function immediateEvaluate(params) {
	return request.post(`/pm/app/commentSetting/comment`, params);
}
//获取服务单下面的评价
export function evaluateDetail(params) {
	return request.get(`/pm/app/commentSetting/getById`,{params})
}


//我的关注-列表接口
export function getConcernList(params) {
	return request.get(`/app/base/interactive/list/all`,{params})
}

//我的收藏- 列表接口
export function getCollectionList(params) {
	return request.get(`/app/base/interactive/list/all`,{params})
}





































// --------------------------仓库管家------------------------

//c端APP-仓库-待发货
export function deliveredList(params) {
	return request.get(`/order-center/app/goods/stock/toBeDelivered/list`, {
		params
	})
}
//c端APP-仓库-待发货
export function reimburseList(params) {
	return request.get(`/order-center/app/goods/stock/reimburse/list`, {
		params
	})
}
//c端APP-仓库-待收货-已收货
export function receivedDetail(params) {
	return request.get(`/order-center/app/goods/stock/toBeReceived/detail`, {
		params
	})
}

//c端APP-仓库-待发货查询详情
export function deliveredDetail(params) {
	return request.get(`/order-center/app/goods/stock/toBeDelivered/details`, {
		params
	})
}


//C端APP-我的-订单-退款-退款详情
export function refundDetail(params) {
	return request.get(`/order-center/app/order/refundDetail`, {
		params
	})
}

//C端APP-我的-订单-退款-退款详情
export function receivedList(params) {
	return request.get(`/order-center/app/goods/stock/toBeReceived/list`, {
		params
	})
}

