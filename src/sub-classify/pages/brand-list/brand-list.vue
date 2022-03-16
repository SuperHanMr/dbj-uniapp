<template>
	<view class="contaienr">
		<custom-navbar
		  :opacity="scrollTop/100"
		  bgcolor=""
		>
		  <template v-slot:back>
		    <view @click="toBack" style="display: flex;flex-flow: row; align-items: center;">
		      <i
		        class="icon-ic_cancel_white header-back"
		        style="color:white"
		      >
		      </i>
					<image class="smallBrandText" v-if=" scrollTop >0" src="../../static/image/bgBrandName.png" mode=""></image>
		    </view>
		  </template>
		</custom-navbar>
		
		<view class="bgImg"  :style="{backgroundImage:`url(${brandHeadBgImg})`,height:scrollTop >0?'192rpx':'326rpx'}">
			<view class="brandTextContainer" v-if="scrollTop<=0">
				<image src="../../static/image/bgBrandName.png" mode=""></image>
				<view class="line"></view>
			</view>
		</view>
		
		
		<view class="rankList-container">
			<view class="rankItem" 
				v-for="item in brandList" 
				:key="item.key" 
				:style="{backgroundImage:`url(${headerBgImg})`,backgroundSize:'320rpx 146rpx',backgroundPosition:'top center',backgroundRepeat:'no-repeat'}"
			>
			<image class="brandBgImg"  src="../../static/image/brandItemBgImg.png" mode=""></image>
				<image class="rankImage" src="../../../static/images/no-goods.png" mode=""></image>
				<view class="rankName">{{item.brandName}}</view>
			</view>
		</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop:0,
				brandHeadBgImg:"../../static/image/brandHeadBg.png",
				bgImg:"../../static/image/brandItemBgImg.png",
				headerBgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/designerRankBg.png",
				brandList:[
					{
						brandName:"TATA木门",
						key:1,
					},
					{
						brandName:"索菲亚家具",
						key:2,
					},
					{
						brandName:"芝华仕家具",
						key:3,
					},
					{
						brandName:"林氏木业",
						key:4,
					},
					{
						brandName:"TATA木门",
						key:6,
					},
					{
						brandName:"索菲亚家具",
						key:7
					},
					{
						brandName:"芝华仕家具",
						key:8,
					},
					{
						brandName:"林氏木业",
						key:9,
					},
					{
						brandName:"TATA木门",
						key:10,
					},
					{
						brandName:"立邦油漆",
						key:11,
					},
					{
						brandName:"老板电器",
						key:12,
					},

				]
			}
		},
		onPageScroll(scrollTop){
			this.scrollTop = scrollTop.scrollTop
		},
		onLoad() {
			this.reqRankList()
			uni.setNavigationBarColor({
			  frontColor: "#ffffff",
			  backgroundColor: "#ff0000",
			  animation: {
			    duration: 400,
			    timingFunc: "easeIn",
			  },
			});
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
	.smallBrandText{
		width: 116rpx;
		height: 38rpx;
		margin-left: 236rpx;
	}
	.container{
		height: 100%;
		background: #fff;
		position: relative;
	}
	.bgImg{
		// height: 326rpx;
		width: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		position: fixed;
		display: flex;
		z-index: 1;
		flex-direction: row;
		align-items: flex-end;
		justify-content:center;
		.brandTextContainer{
			margin-bottom: 40rpx;
			display: flex;
			align-items: center;
			flex-flow: column;
			image{
				width: 174rpx;
				height: 56rpx;
				margin-bottom: 18rpx;
			}
			.line{
				width: 192rpx;
				height: 2rpx;
				background: radial-gradient(50% 460800% at 50% 49.99%, #6087C0 0%, #221F2C 100%);
			}
		}
	}
	.rankList-container{
		display: flex;
		flex-flow: row wrap;
		box-sizing: border-box;
		padding-top: 326rpx;
		// margin-top: 134rpx;
		padding-left: 40rpx;
		background: #101721 ;
		.rankItem{
			width: 320rpx;
			height: 238rpx;
			margin-bottom: 52rpx;
			border-radius: 24rpx;
			margin-right: 30rpx;
			position: relative;
			background: #101721;
			.brandBgImg{
				position: absolute;
				top: -8rpx;
				left: -8rpx;
				width: 336rpx;
				height: 290rpx;
				border-radius: 24rpx;
			}
			.rankImage{
				position: absolute;
				bottom: 70rpx;
				left: 118rpx;
				width: 84rpx;
				height: 84rpx;
				border-radius: 50%;
			}
			.rankName{
				position: absolute;
				bottom: 20rpx;
				left:0;
				width: 320rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				font-size: 26rpx;
				letter-spacing: 1rpx;
				color: #ffffff;
			}
		}
	}

</style>
