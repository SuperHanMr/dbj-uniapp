<template>
	<view>
		<view class="goods-row">
			<image class="img" :src="item.imgUrl" mode=""></image>
			<view class="content">
				<view class="title">
					{{item.fullName}}
				</view>
				<view class="sub">
				已购买	{{item.number}}{{item.unit}} 剩余{{item.stockNumber}}{{item.unit}} 
 				</view>
				<view class="num-input">
					<custom-number-box :max="item.stockNumber" @change="onChange" :onlyShowAdd="true" :value="value"></custom-number-box>
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

		watch: {
			cartList: {
				handler(e, pre) {
					let haveCurrent = false;
					e.forEach(curr => {
						if (curr.id == this.item.id) {
							haveCurrent = true
              
							this.value = curr.count
              console.log(this.value,this.item.fullName)
						}
					});
          
					if (!haveCurrent) {
						this.value = 0;
					}
				},
				deep: true,
				immediate:true
			}

		},
		data() {
			return {
				value: 0
			}
		},

		methods: {
			onChange(e) {
				this.item.count = e
				this.$emit('change', this.item);
			}
		},
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
		justify-content: flex-start;
		align-items: flex-start;
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
