<template>
	<view class="no-house-decorate">
		<view class="content">
			<view class="addhouse-decs">
				<button class="addhouse">
					<image src="../../../static/images/ic_add_house_info.svg"></image>
					<text>添加房屋信息</text>
				</button>
				<view class="decs"><text>打扮家按房子面积计算价格</text></view>
			</view>
			<service-card v-for="(item, index) in serviceCards" :key="item.id" :setting="item" class="service-card">
			</service-card>
		</view>
		<payment class="payment" @gotopay="gotopay"></payment>
	</view>
</template>

<script>
	import ServiceCard from "../../../components/service-card/service-card.vue";
	import Payment from "../../../components/payment/payment.vue"
	export default {
		components: {
			ServiceCard,
			Payment
		},
		data() {
			return {
				serviceCards: [{
					index: 1,
					id: "design1",
					title: "设计服务",
					subtitle: "28.8全放个性化设计(适用全房设计…",
					area: "100.00",
					price: "199.00",
					cover: "https://img2.baidu.com/it/u=110114637,4171866431&fm=26&fmt=auto&gp=0.jpg"
				}, {
					isLast: true,
					index: 2,
					id: "actuary2",
					title: "精算服务",
					subtitle: "28.8全放个性化设计(适用全房设计…",
					area: "120.00",
					price: "299.00",
					cover: "https://img2.baidu.com/it/u=110114637,4171866431&fm=26&fmt=auto&gp=0.jpg"
				}]
			}
		},
		methods: {
			gotopay() {
				// TODO
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-house-decorate {
		background-color: #f2f5f8;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.content {}

	.payment {
		padding: 24px 32rpx 92rpx;
	}

	.addhouse-decs {
		padding-bottom: 54rpx;
	}

	.addhouse {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		width: 278rpx;
		height: 88rpx;
		opacity: 1;
		background: #333333;
		border-radius: 48rpx;
		margin-top: 40rpx;

		image {
			width: 18rpx;
			height: 18rpx;
			opacity: 1;
			margin-right: 12rpx;
		}

		text {
			height: 40rpx;
			opacity: 1;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #fff;
			line-height: 40rpx;
		}
	}

	.decs {
		text-align: center;
		margin-top: 24rpx;

		text {
			height: 36rpx;
			opacity: 1;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #666666;
			line-height: 36rpx;
			letter-spacing: 2rpx;
		}
	}
</style>
