import request from '../utils/request';


//更多案例列表
export function moreCaseList(params = {}) {
	return request.post(`/app/case/new/more/page`, params);
}

//设计师特色和风格
export function designTopicStyleList(params = {}) {
	return request.get(`/app/search/designer/params`, params);
}

//首页推荐案例列表
export function recommendCaseList(params) {
	return request.post(`/app/case/new/recommend/list`, params);
}

// //设计师主页个人案例列表分页
export function searchDesigner(params) {
	//    /app/search/designer/recommend
	return request.post(`/app/search/designer`, params);
}

//找设计首页设计服务
export function designServiceList(params){
	return request.get(`/app/search/designer/getServiceRecommend`,params)
}