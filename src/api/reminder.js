import request from '../utils/request';
import { objectToUrlString } from "../utils/params.js";

// 上门时间确认
export function confirmServeTime(serverCardId) {
	return request.post(`/pm/app/user/inspectEstate/confirmServeTime/${serverCardId}`)
}
// 查看服务时间消息
export function serviceTimeMsg(serverCardId) {
	return request.get(`/pm/app/user/inspectEstate/serviceTimeMsg/${serverCardId}`)
}
