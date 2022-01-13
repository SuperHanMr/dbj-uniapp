import request from '../utils/request';

//更多案例列表
export function moreCaseList(params) {
	return request.post(`/app/case/new/more/page`, params);
}
