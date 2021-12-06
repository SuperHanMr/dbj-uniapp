<template>
	<view class="main">
		<view class="holder"></view>
		<view class="item" :class="{'item-status':showStatusIcon}">
			<view class="header" @click="clickItem">
				<view class="price price-font" :style="{color:showStatusIcon?'#999999':'#FA4D32'}">
					<text style="font-size:24rpx ;">¥</text>1000
				</view>
				<view class="sub-price">
					满1000可用
				</view>
			</view>

			<view class="flex1">
				<view class="tips"  @click="clickItem">
					<view class="name">
						<view class="title" :style="{color:showStatusIcon?'#999999':'#333333'}">
							优惠券名称最长就到这…
						</view>
						<view class="subtitle">
							有效期 2020.02.02 至 2020.02.02
						</view>
					</view>
					<view v-if="!showStatusIcon">
						<view v-if="!canSelect" class="btn">
							去使用
						</view>
						<view v-else class="btn-view">
							<image v-if="item.id ==selectedId" class="selected-img"
								src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_selected.png"
								mode="">
							</image>
							<image v-if="item.id !=selectedId" class="selected-img"
								src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/pay_unselected.png"
								mode="">
						</view>
					</view>
				</view>
				<view v-if="showStatusIcon" class="showCouponStaticIcon">
					<image src="../../static/images/refund-item-expired.svg" mode=""></image>
					<image v-if="item.status==2" src="../../static/images/refund-item-invalid.svg" mode=""></image>
					<image v-if="item.status==3" src="../../static/images/refund-item-used.svg" mode=""></image>
				</view>
				<view class="more" @click="showTips">
					<view class="tip-title">
						使用说明
					</view>
					<view v-if="!showTip" class="icon-gerenzhuye_anlihefuwu_zhankaiic icon-tip">
					</view>
					<view v-else class="icon-gerenzhuye_anlihefuwu_shouqiic icon-tip">
					</view>
				</view>

			</view>

		</view>
		<view v-if="showTip" class="explain-container" :class="{'unUnsed':showStatusIcon}">
			<view class="explain-item" style="margin-bottom: 8rpx;">
				1. 指定品类使用指定品类使用指定品类使用指定品类使发 指定品类使用指定品类使用指定品类使用指定品类使用
			</view>
			<view class="explain-item">
				2. 指定品类使用指定品类使用指定品类使用指定品类使发 指定品类使用指定品类使用指定品类使用指定品类使用
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "coupon-item",
		data() {
			return {
				showTip: false
			};
		},
		props: {
			canSelect: false,
			selectedId: '',
			item: {},
			showStatusIcon:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			showTips() {
				this.showTip = !this.showTip
			},

			clickItem() {
				this.$emit('clickItem', this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-view {
		display: flex;
		justify-content: flex-end;
		flex: 1;
	}

	.selected-img {
		width: 36rpx;
		height: 36rpx;
	}

	.icon-tip {
		font-size: 24rpx;
		color: #BABABA;
	}

	.main {
		position: relative;
		margin-top: 24rpx;
		.holder {
			height: 194rpx;
		}
	}

	


	.item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 194rpx;
		background: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/coupon_bg.png') no-repeat;
		background-size: 100% 100%;
		// border: 1rpx solid #fcd3bf;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-shadow: 0rpx 6rpx 8rpx 0px #FAEBEB;

		.header {
			width: 176rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.sub-price {
				font-size: 22rpx;
				color: #999999;
				font-weight: 400;

			}

			.price {
				text-align: center;
				font-size: 56rpx;
				color: #ff5d35;
			}
		}
		

		.flex1 {
			flex: 1;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin: 0 24rpx;
			position: relative;
			.tips {
				display: flex;
				flex-direction: row;
				margin-top: 32rpx;

				.name {
					width: 350rpx;

					.title {
						font-size: 28rpx;
						font-weight: 500;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-bottom: 4rpx;
					}

					.subtitle {
						font-size: 22rpx;
						font-weight: 400;
						color: #999999;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.btn {
					width: 120rpx;
					height: 58rpx;
					line-height: 58rpx;
					text-align: center;
					background: linear-gradient(90deg, #FA3B34 0%, #FF6A33 100%);
					border-radius: 12rpx;
					color: #FFF;
					font-size: 24rpx;
					font-weight: 500;

				}
			}
			
			
			.showCouponStaticIcon{
				position: absolute;
				top: 0;
				right: -24rpx;
				image{
					width: 132rpx;
					height: 114rpx;
				}
			}
			.more {
				margin-bottom: 14rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.tip-title {
					color: #999999;
					font-size: 24rpx;
					font-weight: 400;

				}
			}
		}
	}
	
	.item-status{
		box-shadow: 0rpx 6rpx 8rpx 0px #F5F5F5;
		background: url('https://ali-image.dabanjia.com/static/mp/dabanjia/images/classify/coupon-unUsed-bg.svg')  no-repeat;
	}
	.explain-container {
		background: #FCF7F7;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
		padding: 38rpx 24rpx 24rpx 24rpx;
		margin-top: -14rpx;
		font-size: 26rpx;
		color: #666666;
	}
	.unUnsed{
		background: #F5F5F5;
		color: #999999;
	}
	.explain-item{
		line-height: 36rpx;
		font-size: 26rpx;
		font-weight: 400;
	}
</style>
