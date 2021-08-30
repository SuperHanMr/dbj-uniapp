<!--
 * @Author: wangbinyan
 * @Date: 2021-08-25 10:25:49
 * @LastEditTime: 2021-08-28 11:35:33
 * @LastEditors: wangbinyan
 * @Description: In User Settings Edit
 * @FilePath: \dbj-uniapp\src\pages\decorate\have-house-no-service\have-house-no-service.vue
-->
<template>
	<view class="have-house-no-service">
		<view class="title" @click="switchVisible">
			<text>我的家</text>
			<image class="ic-triangle" src="../../../static/images/ic_triangle.svg"></image>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-title">{{ currentHouse }}</view>
		</view>
		<view class="design-wrap">
			<view class="design" @click="goDesignPicture">
				<text>设计图</text>
				<image src="../../../static/images/ic_triangle_999.svg"></image>
			</view>
		</view>
		<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange"
			class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item, index) in houses" :key="index">{{item.area}}</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				visible: false,
				indicatorStyle: 'height: 50px;',
				value: [0],
				currentHouse: ""
			}
		},
		mounted() {
			this.currentHouse = this.houses[this.value[0]].area
		},
		computed: {
			houses() {
				console.log(getApp().globalData.houses)
				return getApp().globalData.houses
			},
		},
		methods: {
			bindChange(e) {
				console.log(e)
			},
			switchVisible() {
				this.visible = !this.visible
			},
			goDesignPicture(){
				uni.navigateTo({
					url:"/pages/decorate/design-picture/design-picture"
				})
			}
		},
		watch: {
			houses(val) {
				console.log(val)
			},
			value(val) {
				this.currentHouse = this.houses[val[0]].area
			}
		}
	}
</script>

<style lang="scss" scoped>
	.have-house-no-service {
		height: 100%;
		background-color: #fff;
	}

	.title {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;
		margin-left: 40rpx;
		margin-bottom: 4rpx;

		.ic-triangle {
			width: 13rpx;
			height: 8rpx;
		}

		text {
			width: 126rpx;
			height: 56rpx;
			font-size: 40rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333333;
			line-height: 56rpx;
			letter-spacing: 2rpx;
			margin-right: 9rpx;
		}
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.uni-padding-wrap {
		margin-left: 40rpx;
		margin-bottom: 24rpx;

		.uni-title {
			width: 314rpx;
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			line-height: 34rpx;
		}
	}

	.design-wrap {
		margin: 0 40rpx 84rpx;

	}

	.design {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		width: 114rpx;
		height: 44rpx;
		background: #f5f6f6;
		border-radius: 12rpx;

		text {
			height: 32rpx;
			font-size: 22rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
			line-height: 32rpx;
			margin-right: 8rpx;
		}

		image {
			height: 13rpx;
			width: 8rpx;
		}
	}
</style>
