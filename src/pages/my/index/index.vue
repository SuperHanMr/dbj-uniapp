<template>
	<view class="">
		我的
		<uni-badge text="1"></uni-badge>
		<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
		<view :active="active">
			<view v-for="item in list">{{item}}</view>
		</view>
		<view @click="handlerToShop">购物车</view>
	</view>
	
	
</template>

<script>
	import {uniBadge} from '@dcloudio/uni-ui'
	export default {
	    components: {uniBadge},
		data(){
			return {
				list: [
					{
						key: "1",
						value: "全部",
					},
					{
						key: "2",
						value: "待付款",
					},
					{
						key: "3",
						value: "进行中",
					}
				]
			}
		},
		methods:{
			handlerToShop(){
				console.log("点击了")
				uni.navigateTo({
					url:"../shopping-cart/shopping-cart"
				})
			}
		}
	}
</script>

<style>
</style>
