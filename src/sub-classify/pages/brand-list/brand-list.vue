<template>
	<view class="contaienr">
		<custom-navbar
		  :opacity="scrollTop/100"
		  title="品牌馆"
		  bgcolor=""
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
		<view class="bgImg" :style="{backgroundImage:`url(${headerBgImg})`}">
		</view>
		
		<view class="rankList-container">
			<view class="rankItem" v-for="item in 20" >
				<image class="rankImage" src="../../../static/images/no-goods.png" mode=""></image>
				<view class="rankName">索菲亚家具</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headerBgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/designerRankBg.png?x-oss-process=image/resize,m_fill,h_382,w_750,limit_0",
			}
		},
		onLoad() {
			this.reqRankList()
		},
		methods: {
			toBack(){
				uni.navigateBack({})
			},
			reqRankList(){
				
			},
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		height: 100%;
		background: #fff;
		position: relative;
	}
	.bgImg{
		height: 382rpx;
		width: 750rpx;
		background-size: contain;
		position: fixed;
		z-index: 8;
		top: 0;
		left: 0;
	}
	.rankList-container{
		display: flex;
		flex-flow: row wrap;
		box-sizing: border-box;
		padding: 400rpx 0 24rpx 40rpx;
		height: 100%;
		background: linear-gradient(180.26deg, #0F1211 4.86%, rgba(24, 40, 77, 0.72) 64.62%, #101212 99.77%);
		.rankItem{
			width: 320rpx;
			height: 238rpx;
			margin-bottom: 52rpx;
			background: linear-gradient(180deg, rgba(29, 50, 95, 0) 48.23%, rgba(57, 142, 221, 0.1) 100.11%);
			box-shadow: 0rpx 2rpx 8rpx rgba(3, 11, 32, 0.31);
			border-radius: 24rpx;
			display: flex;
			align-items: center;
			flex-flow: column nowrap;
			margin-right: 30rpx;
			.rankImage{
				width: 84rpx;
				height: 84rpx;
				border-radius: 50%;
				margin: 84rpx auto 14rpx;
			}
			.rankName{
				height: 36rpx;
				line-height: 36rpx;
				font-size: 26rpx;
				letter-spacing: 1rpx;
				color: #ffffff;
			}
		}
	}
		
</style>
