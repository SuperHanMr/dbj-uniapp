<template>
	<view class="s-w">
		<view class="top">
      <view class="house-title">选择家</view>
    </view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="house-list">
			<view class="item" v-for="(item ,i) in datalist" @click="checkHouse(item)" :key="item.uid">
				<view class="item-inner flex-row-bet"
					:class="{default: item.defaultEstate, current: item.uid == current}">
					<view class="left flex-row-start">
						<view v-if="item.relegationType == 2" class="friend">亲友</view>
						<view v-if="item.defaultEstate && item.relegationType == 1" class="default">默认</view>
						<view class="house-address" :class="{'width-ext': item.relegationType == 2 || (item.defaultEstate && item.relegationType == 1)}">{{item.housingEstate}}{{item.address}}</view>
					</view>
					<view class="status"
						:class="{status0: item.projectStatus == 0, status1: item.projectStatus == 1,status3: item.projectStatus == 3,status4: item.projectStatus == 4,}">
						{{item.projectStageName}}
					</view>
				</view>
				<view class="ext" v-if="item.frequencyName">{{item.frequencyName}}</view>
			</view>
		</scroll-view>
		<view class="go-add-house flex-row">
			<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_add_house_c.svg" @click="goaddhouse"></image>
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
				type: String
			}
		},
    data() {
      return {
        scrollTop: 0
      }
    },
		methods: {
			goaddhouse() {
				this.$emit("goAddHouse")
			},
			checkHouse(item) {
				this.$emit("checkHouse", item)
			}
		},
    filters: {
      projectStatusName(str) {
        let res = ""
        switch (str) {
          case 0: 
            res = "未开工";
            break;
          case 1:
            res = "进行中";
            break;
          case 3:
            res = "已竣工";
            break;
          case 4:
            res = "已结束";
            break;
          default:
            break;
        }
        return res
      }
    }
	}
</script>

<style scoped lang="scss">
	.s-w {
		width: 100%;
		padding: 16rpx 40rpx;
		background-color: #fff;
    background-image: url("http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/toast-bg.png");
    background-repeat: no-repeat;
    background-size: 100vw auto;;
    background-position: 0 0;
		box-sizing: border-box;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
	}

	.top{
		height: 184rpx;
    position: relative;
		// opacity: .7;
    .house-title {
      position: absolute;
      bottom: 22rpx;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      height: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      text-align: center;
      color: #000000;
      line-height: 44rpx;
      
    }
	}
	.house-list {
		height: 472rpx;
		// overflow-x: hidden;
		// overflow-y: auto;
	}

	.item {
		box-sizing: border-box;
		padding-top: 32rpx;
		min-height: 104rpx;
	}

	.item-inner {
		box-sizing: border-box;
		min-height: 40rpx;

		.left {
			margin-right: 32rpx;
			box-sizing: border-box;

			.friend,
			.default {
				box-sizing: border-box;
				width: 60rpx;
        margin-top: 4rpx;
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
				max-width: 532rpx;
				min-height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				line-height: 40rpx;
        word-break: break-all;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
			}
      .house-address.width-ext {
        max-width: 468rpx;
      }
		}

		.status {
			box-sizing: border-box;
			min-width: 120rpx;
      // padding: 0 8rpx;
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

		.status.status3 {
			color: #fff;
			background: #999999;
		}

		.status.status4 {
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
		align-items: flex-start;
	}
</style>
