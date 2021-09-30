<template>
	<view class="content">
		<custom-navbar opacity="1" title="as??ASDSA" titleColor="#FFFFFF" bgcolor="#3b3c48">
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
		<view class="state-bar">
			<view class="">

			</view>
			<view class="">
				3.23w
			</view>
		</view>
		<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />

		<view class="bottom-contain">
			<view class="scorll-chat">

			</view>
			<view class="bottom-send">
				<view class="input-text">
					说点什么...
				</view>
				<view class="macphone">
					<image class="icon_macphone"
						src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_macphone.png" mode="">
					</image>

				</view>
			</view>
			<view class="bottom-placeholder">

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
				tophight: ""
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
				addListener("MESSAGE_RECEIVED", (event) => {
					let messageList = event.data || [];
					let systemMessageList = messageList.filter(msg => msg.conversationID === context.state.sysConv
						.conversationID);
					if (systemMessageList.length) {

					}
				});
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
						console.log('!!!!!!!!!!!');
						console.log(imResponse.data.status)
					})
				})
			}
		},
		methods: {
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
	.bottom-contain {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: white;

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

			.macphone {
				width: 140rpx;
				height: 72rpx;
				background: rgba($color: #000000, $alpha: 0.24);
				border-radius: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				color: #ffffff;

				.icon_macphone {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.scorll-chat {
			max-height: 452rpx;
		}
	}

	.state-bar {
		height: 112rpx;
		margin: 0 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.player {
		flex: 1;
		width: 100vw;
	}
</style>
