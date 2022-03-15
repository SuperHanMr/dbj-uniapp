<template>
	<view class="container">
		<view class="classify-shop">
			<view class="list" v-for="item in classList" :key="item.title" @click="classHandler">
				<image :src="item.url" class="list-img"></image>
				<view class="list-title">
					{{ item.title }}
				</view>
			</view>
		</view>
		<view class="recommended">
			<view class="img-box" v-for="item in recommendedList" :key="item" @click="recommendedHandler">
				<image :src="item" mode="" class="img"></image>
			</view>
		</view>
		<view class="brand">
			<view class="top">
				<view class="top-bg">

				</view>
				<view class="left">
					<image src="/static/images/classify-brand-text.png" mode="" class="img"></image>
				</view>
				<view class="right" @click="brandHandler">
					<view class="brand-title">
						全部品牌 (13)
					</view>
					<view class="brand-icon icon-alert_notice_jump">
					</view>
				</view>
			</view>
			<view class="bottom">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" @scrolltolower="scrolltolowerHandler">
					<view class="box">
						<view class="brand-item-box" v-for="item in brandList" :key="item.title" @click="brandItemHandler">
							<view class="item-box" v-if="item.key !== 'all'">
								<image :src="item.url" mode="" class="brand-item-img"></image>
								<image :src="item.icon" mode="" class="brand-item-icon"></image>
								<view class="brand-item-title">
									{{item.title}}
								</view>
							</view>
							<view class="item-all" v-else>
								左滑查看更多
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classList: [{
						url: '',
						title: '全屋定制'
					},
					{
						url: '',
						title: '家装建材'
					},
					{
						url: '',
						title: '成品家具'
					},
					{
						url: '',
						title: '软装配饰'
					},
					{
						url: '',
						title: '全部分类'
					}
				],
				recommendedList: [
					"", ""
				],
				brandList: [
					{
						url: '',
						icon: '',
						title: 'TATA木门'
					},
					{
						url: '',
						icon: '',
						title: '林氏木业'
					},
					{
						url: '',
						icon: '',
						title: 'TATA木门1'
					},
					{
						url: '',
						icon: '',
						title: 'TATA木门2'
					},
					{
						url: '',
						icon: '',
						title: 'TATA木门2',
						key: 'all'
					}
				]
			}
		},
		methods:{
			scrolltolowerHandler(){
				console.log(111111111)
			},
			classHandler(){
				console.log('分类点击事件')
			},
			recommendedHandler(){
				console.log('推荐点击事件')
			},
			brandHandler(){
				console.log('跳转品牌页')
			},
			brandItemHandler(){
				console.log('跳转对应品牌页面')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classify-shop {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.list-img {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 12rpx;
		}

		.list-title {
			font-weight: 400;
			font-size: 24rpx;
			text-align: center;
			letter-spacing: 0.1px;
			color: #333333;
		}
	}

	.recommended {
		margin-top: 54rpx;
		display: flex;
		justify-content: space-between;

		.img-box {
			width: 333rpx;
			height: 152rpx;

			.img {
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
				background: red;
			}
		}
	}

	.brand {
		height: 342rpx;
		margin-top: 20rpx;
		border: 0.5px solid #FCF2FF;
		box-sizing: border-box;
		border-radius: 16rpx;
		background: linear-gradient(177.52deg, #FCFAFF 2.21%, #FFFEFF 98.1%);

		.top {
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			position: relative;

			.top-bg {
				position: absolute;
				top: 0;
				right: 176rpx;
				background-image: url(../../../../static/images/classify-brand-bg.png);
				background-repeat: no-repeat;
				background-size: 100%;
				width: 312rpx;
				height: 88rpx;
			}

			.left {
				width: 138rpx;
				height: 50rpx;
				margin: 12rpx 0 0 14rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				display: flex;
				align-items: center;
				margin-right: 24rpx;

				.brand-title {
					font-weight: 400;
					font-size: 24rpx;
					text-align: right;
					letter-spacing: 0.1px;

					color: #333333;
				}

				.brand-icon {
					margin-left: 4rpx;
					font-size: 20rpx;
				}
			}
		}
		
		.bottom{
			.scroll-view_H{
				width: 100%;
				.box{
					display: flex;
					padding-left: 28rpx;
				}
			}
			.brand-item-box{
				position: relative;
				margin-right: 20rpx;
			}
			.item-all{
				background: #F4F3F4;
				padding: 24rpx 20rpx;
				font-weight: 400;
				font-size: 22rpx;
				text-align: center;
				color: #666666;
				border-radius: 16rpx 0 0 16rpx;
			}
			.brand-item-img{
				width: 236rpx;
				height: 114rpx;
				border-radius: 12rpx 12rpx 0px 0px;
			}
			.brand-item-icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				position: absolute;
				left: 78rpx;
				top: 74rpx;
				background: red;
			}
			.brand-item-title{
				width: 100%;
				height: 104rpx;
				padding-top: 52rpx;
				font-weight: 500;
				font-size: 24rpx;
				text-align: center;
				letter-spacing: 0.1px;
				color: #333333;
				background: #FFFFFF;
				border: 0.5px solid #EBEBEB;
				box-sizing: border-box;
				border-radius: 0 0 12rpx 12rpx;
			}
		}
	}
</style>
