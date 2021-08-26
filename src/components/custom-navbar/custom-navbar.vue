<template>
	<view class="nav" :class="{'navbar':opacity<100}">
		<view class="navi-header-state" :style="{height:tophight,backgroundColor:bgcolor,opacity:opacity}">
		</view>
		<view class="navi-header" :style="{height:navBarHeight,backgroundColor:bgcolor,opacity:opacity}">
			<view>
				{{title}}
			</view>

		</view>
		<view class="navi-back" :style="{top:backTop,height:backHeight}">
			<slot>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-navbar",
		data() {
			return {
				tophight: 0,
				navBarHeight: 0,
				backTop: 0,
				backHeight: 0
			};
		},
		props: {
			bgcolor: {
				type: String,
				default: '#F8F8F8'
			},
			title: {
				type: String,
				default: ''
			},
			opacity: {
				type: Number,
				default: 100
			},
			showBack: {
				type: Boolean,
				default: true
			}
		},
		methods: {},

		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.backTop = menuButtonInfo.top + 'px';
			this.backHeight = menuButtonInfo.height + 'px';
			console.log('**********', this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				(menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
				menuButtonInfo.height +
				"px";
			let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
			let menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
			let menuHeight = menuButtonInfo.height;
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	.navi-back {
		position: absolute;
		left: 12px;
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.navi-header-state {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.navi-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: center;
		position: relative;

		.select-city {
			width: 30rpx;
			height: 20rpx;

		}
	}
</style>
