
import request from '../utils/request';

//我的-订单列表
export function getOrderList(params){
    return request.get(`/order-center/app/order/list`,{params});
}

export function orderDetail(params){
    return request.get(`/order/app/order/detail`,{params});
}

//app订单支付接口
export function orderPay(params){
    return request.post(`/order/app/order/payOrder`,params);
}


// 我的-订单-退款-退款列表
export function getRefundList(params){
	return request.get(`/order-center/app/order/refundList`,{params})
}
//我的-订单-退款-退款详情
export function getRefundDetail(params){
	return request.get(`/order-center/app/order/refundDetail`,{params})
}