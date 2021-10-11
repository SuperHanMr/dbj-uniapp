<template>
	<view style="background-color: #FFF;">
		<custom-navbar :opacity="scrollTop/100" bgcolor="#FFF">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: white;">
					</i>
				</view>
			</template>
		</custom-navbar>

		<view class="top-bg">
			<view class="pleaholder">
			</view>
		</view>
		<scroll-view class="tab-list" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view v-for="(item,index) in tabList" :key="item.id" class="tab-item"
				:class="index==currentTab?'selected-tab':'nomal-tab'" @click="onTab(index)">
				<image v-if="index==0" class="tab-img"
					:src=" currentTab==0? 'http://dbj.dragonn.top/static/mp/dabanjia/images/home/design_fire.png':'http://dbj.dragonn.top/static/mp/dabanjia/images/home/desigon_unfire.png'"
					mode=""></image>
				<text>{{item}}</text>
			</view>
		</scroll-view>

		<view style="height: 10rpx;">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				navBarHeight: "",
				tabList: [
					'1', '2', '3'
				],
				currentTab: 0
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},
		methods: {
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop;
			},
			onTab(index) {
				this.currentTab = index
			},
			toBack() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-item {
		padding: 0 20rpx;
		text-align: center;
		display: inline-block;
	}

	.tab-img {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
	}

	.nomal-tab {
		font-size: 26rpx;
		font-weight: 400;
		color: #696d70;
	}

	.selected-tab {
		font-weight: 500;
		font-size: 32rpx;
		color: #2d3033;

	}

	.top-bg {
		width: 100%;
		height: 420rpx;
		background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/find_design_bg.png");
		background-size: contain;
		position: relative;

		.pleaholder {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 32rpx;
			background: #ffffff;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
		}

		.tab-list {
			height: 64rpx;
			line-height: 64rpx;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;

		}

	}
</style>
