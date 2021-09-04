<template>
	<view class="fill">
		<view class="top-tab">
			<view v-for="(item,index) in tabList" :key="item.id" class="item" :class="{selected:index==currentIndex}"
				@click="currentIndex=index">
				<view class="tab-text">
					{{item}}
				</view>
				<view class="bottom-icon" />
			</view>
		</view>
		<swiper class="swiper" :current="currentIndex" :duration="200" @change="swiperChange">
			<swiper-item v-for="(item,tabindex) in tabList" :key="item">
				<scroll-view class="scroll-view" :enable-back-to-top="true" scroll-y="true" lower-threshold="10"
					refresher-background="#FFF" refresher-enabled="true" @scroll="onScroll"
					:refresher-triggered="triggered" @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
					<warehouse-item v-for="(item,index) in currentList" :key="item.id" @detail="toDetail"></warehouse-item>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view v-if="currentIndex==0" class="bottom-btn" :style="{bottom:systemBottom}">
			<view class="btn-item">
				要货
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				triggered: false,
				list: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					0,
					11,
					"阿道夫",
					"刮大风",
					"部分地方",
					"不梵蒂冈",
					"有人特",
				],
				list1: [
					"sad",
					"ddw",
					"sdfsda",
					"sdfas",
					"gfds",
					"zxcv",
					"bgf",
					"uytre",
					"阿道夫",
				],
				list2: [
					"阿道夫",
					"刮大风",
					"部分地方",
					"不梵蒂冈",
					"有人特",
					"阿道夫",
					"刮大风",
					"部分地方",
					"不梵蒂冈",
					"有人特",
				],
				tabList: ["待发货", "待收款", "已收货", "退款"],
				triggered: false, //控制刷新显示字段
				currentIndex: 0,
				systemBottom: "",
			};
		},
		computed: {
			currentList() {
				if (this.currentIndex == 0) {
					return this.list;
				} else if (this.currentIndex == 1) {
					return this.list1;
				} else if (this.currentIndex == 2) {
					return this.list2;
				} else {
					return this.list1;
				}
			},
		},
		onLoad() {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
		},
		methods: {
			toDetail(e) {
				uni.navigateTo({
					url: "/sub-decorate/pages/warehouse-refund-detail/warehouse-refund-detail",
				});
			},
			onScroll(e) {
				console.log(e.detail);
			},
			swiperChange(e) {
				let index = e.target.current || e.detail.current;
				this.currentIndex = index;
			},
			onLoadMore() {
				this.list = this.list.concat(this.list);
			},
			onRefresh(e) {
				this.triggered = true;
				setTimeout(() => {
					this.triggered = false;
				}, 1000);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.fill {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.item {
		width: 100%;
		height: 96rpx;
		color: #999999;
		font-size: 30rpx;
		position: relative;

		.tab-text {
			width: 150rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
		}
	}

	.top-tab {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 96rpx;
		background-color: #FFFFFF;

		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #999999;
		}

		.selected {
			color: #111111;
			font-weight: 500;
			font-size: 30rpx;

			.bottom-icon {
				position: absolute;
				width: 32rpx;
				height: 4rpx;
				background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
				border-radius: 200rpx 200rpx 0px 0px;
				bottom: 10rpx;
				left: 50%;
				margin-left: -16rpx;
			}
		}
	}

	.swiper-item {
		height: 200rpx;
		width: 100%;
	}

	.swiper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.scroll-view {
		flex: 1;
		height: 100%;
	}

	.bottom-btn {
		position: fixed;
		left: 0;
		right: 0;
		height: 136rpx;
		width: 100%;
		background-color: #FFF;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn-item {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
			background: linear-gradient(135deg, #00c2b2, #00c2bf);
			border-radius: 12rpx;
		}
	}
</style>
