<template>
	<view class="real-case-list">
		<scroll-view class="real-case-list-scroll" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll" @scrolltoupper='scrolltoupper'>
			<view class="list" v-for="item in list" :key='item.title'>
				<view class="head">
					<view class="title">
						<text>{{item.title}}</text>
						<view class="head-icon icon-alert_notice_jump" @click="goBack"></view>
					</view>
					<view class="info">
						<view class="pattern">
							{{item.leixing}}
						</view>
						<view class="line">

						</view>
						<view class="area">
							{{item.area}}
						</view>
						<view class="line">

						</view>
						<view class="preferential">
							{{item.huaxiao}}
						</view>
					</view>
					<view class="tag-box">
						<view class="tag" v-for="tag in item.tag" :key='tag.key'>
							{{tag.name}}
						</view>
					</view>
				</view>
				<view class="bottom">
					111
					<view class="addressAndSimilarity">
						<view class="near">
							附近2KM
						</view>
						<view class="point">
							
						</view>
						<view class="similarity">
							户型相似度
							<text>90%</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noEmit: false,
				scrollTop: 0,
				list: [{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					},
					{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					},
					{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					},
					{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					},
					{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					},
					{
						title: '念恩 Ta家',
						leixing: '3室2厅1厨',
						area: '201.2㎡',
						huaxiao: '装修花销：¥3243.00',
						tag: [{
								name: '现在简约',
								key: '1'
							},
							{
								name: '极简装饰',
								key: '2'
							},
						]
					}
				]
			}
		},
		methods: {
			scroll(e) {
				// this.old.scrollTop = e.target.scrollTop;
				if (e.target && e.target.scrollTop < 50) {
					this.$emit('scrollUpper')
				} else {
					this.$emit('triggerScroll')
				}
			},
			scrolltoupper(){
				this.$emit('scrollUpper')
			},
			scrollToTop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.real-case-list {
		// margin-top: 32rpx;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		padding-bottom: 80rpx;

		.real-case-list-scroll {
			height: 100%;
		}

		.list {
			padding: 0 32rpx 16rpx;

			.head {
				background: #FFFFFF;
				border: 0.5px solid #E8E8E8;
				box-sizing: border-box;
				padding: 32rpx 24rpx;
				border-radius: 16rpx 16rpx 0 0; 

				.title {
					display: flex;
					justify-content: space-between;
					font-weight: 500;
					font-size: 32rpx;
					line-height: 44rpx;
					color: #222222;
				}
				.head-icon{
					font-size: 20rpx;
				}
				.info {
					display: flex;
					align-items: center;
					margin: 4rpx 0 16rpx;

					.line {
						background: #D1D1D1;
						width: 2rpx;
						height: 20rpx;
						margin-right: 20rpx;
					}

					.pattern,
					.area {
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #999999;
						margin-right: 20rpx;
					}

					.preferential {
						font-size: 24rpx;
						line-height: 34rpx;
						color: #FF7F46;
					}
				}

				.tag-box {
					display: flex;
					align-items: center;

					.tag {
						margin-right: 16rpx;
						padding: 2rpx 16rpx 4rpx;
						font-size: 24rpx;
						line-height: 34rpx;
						text-align: center;
						color: #999999;
						background: #F6F6F6;
						border-radius: 6rpx;
					}
				}
			}

			.bottom {
				border-radius: 0px 0px 16rpx 16rpx;
				height: 364rpx;
				position: relative;
				.addressAndSimilarity{
					position: absolute;
					top: 24rpx;
					left: 24rpx;
					background: rgba(0, 0, 0, 0.45);
					backdrop-filter: blur(5px);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					padding: 8rpx 12rpx;
					font-weight: 500;
					font-size: 20rpx;
					line-height: 28rpx;
					color: #FFFFFF;
					.point{
						width: 4rpx;
						height: 4rpx;
						background: #FFFFFF;
						margin: 0 12rpx;
					}
					.similarity{
						text{
							margin-left: 4rpx;
						}
					}
				}
			}
			
			
		}
	}
</style>
