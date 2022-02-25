<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
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

		<view class="bgImg" :style="{backgroundImage:`url(${headerBgImg})`,}">
			<view class="rankExplain"  @click="openExplain">
				榜单说明
			</view>
		</view>
		<view class="list-container">
			<view class="designer-item" v-for="(item1,index1) in designerList" :key="index1">
				<view class="designer-bg"
					:style="{backgroundColor:index1>2?bgColorList[3].bgColor:bgColorList[index1].bgColor}"
				></view>
				<view class="basicInfo-container">
					<view class="designer-topNum"
					:style="{backgroundImage:index1>2?`url(${bgColorList[3].bgImg})`:`url(${bgColorList[index1].bgImg})`,backgroundSize:'100% 100%'}">
						<view class="top-font"
						:style="{color:index1>2?bgColorList[3].color:bgColorList[index1].color}"
						>{{index1+1}}</view>
					</view>

					<view class="designer-info">
						<image class="avatar" @click="gotoPersonalPage(item1,'part')"  :src="`${item1.searchDesignerVO.avatar}?x-oss-process=image/resize,m_fill,h_88,w_88,limit_0`" />
						<view class="basic-info">
							<view class="name-container">
								<text class="name"> {{item1.searchDesignerVO.name}}</text>
								<text class="rank"> {{item1.levelName || ""}}设计师 </text>
							</view>
							<view class="attr">
								<!-- liveArea 居住地 -->
								<view class="liveAreaValue" v-if="item1.liveArea"
									:class="{anotherStyle:item1.liveArea.length>=8}"
								><text>{{item1.liveArea}}</text></view>
								<view class="attrValue">{{item1.liveArea?"&nbsp;| ":''}}服务次数{{item1.searchDesignerVO.totalCount || "0" }}{{item1.searchDesignerVO.praiseEfficiency ?`&nbsp;|&nbsp;好评率${item1.searchDesignerVO.praiseEfficiency}%`:''}}</view>
							</view>
							<view class="label_container">
							<view
								class="label_item" v-if="item1.searchDesignerVO.designs.length" v-for="tagItem in item1.searchDesignerVO.designs" :key="tagItem">{{tagItem}}</view>
							</view>
						</view>
						<view class="hasAttention" v-if="item1.isFocusOn" @click.stop="handleDesigner(item1,index1)">
							已关注
						</view>
						<view class="attention" v-else @click.stop="handleDesigner(item1,index1)">
							<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/attentionIcon.png"  />
							<text>关注</text>
						</view>
					</view>

					<view class="case-container">
						<scroll-view
							scroll-x="true"
							lower-threshold="4"
							style="white-space: nowrap;"
							@scrolltolower.stop="gotoPersonalPage(item1,'total')"
							:scroll-left="scrollLeft"
						>
						<view class="case-content">
							<view class="case-item" v-for="item2 in item1.valuationCaseList" :key="item2.id" @click="gotoCaseDetail(item2)">
								<image v-if="item2.famous" class="icon" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/famousWork.png" />
								<image v-if="item2.favourite" class="icon" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/favouriteWork.png" />

								<view class="img-Container">
									<image v-if="item2.imageUrlList.length>=1 && item2.imageUrlList.length<3" class="oneImg" :src="`${item2.imageUrlList[0]}?x-oss-process=image/resize,m_fill,h_484,w_924,limit_0`"/>
									<view v-if="item2.imageUrlList.length >= 3" class="threeImg">
										<image class="bigImg" :src="`${item2.imageUrlList[0]}?x-oss-process=image/resize,m_fill,h_484,w_924,limit_0`"/>
										<view class="smallImg-Container">
											<image class="smalImg1" :src="`${item2.imageUrlList[1]}?x-oss-process=image/resize,m_fill,h_484,w_924,limit_0`"/>
											<image class="smalImg2" :src="`${item2.imageUrlList[2]}?x-oss-process=image/resize,m_fill,h_484,w_924,limit_0`"/>
										</view>
									</view>
								</view>
								<view class="caseName">{{item2.caseName}}</view>
								<view class="caseInfo">
									<text class="text" v-if="item2.roomNum || item2.hallNum">
										<text v-if="item2.roomNum">{{item2.roomNum ||"-"}}室</text>
										<text v-if="item2.hallNum">{{item2.hallNum || "-"}}厅</text>
									</text>
									<text v-if="!item2.roomNum && !item2.hallNum">-室-厅</text>

									<text class="line" v-if="item2.roomNum || item2.hallNum || (!item2.roomNum && !item2.hallNum)"></text>

									<text class="text">{{Math.floor(item2.insideArea)?`${Math.floor(item2.insideArea)}`: "-"}}m²</text>
									<text class="line"></text>

									<text class="text">预算：{{ Math.floor(item2.budget)?`¥${Math.floor(item2.budget)}` : '¥-'}}万</text>
								</view>
							</view>
							<view class="show-more" v-if="item1.showMoreCase">
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
				<view class="bankingComplain">
					榜单说明：本榜单为打扮家平台对设计师四维能力的综合评估得分排行，数据实时更新。评估数据维度包含：设计师综合能力估值，设计水平，服务水平及业主反馈。
				</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { debounce } from "@/utils/common.js";
	import { getDesignRank, queryAttention } from "../../../api/decorate.js"
	export default {
		data() {
			return {
				scrollTop: 0,
				headerBgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/designerRankBg.png?x-oss-process=image/resize,m_fill,h_382,w_750,limit_0",
				bgColorList:[
					{
						bgColor:"#EDC48E",
						color:"#725947",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/rank_top1.png",
					},
					{
						bgColor:"#BFCBD6",
						color:"#476072",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/rank_top2.png",
					},
					{
						bgColor:"#D6C2BF",
						color:"#725447",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/rank_top3.png",
					},
					{
						bgColor:"#EBEEF1",
						color:"#93A0AF",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/rank_top4.png",
					},
					],
				designerList:[],//设计师列表
				containerPaddingBottom:"",
				equipmentId:"",
				scrollLeft:0,
			}
		},
		mounted() {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.containerPaddingBottom = menuButtonInfo.bottom  + "rpx";
			console.log("this.containerPaddingBottom ====",this.containerPaddingBottom )
		},
		onLoad() {
			uni.getSystemInfo({
				success:res => {
					this.equipmentId = res.deviceId
				}
			})
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#232323',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			});
			this.reqDesignerRank()
		},
		onShow() {
			this.scrollLeft = 1
			this.$nextTick(()=>{
				this.scrollLeft = 0
			})
		},
		onPageScroll(scrollTop) {
		  this.scrollTop = scrollTop.scrollTop;
		},
		methods: {
			reqDesignerRank(){
				getDesignRank().then(res=>{
					console.log("res====",res)
					this.designerList = res
					this.designerList=this.designerList.map(item=>{
						if(item.valuationCaseVOS && item.valuationCaseVOS.length>2){
							item.showMoreCase = true
							console.log("item.valuationCase-=====",item.valuationCaseVOS)
							item.valuationCaseList=item.valuationCaseVOS.slice(0,2)
						}else if(item.valuationCaseVOS && item.valuationCaseVOS.length<=2){
							item.valuationCaseList = item.valuationCaseVOS
							item.showMoreCase = false
						}else{
							console.log("案例个数不超过三个")
							item.valuationCaseList=[]
							item.showMoreCase = false
						}
						return item
					})
				})
			},
			toBack(){
				uni.navigateBack({});
			},
			gotoPersonalPage(item, type){

				if(type =="total" && item.valuationCaseVOS.length<=2) return ;
				if(type == "total"){
					uni.navigateTo({
						url:`../../../sub-decorate/pages/person-page/person-page?personId=${item.searchDesignerVO.id}&isToContent=true`
					})
				}else{
					uni.navigateTo({
						url:`../../../sub-decorate/pages/person-page/person-page?personId=${item.searchDesignerVO.id}`
					})
				}


			},
			gotoCaseDetail(item){
				console.log("去案例详情",item)
				// uni.navigateTo({
				// 	url: `/pages/real-case/real-case-webview/real-case-webview?id=${item.id}`
				// })
				debounce(() => {
					uni.navigateTo({
						url:`/pages/real-case/real-case-webview/real-case-webview?id=${item.id}`,
					});
				},500)()

			},

			handleDesigner(item,index){
				console.log("是否关注设计师")
				let params ={
					authorId:-1,
					equipmentId:this.equipmentId,
					relationId:item.searchDesignerVO.id,
					routeId:1001,
					subBizType:1,
				}
				queryAttention(params).then(()=>{
					if(item.isFocusOn){
						uni.showToast({
							title:"取消关注成功",
							icon:"none",
							duration:1000
						})
						this.designerList[index].isFocusOn = false
					} else {
						uni.showToast({
							title:"关注成功!",
							icon:"none",
							duration:1000
						})
						this.designerList[index].isFocusOn = true;
					}
				})
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
<style scoped>
</style>
<style lang="scss" scoped>
	.container{
		background: #101216 !important;
		position: relative;
		.bgImg{
			height: 382rpx;
			width: 750rpx;
			background-size: contain;
			position: fixed;
			z-index: 8;
			top: 0;
			left: 0;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
			.rankExplain{
				width: 52rpx;
				height: 130rpx;
				box-sizing: border-box;
				background: rgba(243, 226, 197, 0.12);
				padding: 10rpx 10rpx 8rpx;
				border-radius: 8rpx 0 0 8rpx;
				color: #94918C;
				font-size: 24rpx;
				letter-spacing: 2rpx;
				writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
				writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
				margin-bottom: 10rpx;
			}
		}

	}
	.list-container{
		box-sizing: border-box;
		padding: 400rpx 24rpx 24rpx;
		height: 100%;
		.designer-item{
			padding-top: 40rpx;
			box-sizing: border-box;
			position: relative;
			margin-bottom: 24rpx;
			.designer-bg{
				position: absolute;
				top: 24rpx;
				left: 0;
				width: 702rpx;
				height: 40rpx;
				border-radius: 24rpx 24rpx 0 0;
				background: #EDC48E;
			}
			.basicInfo-container{
				background-color: #FFFFFF;
				border-radius: 24rpx;
				z-index: 2;
				position: relative;
				width: 702rpx;
				.designer-topNum{
					position: absolute;
					left: 32rpx;
					top: -46rpx;
					width: 74rpx;
					height: 82rpx;
					z-index: 3;
					word-wrap: break-word;
					display: flex;
					justify-content: space-around;
					view{
						margin-top: 32rpx;
						font-size: 32rpx;
						font-weight: bold;
						height: 44rpx;
						line-height: 44rpx;
					}
				}
			}

		}

	}
	.designer-info{
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
					max-width: 276rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.rank{
					display: block;
					height: 30rpx;
					padding: 0 8rpx 2rpx;
					box-sizing: border-box;
					line-height: 30rpx;
					background: rgba(79, 190, 237, 0.06);
					border-radius: 4rpx;
					text-align: center;
					color: #4FBEED;
					font-size: 20rpx;

				}
			}
			.attr {
				max-width: 416rpx;
				height: 30rpx;
				margin-bottom: 16rpx;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				flex: 1;
				.liveAreaValue{
					display: flex;
					// flex: 1;
					overflow: hidden;
					text{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						height: 30rpx;
						line-height: 30rpx;
						color: #333333;
						font-size: 22rpx;
					}
				}

				.attrValue{
					height: 30rpx;
					line-height: 30rpx;
					color: #333333;
					font-size: 22rpx;

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
		// padding-left: 24rpx;
		padding-bottom: 32rpx;
		display: flex;
		align-items: center;
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
					margin-left: 24rpx;
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
								border-radius: 12rpx 0 0 12rpx;
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
					margin-left: 24rpx;
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
	.anotherStyle{
		flex: 1;
	}





</style>
