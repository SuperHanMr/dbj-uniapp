<template>
	<view class="peer-evaluate-page">
		<view class="evaluate-head">共5位同行评价了Ta</view>
		<view class="evaluate-list">
			<view class="evaluate-item" v-for="(item,index) in evaluate.list" :key="index" >
				<view class="evaluate-person-info">
					<image src="" mode="aspectFit"></image>
					<view class="right">
						<text class="name">设计师刘金鸿</text>
						<text class="leve">高级设计师</text>
					</view>
				</view>
				<view class="evaluate-tag">
					<view>
						设计水平高
					</view>
				</view>
				<view class="evaluate-content">
					这个设计师挺牛逼的，反正我觉得挺牛逼的这个设计师挺牛逼的，反正我觉得挺牛逼的这个设计师挺牛逼的，反正我觉得挺牛逼的这个设计师挺牛逼的，反正我觉得挺牛逼的这个设计师挺牛逼的，反正我觉得挺牛逼的这个设计师挺牛逼的，反正我觉得挺牛逼的
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		formatDate
	} from "@/utils/common.js"
	import {
		getComments
	} from '@/api/decorate.js'
	export default {
		components: {},
		data() {
			return {
				personId: 0,
				evaluate: {
					list: []
				},
				pageInfo: {
					page: 1,
					totalPage: 0,
					totalRow: 0
				},
				totalNum: 0
			}
		},
		onLoad(e) {
			this.personId = e.id
		},
		mounted() {
			this.getComments()
		},
		methods: {
			getComments() {
				let params = {
					userId: this.personId,
					page: this.pageInfo.page,
					rows: 10
				}
				getComments(params).then(data => {
					if (data) {
						this.totalNum = data.aggregations
						data.list.map(item => {
							item.createTime = formatDate(item.createTime, 'YYYY-MM-DD')
						})
						this.evaluate.list = this.evaluate.list.concat(data.list)
						this.pageInfo.totalPage = data.totalPage
						this.pageInfo.totalRow = data.totalRows
					}
				})
			},
			bindscrolltolower() {
				if (this.pageInfo.totalPage > this.pageInfo.page) {
					this.pageInfo.page++
					this.getComments()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.peer-evaluate-page {
		background-color: #fff;
		padding: 32rpx 32rpx 0 32rpx;
		height: 100%;
		padding-bottom: 88rpx;
		.evaluate-head {
			padding-left: 32rpx;
			height: 88rpx;
			line-height: 88rpx;
			box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
			border-radius: 12rpx;
			border: 0.5px solid #E5E5E5;
			background-color: #fff;
		}
		.evaluate-list{
			padding-top: 88rpx;
			.evaluate-item{
				margin-top: 24rpx;
				padding-bottom: 32rpx;
				border-bottom: 1rpx solid #F4F4F4;
				.evaluate-person-info{
					display: flex;
					align-items: center;
					height: 84rpx;
					
					image{
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}
					.right{
						display: flex;
						flex-direction: column;
						margin-left: 24rpx;
						.name{
							
							font-family: PingFang SC;
							font-style: normal;
							font-weight: normal;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #666666;
						}
						
						.leve{
							height: 30rpx;
							line-height: 30rpx;
							font-size: 20rpx;
							width: 100rpx;
							color: #4FBEED;
							background: rgba(79, 190, 237, 0.06);
							border-radius: 4rpx;
							padding: 0 4rpx;
						
						}
						
					}
				}
				.evaluate-tag{
					margin-top: 26rpx;
					display: flex;
					view{
						height: 34rpx;
						padding: 0 12rpx;
						background: #F3F3F3;
						border-radius: 6rpx;
						font-family: PingFang SC;
						font-style: normal;
						font-weight: normal;
						line-height: 34rpx;
						font-size: 22rpx;
						color: #333333;
					}
				}
				
				.evaluate-content{
					margin-top: 18rpx;
					font-family: PingFang SC;
					font-style: normal;
					font-weight: normal;
					font-size: 28rpx;
					line-height: 44rpx;
					letter-spacing: 0.2rpx;
					color: #333333;
				}
				
				
			}
		}
		
	}
</style>
