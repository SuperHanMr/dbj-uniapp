<template>
	<view class="cardWrap" :class="{'noScroll': showRules}">
		<view class="wrap">
			<view class="header">
				<view class="text">余额 (元)</view>
				<view class="balance price-font">
					<view>¥</view>
					<view class="int">{{(balance/100).toFixed(2).split('.')[0]}}</view>
					<view>.{{(balance/100).toFixed(2).split('.')[1]}}</view>
				</view>
				<view class="bill" @click="toBillingDetails">账单明细</view>
			</view>
			<view class="noList" v-if="noList">
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/img_sys_city.png"></image>
				<view class="tit">敬请期待</view>
				<view class="txt">您所在的城市暂无储值卡活动</view>
			</view>
			<view class="activity" v-else
				:class="{'minHeight': !item.activityImage}"
				v-for="(item,index) in list" :key="item.activityId">
				<view class="top">
					<view class="title">{{item.activityName}}</view>
					<view class="rules" @click="clickRules(index)">
						<view class="text">活动规则</view>
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_more.png" class="icon"></image>
					</view>
				</view>
				<view class="instructions">
					<view class="date">活动时间：{{item.activityStartTime}}-{{item.activityEndTime}}</view>
					<view class="text" v-if="!item.eligibility">已参加过活动</view>
				</view>
				<image class="banner" :src="item.activityImage" v-if="item.activityImage"></image>
				<view class="main">
					<view class="prePay"
						:class="{'active': amount.isChecked,'cannot': !item.eligibility}"
						v-for="(amount,idx) in item.detailDTOList"
						:key="amount.detailId"
						@click="chooseOne(amount.detailId,item.eligibility)">
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/choosed.png"
							class="icon" v-if="amount.isChecked"></image>
						<view class="numWrap" :class="{'active': amount.isChecked,'cannot': !item.eligibility}">
							<view class="text">充</view>
							<view>¥</view>
							<view class="num price-font">{{amount.rechargeAmount/100}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cover" v-if="showBuyBtn"></view>
			<view class="buyWrap" v-if="showBuyBtn">
				<view class="button" @click="buyNow">立即购买</view>
				<view class="explain" @click="toActivityRules">购买即同意
					<text>《打扮家储值卡使用规则》</text>
				</view>
			</view>
		</view>
		<!-- <uni-popup ref="popup" type="center">
			<view class="top">
				<view class="title">活动规则</view>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/close_rules.png" @click="closeRules"></image>
			</view>
			<view class="content">{{ruleText}}</view>
		</uni-popup> -->
		<view class="mask" v-if="showRules" @tap.stop="test" :catchtouchmove="true">
			<view class="popup">
				<view class="top">
					<view class="title">活动规则</view>
					<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/close_rules.png" @click="closeRules"></image>
				</view>
				<view class="content">{{ruleText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getBalance,getActivity,createCardOrder} from "../../../api/user.js"
	export default {
		data(){
			return {
				cityId: 0,
				balance: 0,
				list: [],
				isChoose: false,
				noList: false,
				showBuyBtn: true,
				showRules: false,
				detailId: 0,
				ruleText: ""
			}
		},
		onShow() {
			this.cityId = getApp().globalData.currentHouse.cityId;
			this.requestBalance()
			this.requestPage()
		},
		onPullDownRefresh(){
			this.requestBalance()
			this.requestPage()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			},1000)
		}, 
		methods: {
			test(e){
				e.preventDefault()
			},
			toBillingDetails(){
				uni.navigateTo({
					url: "/sub-my/pages/deposit-card/billing-details"
				})
			},
			toActivityRules(){
				uni.navigateTo({
					url: "/sub-my/pages/deposit-card/activity-rules"
				})
			},
			clickRules(index){
				this.showRules = true
				this.ruleText = this.list[index].activityRule
			},
			closeRules(){
				this.showRules = false
			},
			chooseOne(detailId,eligibility){
				this.isChoose = !this.isChoose
				if(!eligibility)return
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
				this.detailId = detailId
			},
			buyNow(){
				const openId = getApp().globalData.openId;
				createCardOrder({
					activityDetailId: this.detailId,
					payType: 1, //支付类型  1微信支付
					openid: openId,
					sourceId: 100,//订单来源渠道 100小程序
				}).then(e => {
					const payInfo = e.wechatPayJsapi;
					const id = e.id
					uni.requestPayment({
						provider: "wxpay",
						...payInfo,
						success(res) {
							uni.showToast({
								title: "支付成功！",
								icon: "none",
								duration: 1000,
							});
							uni.redirectTo({
								url: `/sub-classify/pages/pay-order/pay-success?orderId=${id}&from=valueCard`,
							});
						},
						fail(e) {
							uni.showToast({
								title: "支付失败",
								icon: "none",
								duration: 2000,
							});
							uni.redirectTo({
								url: `/sub-my/pages/my-order/my-order?index=1&firstEntry=true`,
							});
						},
					});		
				});
			},
			requestBalance(){
				getBalance().then(data => {
					if(data == null){
						data = 0
					}
					this.balance = data
					console.log(data)
				})
			},
			requestPage(){
				let params = {
					cityId: this.cityId
				}
				getActivity(params).then(data => {
					console.log(data)
					if(!data.length){
						this.noList = true
						this.showBuyBtn = false
					}
					if( data.every(i=>!i.eligibility)){
						this.showBuyBtn = false
					}
					this.list = data
					this.list.map(item => {
						item.detailDTOList.map(ele => {
							ele.isChecked = false
							return ele
						})
						return item
					})
					let idx = data.findIndex(i=>i.eligibility&&i.detailDTOList.length)
					console.log(idx,'//')
					this.$set(this.list[idx].detailDTOList[0],'isChecked',true)
					this.detailId = this.list[idx].detailDTOList[0].detailId
				})
			}
		}
	}
