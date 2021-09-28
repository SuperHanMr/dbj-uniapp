import request from '../utils/request';

//更换人工等级
export function changeLevel(params) {
  return request.get("/pm/app/project/changeLevel", {
    params
  })
}
//批量更换人工等级
export function batchChangeLevel(data) {
  debugger
  return request.post(`/pm/app/project/batchChangeLevel`, data)
}
