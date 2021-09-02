<template>
	<view class="store" @click="toDetail">
		<view class="store-info">
			<view class="store-name">
				店铺名字
			</view>
			<view class="store-icon">
				right
			</view>

		</view>
		<view v-for="(item,index) in list" class="good-detail">
			<view class="img">
			</view>
			<view class="goods-info">
				<view class="name">
					996加班套餐
				</view>
				<view class="spec">加班一天</view>
				<view class="price">
					10元/1天
				</view>
			</view>
			<view style="flex:1">

			</view>
			<view class="btns">

				1.0
				<view class="">
					确认收货
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "warehouse-item",
		props: {
			item: {
				type: Object,
				default: () => {

				}
			}
		},
		data() {
			return {
				list: [1, 2]
			};
		},
		methods:{
			toDetail(){
				this.$emit('detail');
			}
		}
	}
</script>

<style lang="scss">
	.store {
		padding: 16rpx;
		background-color: #FFF;
		margin-top: 32rpx;

		.store-info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.good-detail {
			display: flex;
			width: 100%;
			padding: 16rpx 0;
			flex-direction: row;
			align-items: center;

			.img {
				width: 200rpx;
				height: 100rpx;
				background-color: yellow;
			}

			.goods-info {
				.name {}

				.spec {}

				.price {}
			}

			.btns {
				text-align: end;
			}
		}
	}
</style>
