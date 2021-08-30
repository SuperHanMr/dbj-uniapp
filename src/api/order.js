
import request from '../utils/request';

export function orderList(params){
    return request.get(`/order/app/order/list`,params);
}

export function orderDetail(params){
    return request.get(`/order/app/order/detail`,{params});
}

//app订单支付接口
export function orderPay(params){
    return request.post(`/order/app/order/payOrder`,params);
}

