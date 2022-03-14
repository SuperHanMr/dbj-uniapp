<template>
	<view class="classify">
		<view class="nav-box">
			<view class="uni-searchbar" @click="searchClick">
				<view class="uni-searchbar__box-icon-search">
					<uni-icons color="#999999" size="18" type="search" />
					<text class="uni-searchbar__text-placeholder">搜好货</text>
				</view>
			</view>
			<view class="right">
				<view class="box box-left">
					<view class="store icon-shop">

					</view>
				</view>
				<view class="box">
					<view class="shoppingcart icon-shoppingcart">
						<view class="corner-mark">
							2
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="classify-scroll" scroll-y="true" @scrolltolower='scrolltolower' refresher-enabled='true'
			@refresherrefresh='refresherrefresh' :refresher-triggered="triggered">
			<Head :swiperAuto="swiperAuto" />
			<view class="container-box">
				<Container />
			</view>
			<ShopList :page="page" :areaId="areaId" />
		</scroll-view>
	</view>
</template>

<script>
	import Head from './components/head.vue';
	import Container from './components/container.vue';
	import ShopList from '@/components/classify-shop/shop-list.vue';
	export default {
		components: {
			Head,
			Container,
			ShopList
		},
		data() {
			return {
				swiperAuto: false,
				page: 0,
				areaId: 43
			}
		},
		onShow() {
			this.swiperAuto = true;
		},
		onHide() {
			this.swiperAuto = false;
		},
		methods: {
			scrolltolower() {

			},
			refresherrefresh() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		top: 28rpx;
		left: 0rpx;
		padding: 0 32rpx;
		width: 100%;
		height: 62rpx;
		z-index: 102;
		display: flex;

		.right {
			flex: 1;
			display: flex;
			align-items: center;

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

	.uni-searchbar {
		display: flex;
		width: 534rpx;
		height: 62rpx;
		opacity: .85;
		backdrop-filter: blur(16px);
		background: #f7f7f7;
		border-radius: 116rpx;
	}

	.uni-searchbar__box-icon-search {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 0 16rpx;
		align-items: center;
	}

	.uni-searchbar__text-placeholder {
		font-size: 26rpx;
		color: #A9A9A9;
		margin-left: 10rpx;
	}

	.classify {
		width: 100%;
		height: 100vh;
	}

	.classify-scroll {
		height: 100%;
	}

	.container-box {
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		padding: 48rpx 32rpx;
	}
</style>
