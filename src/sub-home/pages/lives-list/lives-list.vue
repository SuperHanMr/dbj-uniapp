<template>
	<view>
		<view class="sticky-view" :style="{top:navBarHeight}">
			<scroll-view class="tab-list" scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in videoTypeList" :key="item.id" class="tab-item"
					:class="index==currentTab?'selected-tab ':'nomal-tab'" @click="onTab(index)">
					<text>{{item}}</text>
					<view v-if="index==currentTab" class="current-select">
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="goods-list">
			<view v-for="(item,index) in videoList" :key="index" class="item" @click="onLiveClick(item)">
				<view class="img-view">
					<image class="img"
						:src="item.mediaType==1?item.roomLiveMediaVO.scaleImg:item.roomVideoMediaVO.scaleImg" mode="">
					</image>

					<view v-if="item.mediaType==1" class="top-content">
						<image class="top-content-img"
							src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_liveing.png">
						</image>
						{{item.roomLiveMediaVO.onLineCount}}人在看
					</view>


					<view v-if="item.mediaType==2" class="top-content">
						<image class="top-content-img"
							src="http://dbj.dragonn.top/%20%20static/mp/dabanjia/images/home/video_review.png">
						</image>
						{{item.roomVideoMediaVO.viewsCount}}人看过
					</view>
					<view class="name-content">
						<image class="avatar"
							:src="item.mediaType==1?item.roomLiveMediaVO.anchor.avatar:item.roomVideoMediaVO.anchor.avatar"
							mode=""></image>
						<view class="name">
							{{item.mediaType==1?item.roomLiveMediaVO.anchor.nickName:item.roomVideoMediaVO.anchor.nickName}}
						</view>
					</view>

				</view>
				<view class="name">
					{{item.mediaType==1?item.roomLiveMediaVO.title:item.roomVideoMediaVO.title}}

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryLive
	} from '../../../api/home.js'
	export default {
		data() {
			return {
				videoTypeList: ["全部", "设计咨询", "施工咨询", "家居&建材"],
				currentTab: 0,
				videoList: [],
				page: 1,
				res: {}
			}
		},
		onLoad() {
			this.getList();
		},
		onReachBottom() {
			this.page++;
			this.getList();
		},
		onPullDownRefresh() {
			this.videoList=[]
			this.page=1;
			this.getList()
		},
		methods: {
			onLiveClick(item) {
				if (item.mediaType == 1) {
					//直播
					uni.navigateTo({
						url: `/sub-home/pages/lives-room/lives-room?roomId=${item.roomLiveMediaVO.roomId}`
					})
				} else if (item.mediaType == 2) {
					console.log(item);
					//回放
					uni.navigateTo({
						url: "/pages/common/video-player/video-player?url=" +
							encodeURIComponent(item.roomVideoMediaVO.videoUrl) + "&title=" + item.roomVideoMediaVO
							.title,
					});
				}
			},
			getList() {
				let type = -1;
				switch (this.currentTab) {
					case 0:
						type = -1;
						break;
					case 1:
						type = 0;
						break;
					case 2:
						type = 2;
						break;
					case 3:
						type = 3;
						break;
				}
				queryLive({
					page: this.page,
					row: 10,
					type
				}).then(e => {
					this.videoList = this.videoList.concat(e.list);
					this.res = e

				})
			},
			onTab(index) {
				this.currentTab = index;
				this.videoList=[]
				this.page=1;
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFF;
	}

	.goods-list {
		display: flex;
		margin-top: 8rpx;
		width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;

		.item {
			margin-top: 16rpx;
			flex-shrink: 0;
			width: 343rpx;
			height: 526rpx;
			border-radius: 16rpx;
			border: 1rpx solid #e6eaed;
			margin-left: 21.3rpx;
			position: relative;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.name {
				padding: 16rpx;
				flex: 1;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 400;
				color: #111111;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1; //这个代表你要在几行显示省略号
				-webkit-box-orient: vertical;

			}

			.img-view {
				height: 458rpx;
				position: relative;

				.img {
					height: 458rpx;
					width: 343rpx;

				}

				.name-content {
					position: absolute;
					bottom: 12rpx;
					left: 16rpx;
					right: 16rpx;
					display: flex;
					align-items: center;

					.avatar {
						width: 32rpx;
						height: 32rpx;
						border-radius: 16rpx;
					}

					.name {
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1; //这个代表你要在几行显示省略号
						-webkit-box-orient: vertical;
						font-size: 22rpx;
						font-weight: 400;
						color: #FFFFFF;
					}

				}

				.top-content {
					position: absolute;
					top: 12rpx;
					left: 20rpx;
					padding: 12rpx;
					height: 28rpx;
					background: rgba(0, 0, 0, 0.35);
					border-radius: 8rpx;
					font-weight: 400;
					color: #ffffff;
					line-height: 24rpx;
					font-size: 20rpx;
					display: flex;
					align-items: center;

					.top-content-img {
						margin-right: 8rpx;
						height: 28rpx;
						width: 74rpx;
					}
				}


			}
		}
	}

	.sticky-view {

		position: sticky;
		position: -webkit-sticky;
		left: 0;
		right: 0;
		background-color: white;
	}

	.tab-list {
		height: 64rpx;
		line-height: 64rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;

	}

	.tab-item {
		padding: 0 20rpx;
		text-align: center;
		display: inline-block;
		position: relative;
	}

	.current-select {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 32rpx;
		height: 4rpx;
		background: linear-gradient(129deg, #00cdec 0%, #00ed7d 92%);
		border-radius: 200rpx 200rpx 0rpx 0rpx;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.nomal-tab {
		font-size: 26rpx;
		font-weight: 400;
		color: #696d70;
	}
</style>
