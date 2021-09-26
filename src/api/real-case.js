import request from '../utils/request';

export function getDecorateist(params) {
  return request.get(`/pm/app/project/list`, {
    params
  });
}
export function getCollection(params) {
  return request.post(`/pm/app/base/interactive/add`, params);
}
export function getCaseList(params) {
  return request.get(`/app/case/v2/list`, {
    params
  });
}
export function getDecorateProcess(params) {
  return request.get(`/pm/web/project/detail`, {
    params
  });
}
export function getServeTypes(projectId) {
  return request.get(`/pm/app/serve/design/designServeFileAll/${projectId}`, {});
}
export function getDrawings(params) {
  return request.get(`/pm/app/serve/design/designServeTypeInfo`, {
    params
  });
}
export function getDecorateDynamic(params) {
  return request.post(`/pm/app/decorate/calendar/getListByPageQuery`, params);
}
export function getSelectOptions(params) {
  return request.get(`/pm/app/project/myService`, {
    params
  });
}
export function setAttentions(params, config) {
  return request.post(`/app/base/interactive/add`, params, config);
}
export function getFocusBrowse(params) {
  return request.get(`/app/base/interactive/project/count/detail`, {
    params
  });
}
export function getComments(params) {
  return request.get(`/app/generalComment/list`, {
    params
  });
}
export function expandReplies(params) {
  return request.get(`/app/generalComment/secondList`, {
    params
  });
}
export function createReply(params){
	return request.post(`/app/generalComment/save`,params)
}
export function getSigneddates(projectId,month) {
  return request.get(`/pm/app/decorate/calendar/getClientMonthTotal/${projectId}/${month}`, {});
}
export function getDynamics(params) {
  return request.post(`/pm/app/decorate/calendar/getSimpleListByPageQuery`, params);
}
export function getMemos(projectId) {
  return request.get(`/pm/app/memo/list/${projectId}`, {});
}
export function getMemoDetail(projectId,memoId) {
  return request.get(`/pm/app/memo/${projectId}/${memoId}/details`, {});
}
export function createMemo(params){
	return request.post(`/pm/app/memo/save`,params)
}
export function getAddressBook(projectId) {
  return request.get(`/pm/app/addressBook/list/${projectId}`, {});
}
export function removeComment(commentId) {
  return request.delete(`/app/generalComment/${commentId}`, {});
}