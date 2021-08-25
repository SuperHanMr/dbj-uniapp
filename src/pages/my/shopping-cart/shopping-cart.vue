<template>
	<view class="cartContainer">
		<view class="noGoods" v-if="!goodsList.length">
			<image src="./img/blank_ic@3x.png" class=""></image>
			<view class="addMore">
				购物车空空如也，快去逛逛吧～
			</view>
			<button type="primary" class="goShopping">
				去逛逛
			</button>
		</view>
		<view class="shoppingCart" v-else>
			<view class="goodsList">
				<view class="goodsItem" v-for="(item,index) in goodsList">
					商品
					
				</view>
			</view>
			<view class="cartFooter">
				<text></text>
				<text class="allSelected">全选{{totalCount}}</text>
				<view class="right">
					<text class="totalPrice">合计：¥{{totalPrice}}</text>
					<button type="primary" class="preOrder">
						结算
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				goodsList:[],
				totalCount:0,
				totalPrice:0
			}
		},
		onLoad: ()=> {
			console.log("跳转了")
		},
		methods:{
			
		}
	}
</script>

<style>
	
	
</style>
