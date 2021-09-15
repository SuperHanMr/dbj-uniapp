import request from '../utils/request';

export function getCaseList(params){
  return request.get(`/app/case/v2/list`,{params});
}
export function getDecorateProcess(params){
  return request.get(`/pm/web/project/detail`,{params});
}
export function getServeTypes(projectId){
  return request.get(`/pm/app/serve/design/designServeFileAll/${projectId}`,{});
}
export function getDrawings(params){
  return request.get(`/pm/app/serve/design/designServeTypeInfo`,{params});
}
export function updateDrawings(severId){
  return request.get(`/pm/app/serve/design/designServeFile/${severId}`,{});
}
export function getDecorateDynamic(params){
  return request.post(`/pm/app/decorate/calendar/getListByPageQuery`,params);
}
export function getSelectOptions(params){
  return request.get(`/pm/app/project/myService`,{params});
}
export function setAttentions(params){
  return request.post(`/app/base/interactive/add`,params);
}
export function getFocusBrowse(params){
  return request.get(`/app/base/interactive/project/count/detail`,{params});
}

