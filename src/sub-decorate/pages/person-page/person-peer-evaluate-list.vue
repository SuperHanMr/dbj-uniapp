<template>
	<view class="peer-evaluate-page">
		<view class="evaluate-head-bac">
			<view class="evaluate-head">共获得{{showCommentCount}}次同行的评价</view>
		</view>
		<view class="evaluate-list">
			<view class="evaluate-item" v-for="(item,index) in peerCommentsList" :key="index">
			
				<view class="evaluate-person-info">
					<image :src="item.avatar" />
					<view class="right">
						<text class="name">{{item.userName}}</text>
						<view class="design-tag-info">
							<text class="design-leve">{{item.roleName}}</text>
							<view class="design-tag" v-if="item.valueRank>=1">
								<view class="topNum">TOP.{{item.valueRank}}</view>
								<view class="tagText">最具价值</view >
							</view>
						</view>
					</view>
				</view>
				<view class="evaluate-tag" v-if="item.commentTags.length">
					<view v-for="tageItem in item.commentTags" :key="tageItem">{{tageItem}}</view>
				</view>
				<view class="evaluate-content">{{item.content}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {getPeerComments} from "../../../api/decorate.js"
	export default {
		data() {
			return {
				personId: 0,
				showCommentCount:"",
				peerCommentsList:[],
				pageInfo: {
					page: 1,
					totalPage: 0,
					totalRow: 0,
				},
				totalNum: 0,
			}
		},
		onLoad() {
			this.personId = e.id
			this.getComments()
		},


		onReachBottom() {
			if (this.pageInfo.totalPage > this.pageInfo.page) {
				this.pageInfo.page++
				this.getComments()
			}
		},

		methods: {
			getComments() {
				let params = {
					// userId: 8218,
					userId: this.personId,
					page: this.pageInfo.page,
					rows: 10,
				}
				getPeerComments(params).then(res => {
					console.log("res=====",res)
					this.peerCommentsList = res.list
					this.peerCommentsList  = this.peerCommentsList.map(item=>{
						item.commentTags = item.commentTags.split(",")
						return item
					})
					this.showCommentCount = res.aggregations.showCommentCount
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
	.peer-evaluate-page {
		background-color: #fff;
		padding: 32rpx 32rpx 0 32rpx;
		height: 100%;

		.evaluate-head-bac {
			position: fixed;
			top: 0;
			width: calc(100% - 64rpx);
			background-color: #FFFFFF;
			padding: 32rpx 0;

			.evaluate-head {
				padding-left: 32rpx;
				height: 88rpx;
				line-height: 88rpx;
				color: #222222;
				font-size: 32rpx;
				font-weight: bold;
				box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
				border-radius: 12rpx;
				border: 1rpx solid #E5E5E5;
				background-color: #fff;
				letter-spacing: 2rpx;
			}
		}

		.evaluate-list {
			padding-top: 88rpx;
			.evaluate-item {
				margin-top: 24rpx;
				padding-bottom: 32rpx;
				border-bottom: 1rpx solid #F4F4F4;

				.evaluate-person-info {
					display: flex;
					align-items: center;
					height: 84rpx;

					image {
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}

					.right {
						display: flex;
						flex-direction: column;
						margin-left: 24rpx;

						.name {
							font-family: PingFang SC;
							font-style: normal;
							font-weight: normal;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #666666;
						}
						.design-tag-info {
							margin-top: 6rpx;
							display: flex;
							.design-leve {
								height: 30rpx;
								line-height: 30rpx;
								box-sizing: border-box;
								font-size: 20rpx;
								color: #4FBEED;
								background: rgba(79, 190, 237, 0.06);
								border-radius: 4rpx;
								padding: 0 8rpx 2rpx;
							}

							.design-tag {
								margin-left: 12rpx;
								display: flex;
								// height: 30rpx;
								// line-height: 30rpx;
								background: linear-gradient(180deg, #FFEBCC 0%, #FFE5B7 100%);
								.topNum {
									height: 28rpx;
									line-height: 28rpx;
									padding: 0 8rpx 4rpx;
									border-radius: 4rpx 0 0 4rpx;
									font-size: 20rpx;
									font-weight: bold;
									color: #865e41;
								}
								.tagText {
									height: 28rpx;
									line-height: 28rpx;
									padding: 0 8rpx 4rpx;
									border-radius:0 4rpx 4rpx 0;
									background: linear-gradient(180deg, #FFDFA8 0%, #EFC988 100%);
									font-size: 20rpx;
									font-weight: 500;
									color: #865e41;
								}
							}
						}
					}
				}

				.evaluate-tag {
					margin-top: 26rpx;
					display: flex;
					align-items: center;
					flex-flow: row wrap;
					flex: 1;
					view {
						height: 34rpx;
						line-height: 33rpx;
						padding: 0 12rpx;
						background: #F3F3F3;
						border-radius: 6rpx;
						border: 0.6rpx solid #CCCCCC;
						font-family: PingFang SC;
						font-style: normal;
						font-weight: normal;
						font-size: 22rpx;
						color: #333333;
						margin:0 12rpx 12rpx 0 ;
					}
				}

				.evaluate-content {
					margin-top: 4rpx;
					font-family: PingFang SC;
					font-size: 28rpx;
					line-height: 44rpx;
					letter-spacing: 0.2rpx;
					color: #333333;
				}


			}
		}

	}
</style>