</script>

<style scoped>
	.cardWrap{
		width: 750rpx;
		background-image: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		/* background-attachment: fixed; */
	}
	.cardWrap.noScroll{
		overflow: hidden;
	}
	.mask{
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
	}
	.popup{
		width: 638rpx;
		height: 652rpx;
		border-radius: 16px;
		background: #ffffff;
		position: fixed;
		left: 56rpx;
		top: 212rpx;
		z-index: 999;
	}
	.popup .top{
		position: relative;
		padding-top: 48rpx;
	}
	.popup .top .title{
		margin-left: 256rpx;
		font-weight: 500;
		font-size: 32rpx;
		color: #333333;
	}
	.popup .top image{
		width: 64rpx;
		height: 64rpx;
		display: block;
		position: absolute;
		top: 12rpx;
		right: 12rpx;
	}
	.popup .content{
		overflow: scroll;
		width: calc(100vw-112rpx);
		height: 504rpx;
		/* max-height: 904rpx; */
		margin: 48rpx;
		margin-top: 8rpx;
	}
	.wrap{
		width: 750rpx;
	}
	.header{
		width: 702rpx;
		height: 266rpx;
		margin: 0 24rpx;
		border-radius: 16rpx;
		box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
		background-image: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/card_bg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.header .text{
		width: 120rpx;
		height: 34rpx;
		margin-left: 48rpx;
		padding-top: 48rpx;
		font-size: 24rpx;
		color: #AC6F28;
	}
	.header .balance{
		width: 196rpx;
		height: 48rpx;
		margin-left: 48rpx; 
		margin-top: 22rpx;
		display: flex;
		color: #AC6F28;
	}
	.header .balance view:first-child{
		margin-right: 8rpx;
		font-weight: 600;
		font-size: 40rpx;
	}
	.header .balance view:last-child{
		font-size: 40rpx;
	}
	.header .balance .int{
		margin-top: -10rpx;
		font-size: 56rpx;
	}
	.header .bill{
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
	.noList{
		height: 750rpx;
		margin: 24rpx 24rpx 408rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.noList image{
		width: 400rpx;
		height: 400rpx;
		margin: 0 150rpx;
		padding-top: 146rpx;
		display: block;
	}
	.noList .tit{
		margin-left: 286rpx;
		font-size: 32rpx;
		color: #333333;
	}
	.noList .txt{
		margin-left: 196rpx;
		font-size: 24rpx;
		color: #999999;
	}
	.activity{
		width: 702rpx;
		margin: 24rpx 24rpx 0;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	/* .activity.minHeight{
		height: 206px;
	} */
	.activity .top{
		width: 654rpx;
		height: 50rpx;
		padding: 24rpx 24rpx 4rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.activity .top .title{
		max-width: 65%;
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
	.top .rules .icon{
		width: 16rpx;
		height: 16rpx;
		margin-left: 4rpx;
		margin-top: 8rpx;
		display: block;
	}
	.top .rules .text{
		width: 88rpx;
		height: 28rpx;
		font-size: 22rpx;
		color: #2B2F33;
	}
	.instructions{
		display: flex;
		justify-content: space-between;
	}
	.instructions .text{
		font-size: 21rpx;
		color: #83959E;
		width: 126rpx;
		height: 30rpx;
		margin-right: 24rpx;
	}
	.date{
		/* width: 412rpx; */
		height: 30rpx;
		margin-left: 24rpx;
		font-size: 21rpx;
		color: #83959E;
	}
	.banner{
		display: block;
		width: 654rpx;
		height: 240rpx;
		margin: 24rpx;
		margin-bottom: 0;
		border-radius: 16rpx;
		box-shadow: 0px 4px 12px rgba(190, 102, 21, 0.15);
	}
	.main{
		margin: 24rpx;
		padding-bottom: 16rpx;
		margin-bottom: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.main .prePay{
		width: 318rpx;
		height: 120rpx;
		margin-bottom: 8rpx;
		display: flex;
		align-items: center;
		background: #FFFDF8;
		border: 1rpx solid #FFE1CD;
		border-radius: 16rpx;
	}
	.main .prePay.active{
		width: 320rpx;
		border: none;
		background: linear-gradient(277.39deg, #FFA14A 0%, #FFC700 100%);
	}
	.main .prePay.cannot{
		width: 320rpx;
		border: none;
		background: #F7F7F7;
	}
	.prePay .icon{
		width: 32rpx;
		height: 32rpx;
		background: #fff;
		border-radius: 50%;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}
	.prePay .numWrap{
		width: 158rpx;
		height: 50rpx;
		margin-left: 72rpx;
		display: flex;
		align-items: center;
		color: #CB985B;
	}
	.prePay .numWrap.active{
		margin-left: 0;
		color: #fff;
	}
	.prePay .numWrap.cannot{
		color: #D1D1D1;
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
	.cover{
		width: 750rpx;
		height: 256rpx;
		margin-top: 24rpx;
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
		line-height: 88rpx;
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
