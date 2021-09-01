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
		<!-- 切换房屋弹窗 -->
		<uni-popup ref="sw">
			<house-switch :datalist="myHouseList" :current="current" @goAddHouse="addHouse" @checkHouse="checkHouse"></house-switch>
		</uni-popup>
		
		<view class="uni-padding-wrap">
			<view class="uni-title">{{ currentHouse.locationName }}{{currentHouse.housingEstate}}</view>
		</view>
		<view class="design-wrap">
			<view class="design" @click="goDesignPicture">
				<text>设计图</text>
				<image src="../../../static/images/ic_triangle_999.svg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { HouseSwitch } from "../../../components/house-switch/house-switch.vue"
	import {
		queryEstates,
	} from "../../../api/decorate.js"
	export default {
		components: { HouseSwitch },
		data() {
			return {
				indicatorStyle: 'height: 50px;',
				currentHouse: {},
				isSwitchHouse:false,
				myHouseList: [],
				current: null
			}
		},
		mounted() {
			this.getMyHouseList();
		},
		computed: {},
		methods: {
			addHouse() {
				uni.navigateTo({
					url: "/pages/decorate/add-house/add-house"
				})
			},
			checkHouse(item) {
				this.current = item.id
				this.currentHouse = item
				this.$refs.sw.close()
			},
			getMyHouseList() {
				queryEstates({
					isNeedRelative: true
				}).then(data => {
					let i = 1;
					let names = ["设计阶段", "未开工", "已竣工"]
					for(let item of data) {
						item.statusName = names[i - 1]
						item.status = i++
					}
					data[1].ext = "第二次装修"
					data[2].friend = true
					data[2].ext = "首次装修"
					this.myHouseList = data
					const arr = data.filter(t => t.defaultEstate)
					let temp = null;
					if(arr.length > 0) {
						temp = arr[0]
					} else {
						data[0].defaultEstate = true
						temp = data[0]
					}
					this.currentHouse = temp
					this.current = temp.id
					console.log(this.current, this.currentHouse)
				})
			},
			bindChange(e) {
				console.log(e)
			},
			switchVisible() {
				this.$refs.sw.open('top')
			},
			goDesignPicture(){
				uni.navigateTo({
					url:"/pages/decorate/design-picture/design-picture"
				})
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	.have-house-no-service {
		height: 100%;
		background-color: #fff;
		position: relative;
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
	.sw.title {
		margin-bottom: 0;
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
			// width: 314rpx;
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
