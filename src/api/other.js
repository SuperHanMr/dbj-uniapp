import request from '../utils/request';

//获取openid
export function getOpenId(params) {
	return request.get(`/order-center/wechat/applet/code2Session`, {
		params
	});
}

//商家支付入驻费
//https://apidoc.dabanjia.com/#/menu/4ccfefdb26b54c4ffcd70bd950e92597
export function payEntryFee(params) {
	return request.post(`/order-center/app/order/payEntryFee`, params);
}
