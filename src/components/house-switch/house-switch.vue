<template>
	<view class="s-w">
		<view class="house-list">
			<view class="item" v-for="(item ,i) in datalist" @click="checkHouse(item)">
				<view class="item-inner flex-row-bet"
					:class="{default: item.defaultEstate, current: item.id == current}">
					<view class="left flex-row-start">
						<view v-if="item.friend" class="friend">亲友</view>
						<view v-if="item.defaultEstate" class="default">默认</view>
						<view class="house-address">{{item.housingEstate}}{{item.address}}</view>
					</view>
					<view class="status"
						:class="{status1: item.status == 1, status2: item.status == 2,status3: item.status == 3,}">
						{{item.statusName}}
					</view>
				</view>
				<view class="ext" v-if="item.ext">{{item.ext}}</view>
			</view>
		</view>
		<view class="go-add-house flex-row">
			<image src="../../static/svg/ic_add_house_c.svg" @click="goaddhouse"></image>
			<text @click="goaddhouse">新增房屋</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			datalist: {
				type: Array,
				default: () => []
			},
			current: {
				type: Number,
				default: 0
			},
		},
		methods: {
			goaddhouse() {
				this.$emit("goAddHouse")
			},
			checkHouse(item) {
				this.$emit("checkHouse", item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.s-w {
		width: 100%;
		padding: 16rpx 40rpx;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
	}

	.house-list {
		height: 472rpx;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.item {
		box-sizing: border-box;
		padding-top: 32rpx;
		height: 104rpx;
	}

	.item-inner {
		box-sizing: border-box;
		height: 40rpx;

		.left {
			margin-right: 32rpx;
			box-sizing: border-box;

			.friend,
			.default {
				box-sizing: border-box;
				width: 60rpx;
				height: 32rpx;
				background: #ffffff;
				border: 1rpx solid #cccccc;
				border-radius: 8rpx;
				font-size: 22rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #666666;
				line-height: 29rpx;
				margin-right: 8rpx;
			}

			.house-address {
				box-sizing: border-box;
				max-width: 468rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.status {
			box-sizing: border-box;
			width: 104rpx;
			height: 32rpx;
			opacity: 1;
			font-size: 22rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #333333;
			height: 32rpx;
			background: #f5f6f6;
			border-radius: 6rpx;
		}

		.status.status1 {
			color: #fff;
			background: #35C4C4;
		}

		.status.status2 {
			color: #fff;
			background: #999999;
		}

		.status.status3 {
			color: #333333;
			background: #f5f6f6;
		}
	}

	.current.item-inner {
		.left {

			.friend,
			.default {
				border: 1rpx solid #35C4C4;
				color: #35C4C4;
			}

			.house-address {
				color: #35C4C4;
			}
		}
	}

	.ext {
		// width: 110rpx;
		height: 32rpx;
		font-size: 22rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #999999;
		line-height: 32rpx;
	}

	.go-add-house {
		height: 128rpx;

		image {
			width: 28rpx;
			height: 28rpx;
		}

		text {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #333;
			line-height: 40rpx;
			margin-left: 12rpx;
		}
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.flex-row-bet {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.flex-row-start {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
</style>
