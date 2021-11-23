import request from '../utils/request';

export function oauthGomeInfo(data) {
	let shareId = uni.getStorageSync("shareId");
	if (shareId) {
		//只要是从胶囊小店跳转过来的就传这个值
		data.sourceType = "CAPSULE_STORE_APPLET"
	}
	data = Object.assign(data, {
		clientCode: "APPLET",
		ignoreLogin: true
	})
	return request.post('/app/oauth/gome/login', data)
}
//编辑房屋
export function bindCapsule(params) {
	return request.put("/capsule-shop/app/customer/create", params)
}
