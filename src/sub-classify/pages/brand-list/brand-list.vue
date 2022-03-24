<template>
	<view class="container">
		<custom-navbar
			:opacity="scrollTop>0?'1':'0'"
		  :bgcolor="scrollTop>0?'#101721':''"
		>
		  <!-- :opacity="scrollTop/100" -->
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

		<view v-if="scrollTop>100" style="width: 100%;height: 300rpx;"></view>
		<view v-else class="bgImg" :style="{backgroundImage:`url(${brandHeadBgImg})`}"></view>

		<view class="rankList-container" v-if="brandList.length">
			<view class="rankItem"
				v-for="item in brandList"
				:key="item.id"
				@click="gotoDetail(item)"
			>
				<image class="brandBgImg" v-if="item.id" src="../../static/image/brandItemBgImg.png" />
				<image class="brandBgImage" :src="item.brandBagImage"/>
				<image class="rankImage"  :src="item.brandLogoImage" />
				<view class="rankName" v-if="item.brandShortName">{{item.brandShortName}}</view>
				<view class="blankRankName" v-if="!item.brandShortName"></view>
			</view>
		</view>

		<view class="noData-container" v-if="!brandList.length || showNowifiStyle">
			<view class="noBrandData" v-if="!brandList.length">
				<image src="../../static/image/no_brandListData.png" />
				<view class="text">
					暂无相关品牌
				</view>
			</view>
			<view class="noBrandData" v-if="showNowifiStyle">
				<image src="../../static/image/brandPage_nowifi.png" />
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
				brandList:[{},{},{},{},{},{},{},{}],
				dataListLength:0,
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
		//页面上拉触底事件的处理函数
		onReachBottom(e) {
			console.log("底部")// 滚动到页面执行该方法
			if((this.query.page > this.query.totalPage) || this.dataListLength == 0 )
			this.reqRankList();
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
				getBrandHallList(params).then(res=>{
					if(res.code ==401){
						this.showNowifiStyle = true
					}else{
						console.log(res)
						this.dataListLength = res.list.length
						this.brandList = this.brandList.concat(res.list);
						this.query.page ++
						this.query.totalPage = res.totalPage
					}
				})
			},
			gotoDetail(item){
				console.log("brandItem==",item)
				uni.navigateTo({
					url:`./brand-detail?storeId=${item.id}`
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
		width: 100%;
		height: 536rpx;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		z-index: 1;
		// position: fixed;
	}
	.rankList-container{
		display: flex;
		flex-flow: row wrap;
		box-sizing: border-box;
		// padding-top: 412rpx;
		// margin-top: 134rpx;
		padding-left: 40rpx;
		background: #101721;
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
			border:0.5px solid #1A222F;
			.brandBgImg{
				position: absolute;
				top: -8rpx;
				left: -8rpx;
				width: 336rpx;
				height: 290rpx;
				border-radius: 24rpx;
			}
			.brandBgImage{
				position: absolute;
				top: 0;
				left: 0;
				width: 320rpx;
				height: 146rpx;
				background-color: #1A222F;
				border-radius: 24rpx 24rpx 0 0;
			}
			.rankImage{
				position: absolute;
				bottom: 70rpx;
				left: 118rpx;
				width: 84rpx;
				height: 84rpx;
				border-radius: 50%;
				background-color: #232D3A;
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
			.blankRankName{
				position: absolute;
				bottom: 20rpx;
				left:86rpx;
				width: 150rpx;
				height: 32rpx;
				background: #232D3A;
				border-radius: 8rpx;
			}
		}
	}
	.noData-container{
		.noBrandData{
			margin-top: 234rpx;
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
