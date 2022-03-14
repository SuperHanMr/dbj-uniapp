<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
		  title="品牌详情"
		  bgcolor="#FFF"
		>
		  <template v-slot:back>
		    <view @click="toBack">
		      <i
		        class="icon-ic_cancel_white header-back"
		        style="color:white"
		      >
		      </i>
		    </view>
		  </template>
		</custom-navbar>
		<view class="baseInfo-contaienr">
			<view class="bgImg"></view>
			<view class="baseInfo">
				<image class="brandIcon" src="../../../static/home_owner.png" mode=""></image>
				<view class="brandInfo">
					<view class="brandName">
						芝华仕沙发
					</view>
					<view class="brand-slogan">
						CHEERS芝华仕沙发，把舒适、健康带回家健康带回家健康带回家健康带回家健康带回家健康带回家健康带回家健康带回家
					</view>
					<view class="brand-introduce">
						在国内，CHEERS芝华仕头等舱沙发拥有超过1900家专卖店，芝华仕沙发位居中国休闲沙发销量前列，2016年敏华在中国大陆功能沙发市场占有率达到近37.7%，深敏华在中国大陆功能沙发敏华在中陆功沙发ddddddd 
						<span>ddd</span>
						<image class="showMoreIcon" src="../../static/image/wechat_icon.png" />	
					</view>
				</view>
				<view class="brandAlbum">
					<view class="header" @click="openBrandExplain">
						品牌相册
					</view>
					<view class="scrollContaienr">
						<scroll-view scroll-x="true" style="white-space: nowrap;">
							<view class="itemStyle">
								<video src="https://1257297063.vod2.myqcloud.com/cc93f4acvodcq1257297063/2a750abf8602268010648813155/f0.mp4" controls></video>
							</view>
							<view class="itemStyle" v-for="ITEM in 4" :key="ITEM">
								<image  src="../../static/image/pay-bg.png" mode=""></image>
							</view>
							<view class="categoryIconContainer">
								
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<uni-popup ref="brandExplain" type="bottom" >
			<view
			:style="{paddingBottom:containerPaddingBottom}"
			style="z-index: 999;background-color: #FFFFFF;border-radius: 32rpx 32rpx 0 0;"
			>
				<view class="header-popup">
					<text>品牌介绍</text>
					<view class="close-popup" @click="closeBrandExplain">
						<i class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic close-icon-popup"></i>
					</view>
				</view>
				<scroll-view :scroll-y="true" class="toast-content">
					<view class="bankingComplain">
						CHEERS芝华仕是敏华控股（HK01999 [1]  ）旗下的家具品牌。包括CHEERS芝华仕头等舱沙发贵族系列、CHEERS芝华仕头等舱沙发时尚系列、CHEERS芝华仕沙发都市系列、CHEERS芝华仕5星床垫、CHEERS芝华仕智能床系列、CHEERS芝华仕沙发宜居布艺系列。 [2]  在国内，CHEERS芝华仕头等舱沙发拥有超过1900家专
						</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toBack(){
				uni.navigateBack({})
			},
			openBrandExplain(){
				this.$refs.brandExplain.open()
			},
			closeBrandExplain(){
				this.$refs.brandExplain.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
		.container{
			height: 100%;
		}
		.baseInfo-contaienr{
			// padding: 0;
			padding-top: 304rpx;
			position: relative;
			// background: #ffffff;
			height: 100%;
			overflow: scroll;
			.bgImg{
				position: absolute;
				background-image: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/designerRankBg.png?x-oss-process=image/resize,m_fill,h_382,w_750,limit_0");
				background-size: contain;
				width: 100%;
				height: 422rpx;
				top: 0;
				left: 0;
			}
			.baseInfo{
				position: relative;
				border-radius: 32rpx 32rpx 0 0;
				padding: 98rpx 32rpx 0;
				background-color: #ffffff;
				.brandIcon{
					position: absolute;
					top: -74rpx;
					left: 32rpx;
					width: 148rpx;
					height: 148rpx;
					border-radius: 50%;
				}
				.brandInfo{
					display: flex;
					align-items: flex-start;
					flex-flow: column nowrap;
					margin-bottom: 50rpx;
					.brandName{
						width: 100%;
						height: 58rpx;
						line-height: 58rpx;
						color: #222222;
						font-size: 42rpx;
						font-weight: 500;
						letter-spacing: 1rpx;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					.brand-slogan{
						width: 100%;
						margin-top: 8rpx;
						height: 36rpx;
						line-height: 36rpx;
						color: #333333;
						font-size: 26rpx;
						letter-spacing: 1rpx;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					.brand-introduce{
						margin-top: 10rpx;
						color: #999999;
						font-size: 22rpx;
						line-height: 36rpx;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						position: relative;
						.showMoreIcon{
							position: absolute;
							right: -18rpx;
							bottom: 0;
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
				.brandAlbum{
					.header{
						color: #333333;
						font-weight: 500;
						font-size: 32rpx;
						height: 44rpx;
						line-height: 44rpx;
						margin-bottom: 32rpx;
					}
					.scrollContaienr{
						height: 376rpx;
						background-color: pink;
						.itemStyle{
							display: inline-block;
							width: 668rpx;
							height: 376rpx;
							border-radius: 16rpx;
							margin-right: 16rpx;
							image,video{
								width: 668rpx;
								height: 376rpx;
								border-radius: 16rpx;
							}
						}
					}
				}
			}
		}
		
		.header-popup {
			width: 750rpx;
			height: 102rpx;
			background: #FFFFFF;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #111111;
			font-weight: bold;
			font-size: 32rpx;
		
		}
		.close-popup {
			position: absolute;
			top: 12rpx;
			right: 16rpx;
			width: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.close {
			position: absolute;
			width: 80rpx;
			height: 80rpx;
			top: 14rpx;
			right: 14rpx;
			// background-image: url("../../static/images/close.png");
			background-size: contain;
		}
		.toast-content {
			max-height: 1000rpx;
			overflow: auto;
			box-sizing: border-box;
			padding: 0 32rpx 38rpx;
			background-color: #FFFFFF;
		}
		 .bankingComplain{
			text-align: justify;
			color: #999999;
			margin-bottom: 10rpx;
			line-height: 44rpx;
			// text-indent: 52rpx;
			font-size: 26rpx;
			letter-spacing: 1rpx;
		}
		
</style>
