<template>
	<view class="fill">
		<image class="to-app-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives-decorate.jpg"
			mode="aspectFill" @click="showDownload=true">

		</image>
		<view v-if="list.length">
			<view class="header" @click="showDownload=true">
				直播速看
			</view>
			<scroll-view scroll-y="true" class="scroll-view">
				<view v-for="(item,index) in list" :key="index">
					<view class="h-row">
						<view class="tip">
						</view>
						<view class="time">
							{{item.submitTime |formatDate}}
						</view>
						<view class="flex1">
						</view>
					</view>
					<view class="video-row">
						<video class="video" :id="'video'+index" :src="item.videoUrl" show-center-play-btn
							@play="onVideoPlay($event,index)">
							<!-- <cover-view class="cover-video" @click.stop="toDetail(item.videoUrl)"></cover-view> -->
						</video>
					</view>
				</view>
				<view style="height: 100rpx;">
				</view>
				<!-- 	<view class="preview-full" v-if="currentVideoSrc">
					<video class="preview-full" :autoplay="true" :src="currentVideoSrc" :show-fullscreen-btn="false">
						<cover-view class="preview-full-close" @click="previewVideoClose"> ×
						</cover-view>
					</video>
				</view> -->
			</scroll-view>
		</view>
		<view v-else>
			<image class="placehold-img" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/pic_empty.png"
				mode=""></image>
			<view class="placehold-text">
				暂无工地视频
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
						手机应用市场搜索
					</view>
					<view class="text-tips">
						【打扮家】APP查看工地直播
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
		workVideo,
		bindVideoList
	} from "../../../api/home.js";
	import {
		formatDate
	} from "../../../utils/common.js"
	export default {
		filters: {
			formatDate
		},
		data() {
			return {
				muted: false,
				livePreview: "",
				isFill: false,
				list: [],
				currentVideoSrc: "",
				liveList: [],
				currentPage: 0,
				showDownload: false
			};
		},
		computed: {
			currentList() {
				return this.liveList.slice(
					this.currentPage * 3,
					this.currentPage * 3 + 3
				);
			},
			showLiveLeft() {
				if (this.currentPage == 0) {
					return false;
				} else {
					return true;
				}
			},
			showLiveRight() {
				if (this.currentPage < Math.floor(this.liveList.length / 3)) {
					return true;
				} else {
					return false;
				}
			},
		},
		onLoad(e) {
			let projectId = e.projectId;
			workVideo({
				page: 1,
				rows: 999,
				projectId: projectId
			}).then(e => {
				this.list = e.list;
			})
			bindVideoList({
				projectId: projectId
			}).then(e => {
				if (e.length) {
					this.liveList = e.filter(e => {
						return e.hls != '' && e.hls != null && e.status == 1
					})
					if (this.liveList.length) {
						this.livePreview = this.liveList[0].hls
					}
				}
			})
		},
		methods: {
			onVideoPlay(e, index) {
				for (let i = 0; i < this.list.length; i++) {
					if (index != i) {
						let videoContext = uni.createVideoContext('video' + i)
						videoContext.pause()
					}
				}
			},
			changeLive(item) {
				this.livePreview = item.hls;
			},
			changeMuted() {
				this.muted = !this.muted;
			},
			previewVideoClose() {
				this.currentVideoSrc = "";
			},
			toDetail(url) {
				this.currentVideoSrc = url;
			},
			videoFill() {
				this.isFill = !this.isFill;
			},
			error(e) {
				console.log("error");
				console.log(e);
			},
			statechange(e) {
				const {
					code
				} = e.detail;
				switch (code) {
					case 2007: //启动loading
						break;
					case 2001: //连接服务器
						break;
					case 2002: //已经连接 RTMP 服务器,开始拉流
						break;
					case 2008: // 解码器启动
						console.log("case 2008: //解码器启动");
						break;
					case 2009: //视频分辨率改动
						console.log("case 2009: //视频分辨率改动");
						this.handlePlay(); // 视频分辨率改动可能导致播放暂停，可调用handlePlay()重启播放
						break;
					case 2004:
						console.log("case 2004: // 视频播放开始");
						break;
					case 2003:
						console.log("case 2003: //网络接收到首个视频数据包(IDR)");
						break;
					case 2103: //网络断连, 已启动自动重连（本小程序不自动重连）
						break;
					case 3001:
					case 3002:
					case 3003:
					case 3005: // RTMP 读/写失败，之后会发起网络重试
						console.log("播放失败");
						break;
					case 2105: // 当前视频播放出现卡顿
						break;
					case -2301: // 经多次重连抢救无效，更多重试请自行重启播放
						break;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.to-app-img {
		width: 100%;
		height: 422rpx;
		flex-shrink: 0;
	}

	.alert-app {
		position: fixed;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);

		.content {
			width: 640rpx;
			height: 716rpx;
			background-color: #fff;
			border-radius: 24rpx;
			overflow: hidden;

			.img {
				width: 640rpx;
				height: 350rpx;
				background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/lives_download.png");
				background-size: contain;
				position: relative;
				border-top-right-radius: 24rpx;
				border-top-left-radius: 24rpx;

				.close {
					float: right;
					width: 64rpx;
					height: 64rpx;
					margin-right: 24rpx;
					margin-top: 24rpx;
					background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/ic_closed_black.png");
					background-size: contain;
				}
			}

			.text-content {
				background-color: #fff;
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


	.fill {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.placehold-img {
		width: 100%;
		height: 580rpx;
	}

	.placehold-text {
		font-size: 26rpx;
		text-align: center;
		font-weight: 400;
		text-align: center;
		color: #999999;
		line-height: 36rpx;
	}

	.center-icon-row {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow: auto;
		margin: 0 40rpx;

		.video-list-icon {
			flex-shrink: 0;
			width: 40rpx;
			height: 40rpx;
			margin: 21rpx;
		}
	}

	.scroll-view {
		width: 100%;
		flex: 1;
		overflow: auto;
	}

	.video-icon {
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.video-voice {
		width: 46rpx;
		height: 34rpx;
	}

	.translate90 {
		transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		/* Internet Explorer */
		-moz-transform: rotate(90deg);
		/* Firefox */
		-webkit-transform: rotate(90deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(90deg);
		/* Opera */
	}

	.preview-full {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1002;
	}

	.preview-full-close {
		position: fixed;
		right: 32rpx;
		top: 25rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 60rpx;
		text-align: center;
		z-index: 1003;
		/* 	background-color: #808080; */
		color: #fff;
		font-size: 65rpx;
		font-weight: bold;
		text-shadow: 1px 2px 5px rgb(0 0 0);
	}

	.cover-video {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.video {
		width: 650rpx;
		height: 368rpx;
		margin: 0 auto;
		background-color: red;
		border-radius: 24rpx;
	}

	.video-row {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 42rpx;
		padding: 24rpx 25rpx 40rpx 0;
		border-left: 1rpx #2fcfc9 dashed;
	}

	.player {
		height: 422rpx;
		width: 100%;
		position: relative;
		background-color: red;
	}

	.h-row {
		display: flex;
		padding: 0 32rpx;
		align-items: center;

		.tip {
			width: 20rpx;
			height: 20rpx;
			background: rgba(53, 196, 196, 0.11);
			border: 1rpx solid #35c4c4;
			border-radius: 50%;
		}

		.time {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			margin-left: 16rpx;
		}

		.flex1 {
			flex: 1;
		}

		.subtext {
			color: #35c4c4;
			font-size: 28rpx;
		}
	}

	.header {
		height: 96rpx;
		line-height: 96rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}

	.player-fill {
		height: 100vh;
		width: 100vw;
		position: relative;
	}

	.video-back {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		right: 53rpx;
		top: 32rpx;
		justify-content: center;
		width: 64rpx;
		height: 64rpx;
		background: #000000;
		border-radius: 26rpx;
	}

	.video-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		left: 22rpx;
		top: 32rpx;
		bottom: 32rpx;
		color: #fff;
		font-size: 34rpx;
	}

	.video-bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		left: 32rpx;
		bottom: 32rpx;
		right: 32rpx;
		color: #fff;
		font-size: 34rpx;
	}

	.video-right {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 200rpx;
		height: 200rpx;
		background-color: red;
	}
</style>
