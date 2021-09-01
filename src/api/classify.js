import request from '../utils/request';

export function getClassifyList (data) {
  return request.get('/product/web/prod-categories/front/tree')
}
export function getGoodsList (data) {
  return request.get('/product/web/products/skus/page')
}