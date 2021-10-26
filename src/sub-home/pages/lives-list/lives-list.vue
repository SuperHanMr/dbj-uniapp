<template>
	<view class="fill">
		<view class="sticky-view" :style="{top:navBarHeight}">
			<scroll-view class="tab-list" scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in videoTypeList" :key="item.id" class="tab-item"
					:class="index==currentTab?'selected-tab':'nomal-tab'" @click="onTab(index)">
					<text>{{item}}</text>
					<view v-if="index==currentTab" class="current-select">
					</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="swiper" :current="currentTab" :duration="200" @change="swiperChange">

			<swiper-item v-for="(item,tabindex) in videoTypeList" :key="item">
				<view v-if="videoList.length==0&&noData" class="no-list-content">
					<image class="no-list" src="../../../static/order/blank_house@2x.png" mode=""></image>
					<view class="tip-text">
						您还没有任何数据~
					</view>
				</view>
				<scroll-view class="scroll-view" :enable-back-to-top="true" scroll-y="true" lower-threshold="10"
					refresher-background="#FFF" refresher-enabled="true" :refresher-triggered="triggered"
					@scroll="onScroll" @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
					<view class="goods-list">
						<view v-for="(item,index) in videoList"
							:class="{'margin-left24':index%2==0,'margin-left16':index%2==1}" :key="index" class="item"
							@click="onLiveClick(item)">
							<view class="img-view">
								<image class="img"
									:src="item.mediaType==1?item.roomLiveMediaVO.scaleImg:item.roomVideoMediaVO.scaleImg"
									mode="aspectFill">
								</image>

								<view v-if="item.mediaType==1" class="top-content">
									<image class="top-content-img-living"
										src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/living.gif">
									</image>
									{{item.roomLiveMediaVO.onLineCount||0}}人在看
								</view>

								<view v-if="item.mediaType==2" class="top-content">
									<image class="top-content-img"
										src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/live-repaly.png">
									</image>
									<view>回放</view>
									<view style="margin-left: 8rpx;">{{item.roomVideoMediaVO.viewsCount}}人在看</view>
								</view>
								<view class="name-content">
									<image class="avatar"
										:src="item.mediaType==1?item.roomLiveMediaVO.anchor.avatar:item.roomVideoMediaVO.anchor.avatar"
										mode=""></image>
									<view class="name-live">
										{{item.mediaType==1?item.roomLiveMediaVO.anchor.nickName:item.roomVideoMediaVO.anchor.nickName}}
									</view>
								</view>

								<image v-if="item.mediaType==1" class="living-gif"
									src='http://dbj.dragonn.top/static/mp/dabanjia/images/home/living-gift.gif'>

								</image>
							</view>

							<view class="live-list-name">
								{{item.mediaType==1?item.roomLiveMediaVO.title:item.roomVideoMediaVO.title}}
							</view>
						</view>
					</view>
					<view style="height: 200rpx;width: 700rpx;">

					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		queryLive
	} from "../../../api/home.js";
	export default {
		data() {
			return {
				videoTypeList: ["全部", "设计咨询", "施工咨询", "家居&建材"],
				currentTab: 0,
				videoList: [],
				page: 1,
				res: {},
				triggered: false,
				noData:false
			};
		},
		onLoad() {
			this.getList();
		},
		onShow() {
			this.onRefresh();
		},
		// onReachBottom() {
		// 	this.page++;
		// 	this.getList();
		// },

		methods: {
			onRefresh() {
				this.triggered = true;
				this.videoList = [];
				this.page = 1;
				this.getList();
			},
			onLoadMore() {
				if (this.res && this.res.totalPage) {
					if (this.page < this.res.totalPage) {
						this.page++;
						this.getList();
					}

				}

			},
			swiperChange(e) {
				let index = e.target.current || e.detail.current;
				this.currentTab = index;
				this.videoList = [];
				this.page = 1;
				this.getList();
			},
			onLiveClick(item) {
				if (item.mediaType == 1) {
					//直播
					uni.navigateTo({
						url: `/sub-home/pages/lives-room/lives-room?roomId=${item.roomLiveMediaVO.roomId}`,
					});
				} else if (item.mediaType == 2) {
					console.log(item);
					//回放
					uni.navigateTo({
						url: "/pages/common/video-player/video-player?url=" +
							encodeURIComponent(item.roomVideoMediaVO.videoUrl) +
							"&title=" +
							item.roomVideoMediaVO.title + '&id=' + item.roomVideoMediaVO.id,
					});
				}
			},
			getList() {
				this.noData=false
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
					type,
				}).then((e) => {
					if(this.page==1&&e.list.length==0){
						this.noData=true
					}
					this.videoList = this.videoList.concat(e.list);
					this.triggered = false
					this.res = e;
				});
			},
			onTab(index) {
				this.currentTab = index;
				this.videoList = [];
				this.page = 1;
			},
		},
	};
</script>

<style lang="scss">
	page {
		background: #F5F6F6;
	}

	.living-gif {
		position: absolute;
		right: 0;
		bottom: 22rpx;
		width: 70rpx;
		height: 156rpx;
	}

	.no-list-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.no-list {
		width: 248rpx;
		height: 248rpx;
	}

	.tip-text {
		margin-top: 24rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
	}

	.live-list-name {
		background: #FFF;
		padding: 16rpx;
		flex: 1;
		display: flex;
		font-size: 26rpx;
		font-weight: 400;
		color: #111111;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; //这个代表你要在几行显示省略号
		-webkit-box-orient: vertical;
	}

	.fill {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.swiper {
		flex: 1;
	}

	.selected-tab {
		font-weight: 500;
		font-size: 29rpx;
		color: #111111;
	}

	.scroll-view {
		flex: 1;
		height: 100%;
	}

	.margin-left24 {
		margin-left: 24rpx;
	}

	.margin-left16 {
		margin-left: 16rpx;
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
			position: relative;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.live-name {
				padding: 16rpx;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-start;
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
					bottom: 0rpx;
					left: 0;
					right: 0;
					height: 74rpx;
					display: flex;
					align-items: center;
					background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
					padding: 0 16rpx;

					.avatar {
						width: 32rpx;
						height: 32rpx;
						border-radius: 16rpx;
					}

					.name-live {
						margin-left: 12rpx;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1; //这个代表你要在几行显示省略号
						-webkit-box-orient: vertical;
						font-size: 22rpx;
						font-weight: 400;
						color: #ffffff;
					}
				}

				.top-content {
					position: absolute;
					top: 12rpx;
					left: 20rpx;
					padding: 0 8rpx 0 0;
					height: 28rpx;
					background: rgba(0, 0, 0, 0.35);
					border-radius: 8rpx;
					font-weight: 400;
					color: #ffffff;
					font-size: 20rpx;
					display: flex;
					align-items: center;

					.top-content-img {
						margin-right: 8rpx;
						height: 28rpx;
						width: 28rpx;
					}

					.top-content-img-living {
						margin-right: 8rpx;
						height: 28rpx;
						width: 28rpx;
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
		background-color: #F5F6F6;
	}

	.tab-list {
		height: 88rpx;
		line-height: 88rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		background: linear-gradient(#FFFFFF, #f5f6f6);
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
		font-size: 29rpx;
		font-weight: 400;
		color: #696d70;
	}
</style>
