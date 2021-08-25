<template>
	<view class="my-house">
		<nav-bar class="nav-bar" :navConfig="navConfig">
			<template v-slot:center2>
				<image src="../../../static/arrow_b.svg" class="arrow-b" @click="open"></image>
			</template>
		</nav-bar>
		<!-- <uni-popup ref="popup" type="top" class="pop-up-ext">顶部 Popup</uni-popup> -->
		<view class="pop-up-ext" v-if="selectHouse">
			<view class="pop-up-bu">
				<view class="pop-up-content" :style="{paddingTop: topAndNavBarHeight}">
					<!-- <picker @change="bindPickerChange" :value="houseindex" :range="houses">
						<view class="uni-input">{{houses[houseindex]}}</view>
					</picker> -->
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
						<view id="demo1" @ v-for="(item, i) in houses" :key="i" class="house-item">{{item}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/nav-bar/nav-bar.vue";
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				navConfig: {
					navTitle: {
						text: "北京市东城区天安门一号",
						fontSize: '24rpx'
					}
				},
				houses: [
					"北京市东城区天安门一号",
					"天津市和平区津湾广场",
					"阎罗殿"
				],
				navBarHeight: "",
				tophight: "",
				topAndNavBarHeight: "",
				selectHouse: false,
				houseindex: 1,
				scrollTop: 0,
			}
		},
		created() {
			this.getNavbarHeight();
		},
		methods: {
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.selectHouse = !this.selectHouse;
			},
			getNavbarHeight() {
				const systemInfo = uni.getSystemInfoSync();
				//状态栏高度
				this.tophight = systemInfo.statusBarHeight * 2 + "rpx";
				// 获取胶囊按钮的位置
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
				this.navBarHeight =
					((menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
						menuButtonInfo.height) * 2 + 'rpx';
				this.topAndNavBarHeight = ((menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
					menuButtonInfo.height + systemInfo.statusBarHeight) * 2 + 'rpx';
				console.log(this.tophight, this.navBarHeight, this.topAndNavBarHeight);
				// let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
				// let menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
				// let menuHeight = menuButtonInfo.height;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.houseindex = e.target.value
				this.navConfig.navTitle.text = this.houses[this.houseindex]
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
		}
	}
</script>

<style scoped>
	.my-house {
		height: 100%;
	}

	.navi-header-state {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: red;
	}

	.nav-bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.arrow-b {
		width: 32rpx;
		height: 32rpx;
		margin-left: 1%;
		margin-top: 2.5%;
	}

	.pop-up-ext {
		position: fixed;
		width: 100%;
		height: 100%;

	}

	.pop-up-bu {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-duration: 0.3s;
		transition: 300ms ease 0ms;
		transform: ;
		transition-property: transform, opacity;
		transform-origin: 50% 50%;
		opacity: 1;
	}

	.pop-up-content {
		box-sizing: border-box;
		width: 100%;
		padding-bottom: 88rpx;
		padding-left: 44rpx;
		padding-right: 44rpx;
		background-color: #fff;
		height: 100%;
	}
</style>
