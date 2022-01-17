import request from '../utils/request';

//更多案例列表
export function moreCaseList(params = {}) {
	return request.post(`/app/case/new/more/page`, params);
}

//设计师特色和风格
export function designTopicStyleList(params = {}) {
	return request.get(`/app/search/designer/params`, params);
}

//查找设计师列表
export function designerList(params) {
	return request.post(`/app/search/designer`, params);
}