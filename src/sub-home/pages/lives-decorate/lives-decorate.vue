<template>
	<view class="fill">
		<view v-if="liveList.length||list.length">

			<live-player v-if="liveList.length" :class="{ player:!isFill,'player-fill':isFill}" :src="livePreview"
				autoplay @statechange="statechange" @error="error" :muted="muted"
				:orientation="isFill?'horizontal':'vertical'">
				<cover-view v-if="!isFill" class="video-bottom">
					<cover-image class="video-voice" @click="changeMuted"
						src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/player-vioce.png">
					</cover-image>
					<cover-view class="center-icon-row">
						<cover-view class="video-list-icon">
							<cover-image v-show="showLiveLeft" @click="this.currentPage--"
								src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/live-left.png">
							</cover-image>
						</cover-view>
						<cover-image v-for="(item,index) in currentList" :key="index" class="video-list-icon"
							@click="videoFill"
							src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/indicator_Selected.png">
						</cover-image>

						<cover-view class="video-list-icon">
							<cover-image v-show="showLiveRight" @click="this.currentPage++"
								src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/live-right.png">
							</cover-image>
						</cover-view>
					</cover-view>
					<cover-image class="video-voice" @click="videoFill"
						src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/player-big.png">
					</cover-image>

				</cover-view>
				<cover-view v-else class="video-left">

					<cover-image class="video-voice translate90" @click="changeMuted"
						src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/player-vioce.png">
					</cover-image>
					<cover-view style="flex:1"></cover-view>
					<cover-image class="video-voice translate90" @click="videoFill"
						src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/player-small.png">
					</cover-image>
				</cover-view>

				<cover-view v-if="isFill" class="video-back">
					<cover-image class="video-voice translate90" @click="videoFill"
						src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_cancel_white.png">
					</cover-image>
				</cover-view>

			</live-player>
			<view v-if="!isFill" class="header">
				直播速看
			</view>
			<scroll-view v-if="!isFill" scroll-y="true" class="scroll-view">

				<view v-for="(item,index) in list" :key="index">
					<view class="h-row">
						<view class="tip">
						</view>
						<view class="time">
							2021-06-22 周二
						</view>
						<view class="flex1">
						</view>
					</view>
					<view class="video-row">
						<video class="video" :src="videoSrc">
							<cover-view class="cover-video" @click.stop="toDetail"></cover-view>
						</video>
					</view>
				</view>
				<view style="height: 100rpx;">
				</view>
				<view class="preview-full" v-if="currentVideoSrc">
					<video class="preview-full" :autoplay="true" :src="currentVideoSrc" :show-fullscreen-btn="false">
						<cover-view class="preview-full-close" @click="previewVideoClose"> ×
						</cover-view>
					</video>
				</view>
			</scroll-view>
		</view>
		<view v-else>
			<image class="placehold-img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/pic_empty.png"
				mode=""></image>
				<view class="placehold-text">
					暂无工地视频
				</view>
		</view>
	</view>
</template>

<script>
	import {
		workVideo,
		bindVideoList
	} from "../../../api/home.js";
	export default {
		data() {
			return {
				muted: false,
				livePreview: "",
				isFill: false,
				list: [],
				videoSrc: "http://qiniu.hydrant.ink/1631176569963742.mp4",
				currentVideoSrc: "",
				liveList: [],
				currentPage: 0,
				totalPage: 5,
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
				if (this.currentPage < this.totalPage) {
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
				projectId: 0
			}).then(e => {
				this.list = e.list;
			})
			bindVideoList({
				projectId: 0
			}).then(e => {
				if (e.length) {
					this.liveList = e.filter(e => {
						return e.hls != '' && e.hls != null
					})
					if (this.liveList.length) {
						this.livePreview = this.liveList[0].hls
					}
				}
			})
		},
		methods: {
			changeMuted() {
				this.muted = !this.muted;
			},
			previewVideoClose() {
				this.currentVideoSrc = "";
			},
			toDetail() {
				this.currentVideoSrc = "http://qiniu.hydrant.ink/1631176569963742.mp4";
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
