<template>
	<view>
		<view class="navi-header-state" :style="{height:tophight,backgroundColor:bgcolor}">
		</view>
		<view class="navi-header" :style="{height:navBarHeight,backgroundColor:bgcolor}">
			<view >
				{{title}}
			</view>
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
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#F8F8F8'
			},
			title:{
				type:String,
				default:''
			}
		},
		mounted() {
			console.log('??????>>>>>>>>')
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
			console.log('!!!!!@@@@@@#######')
		},
		onLoad() {
		
		}
	}
</script>

<style lang="scss">
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

		.select-city {
			width: 30rpx;
			height: 20rpx;
			
		}
	}
</style>
