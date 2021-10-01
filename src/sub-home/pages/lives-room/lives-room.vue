<template>
	<view class="content" catchtouchmove=“true”>
		<custom-navbar opacity="1" :title="title" titleColor="#FFFFFF" bgcolor="none">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: white;">
					</i>
				</view>
			</template>
		</custom-navbar>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}">
		</view>
		<!-- 占位 -->
		<view style="height: 10rpx;">
		</view>
		<view v-if="isLiveing">

			<view class="state-bar">
				<view class="">

				</view>
				<view class="state-bar-text">
					3.23w
				</view>
			</view>
			<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />

			<view class="bottom-contain">
				<!-- 聊天 -->
				<scroll-view id="scrollview" :scroll-top="scrollTop" class="scorll-chat" scroll-y="true"
					:scroll-into-view="bottomId">
					<view class="chat-item-height">
						<view class="chat-item" v-for="(item,index) in list" :key="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<!-- 底部功能栏 -->
				<view class="bottom-send">
					<view class="input-text">
						说点什么...
					</view>
					<view class="macphone" @click="clickMacphone">
						<image class="icon_macphone"
							src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_macphone.png" mode="">
						</image>
						连麦
					</view>
					<image class="bottom-icon"
						src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_shopping.png" mode=""
						@click="showDownload=true">
					</image>

					<image class="bottom-icon"
						src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_agree.png" mode=""></image>

				</view>
				<!-- 底部占位 -->
				<view class="bottom-placeholder">

				</view>

			</view>

		</view>
		<view v-else class="unlived">
			<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/un-liveing.png" mode="">
			</image>
			<view class="tips">
				直播暂未开始，去首页逛逛吧～

			</view>
			<view class="border">

			</view>
			<view class="btn" @click="toBack">
				去逛逛

			</view>
		</view>
		<view v-if="!isLogin&&isLiveing" class="remark">
			<view class="flex1">

			</view>
			<view class="remark-btn" @click="toLogin">
				登录以使用完整功能
			</view>

		</view>
		<view v-if="showDownload" class="alert-app">
			<view class="content">
				<view class="img">
					<view class="close" @click="showDownload=false">

					</view>

				</view>
				<view class="text-content">
					<view class="text-title">
						请下载APP使用
					</view>
					<view class="text-tips text-top">
						咨询家装问题，去手机应用市场搜索
					</view>
					<view class="text-tips">
						【打扮家】APP与主播进行交流吧
					</view>
					<view class="text-btn" @click="showDownload=false">
						知道了

					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		getTim,
		getSafeTim,
		addListener,
		cleanListeners
	} from "@/utils/tim.js"
	import TIM from 'tim-wx-sdk'
	export default {
		data() {
			return {
				livePreview: '',
				roomId: '',
				navBarHeight: "",
				tophight: "",
				list: [1, 2, 3],
				scrollTop: 0,
				count: 0,
				isLogin: false,
				imReady: false,
				title: '',
				isLiveing: true,
				showDownload: false
			};
		},
		onLoad(e) {
			if (e && e.livePreview) {
				this.livePreview = e.livePreview;
			}
			if (e && e.roomId) {
				this.roomId = e.roomId
			}
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// this.backTop = menuButtonInfo.top + 'px';
			// this.backHeight = menuButtonInfo.height + 'px';
			console.log("**********", this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		onShow() {
			if (uni.getStorageSync("userId")) {
				this.isLogin = true;
				if (!this.imReady) {

					addListener("MESSAGE_RECEIVED", );
					getSafeTim().then(tim => {
						tim.joinGroup({
							groupID: 'group' + this.roomId,
							type: TIM.TYPES.GRP_AVCHATROOM
						}).then(imResponse => {
							tim.getGroupProfile({
								groupID: 'group' + this.roomId,
								groupCustomFieldFilter: ['extensionArr']
							}).then(data => {
								if (data.code == 0) {
									this.imReady = true
									// extensionArr
									let groupCustomField = data.data.group.groupCustomField
									let res = groupCustomField.filter(e => {
										return e.key == 'extensionArr'
									})
									let result = JSON.parse(res[0].value);
									console.log('XXXXXXXXX');
									console.log(result);
								}
							});
						})
					})
				}
			}
		},
		methods: {
			messageRecived(event) {
				let messageList = event.data || [];
				let systemMessageList = messageList.filter(msg => msg.conversationID === context.state
					.sysConv
					.conversationID);
				if (systemMessageList.length) {

				}
			},
			toLogin() {
				uni.navigateTo({
					url: '../../../pages/login/login'
				})
			},
			toBack() {
				uni.navigateBack({

				})
			},
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.chat-item-height').boundingClientRect();
				// query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					if (res[0] && res[0][0].height) {
						this.scrollTop = res[0][0].height
					}
				})
			},
			clickMacphone() {
				this.list = this.list.concat([this.count++]);
				this.scrollToBottom();
			},
			toBack() {
				uni.navigateBack({

				})
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.log('~~~~~~~~~');
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.alert-app {
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.content {
			width: 640rpx;
			height: 716rpx;
			background-color: #FFF;

			.img {
				width: 640rpx;
				height: 350rpx;
				background: url('http://dbj.dragonn.top/static/mp/dabanjia/images/home/lives_download.png');
				background-size: contain;
				position: relative;

				.close {
					float: right;
					width: 64rpx;
					height: 64rpx;
					margin-right: 24rpx;
					margin-top: 24rpx;
					background: url('http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_closed_black.png');
					background-size: contain;

				}
			}

			.text-content {
				background-color: #FFF;
				width: 640rpx;
				height: 366rpx;
				border-bottom-right-radius: 24rpx;
				border-bottom-left-radius: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
					margin-top: 40rpx;
				}

				.text-tips {
					font-size: 28rpx;
					color: #999999;
					line-height: 42rpx;
				}

				.text-top {
					margin-top: 8rpx;
				}

				.text-btn {
					width: 266rpx;
					height: 88rpx;
					line-height: 88rpx;
					background: linear-gradient(135deg, #00bfaf, #00bfbc);
					border-radius: 12rpx;
					text-align: center;
					font-size: 28rpx;
					font-weight: 500;
					color: #ffffff;
					margin-top: 48rpx;

				}
			}


		}
	}

	.unlived {
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			margin-top: 116rpx;
			width: 280rpx;
			height: 120rpx;
		}

		.tips {
			margin-top: 36rpx;
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 44rpx;
		}

		.border {
			margin-top: 80rpx;
			width: 670rpx;
			height: 2rpx;
			background: rgba(255, 255, 255, 0.13);
		}

		.btn {
			margin-top: 80rpx;
			width: 550rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			border: 1rpx solid #ffffff;
			border-radius: 12rpx;
			font-size: 32rpx;
			color: #ffffff;

		}
	}

	.remark {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		opacity: 0.94;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.49), #000000);
		justify-content: center;
		align-items: center;

		.flex1 {
			flex: 1;
		}

		.remark-btn {
			width: 396rpx;
			height: 88rpx;
			margin-bottom: 280rpx;
			line-height: 88rpx;
			text-align: center;
			background-color: #07bfb1;
			color: white;
			font-size: 28rpx;
		}
	}

	.bottom-contain {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;

		.bottom-placeholder {
			height: 68rpx;
		}

		.bottom-send {
			height: 96rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;

			.input-text {
				margin-left: 24rpx;
				width: 346rpx;
				height: 72rpx;
				opacity: 0.24;
				background: #000000;
				border-radius: 28rpx;
			}

			.bottom-icon {
				width: 84rpx;
				height: 72rpx;
				margin-left: 16rpx;
			}

			.macphone {
				width: 140rpx;
				height: 72rpx;
				background: rgba($color: #000000, $alpha: 0.24);
				border-radius: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #ffffff;
				margin-left: 16rpx;
				padding: 2rpx 8rpx;


				.icon_macphone {
					width: 50rpx;
					height: 50rpx;
					margin-right: 8rpx;
				}
			}
		}

		.scorll-chat {
			max-height: 452rpx;

			.chat-item {
				margin-left: 24rpx;
				max-width: 544rpx;
				background: rgba(0, 0, 0, 0.30);
				border-radius: 14rpx;
				color: #FFF;
				padding: 0 16rpx;
				line-height: 44rpx;
				color: #FFF;

				.avater {
					display: inline-block;
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
				}

				.name {
					color: rgba(255, 255, 255, 0.5);
				}
			}
		}
	}

	.state-bar {
		height: 112rpx;
		display: flex;
		align-items: center;

		.user {
			margin-left: 28rpx;

			.img {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}

			.name {
				width: 100rpx;
				height: 28rpx;
				font-size: 20rpx;
				color: #ffffff;
				line-height: 28rpx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

		}

		.flex1 {
			flex: 1;
		}

		.state-bar-text {
			font-size: 28rpx;
			font-weight: 400;
			color: #ffffff;
			line-height: 24rpx;
			margin-right: 24rpx;
		}
	}

	.content {
		width: 100vw;
		height: 100vh;
		background: url('http://dbj.dragonn.top/static/mp/dabanjia/images/home/live_bg_people_full.png');
		background-size: contain;
		display: flex;
		flex-direction: column;

	}

	.player {
		flex: 1;
		width: 100vw;
	}
</style>
