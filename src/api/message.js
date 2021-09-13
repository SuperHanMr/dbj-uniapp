import request from '../utils/request';

export function getGroupList() {
	return request.get('/app/chatgroup/v2/list')
}
