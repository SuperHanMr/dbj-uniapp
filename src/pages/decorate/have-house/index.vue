<template>
	<view>
		<nav-bar :navConfig="navConfig">
			<template v-slot:center2>
				<image src="../../../static/arrow_b.svg" class="arrow-b" @click="open"></image>
			</template>
		</nav-bar>
		<uni-popup ref="popup" type="top" class="pop-up-ext">顶部 Popup</uni-popup>
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
				index: 0
			}
		},
		methods: {
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('top')
			}
		}
	}
</script>

<style scoped>
	.arrow-b {
		width: 32rpx;
		height: 32rpx;
		margin-left: 1%;
		margin-top: 2.5%;
	}
	.pop-up-ext {
		width: 100vw;
		height: 100vh;
		padding: 88rpx;
	}
</style>
