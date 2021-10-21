<template>
	<view>

		<view class="res">
			<view class="res-title">要货状态</view>
			<view class="res-content">
				<text v-if="res.status==0" style="color: #FE9000">
					{{res.statusName}}
				</text>
				<text v-if="res.status==1" style="color: #FE9000">
					{{res.statusName}}
				</text>
				<text v-if="res.status==2" style="color: #FF3347">
					{{res.statusName}}
				</text>
				<text v-if="res.status==3" style="color: #00BFB6">
					{{res.statusName}}
				</text>
				<text v-if="res.status==4" style="color: #BFBFBF">
					{{res.statusName}}
				</text>
			</view>
		</view>
		<view v-if="res.refuseReason" class="res">
			<view class="res-title">驳回原因</view>
			<view class="res-content">
				{{res.refuseReason}}
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货单状态</view>
			<view class="res-content">
				待收货
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货单号</view>
			<view class="res-content">
				{{res.requireNo}}
			</view>
		</view>
		<view class="res">
			<view class="res-title">要货时间</view>
			<view class="res-content">
				{{res.createTime |formatDate}}
			</view>
		</view>


		<view v-for="(item,index) in res.details" :key="index" class="store">
			<!-- 	<view class="header">
				{{item.title}}
			</view> -->
			<view class="items">
				<image class="img" :src="item.imgUrl"></image>
				<view class="content">
					<view class="title">
						{{item.fullName}}
					</view>
					<view class="sub-title">
						本次要货:{{item.requireNumber}}{{item.unit}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requireListDetail
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
				id: '',
				list: [],
				res: {}
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				requireListDetail({
					id: this.id
				}).then(e => {
					this.res = e
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.res {
		background-color: #FFF;
		display: flex;
		padding: 16rpx 32rpx;

		.res-title {
			width: 220rpx;
			color: #666666;
			font-size: 28rpx;
		}

		.res-content {
			flex: 1;
			color: #333333;
			font-size: 28rpx;
		}
	}


	.store {
		padding: 0 32rpx;
		background-color: #FFF;
		margin-top: 16rpx;

		.items {
			display: flex;
			padding: 32rpx 0;
			border-bottom: 1rpx solid #f2f2f2;

			.img {
				width: 192rpx;
				height: 192rpx;
				border: 1rpx solid #f4f4f4;
				border-radius: 8rpx;
				background-color: yellow;
			}

			.content {
				flex: 1;
				margin-left: 24rpx;

				.title {
					color: #333333;
					font-size: 28rpx;
					white-space: normal;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
				}

				.sub-title {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}
		}

		.header {
			width: 100%;
			height: 74rpx;
			display: flex;
			align-items: flex-end;
			color: #333333;
			font-size: 28rpx;
			font-weight: 500;

		}
	}
</style>
