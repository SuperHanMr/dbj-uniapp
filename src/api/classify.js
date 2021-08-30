import request from '../utils/request';

export function getClassifyList (data) {
  return request.get('/product/app/prod-categories/front/tree')
}