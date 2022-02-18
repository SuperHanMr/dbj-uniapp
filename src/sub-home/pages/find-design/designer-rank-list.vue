<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
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

		<view class="bgImg">
			<view class="rankExplain" @click="openExplain">
				<view class="text">
					榜单说明
				</view>
				<image class="icon" src="../../static/avatar@2x(1).png" mode=""></image>
			</view>
		</view>
		<view class="list-container">
			<view class="designer-item" v-for="(item1,index1) in 10" :key="item1">
				<view class="top-bg" :style="{backgroundColor:index1>2?bgColorList[3].bgColor:bgColorList[index1].bgColor}"
				 ></view>
				<view class="topNum" :style="{backgroundImage:index1>2?bgColorList[3].bgImg:bgColorList[index1].bgImg,backgroundSize:'100% 100%'}">
					<view>Top</view>
					<view>{{index1+1}}</view>
				</view>
				<view class="info-container">
					<view class="header">
						<image class="avatar" src="../../static/avatar@2x(1).png" />
						<view class="basic-info">
							<view class="name-container">
								<text class="name"> 牛逼plus设计 </text>
								<text class="rank"> 高级设计师 </text>
							</view>
							<view class="attr">
								<text class="text">北京</text>
								<text class="line"></text>
								<text class="text">北京</text>
								<text class="line"></text>
								<text class="text">北京</text>
								<text class="line"></text>
							</view>
							<view class="label_container">
								<view class="label_item">轻奢</view>
								<view class="label_item">奢华</view>
								<view class="label_item">擅长标签</view>
								<view class="label_item">ggggg</view>
								<view class="label_item">顶顶顶顶顶顶顶顶顶顶</view>
							</view>
						</view>
						<view class="attention">
							<image src="../../static/avatar@2x(1).png" mode=""></image>
							<text>关注</text>
						</view>
						<!-- <view class="hasAttention">
							已关注
						</view> -->
					</view>
					<view class="case-container">
						<scroll-view
							scroll-x="true"
							style="white-space: nowrap;"
							@scrolltolower.stop="gotoPersonalPage"
							:scroll-left="scrollLeft"
						>
						<view class="case-content">
							<view class="case-item" v-for="(item2,index2) in 4" :key="item2" @click="gotoPersonalPage">
								<!-- 成名之作 -->
								<!-- <image class="icon" src="../../static/images/famousWork.png" mode=""></image> -->
								<!-- 得意之作 -->
								<image class="icon" src="../../static/images/favouriteWork.png" mode=""></image>

								<view class="img-Container">
									<image v-if="index2 <2" class="oneImg" src="../../static/images/famousWork.png" mode=""></image>
									<view v-else class="threeImg">
										<image class="bigImg" src="../../static/images/famousWork.png" mode=""></image>
										<view class="smallImg-Container">
											<image class="smalImg1" src="../../static/images/famousWork.png" mode=""></image>
											<image class="smalImg2" src="../../static/images/famousWork.png" mode=""></image>
										</view>
									</view>
								</view>
								<view class="caseName">案例标题案例标题案例标题案例标题案例标题</view>
								<view class="caseInfo">
									<text class="text">北京</text>
									<text class="line"></text>
									<text class="text">北京</text>
									<text class="line"></text>
									<text class="text">北京</text>
									<text class="line"></text>
								</view>
							</view>
							<view class="show-more">
								<view class="text">左滑查看更多</view>
							</view>
						</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	<uni-popup ref="explainPopup" type="bottom" >
		<view 
		:style="{paddingBottom:containerPaddingBottom}"
		style="z-index: 999;background-color: #FFFFFF;border-radius: 32rpx 32rpx 0 0;"
		>
			<view class="header-popup">
				<text>最具价值设计师</text>
				<view class="close-popup" @click="close">
					<i class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic close-icon-popup"></i>
				</view>
			</view>
			<scroll-view :scroll-y="true" class="toast-content">
				<p>噼噼啪啪铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺铺</p>
				<p>谢谢谢谢谢寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻</p>
			</scroll-view>
		</view>
	</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 scrollTop: 0,
				bgColorList:[
					{
						bgColor:"#EDC48E",
						bgImg:"",
					},
					{
						bgColor:"#BFCBD6",
						bgImg:"",
					},
					{
						bgColor:"#D6C2BF",
						bgImg:"",
					},
					{
						bgColor:"#EBEEF1",
						bgImg:"",
					},
					],
				designerList:[],//设计师列表
				containerPaddingBottom:"",
			}
		},
		mounted() {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.containerPaddingBottom = menuButtonInfo.bottom  + "rpx";
			console.log("this.containerPaddingBottom ====",this.containerPaddingBottom )
		},
		onLoad() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#232323',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		onPageScroll(scrollTop) {
		  this.scrollTop = scrollTop.scrollTop;
		},
		methods: {
			toBack(){
				uni.navigateBack({});
			},
			gotoPersonalPage(){
				// uni.navigateTo({
				// 	url:`../../../pages/real-case/real-case-webview/real-case-webview?id=${item.id}`
				// })
				console.log("去设计师主页")
			},
			openExplain(){
				this.$refs.explainPopup.open()
			},
			close(){
				this.$refs.explainPopup.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background: #232323 !important;
	}
	.bgImg{
		height: 400rpx;
		position: relative;
		.rankExplain{
			position: absolute;
			bottom: 60rpx;
			right: 32rpx;
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			.text{
				height: 40rpx;
				line-height: 40rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				margin-right: 8rpx;
			}
			.icon{
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
	.list-container{
		box-sizing: border-box;
		padding: 0 24rpx 24rpx;
		.designer-item{
			width: 702rpx;
			height: 664rpx;
			padding-top: 40rpx;
			box-sizing: border-box;
			position: relative;
			margin-bottom: 24rpx;
			.top-bg{
				position: absolute;
				top: 24rpx;
				left: 0;
				width: 702rpx;
				height: 40rpx;
				border-radius: 24rpx 24rpx 0 0;
				background: #EDC48E;
			}
			.topNum{
				position: absolute;
				left: 32rpx;
				top: 0;
				width: 74rpx;
				height: 82rpx;
				background-color: yellowGreen;
				z-index: 3;
				word-wrap: break-word;
				padding: 8rpx 14rpx 0;
				view{
					color: #725947;
					font-size: 24rpx;
					font-weight: bold;
				}
			}
			.info-container{
				position: absolute;
				width: 702rpx;
				background-color: #FFFFFF;
				border-radius: 24rpx;
				z-index: 2;
				.header{
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					padding: 46rpx 24rpx 20rpx;
					position: relative;
					.avatar{
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
					.basic-info{
						.name-container{
							display: flex;
							flex-flow: row nowrap;
							align-items: center;
							margin-bottom: 8rpx;
							.name{
								display: block;
								height: 44rpx;
								line-height: 44rpx;
								color: #222222;
								font-size: 32rpx;
								font-weight: 500;
								margin-right: 24rpx;
							}
							.rank{
								display: block;
								width: 116rpx;
								height: 30rpx;
								line-height: 30rpx;
								background: rgba(79, 190, 237, 0.06);
								border-radius: 4rpx;
								text-align: center;
								color: #4FBEED;
								font-size: 20rpx;

							}
						}
						.attr {
							height: 30rpx;
							font-size: 22rpx;
							margin-bottom: 16rpx;
							display: flex;
							flex-flow: row nowrap;
							align-items: center;
							text {
								line-height: 30rpx;
								color: #333333;
							}
							.line {
								display: block;
								height: 20rpx;
								width: 2rpx;
								background: #333333;
								opacity: 0.7;
								margin: 0 16rpx;
							}
						}
						.label_container {
							display: flex;
							flex-flow: row wrap;
							width: 536rpx;
							max-height: 104rpx;
							overflow: hidden;
							flex: 1;
							align-items: center;
							.label_item {
								height: 32rpx;
								line-height: 32rpx;
								padding: 4rpx 12rpx 6rpx;
								border: 1rpx solid #E8E8E8;
								background: #FFFFFF;
								border-radius: 6rpx;
								margin-right: 12rpx;
								margin-bottom: 12rpx;
								color: #999999;
								text-align: center;
								font-size: 24rpx;
							}
						}
					}
					.attention{
						position: absolute;
						width: 126rpx;
						height: 56rpx;
						background: linear-gradient(116.19deg, #F83112 16.48%, #FD6421 83.52%);
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						flex-flow: row nowrap;
						padding: 0 24rpx;
						box-sizing: border-box;
						top: 46rpx;
						right: 24rpx;
						image{
							width: 20rpx;
							height: 20rpx;
							margin-right: 10rpx;
						}
						text{
							font-size: 24rpx;
							line-height: 36rpx;
							color: #FFFFFF;
							font-weight: 500;
						}
					}
					.hasAttention{
						position: absolute;
						width: 126rpx;
						height: 56rpx;
						line-height: 56rpx;
						text-align: center;
						background: #F3F3F3;
						border-radius: 8rpx;
						color: #666666;
						font-size: 24rpx;
						font-weight: 500;
						top: 46rpx;
						right: 24rpx;
					}
				}
				.case-container{
					padding-left: 24rpx;
					padding-bottom: 32rpx;
					scroll-view{
						.case-content{
							display: flex;
							align-items: center;
							flex-flow: row nowrap;
							.case-item{
								position: relative;
								width: 462rpx;
								height: 336rpx;
								display: inline-block;
								margin-right: 24rpx;
								.icon{
									position: absolute;
									width: 132rpx;
									height: 42rpx;
									top: 16rpx;
									left: 16rpx;
								}
								.img-Container{
									height: 242rpx;
									margin-bottom: 20rpx;
									border-radius: 12rpx;
									.oneImg{
										width: 462rpx;
										height: 242rpx;
										border-radius: 12rpx;
									}
									.threeImg{
										display: flex;
										align-items: center;
										flex-flow: row nowrap;
										.bigImg{
											width: 308rpx;
											height: 242rpx;
											margin-right: 4rpx;
										}
										.smallImg-Container{
											display: flex;
											flex-flow: column nowrap;
											.smalImg1{
												width: 150rpx;
												height: 120rpx;
												margin-bottom: 4rpx;
												border-radius: 0 12rpx 0 0;
											}
											.smalImg2{
												width: 150rpx;
												height: 120rpx;
												border-radius: 0 0 12rpx 0;
											}
										}
									}
								}
								.caseName{
									width: 450rpx;
									height: 36rpx;
									line-height: 36rpx;
									color: #333333;
									font-size: 26rpx;
									letter-spacing: 1rpx;
									margin-bottom: 8rpx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
								.caseInfo{
									height: 30rpx;
									font-size: 22rpx;
									margin-bottom: 16rpx;
									display: flex;
									flex-flow: row nowrap;
									align-items: center;
									text {
										line-height: 30rpx;
										color: #999999;
									}
									.line {
										display: block;
										height: 20rpx;
										width: 2rpx;
										background: #999999;
										opacity: 0.7;
										margin: 0 16rpx;
									}
								}
							}
							.show-more{
								display: inline-block;
								width: 64rpx;
								height: 338rpx;
								.text{
									width: 64rpx;
									height: 242rpx;
									font-size: 24rpx;
									text-align: center;
									color: #666666;
									letter-spacing: 8rpx;
									padding: 26rpx 20rpx 24rpx;
									box-sizing: border-box;
									background-color: #F3F3F3;
									border-radius: 12rpx 0 0 12rpx;
									writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
									writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
								}
							}
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
		font-weight: 500;
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
	p {
		text-align: justify;
		color: #999999;
		margin-bottom: 10rpx;
		line-height: 44rpx;
		text-indent: 52rpx;
		font-size: 26rpx;
		letter-spacing: 1rpx;
	}

</style>
