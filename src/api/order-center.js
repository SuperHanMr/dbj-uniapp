import request from '../utils/request';
import { objectToUrlString } from "../utils/params.js";

// app下单接口
export function createOrder(data) {
	return request.post("/order-center/app/order/createOrder", data)
}
// 计算商品溢价-多等级
export function calculatePrices(data) {
	return request.post("/order-center/app/order/calculatePrices", data)
}