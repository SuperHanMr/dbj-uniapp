<template>
	<view>
		<custom-navbar opacity="0">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" @click="back"></i>
			</template>
		</custom-navbar>
		<view>

			<view class="basic-info" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<view :style="{height:navBarHeight}">
				</view>
				<view class="info">
					<view class="header1">退款失败</view>
				</view>
				<view class="header2">
					2021-01-12 16:58:26
				</view>
				<view class="placehold">

				</view>
			</view>
			<view class="header-content">
				<view class="icon">
					<i class="icon-icon_order_tips"></i>
				</view>
				<view class="alert" style="flex:1">
					您已取消了本次退款，如有问题未解决，您可以重新申请
				</view>
			</view>
		</view>
		<warehouse-item v-for="(item,index) in currentList" :key="item.id" @detail="toDetail" @refund="toRefund">
		</warehouse-item>
		<view class="info-content">
			<view class="title">
				退款信息
			</view>
			<view class="row">
				<view class="heaer">
					退款原因：
				</view>
				<view class="text">
					退款原因退款原因退款原因退款
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					退款类型：

				</view>
				<view class="text">
					仅退款 (已收货)

				</view>

			</view>

			<view class="row">
				<view class="heaer">
					退款金额：

				</view>
				<view class="text">
					￥320.00
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					申请时间：
				</view>
				<view class="text">
					2021-01-12 16:58:26
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					退款编号：

				</view>
				<view class="text">
					DDPG2020121400001
				</view>
			</view>


			<view class="row">
				<view class="heaer">
					备注信息：
				</view>
				<view class="text">
					退款原因退款原因退款原因退款退款原因退款原因退款原因退款退款原因退款原因退款原因退款退款原因退款原因退款原因退款退款原因退款原因退款原因退款退款原因退款原因退款原因退款退款原因退款原因退款原因退款
				</view>
			</view>
		</view>
		<view class="other-btn">联系客服
		</view>


		<view style="height: 200rpx;">

		</view>
		<view class="bottom-btn">
			<view class="btn">
				取消退款
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImg: 'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/order_bg_green.png',
				navBarHeight: '',
				currentList: [1]
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			let tophight = systemInfo.statusBarHeight;

			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
				menuButtonInfo.height + tophight +
				"px";
		},
		methods: {
			back() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other-btn {
		width: 100%;
		height: 112rpx;
		line-height: 112rpx;
		text-align: center;
		color: #333333;
		font-size: 26rpx;
		font-weight: 500;
		margin-top: 16rpx;
		background-color: #FFF;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 136rpx;
		opacity: 1;
		background: #fefffe;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			opacity: 1;
			background: linear-gradient(135deg, #36d9cd, #28c6c6);
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 500;

		}
	}

	.placehold {
		margin-top: 20rpx;
		height: 20rpx;
		width: 100%;
		background-color: #FFF;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}

	.info-content {
		margin-top: 16rpx;
		background-color: #FFF;
		border-radius: 24rpx;
		padding: 32rpx;

		.header {
			color: #333333;
			font-weight: 500;
			font-size: 30rpx;
			margin-bottom: 16rpx;
		}

		.row {
			display: flex;
			flex-direction: row;
			margin-top: 16rpx;
			align-items: flex-start;

			.heaer {
				font-size: 28rpx;
				color: #999999;
			}

			.text {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
			}
		}
	}

	.header-content {
		background: #ffffff;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		display: flex;
		font-size: 30rpx;
		color: #333333;
		padding: 0 32rpx 32rpx 32rpx;
		margin-bottom: 16rpx;

		.icon {
			margin-top: 6rpx;
			line-height: 32rpx;
			margin-right: 16rpx;
			font-weight: 20rpx;
		}

		.alert {

			line-height: 46rpx;
			font-size: 30rpx;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}
	}

	.back-icon {
		color: white;
		font-size: 40rpx;
		padding: 20rpx;
	}

	.basic-info {
		// height: 296rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		position: relative;

		image {
			margin-top: 200rpx;
			width: 184rpx;
			height: 184rpx;
			object-fit: cover;
			margin-bottom: 16rpx;
		}

		.info {
			display: flex;
			justify-content: center;
			align-items: center;

			.header1 {
				height: 48rpx;
				line-height: 48rpx;
				font-size: 48rpx;
				font-weight: 500;
				color: #ffffff;
				margin-bottom: 12rpx;
			}

		}

		.header2 {
			font-size: 26rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #ffffff;
			text-align: center;
		}
	}
</style>
