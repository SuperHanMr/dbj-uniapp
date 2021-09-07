<template>
	<view>
		<view class="goods-row">
			<image class="img" src="item.src" mode=""></image>
			<view class="content">
				<view class="title">
					{{item.title}}

				</view>
				<view class="sub">
					{{item.sub}}
				</view>
				<view class="num-input">
					<custom-number-box @change="onChange" :onlyShowAdd="true" v-model="item.count"></custom-number-box>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {

				}
			},
			cartList: {
				type: Array,
				default: []
			}
		},
	
		watch:{
			cartList(now,pre){
				console.log(now);
				if(!now.length){
					item.count=0;
				}
			}
		},
		data() {
			return {}
		},

		methods: {
			onChange(e){
				this.item.count=e
				this.$emit('change',this.item);
			}
		},
		watch: {
			tabIndex(v) {
				this.categoryActive = 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.num-input {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 16rpx;
	}

	.goods-row {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: start;
		padding-bottom: 40rpx;

		.img {
			width: 144rpx;
			height: 144rpx;
			border: 1rpx solid #f4f4f4;
			border-radius: 8rpx;
		}

		.content {
			padding: 0 16rpx;
			flex: 1;

			.title {
				font-size: 26rpx;
				color: #333333;
				white-space: normal;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
			}

			.sub {
				margin-top: 16rpx;
				color: #999999;
				font-size: 22rpx;

			}
		}
	}

	.flex1 {
		flex: 1;
	}
</style>
