<template>
	<view class="content">
		<view class="v1">
			<text>装修服务</text>
			<view @click="goToMyDecorate">></view>
		</view>
		<view class="design-picture">
			<image @click="goDesignPicture" mode="aspectFit"
				src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fclubfiles.liba.com%2F2006%2F08%2F23%2F15%2F4603714.jpg&refer=http%3A%2F%2Fclubfiles.liba.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632561406&t=2224059e9c261a09a68eaffa2d2e371d">
			</image>
		</view>
		<decorate-notice v-if="noticeActive" @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
		<drag-button-follow :style.sync="style" @btnClick='noticeActive=true' :follow='`left,right`'
			className="drag-button" class="drag-button">
			<view>
				<text>消息</text>
				<text style="color: red;">2</text>
			</view>
		</drag-button-follow>
		<view>
			<view class="v1"><text>量房</text> <text>量房员抢单中</text></view>
			<view>精算服务</view>
			<view>设计服务</view>
		</view>

	</view>
</template>

<script>
	import {
		queryEstates
	} from "../../../api/decorate.js";
	export default {
		mounted() {},
		onShow() {
			if (this.houses && this.houses.length < 1) {
				this.getHouses();
			}
		},
		data() {
			return {
				style: "",
				noticeActive: false,
				houses: getApp().globalData.houses,
			};
		},
		methods: {
			closeNotice() {
				this.noticeActive = false;
			},
			goToAddHouseInfo() {
				uni.navigateTo({
					url: "/pages/decorate/add-house/add-house",
				});
			},
			goDesignPicture() {
				uni.navigateTo({
					url: "/pages/decorate/design-picture/design-picture",
				});
			},
			goToMyDecorate() {
				uni.navigateTo({
					url: "/pages/decorate/my-decorate/my-decorate",
				});
			},
			getHouses() {
				queryEstates({
					isNeedRelative: true,
				}).then((data) => {
					//    if (data.length < 1) {
					//      uni.navigateTo({
					//        url: "/pages/decorate/no-house/no-house",
					//      });
					//    } else {
					//      getApp().globalData.houses = data;
					// uni.navigateTo({
					//   url: "/pages/decorate/have-house-no-service/have-house-no-service",
					// });
					//    }
					getApp().globalData.houses = data;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.v1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
		border: 2rpx solid green;
	}

	.drag-button {
		background: #ffffff;
		border: 0.5px solid #eeeeee;
		box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
		width: 100rpx;
		height: 100rpx;
		font-size: 24rpx;
		color: #000000;
		position: absolute;
		right: 0rpx;
		bottom: 188rpx;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.design-picture {
		border: 2rpx solid green;

		image {
			width: 250rpx;
			height: 250rpx;
		}
	}
</style>
