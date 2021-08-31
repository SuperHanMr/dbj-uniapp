<template>
	<view>
		订单进行中/订单待付款
		<button type="default" @click="toPay">去支付</button>
	</view>
</template>

<script>
	import{orderDetail,orderPay} from '../../../../api/order.js'
	export default {
		data() {
			return {
				orderNo:''
			}
		},
		onLoad(e) {
			if(e&&e.orderNo){
				this.orderNo=e.orderNo;
				// this.getOrderDetail();
			}
			
		},
		methods: {
			toPay(){
				orderPay({orderId:this.orderNo,payType:1}).then(e=>{
					console.log(e);
				})
			},
			getOrderDetail(){
				orderDetail({id:this.orderNo}).then(e=>{
					console.log(e);
				})
			}
		}
	}
</script>

<style>

</style>
