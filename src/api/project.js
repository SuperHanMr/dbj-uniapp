import request from '../utils/request';
import {
  objectToUrlString
} from "../utils/params.js";

//获取房屋下项目列表
export function getEstateProjectInfoList(params) {
  const str = objectToUrlString(params)
  return request.get("/pm/app/project/getEstateProjectInfoList?" + str)
}
//获取可购买服务
export function availableService(params) {
  const {projectId, relegationType} = params
  if (projectId) {
    return request.get(`/pm/app/project/availableService?projectId=${projectId}&relegationType=${relegationType}`)
  } else {
    return request.get(`/pm/app/project/availableService?relegationType=${relegationType}`)
  }
}
