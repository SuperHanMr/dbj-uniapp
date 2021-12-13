import request from '../utils/request';
/**
 * @param {Object} params 
 * 获取变更单明细信息
 */
export function getChangeOrderApi(params) {
  return request.get('/pm/app/changeOrder/getChangeOrder', {
    params
  })
}
/**
 * @param {Object} data
 */
export function createChangeOrderApi(data) {
  return request.post('c', data)
}
/**
 * @param {Object} params
 */
export function agreeChangeOrderApi(params) {
  return request.get('/pm/app/changeOrder/agreeChangeOrder', {
    params
  })
}
