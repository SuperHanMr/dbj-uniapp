import request from '../utils/request';

//获取banner列表
export function getBanner(params) {
	return request.get(`/app/banner/list`, {
		params
	});
}

//APP 直播+预告+回放列表
export function queryLive(params) {
	return request.get(`/app/publicRoom/queryLiveList`, {
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
