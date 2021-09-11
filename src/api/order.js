import request from '../utils/request';

//我的-订单列表
export function getOrderList(params) {
	return request.get(`/order-center/app/order/list`, {
		params
	});
}
//我的-订单-订单详情
export function getOrderDetail(params) {
	return request.get(`/order-center/app/order/detail`, {
		params
	});
}

//我的订单-取消订单 
export function cancelOrder(params) {
	return request.put(`/order-center/app/order/cancelOrder`, params)
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

//我的-订单-退款-取消退款
export function cancelRefund(params) {
	return request.put(`/order-center/app/order/cancelRefund`, params)
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