<template>
	<view class="content">
		<view class="row" v-for="(item ,index) in list " :key="index" @click="toDetail(item)">
			<view>
				<view class="title">{{item.creatorName}}申请要货</view>
				<view class="time">
					{{item.createTime |formatDate}}
				</view>
			</view>
			<view class="state">
				<view v-if="item.customerStatus==0" style="color: #FE9000">
					{{item.customerStatusName}}
				</view>
				<view v-if="item.customerStatus==1" style="color: #FE9000">
					{{item.customerStatusName}}
				</view>
				<view v-if="item.customerStatus==2" style="color: #FF3347">
					{{item.customerStatusName}}
				</view>
				<view v-if="item.customerStatus==3" style="color: #00BFB6">
					{{item.customerStatusName}}
				</view>
				<view v-if="item.customerStatus==4" style="color: #BFBFBF">
					{{item.customerStatusName}}
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		requireList
	} from '../../../api/decorate.js'
	import {
		formatDate
	} from '../../../utils/common.js'
	export default {
		filters: {
			formatDate
		},
		data() {
			return {
				projectId: '',
				list: [
				]
			}
		},
		onLoad(e) {
			this.projectId = e.projectId;
			this.getList();
		},
		methods: {
			getList() {
				let params = {
					rows: 9999,
					projectId: this.projectId
				};
				requireList(params).then(e => {
					this.list = e
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: `../require-detail/require-detail?id=${item.id}`
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
