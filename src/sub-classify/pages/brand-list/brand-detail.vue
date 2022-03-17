<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
		  title="品牌名称"
		  bgcolor="#FFF"
		>
		  <template v-slot:back>
		    <view @click="toBack">
		      <i
						class="icon-ic_cancel_white header-back"
		        :style="{color:scrollTop>0?'black':'white'}"
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
								<video
									:autoplay="true"
									:controls="true"
									:show-fullscreen-btn="bottom"
									:object-fit="fill"
									src="https://ali-video-test.dabanjia.com/video/20220225/17/1645781404867_5025%24%E8%A7%86%E9%A2%91.mp4"
								></video>
							</view>
							<view class="itemStyle" v-for="ITEM in 4" :key="ITEM">
								<image  src="../../static/image/pay-bg.png" mode=""></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

			<view class="productContainer">
				<view class="title">
					<text class="name">品牌商品</text>
					<view class="allProduct">
						<text>全部商品</text>
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode=""></image>
					</view>
				</view>
				<view class="checkBox">
					<view class="checkItem"
						v-for="(labelItem,labelKey) in checkList"
						:key="labelKey"
						:style="{color:labelItem.checked?'#fff':'#999',
						background:labelItem.checked?'#222':'#F7F7F7'}"
						@click="chooseAttr(labelItem,labelItem.key)"
					>
						{{labelItem.name}}
					</view>
				</view>
				<!-- <shop-list :shopList="shopList"></shop-list> -->
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
	import {
		getBrandDetail,
		getBrandProductList,
	  getHomeGoodsList
	} from "@/api/classify.js";
	import ShopList from '@/components/classify-shop/shop-list.vue';

	var query = {};
	export default {
		components: {
			ShopList,
		},
		data() {
			return {
				opacityNum: 0,
				scrollTop:0,
				productTop:0,
				triggered:false,
				shopList:[],
				query:{
					page:1,
					row:10,
					totalPage:0
				},
				areaId: 43,
				checkList:[
					{
						name:	"中式",
						key:1,
						checked:true,
					},
					{
						name:	"欧式",
						key:2,
						checked:false,
					},
					{
						name:	"田园",
						key:3,
						checked:false,
					},
					{
						name:	"这是风格标签",
						key:4,
						checked:false,
					},
					{
						name:	"风格啊",
						key:5,
						checked:false,
					},
					{
						name:	"风格啊",
						key:6,
						checked:false,
					},
					{
						name:	"这是自定义标签",
						key:7,
						checked:false,
					},
					{
						name:	"这是样式标签",
						key:8,
						checked:false,
					},
					{
						name:	"样式标签啊",
						key:9,
						checked:false,
					},
					{
						name:	"随意写的一个标签",
						key:10,
						checked:false,
					},
				],
			}
		},
		onPageScroll(scrollTop) {
		  this.scrollTop = scrollTop.scrollTop;
			console.log("this.scrollTop",this.scrollTop)
		},
		watch: {
			checkList(newValue, oldValue) {
				console.log("newVal",newValue)
				console.log("oldVal",oldValue)
			},
			// scrollTop:{
			// 	immediate: true,
			// 	handler(newVal,oldVal){
			// 		console.log("newVal,==",newVal)
			// 		console.log("oldVal,==",oldVal)
			// 	}
			// },
		},
		onLoad() {
			// 商品列表的请求接口
			this.getHomeGoodsList();
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
			},
			chooseAttr(labelItem,key){
				this.checkList=this.checkList.map(item=>{
					if(item.key==key){
						item.checked =true
					}else{
						item.checked=false
					}
					return item
				})
			},
			getHomeGoodsList() {
				this.triggered=true
			  getHomeGoodsList({
			    pageIndex: this.query.page,
			    areaId: this.areaId,
			    simplified: true,
			    excludeFields: "product.spu,product.process, product.store,product.supplier,product.areaIds,product.areaPrices,product.category",
			  }).then((res) => {
			    console.log(res, '>>>>>>>>>')
					// this.query.totalPage = res.totalPage;
					// this.query.page++;
					this.shopList = res.page;
					this.triggered = false;
			  });
			},



			// changeOpacity(num) {
			//   // console.log(num)
			//   num < 150
			//     ? (this.opacityNum = 0)
			//     : num < 180
			//     ? (this.opacityNum = 0.8)
			//     : (this.opacityNum = 1);
			//   // console.log(this.opacityNum)
			// },

			// pageScroll(scrollTop) {
			//   this.scrollTop = scrollTop;
			//   //从深层页面返回时，避免触发导致显示异常
			//   if(scrollTop!=0){
			//     this.changeOpacity(this.scrollTop);
			//   }
			//   this.getTopDistance();
			// },
			// getTopDistance() {
			//   query.exec(function (res) {});
			// },
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
						font-weight: bolder;
						font-size: 32rpx;
						height: 44rpx;
						line-height: 44rpx;
						margin-bottom: 32rpx;
					}
					.scrollContaienr{
						height: 376rpx;
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
			.productContainer{
				background-color: #fff;
				.title{
					height: 108rpx;
					display: flex;
					align-items: center;
					flex-flow: row nowrap;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 22rpx 0 32rpx;
					.name{
						color: #222222;
						font-size: 32rpx;
						font-weight: bolder;
					}
					.allProduct{
						display: flex;
						align-items: center;
						text{
							color: #333333;
							font-size: 24rpx;
						}
						image{
							width: 28rpx;
							height: 28rpx;
						}
					}
				}
				.checkBox{
					padding: 0 0 24rpx 32rpx;
					overflow-x: scroll;
					white-space: nowrap;
					.checkItem{
						display: inline-block;
						padding: 11rpx 20rpx;
						height: 34rpx;
						line-height: 34rpx;
						color: #999999;
						font-size: 24rpx;
						background: #F7F7F7;
						border-radius: 10rpx;
						margin-right: 16rpx;
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
