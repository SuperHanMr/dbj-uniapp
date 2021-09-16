import request from '../utils/request';
import { objectToUrlString } from "../utils/params.js";

//获取完工申请日志(阶段完工、整体完工)
export function getCompletionLog(data) {
	return request.post("/pm/app/worker/construction/getCompletionLog", data)
}
//根据id获取完工验收申请详情
export function getCompletionLogById(id) {
	return request.get(`/pm/app/worker/construction/getCompletionLogById/${id}`)
}
// 查询竣工详情
export function completionDetail(id) {
  return request.get(`/pm/app/site/completion/getById/${id}`)
}
// 业主新增审核
export function ownerInsertAudit(data) {
  return request.post(`/pm/app/site/audit/owner/insert`, data)
}
// 业主竣工审核
export function ownerCompletionAudit(data) {
  return request.post(`/pm/app/site/completion/audit`, data)
}