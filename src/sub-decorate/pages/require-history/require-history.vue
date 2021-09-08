<template>
	<view class="content">
		<view class="row" v-for="(item ,index) in list " :key="index" @click="toDetail">
			<view>
				<view class="title">{{item.title}}</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
			<view class="state">
				<view v-if="item.state==1" style="color: #FE9000">
					等待发货
				</view>
				<view v-if="item.state==2" style="color: #FF3347">
					供应商驳回
				</view>
				<view v-if="item.state==3" style="color: #00BFB6">
					待收货
				</view>
				<view v-if="item.state==4" style="color: #BFBFBF">
					已收货
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				list: [{
						title: '刘晋宏要货申请',
						time: '2021-07-23 12:33',
						state: 1
					},
					{
						title: '刘晋宏要货申请',
						time: '2021-07-23 12:33',
						state: 2
					},
					{
						title: '刘晋宏要货申请',
						time: '2021-07-23 12:33',
						state: 3
					},
					{
						title: '刘晋宏要货申请',
						time: '2021-07-23 12:33',
						state: 4
					}
				]

			}
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url:'../require-detail/require-detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FFFF;
		padding: 0 32rpx;

		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f4f4f4;
			height: 120rpx;

			.title {
				font-size: 28rpx;
				color: #333333;

			}

			.time {
				font-size: 24rpx;
				color: #999999;

			}

			.state {
				font-weight: 500;
				font-size: 32rpx;

			}
		}
	}
</style>
