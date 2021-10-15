<template>
	<view class="container">
		<view class="body-container">
			<view class="item-list" 
				v-for="(item, index) in listArr" 
				:key="item.url" 
				@click="onClick(item,index)"
			>
				<view class="item">
					<text>{{item.title}}</text>
					<image v-if="index <(listArr.length-1)" src="../../static/icon_setup_more@2x.png" mode=""></image>
					<text v-else>v 2.0.0</text>
				</view>
				<view class="line" v-if="index <(listArr.length-1)" />
			</view>	
		</view>
		
		<view class="logOut" @click="onOpen">
			退出登录
		</view>
		
		<uni-popup ref="popup" type="dialog" class="uni-popup">
			<uni-popup-dialog class="uni-popup-dialog" mode="base" type="info" title="确定退出当前账号登录吗?" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	import {logout} from "../../../api/order.js"
	export default {
		data() {
			return {
				listArr: [{
						title: "打扮家装修服务协议",
						url: "/app-pages/service-agreement/index.html"
					},
					{
						title: "打扮家装修隐私协议",
						url: "/app-pages/privacy-agreement/index.html"
					},
					{
						title: "打扮家用户行为规范",
						url: "/app-pages/user-code-of-conduct/index.html"
					},
					{
						title: "打扮家知识产权条款",
						url: "/app-pages/intellectual-property-rights/index.html"
					},
					{
						title: "意见与反馈",
						url: "../../../sub-my/pages/set-up/comments-feedback/comments-feedback"
					},
					// {
					// 	title: "关于打扮家",
					// 	url: "../../../sub-my/pages/set-up/about-dabanjia/about-dabanjia"
					// },
					{
						title:"版本号",
						url:""
					}
				]
			};
		},
		methods: {

			onClick(item,index) {
				if(index <4){
					let url = this.ENV.VUE_APP_BASE_H5 + item.url
					uni.navigateTo({
						url:`../../../pages/common/webview/webview?url=`+ encodeURIComponent(url),
					})
				}else{
					uni.navigateTo({
						url:item.url
					})
				}
				
			},
			onOpen() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			confirm(val) {
				console.log("退出登录");
				logout({clientCode:"APPLET"})
				.then(()=>{
					// 清除本地缓存 然后跳转到首页
					this.$refs.popup.close();
					uni.clearStorageSync();
					getApp().globalData = {
						userInfo: {},
						token: "",
						city: "",
						houses: [],
						tim: null,
						noHouseActuaryId: null,
						noHouseDesignId: null,
						noHouseCheckId: null,
						naviData: null,
						decorateMsg: {},
					}
					uni.switchTab({
						url: "../../../pages/home/index/index"
					});
					this.$store.dispatch("logoutIM");
				})
				.catch(()=>{})

				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #f5f6f6;
		
		.body-container{
			background-color: #FFFFFF;
			margin-top: 16rpx;
			.item-list{
				.item{
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					padding: 38rpx 24rpx 38rpx 32rpx;
					image{
						width: 32rpx;
						height: 34rpx;
						object-fit: cover;
					}
					text{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #333333;
					}
				}
				.line{
					margin: 0 32rpx;
					height: 2rpx;
					background: #f2f2f2;
					border-radius: 2rpx;
				}
			}
		}
		
		.logOut {
			text-align: center;
			margin-top: 16rpx;
			padding: 36rpx 0;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #111111;
			background: #ffffff;
		}
	}


	button::after {
		border: none;
	}

 ::v-deep .uni-dialog-button-group .uni-border-left .uni-dialog-button-text {
		color: rgba(255, 51, 71, 1);
		font-size: 30rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
	}

 ::v-deep .uni-dialog-title .uni-dialog-title-text {
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #111111;
	}
</style>
