import request from '../utils/request';
import { objectToUrlString } from "../utils/params.js";

//获取完工申请日志(阶段完工、整体完工)
export function getEstateProjectInfoList(data) {
	return request.post("/pm/app/worker/construction/getCompletionLog", data)
}
//根据id获取完工验收申请详情
export function availableService(params) {
	return request.get(`/pm/app/worker/construction/getCompletionLogById/${params.id}`)
}