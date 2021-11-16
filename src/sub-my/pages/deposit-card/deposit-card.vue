<template>
	<view class="cardWrap">
		<view class="header">
			<view class="text">余额 (元)</view>
			<view class="balance price-font">
				<view>¥</view>
				<view class="int">8994</view>
				<view>.12</view>
			</view>
			<view class="details" @click="toBillingDetails">账单明细</view>
		</view>
		<view class="activity">
			<view class="top">
				<view class="title">施工活动</view>
				<view class="rules">
					<view class="text">活动规则</view>
					<view class="icon"></view>
				</view>
			</view>
			<view class="date">活动时间：2021年11月12日-2021年11月13日</view>
			<view class="banner"></view>
			<view class="main">
				<view class="prePay" :class="{'active': isChoose}" @click="chooseOne">
					<view class="icon" v-if="isChoose"></view>
					<view class="numWrap" :class="{'active': isChoose}">
						<view class="text">充</view>
						<view>¥</view>
						<view class="num price-font">10000</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buyWrap">
			<view class="button">立即购买</view>
			<view class="explain">购买即同意
				<text>《打扮家储值卡使用规则》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBalance} from "../../../api/user.js"
	export default {
		data(){
			return {
				isChoose: false,
				areaId: 0,
			}
		},
		onShow() {
			this.areaId = getApp().globalData.currentHouse.areaId;
			console.log(this.areaId);
		},
		mounted() {
			getBalance().then(data => {
				if(data){
					console.log(data)
				}
			})
		},
		methods: {
			toBillingDetails(){
				uni.navigateTo({
					url: "/sub-my/pages/deposit-card/billing-details"
				})
			},
			chooseOne(){
				this.isChoose = !this.isChoose
			}
		}
	}
</script>

<style scoped>
	.cardWrap{
		width: 750rpx;
		height: 1440rpx;
		background-image: url('http://dbj.dragonn.top/static/mp/dabanjia/images/my/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.header{
		width: 702rpx;
		height: 260rpx;
		margin: 0 24rpx;
		border-radius: 16rpx;
		box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
		background-image: url('http://dbj.dragonn.top/static/mp/dabanjia/images/my/card_bg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.header .text{
		width: 120rpx;
		height: 34rpx;
		margin-left: 48rpx;
		padding-top: 48rpx;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.header .balance{
		width: 196rpx;
		height: 48rpx;
		margin-left: 48rpx;
		margin-top: 22rpx;
		display: flex;
		align-items: center;
		color: #FFFFFF;
	}
	.header .balance view:last-child{
		font-size: 40rpx;
	}
	.header .balance view:first-child{
		margin-right: 8rpx;
		font-weight: 600;
		font-size: 40rpx;
	}
	.header .balance .int{
		font-size: 56rpx;
	}
	.header .details{
		width: 128rpx;
		height: 50rpx;
		margin-left: 48rpx;
		margin-top: 30rpx;
		background: #FFF8D6;
		border-radius: 8px;
		font-weight: 500;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
		color: #BC722D;
	}
	
	.activity{
		width: 351px;
		height: 338px;
		margin: 24rpx 24rpx 0;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.top{
		width: 654rpx;
		height: 50rpx;
		padding-top: 24rpx;
		margin-left: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.top .title{
		width: 144rpx;
		height: 50rpx;
		font-weight: 500;
		font-size: 36rpx;
		color: #2B2F33;
	}
	.top .rules{
		display: flex;
	}
	.top .rules .text{
		width: 88rpx;
		height: 28rpx;
		font-size: 22rpx;
		color: #2B2F33;
	}
	.date{
		width: 412rpx;
		height: 30rpx;
		margin-left: 24rpx;
		font-size: 21rpx;
		color: #314F5E;
	}
	.banner{
		width: 654rpx;
		height: 240rpx;
		margin: 24rpx;
		background: #DFDFDF;
		border-radius: 16rpx;
		box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
	}
	.main{
		margin: 24rpx;
	}
	.main .prePay{
		width: 318rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFDF8;
		border: 1rpx solid #FFE1CD;
		border-radius: 16rpx;
	}
	.main .prePay.active{
		justify-content: normal;
		width: 320rpx;
		border: none;
		background: linear-gradient(277.39deg, #FFA14A 0%, #FFC700 100%);
	}
	.prePay .icon{
		width: 32rpx;
		height: 32rpx;
		background: #fff;
		border-radius: 50%;
		margin: 44rpx 24rpx;
	}
	.prePay .numWrap{
		width: 158rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		color: #CB985B;
	}
	.prePay .numWrap.active{
		color: #fff;
	}
	.numWrap .text{
		font-size: 28rpx;
	}
	.numWrap view:nth-child(2){
		font-weight: 500;
		font-size: 11px;
		margin: 0 4rpx;
	}
	.numWrap .num{
		font-size: 44rpx;
	}
	.buyWrap{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		background: #fff;
	}
	.button{
		width: 686rpx;
		height: 88rpx;
		margin: 24rpx 32rpx;
		border-radius: 16rpx;
		font-weight: 500;
		font-size: 32rpx;
		text-align: center;
		line-height: 100rpx;
		color: #FFFFFF;
		background: linear-gradient(263.5deg, #FF7051 0.55%, #FFC700 100%);
	}
	.explain{
		width: 374rpx;
		height: 28rpx;
		margin-left: 188rpx;
		margin-bottom: 92rpx;
		font-size: 22rpx;
		color: #999999;
	}
	.explain text{
		color: #FF873D;
	}
</style>
