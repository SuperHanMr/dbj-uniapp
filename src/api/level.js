import request from '../utils/request';

//更换人工等级
export function changeLevel(params) {
  return request.get("/pm/app/project/changeLevel", {
    params
  })
}
//根据区域cityId和品类categoryTypeId查询可接单最大等级
export function queryMaxLevel(params) {
  return request.get(`/app/employeeInfo/queryMaxLevel`, {
    params
  })
}
