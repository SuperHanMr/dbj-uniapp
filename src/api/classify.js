import request from '../utils/request';
import axios from 'axios'
export function getClassifyList (areaId) {
  return request.get('/product/app/prod-categories/front/tree/area/' + areaId)
}
export function getGoodsList (params) {
  return request.post('/product/app/search/query', params)
}
export function getHomeGoodsList (params) {
  return request.post('/product/app/search/recommend/home', params)
}
export function getAddressInfo(houseId) {
  return request.get(`/customer/app/estate/queryEstateDetail/${houseId}`);
}
export function getDetailInfo(params) {
  return request.post('/app/purchase/check', params);
  // return axios.post('http://rap2api.taobao.org/app/mock/290704/test-good', params);
}
export function payOrder(params) {
	return request.post(`/order-center/app/order/createOrder`, params)
}
export function getProductID(params) {
  return request.get("/pm/web/project/getProjectIdByEstateId", {params});
}
// 套包下单
export function payBundleOrder(params) {
  return request.post(`/order-center/app/order/createPromotionPackageOrder`, params)
}
// 确认订单页获取套包详情
export function getBundleDetail(params) {
  // let data = {
  //   "skuPropertyVOS": [
  //     {
  //       "id": 133498,
  //       "companyId": 153,
  //       "parentId": 0,
  //       "spuId": 49448,
  //       "categoryId": 550,
  //       "categoryMenus": [
  //         {
  //           "id": "55",
  //           "name": "沙发类"
  //         },
  //         {
  //           "id": "43",
  //           "name": "家具"
  //         }
  //       ],
  //       "frontCategories": [
  //         {
  //           "id": "55",
  //           "name": "我是四级品类六"
  //         },
  //         {
  //           "id": "49",
  //           "name": "我是三级品类"
  //         },
  //         {
  //           "id": "48",
  //           "name": "我是二级品类"
  //         },
  //         {
  //           "id": "47",
  //           "name": "我是一级品类"
  //         }
  //       ],
  //       "categoryTypeId": 21,
  //       "productType": 1,
  //       "skuInputType": 2,
  //       "categoryName": "沙发-普通",
  //       "categoryType": 16,
  //       "orderPrefix": "PS",
  //       "processId": null,
  //       "unitId": 4,
  //       "unit": "件",
  //       "sales": 0,
  //       "name": "990*950*980（单人位带电动位）高级科技布薄荷绿（主图色）",
  //       "spuName": "比斯克布艺功能沙发",
  //       "fullName": "比斯克布艺功能沙发 | 990*950*980（单人位带电动位）高级科技布薄荷绿（主图色）",
  //       "imageUrl": "https://ali-image.dabanjia.com/image/20211110/wzj/18534-bskbygnsf/SKUt/57291.jpg",
  //       "spuMainImage": null,
  //       "spuDetailImages": null,
  //       "brandId": 0,
  //       "brandName": null,
  //       "modelNumber": "",
  //       "size": "",
  //       "spuCode": null,
  //       "packagingWeight": null,
  //       "packagingVolume": null,
  //       "shippingTemplateId": 0,
  //       "returnCharges": false,
  //       "suppliersId": 219,
  //       "suppliersCode": "0219",
  //       "suppliersName": null,
  //       "purchasingSuppliersId": 0,
  //       "storeId": 0,
  //       "marketPrice": 414000,
  //       "price": 414000,
  //       "costPrice": 260820,
  //       "minimumOrderQuantity": "1",
  //       "stepLength": "1",
  //       "deposit": null,
  //       "skuCode": null,
  //       "userId": 0,
  //       "salesPropertyList": [],
  //       "displayProperties": [],
  //       "includeHomeDeliveryFee": true,
  //       "homeDeliveryFee": 0,
  //       "stairwayRoomHandlingFee": 0,
  //       "refundable": false,
  //       "provideAfterSalesService": true,
  //       "appointmentRequired": null,
  //       "enabled": false,
  //       "inServiceArea": false,
  //       "salesUnitsAllRates": [],
  //       "constructionStageId": null,
  //       "constructionStageName": null,
  //       "shippingFee": null,
  //       "discountPrice": 82800
  //     },
  //     {
  //       "id": 133505,
  //       "companyId": 153,
  //       "parentId": 0,
  //       "spuId": 49448,
  //       "categoryId": 550,
  //       "categoryMenus": [
  //         {
  //           "id": "55",
  //           "name": "沙发类"
  //         },
  //         {
  //           "id": "43",
  //           "name": "家具"
  //         }
  //       ],
  //       "frontCategories": [
  //         {
  //           "id": "55",
  //           "name": "我是四级品类六"
  //         },
  //         {
  //           "id": "49",
  //           "name": "我是三级品类"
  //         },
  //         {
  //           "id": "48",
  //           "name": "我是二级品类"
  //         },
  //         {
  //           "id": "47",
  //           "name": "我是一级品类"
  //         }
  //       ],
  //       "categoryTypeId": 21,
  //       "productType": 1,
  //       "skuInputType": 2,
  //       "categoryName": "沙发-普通",
  //       "categoryType": 16,
  //       "orderPrefix": "PS",
  //       "processId": null,
  //       "unitId": 4,
  //       "unit": "件",
  //       "sales": 0,
  //       "name": "2250*950*980（三人位无电动位）高级科技布火山灰",
  //       "spuName": "比斯克布艺功能沙发",
  //       "fullName": "比斯克布艺功能沙发 | 2250*950*980（三人位无电动位）高级科技布火山灰",
  //       "imageUrl": "https://ali-image.dabanjia.com/image/20211110/wzj/18534-bskbygnsf/SKUt/57298.jpg",
  //       "spuMainImage": null,
  //       "spuDetailImages": null,
  //       "brandId": 0,
  //       "brandName": null,
  //       "modelNumber": "",
  //       "size": "",
  //       "spuCode": null,
  //       "packagingWeight": null,
  //       "packagingVolume": null,
  //       "shippingTemplateId": 0,
  //       "returnCharges": false,
  //       "suppliersId": 219,
  //       "suppliersCode": "0219",
  //       "suppliersName": null,
  //       "purchasingSuppliersId": 0,
  //       "storeId": 0,
  //       "marketPrice": 599000,
  //       "price": 599000,
  //       "costPrice": 377370,
  //       "minimumOrderQuantity": "1",
  //       "stepLength": "1",
  //       "deposit": null,
  //       "skuCode": null,
  //       "userId": 0,
  //       "salesPropertyList": [],
  //       "displayProperties": [],
  //       "includeHomeDeliveryFee": true,
  //       "homeDeliveryFee": 0,
  //       "stairwayRoomHandlingFee": 0,
  //       "refundable": false,
  //       "provideAfterSalesService": true,
  //       "appointmentRequired": null,
  //       "enabled": false,
  //       "inServiceArea": false,
  //       "salesUnitsAllRates": [],
  //       "constructionStageId": null,
  //       "constructionStageName": null,
  //       "shippingFee": null,
  //       "discountPrice": 119800
  //     }
  //   ],
  //   "totalPrice": 202600
  // }
  // return Promise.resolve(data);
  return request.post(`/product/app/bundle/${params.bundleId}/property`, params);
}

