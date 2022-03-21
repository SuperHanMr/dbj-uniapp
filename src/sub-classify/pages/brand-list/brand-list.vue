<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
		  bgcolor=""
		>
		  <template v-slot:back>
		    <view @click="toBack" style="display: flex;flex-flow: row; align-items: center;position: relative;">
		      <i
		        class="icon-ic_cancel_white header-back"
		        style="color:white"
		      >
		      </i>
					<image class="smallBrandText" v-if=" scrollTop >0" src="../../static/image/bgBrandName.png" mode=""></image>
					<view class="brandTextContainer" v-if="scrollTop<=0">
						<image src="../../static/image/bgBrandName.png" mode=""></image>
						<view class="line"></view>
					</view>
				</view>
		  </template>
		</custom-navbar>

		<view class="bgImg"  :style="{backgroundImage:`url(${brandHeadBgImg})`,height:scrollTop >0?'192rpx':'536rpx'}">
			<!-- <view class="brandTextContainer" v-if="scrollTop<=0">
				<image src="../../static/image/bgBrandName.png" mode=""></image>
				<view class="line"></view>
			</view> -->
		</view>


		<view class="rankList-container" v-if="brandList.length">
			<view class="rankItem"
				v-for="item in brandList"
				:key="item.key"
				:style="{backgroundImage:`url(${headerBgImg})`,backgroundSize:'320rpx 146rpx',backgroundPosition:'top center',backgroundRepeat:'no-repeat'}"
				@click="gotoDetail(item)"
			>
				<image class="brandBgImg"  src="../../static/image/brandItemBgImg.png" />
				<image class="rankImage" src="../../../static/images/no-goods.png" />
				<view class="rankName">{{item.brandName}}</view>
			</view>

			<!-- <view class="rankItem"
				v-for="item in brandList"
				:key="item.id"
				:style="{backgroundImage:`url(${item.brandBagImage})`}"
				@click="gotoDetail(item)"
			>
				<image class="brandBgImg"  src="../../static/image/brandItemBgImg.png" />
				<image class="rankImage" :src="item.brandLogoImage" />
				<view class="rankName">{{item.brandShortName}}</view>
			</view> -->

		</view>

		<view class="noData-container" v-if="!brandList.length || showNowifiStyle">
			<view class="noBrandData" v-if="!brandList.length">
				<image src="../../static/image/no_brandListData.png" mode=""></image>
				<view class="text">
					暂无相关品牌
				</view>
			</view>
			<view class="noBrandData" v-if="showNowifiStyle">
				<image src="../../static/image/brandPage_nowifi.png" mode=""></image>
				<view class="text">
					暂无网络
				</view>
				<view class="refreshText">
					网络环境较差请点击刷新一下~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBrandHallList,
	}from "@/api/classify.js"
	export default {
		data() {
			return {
				scrollTop:0,
				brandHeadBgImg:"../../static/image/brandHeadBg.png",
				bgImg:"../../static/image/brandItemBgImg.png",
				headerBgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/designerRankBg.png",
				query:{
					page:1,
					rows:10,
					totalPage:1,
					positon:"",
				},
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
				],
				// brandList:[],
				showNowifiStyle:false,
			}
		},
		onPageScroll(scrollTop){
			this.scrollTop = scrollTop.scrollTop
		},
		onLoad() {
			uni.setNavigationBarColor({
			  frontColor: "#ffffff",
			  backgroundColor: "#ff0000",
			  animation: {
			    duration: 400,
			    timingFunc: "easeIn",
			  },
			});
		},
		onShow() {
			this.reqRankList()
		},

		methods: {
			toBack(){
				uni.navigateBack({})
			},
			reqRankList(){
				let params={
					page:this.query.page,
					rows:this.query.rows,
					// position:this.query.positon,
				}
				// getBrandHallList(params).then(res=>{
				// 	if(res.code ==401){
				// 		this.showNowifiStyle = true
				// 	}else{
				// 		console.log(res)
				// 		this.brandList =res.list
				// 		this.page++
				// 	}
				// })
			},
			gotoDetail(item){
				console.log("brandItem==",item)
				uni.navigateTo({
					url:"./brand-detail"
				})
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
		background: #101721;
		position: relative;
	}
	.brandTextContainer{
		position: absolute;
		top: 76rpx;
		left: 34rpx;
		// margin-bottom: 40rpx;
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
	}
	.rankList-container{
		display: flex;
		flex-flow: row wrap;
		box-sizing: border-box;
		padding-top: 412rpx;
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
			background-size: 320rpx 146rpx;
			background-repeat:no-repeat;
			background-position:top center;
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
	.noData-container{
		padding-top: 326rpx;
		.noBrandData{
			margin-top: 268rpx;
			padding: 0 auto;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			image{
				width: 400rpx;
				height: 400rpx;
			}
			.text{
				height: 34rpx;
				line-height: 34rpx;
				font-size: 24rpx;
				color: #CBCCCC;
			}
			.refreshText{
				margin-top: 8rpx;
				font-size: 24rpx;
				color: #ffffff;
				opacity: 0.4;
				height: 34rpx;
				line-height: 34rpx;
			}

		}

	}

</style>
