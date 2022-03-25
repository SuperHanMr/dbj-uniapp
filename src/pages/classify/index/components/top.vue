<template>
	<view :class="['nav-box', {'nav-box-active': navActive}]">
		<view class="uni-searchbar" @click="searchClick">
			<view class="uni-searchbar__box-icon-search">
				<text class="uni-searchbar-icon icon-search"></text>
				<text class="uni-searchbar__text-placeholder">搜好货</text>
			</view>
		</view>
		<view class="right">
			<view class="box box-left" @click="toStoreHandler">
				<view class="store icon-shop">
	
				</view>
			</view>
			<view class="box" @click="toShoppingCartHandler">
				<view class="shoppingcart icon-shoppingcart">
					<view class="corner-mark" v-if="shopListNum">
						{{shopListNum}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			navActive: {
				type: Boolean,
				default: false
			},
			shopListNum: {
				type: Number,
				default: 0
			}
		},
		methods:{
			searchClick() {
				uni.navigateTo({
					url: "/sub-classify/pages/search/index"
				})
			},
			toStoreHandler() {
				uni.navigateTo({
					url: "/sub-classify/pages/shop-store-list/shop-store-list"
				})
			},
			toShoppingCartHandler() {
				uni.getStorage({
					key: 'scn',
					success: function(res) {
						uni.navigateTo({
							url: "/sub-my/pages/shopping-cart/shopping-cart"
						})
					},
					fail: function(res) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		z-index: 102;
		display: flex;
		padding: 28rpx 32rpx 30rpx;
	
		.right {
			flex: 1;
			display: flex;
	
			.box {
				width: 64rpx;
				height: 64rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
	
			.box-left {
				margin-left: 24rpx;
			}
	
			.store,
			.shoppingcart {
				font-size: 34rpx;
				color: #fff;
				position: relative;
			}
	
			.corner-mark {
				position: absolute;
				top: -16rpx;
				left: 20rpx;
				background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
				border: 0.5px solid #FFFFFF;
				color: #FFFFFF;
				text-align: center;
				font-size: 20rpx;
				border-radius: 50%;
				width: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
			}
		}
	}
	
	.nav-box-active {
		background-color: rgba(255, 255, 255, 1);
		.uni-searchbar{
			background: rgba(243, 243, 243, 1);
		}
		.uni-searchbar-icon{
			color: rgba(255, 255, 255, 1);
		}
		.uni-searchbar__text-placeholder {
			color: rgba(153, 153, 153, 1);
		}
		.right {
	
			.store,
			.shoppingcart {
				color: #666666;
			}
		}
	}
	
	.uni-searchbar {
		display: flex;
		width: 534rpx;
		height: 62rpx;
		backdrop-filter: blur(16px);
		background: rgba(255,255,255,.2);
		border-radius: 116rpx;
	}
	
	.uni-searchbar__box-icon-search {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 0 20rpx;
		align-items: center;
		.uni-searchbar-icon{
			font-size: 24rpx;
			color: #ffffff;
		}
	}
	
	.uni-searchbar__text-placeholder {
		font-size: 26rpx;
		color: #ffffff;
		margin-left: 14rpx;
	}
	
</style>
