<template>
	<view class="">
		<custom-navbar title="????AAAA" :opacity="scrollTop/100"></custom-navbar>

		<scroll-view class="content" scroll-y="true" @scroll="onScroll">
			<view style="margin-top: 300rpx;">
				asdfasdf
			</view>
			<view class="flex-row">
				<view class="item" v-for="(item,index) in liveList">
					???
				</view>


			</view>
			<view class="test">
				<button type="default" @click="toNextPage">去封装好的列表页</button>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
		getBanner,
		queryLive
	} from '../../../api/home.js';
	export default {
		data() {
			return {
				tophight: 0,
				imgUrl: "../../../static/app-plus/uni@2x.png",
				navBarHeight: 0,
				scrollTop: 0,
				liveList: []
			};
		},
		onLoad() {
			getApp().globalData.userInfo = {
				name: "张三",
				token: "asdasdasd",
			};
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				(menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
				menuButtonInfo.height +
				"px";
			let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
			let menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
			let menuHeight = menuButtonInfo.height;
		},
		onShow() {
			this.getBannerList();
		},
		methods: {
			async getBannerList() {
				let list = await queryLive();
				console.log(list);
				this.liveList = list.lives;
			},
			onScroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			toNextPage() {
				console.log(getApp().globalData.userInfo);
				uni.navigateTo({
					url: "../../decorate/warehouse-list/warehouse-list",
				});
			},
		},
	};
</script>

<style lang="scss">
	.flex-row {
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: yellow;
		overflow: auto;
		.item {
			flex-shrink: 0;
			width: 200rpx;
			height: 200rpx;
			text-align: center;
			background-color: red;
		}
	}

	.content {
		height: 100vh;
	}


	.banner {
		height: 2000rpx;
		background-color: yellow;
	}

	.navi-header-state {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: red;
	}

	.navi-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: blue;
		align-items: center;

		.select-city {
			width: 30rpx;
			height: 20rpx;
			background-color: green;
		}
	}

	.test {
		height: 2000rpx;
		width: 750px;
		background-color: red;
	}
</style>
