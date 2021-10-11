import request from '../utils/request';

//获取banner列表
export function getBanner(params) {
	return request.get(`/app/banner/list`, {
		params
	});
}

//APP 直播+预告+回放列表
export function queryLive(params) {
	return request.get(`/app/publicRoom/roomMedia`, {
		params
	});
}
//首页金刚区
export function navList(params) {
	return request.get(`app/home/config/versions/9`, {
		params
	});
}

//找设计
export function findDesign(params) {
	return request.get(`/product/app/products/classification/tree/1`, {
		params
	});
}
//关联商品SPU默认SKU表格
export function defaultSkus(params) {
	return request.get(`/product/app/products/relation/spus/defaultSkus/list`, {
		params
	});
}

//查询案例列表
export function caseList(params) {
	return request.get(`/app/case/v2/list`, {
		params
	});
}

//获取（省市）城市树
export function getProvinceCityTree() {
	const zeusUrl = process.env.VUE_APP_ZEUS;
	return request.get(`api/area/list_tree_exclude_qg`, {
		baseURL: zeusUrl
	});
}

//-----------------------------工地直播------------------------------
//已绑定列表
export function bindVideoList(params) {
	return request.get(`/pm/app/equipmentBind/list/type/bind`, {
		params
	});
}

//工地速看列表
export function workVideo(params) {
	return request.get(`/pm/app/equipmentBind/list/workVideo`, {
		params
	});
}


//公共直播间 - 查询房间信息
export function publicRoom(roomId) {
	return request.get(`/api/publicRoom/${roomId}`, {
		data: {
			hideToast: true
		}
	});
}

//点赞并获取点赞总数
export function insertAndGetLikeNum(params) {
	return request.post(`/app/liveLike/insertAndGetLikeNum`, {
		...params,
		hideToast: true,
		ignoreLogin: true
	});
}
