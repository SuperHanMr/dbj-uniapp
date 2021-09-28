import request from '../utils/request';

// 获取群列表
export function getGroupList() {
	return request.get('/app/chatgroup/v2/list')
}

// 获取智能客服的问题列表
export function getSmartQuestionList() {
  return request.get('/app/smartQuestionAndAnswer/listQuestion');
}

// 发送智能答案 
export function sendSmartAnswer(params) {
  return request.post('/app/smartQuestionAndAnswer/getImSmartAnswer', params);
}

// 保存智能客服的留言消息
export function saveSmartMessage(params) {
  return request.post('/app/butler/chatGroup/saveMessage', params);
}

// 拉取历史消息
export function getMessageList(params) {
  return request.get('/app/chatGroupMsg/getByQuery', { params });
}

// 查询人工客服状态
export function getAgentStatus(customerId) {
  return request.post(`/app/server/chatGroup/${customerId}/afterEnterButlerGroup`);
}

// 请求人工客服
export function callServiceAgent() {
  return request.post('/app/customer/advisory/lineUp');
}

// 回复消息
export function replyMessage(params) {
  return request.post('/app/generalComment/save', params);
}

