
import request from '../utils/request';

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
export function refundList(params){
	return request.get(`/order/app/order/refundList`,params)
}
