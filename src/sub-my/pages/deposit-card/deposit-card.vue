<template>
	<scroll-view scroll-y="true" class="cardWrap">
		<view class="header">
			<view class="text">余额 (元)</view>
			<view class="balance price-font">
				<view>¥</view>
				<view class="int">{{(amount/100).toFixed(2).split('.')[0]}}</view>
				<view>.{{(amount/100).toFixed(2).split('.')[1]}}</view>
			</view>
			<view class="details" @click="toBillingDetails">账单明细</view>
		</view>
		<!-- <view class="activity">
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
		</view> -->
		<view class="activity" :class="{'minHeight': !item.activityImage}"
			v-for="(item,index) in list" :key="item.activityId">
			<view class="top">
				<view class="title">{{item.activityName}}</view>
				<view class="rules">
					<view class="text">活动规则</view>
					<view class="icon"></view>
				</view>
			</view>
			<view class="date">活动时间：{{item.activityStartTime}}-{{item.activityEndTime}}</view>
			<image class="banner" :src="item.activityImage" v-if="item.activityImage"></image>
			<view class="main">
				<view class="prePay"
					:class="{'active': amount.isChecked}"
					v-for="(amount,idx) in item.detailDTOList"
					:key="amount.detailId"
					@click="chooseOne(item.activityId,amount.detailId)">
					<view class="icon" v-if="amount.isChecked"></view>
					<view class="numWrap" :class="{'active': amount.isChecked}">
						<view class="text">充</view>
						<view>¥</view>
						<view class="num price-font">{{amount.rechargeAmount/100}}</view>
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
	</scroll-view>
</template>

<script>
	import {getBalance,getTwice,getActivity} from "../../../api/user.js"
	export default {
		data(){
			return {
				cityId: 0,
				amount: 0,
				list: [],
				isChoose: false
			}
		},
		onShow() {
			this.cityId = getApp().globalData.currentHouse.cityId;
			console.log(this.areaId);
		},
		mounted() {
			getBalance().then(data => {
				if(data == null){
					data = 0
				}
				this.amount = data
				console.log(data)
			})
			this.requestPage()
		},
		methods: {
			toBillingDetails(){
				uni.navigateTo({
					url: "/sub-my/pages/deposit-card/billing-details"
				})
			},
			chooseOne(activityId,detailId){
				this.isChoose = !this.isChoose
				this.list.map(item => {
					item.detailDTOList.map(ele => {
						if(detailId === ele.detailId){
							ele.isChecked = true
						}else{
							ele.isChecked = false
						}
						return ele
					})
					return item
				})
				let params = {activityId,detailId}
				getTwice(params).then(data => {
					if(!data){
						uni.showToast({
							title: "您已参加过此活动",
							icon: "none",
							duration: 2000
						})
						console.log(data)
					}
				})
				
			},
			requestPage(){
				let params = {
					cityId: this.cityId
				}
				getActivity(params).then(data => {
					console.log(data)
					if(!data.length)return
					this.list = data
					this.list.map(item => {
						item.detailDTOList.map(ele => {
							ele.isChecked = false
							return ele
						})
						if(item.detailDTOList.length){
							this.$set(item.detailDTOList[0],'isChecked',true)
							this.$nextTick(() => {
								item.detailDTOList[0].isChecked = true
							})
						}
						return item
					})
				})
			}
		}
	}
</script>

<style scoped>
	.cardWrap{
		width: 750rpx;
		height: 2000rpx;
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
	.activity.minHeight{
		height: 206px;
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
		max-width: 144rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
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
		display: block;
		width: 654rpx;
		height: 240rpx;
		margin: 24rpx;
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
