<template>
	<view style="background-color: #F6F6F6;margin-bottom: 60rpx;">
	<!-- <view > -->
		<custom-navbar :opacity="scrollTop/100" title="找设计" bgcolor="#FFF">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white header-back" style="color:'black'">
					</i>
				</view>
			</template>
		</custom-navbar>

	<!-- 	<view class="top-bg">
			<view class="pleaholder"></view>
		</view> -->
		<!-- <view class="sticky-view" :style="{top:navBarHeight}">
			<scroll-view class="tab-list" scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in tabList" :key="item.id" class="tab-item"
					:class="index==currentTab?'selected-tab ':'nomal-tab'" @click="onTab(index,item)">
					<image v-if="index==0" :class="currentTab==0?'tab-img':'tab-img-un'"
						:src=" currentTab==0? 'https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/design_fire.png':'https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/desigon_unfire.png'"
						mode=""></image>
					<text>{{item.name}}</text>
					<view v-if="index==currentTab" class="current-select">

					</view>
				</view>
			</scroll-view>

			<scroll-view v-if="subChildren.length" style="height: 84rpx;line-height:84rpx" class="tab-list"
				scroll-x="true" @scroll="scroll">
				<view v-for="(item,index) in subChildren" :key="item.id" style="line-height:52rpx ;" class="tab-item"
					:class="index==subIndex?'sub-selected':'sub-unselected'" @click="onSubTab(index,item)">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="" @click="toRealCase">
			真实案例
		</view>
		<design-list ref="designList"></design-list> -->

		<!-- 		<view v-if="goodsList.length==0" class="noMemo">
			<image class="noMemoImg" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/pic_empty%402x.png">
			</image>
			<view class="noMemoText">暂无内容~</view>
		</view>
		<view class="goods-list">
			<view class="item" v-for="(item,index) in goodsList" :key="item.id" @click="toGoodsDetail(item.id)">
				<image class="img" :src="item.imageUrl" mode=""></image>
				<view class="info">
					<view class="title">
						<text>{{item.name}}</text>
					</view>
					<view class="flex1">

					</view>
					<view class="price">
						¥
						<text class="amount">
							{{foramtPrice(item)}}
						</text>
						<text class="ex">.{{formatCent(item)}}</text>
						/{{item.unitName}}
					</view>
				</view>
			</view>
		</view>-->


		<view class="header-container" :style="{backgroundImage:`url(${bgImg2})`}">
			<!-- <view class="backgroundStyle"
			></view> -->
			<view class="search_container">
				<view class="search_style">

				</view>
				<image
				 class="customerServiceIcon"
					src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/online-server.png"
				 />
			</view>
			<view class="title">
				找设计
			</view>
			<view class="tab-container">
				<view class="tabItem" v-for="item in iconList" :key="item">
					<image :src="item.url" mode=""></image>
					<view style="color: #333333;font-size: 26rpx;">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="recommendForYou-container">
			<view class="title_container">
				<view class="left">
					为您推荐
				</view>
				<view class="right">
					<text>更多</text>
					<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
				</view>
			</view>

		</view>
			<!-- 推荐设计师的名片 -->
		<view class="designCard_container">
			<scroll-view
			  scroll-x="true"
			  style="white-space: nowrap;"
			>
				<view class="design-card-item"
					v-for="item in 5"
					:style="{backgroundImage:`url(${bgImg1})`,backgroundSize:'434rpx 572rpx'}"
				>
					<view class="basic-info">
						<view class="header">
							<view class="name">王哈哈哈哈哈</view>
							<view class="rank">高級设计师</view>
						</view>
						<view class="goodPraise" style="margin-bottom: 8rpx;">
							<view class="item"><text>好评率99%</text></view>
						</view>
						<view class="attr">
							<view class="attrItem">轻奢</view>
							<view class="attrItem">奢华</view>
							<view class="attrItem">擅长标签</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="showMoreCard">
				左滑展示更多
			</view> -->
		</view>
		<view class="recommendCase title_container">
			<view class="left">
				为您推荐
			</view>
			<view class="right">
				<text>更多</text>
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" />
			</view>
		</view>
		<view class="recommendCaseItem_container">
			<view
				:style="{backgroundImage:`url(${bgImg})`}"
				class="case-item"
				v-for="item in 4"
			>
				<view class="left">
					<view class="name_container">
						<view class="name">娃哈哈	 Ta家</view>
						<view class="cost">装修花销：¥3243.00</view>
					</view>
					<view class="attr_container">
						<view class="attr_item">现代简约</view>
						<view class="attr_item">极简简装</view>
					</view>
				</view>
				<image
					class="right"
					@click="toRealCase()"
					src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findDesign,
		defaultSkus
	} from "../../../api/home.js"
	import DesignList from './design-list.vue'
	export default {
		components: {
			DesignList
		},
		data() {
			return {
				scrollTop: 0,
				navBarHeight: "",
				tabList: [
					'1', '2', '3'
				],
				currentTab: 0,
				subChildren: [],
				subIndex: 0,
				goodsList: [],
				bgImg:"../../static/caseItemBg.svg",
				bgImg1:"https://ali-res-test.dabanjia.com/res/20211024/17/1635068528844_4631%24%E8%B6%85%E8%B6%8A3.jpg?x-oss-process=image/resize,m_mfit,w_686,h_686",
				bgImg2:"../../static/findDesignbg.svg",
				iconList:[
					{
						key:1,
						url:"../../static/guomeiIcon.svg",
						name:"服务保障"
					},
					{
						key:2,
						url:"../../static/pingtairenzheng.svg",
						name:"平台认证"
					},
					{
						key:3,
						url:"../../static/yanxuan.svg",
						name:"严选设计师"
					},
					{
						key:4,
						url:"../../static/yanxuan.svg",
						name:"品质设计"
					},
				]
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			this.navBarHeight =systemInfo.statusBarHeight +"px";
			findDesign().then(e => {
				this.tabList = e;
				let id = ''
				if (this.tabList?.length) {
					id = this.tabList[0].id
				}
				if (this.tabList?.length && this.tabList[0] && this.tabList[0].children) {
					this.subChildren = this.tabList[0].children
					id = this.subChildren[0].id
				}
				this.getGoods(id)
			})
		},
		onPageScroll(scrollTop) {
			this.scrollTop = scrollTop.scrollTop
		},
		methods: {
			getGoods(id) {
				this.$refs.designList.getList(id)
				// defaultSkus({
				// 	relationType: 5,
				// 	relationId: id
				// }).then(e => {
				// 	this.goodsList = e
				// })
			},
			foramtPrice(item) {
				let price = String(item.price || '0');
				return price.slice(0, price.length - 2) || "0";
			},
			formatCent(item) {
				let price = String(item.price || '0');
				let fixedNum = Number(price / 100).toFixed(2)
				if (String(fixedNum).split('.').length > 1) {
					return String(fixedNum).split('.')[1]
				} else {
					return ''
				}
			},
			onSubTab(index, item) {
				this.subIndex = index;
				this.getGoods(item.id);
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: "/sub-classify/pages/goods-detail/goods-detail?goodId=" + id
				})
			},
			onTab(index, item) {
				this.currentTab = index
				this.subIndex = 0;
				this.subChildren = this.tabList[index].children;
				let id = item.id
				if (this.subChildren && this.subChildren.length) {
					id = this.subChildren[0].id
				}
				this.getGoods(id);
			},
			toBack() {
				uni.navigateBack({

				})
			},
			toRealCase(){
				uni.navigateTo({
					url: '/sub-home/pages/find-design/real-case/real-case'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bg {
		width: 100%;
		// height: 420rpx;
		height: 156rpx;
		// background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/find_design_bg.png");
		background-size: contain;
		position: relative;

		.pleaholder {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 32rpx;
			background: #ffffff;
			border-radius: 32rpx 32rpx 0rpx 0rpx;
		}
	}
	// 新添加的
	.header-container{
		padding: 188rpx 0 36rpx 40rpx;
		position: relative;
		background-size: contain;
		position: relative;
		.backgroundStyle{
			position: absolute;
			height: 440rpx;
			top: 0;
		}
		.search_container{
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			justify-content: space-between;
			padding-right: 32rpx;
			.search_style{
				width: 574rpx;
				height: 62rpx;
				box-sizing: border-box;
				border: 0.5px solid #999999;
				border-radius: 16rpx;
				background-color: #FFFFFF;
			}
			.customerServiceIcon{
				width: 76rpx;
				height: 76rpx;
			}
		}
		.title{
			padding-left: 2rpx;
			padding-top: 36rpx;
			color: #222222;
			font-size: 44rpx;
			font-weight: 500;
			letter-spacing: 1rpx;
			margin-bottom: 2rpx;
		}
		.tab-container{
			height: 36rpx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.tabItem{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-right: 24rpx;
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 12rpx;
				}
			}
			.tabItem:last-child{
				margin-right: 0;
			}

		}
	}

	.recommendForYou-container{
		background-color: #FFFFFF;
		border-radius: 32rpx 32rpx 0 0;
	}
	.designCard_container{
		height: 698rpx;
		padding-left: 32rpx;
		background: linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%);
		display: flex;
		align-items: center;
		scroll-view{
			.design-card-item{
				width: 434rpx;
				height: 698rpx;
				margin-right: 32rpx;
				background-color: pink;
				border-radius: 16rpx;
				background-color: #FFFFFF;
				background-repeat:no-repeat;
				background-position:top center;
				display: inline-block;
				position: relative;
				box-shadow: 4rpx 4rpx 10px #E5E5E5;;
				.basic-info{
					position: absolute;
					bottom: 0;
					width: 434rpx;
					height: 170rpx;
					box-sizing: border-box;
					padding: 24rpx;
					background: linear-gradient(180deg, rgba(136, 141, 145, 0.79) -2.26%, rgba(74, 81, 86, 0.51) 100%);
					border-radius: 16rpx;
					backdrop-filter: blur(28rpx);
					// transform: matrix(1, 0, 0, -1, 0, 0);
					.header, .goodPraise{
						display: flex;
						align-items: center;
						margin-bottom: 4rpx;
						.name{
							color: #FFFFFF;
							font-size: 30rpx;
							display: block;
							height: 42rpx;
							line-height: 42rpx;
						}
						.rank{
							margin-left: 12rpx;
							height: 30rpx;
							box-sizing: border-box;
							padding: 0 8rpx;
							line-height: 26rpx;
							border: 0.5px solid #FFFFFF;
							box-sizing: border-box;
							border-radius: 4rpx;
							color: #FFFFFF;
							font-size: 20rpx;
						}
						.item{
							display: block;
							height: 34rpx;
							line-height: 34rpx;
							font-size: 24rpx;
							color: #FFFFFF;
							opacity: 0.6;

						}

					}

					.attr{
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						.attrItem{
							height: 34rpx;
							line-height: 30rpx;
							box-sizing: border-box;
							border: 0.5px solid #FFFFFF;
							border-radius: 6rpx;
							padding:0 12rpx;
							color: #FFFFFF;
							opacity: 0.6;
							font-size: 20rpx;
							margin-right: 12rpx;
						}
					}
				}
			}
			.design-card-item:nth-last-child(1) {
				margin-right: 0;
			}
		}
	}

	.title_container{
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 32rpx 26rpx 40rpx;
		.left{
			height: 44rpx;
			line-height: 44rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: 500;
		}
		.right{
			height: 40rpx;
			box-sizing: border-box;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 0 14rpx 0 16rpx;
			box-sizing: border-box;
			border: 0.5px solid #ADADAD;
			border-radius: 16rpx;
			text{
				color: #333333;
				font-size: 22rpx;
			}
			image{
				display: block;
				width: 16rpx;
				height: 16rpx;
			}
		}
	}
	.recommendCaseItem_container{
		padding: 0 32rpx 32rpx;
		.case-item{
			height: 182rpx;
			padding: 24rpx 24rpx 24rpx 32rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			background-repeat:no-repeat;
			background-position:right bottom;
			border-radius: 16rpx;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			.left{
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				flex: 1;
				.name_container{
					.name{
						height: 44rpx;
						font-size: 32rpx;
						color: #333333;
						margin-bottom: 4rpx;
					}
					.cost{
						height: 30rpx;
						line-height: 30rpx;
						color: #FF7F46;
						font-size: 22rpx;
						margin-bottom: 16rpx;
					}
				}
				.attr_container{
					display: flex;
					flex-flow: row wrap;
					align-items: center;
					.attr_item{
						width: 128rpx;
						height: 40rpx;
						line-height: 40rpx;
						color: #999999;
						background-color:  #F6F6F6;
						text-align: center;
						border-radius: 6rpx;
						font-size: 24rpx;
						margin-right: 16rpx;
					}
				}
			}
			.right{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}








	// 之前的
	// page {
	// 	background: #FFF;
	// }
 .header-back {
      width: 82rpx;
      height: 82rpx;
      // background-color: #eee;
      color: #000;
      line-height: 82rpx;
      text-align: center;
    }
	.tes1t {
		width: 100%;
		height: 10000rpx;
		background-color: yellow;
	}

	.noMemo {
		width: 100%;
		height: fit-content;
	}

	.noMemo .noMemoImg {
		width: 750rpx;
		height: 580rpx;
		display: block;
	}

	.noMemo .noMemoText {
		width: fit-content;
		height: 36rpx;
		margin-top: 24rpx;
		margin-left: 324rpx;
		font-size: 26rpx;
		color: #999999;
	}


	.sub-selected {
		background: linear-gradient(129deg, #00cdec 4%, #00ed7d 100%);
		border-radius: 12rpx;
		font-size: 24rpx;
		padding: 16rpx;
		font-weight: 500;
		color: #ffffff;
		margin-left: 20rpx;

	}

	.sub-unselected {
		background: #f7f7f7;
		color: #999999;
		border-radius: 12rpx;
		font-size: 24rpx;
		padding: 16rpx;
		font-weight: 400;
		margin-left: 20rpx;
	}

	.tab-item {
		padding: 0 20rpx;
		text-align: center;
		display: inline-block;
		position: relative;
	}

	.current-select {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 32rpx;
		height: 4rpx;
		background: linear-gradient(129deg, #00cdec 0%, #00ed7d 92%);
		border-radius: 200rpx 200rpx 0rpx 0rpx;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.tab-img {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
	}

	.tab-img-un {
		display: inline-block;
		width: 26rpx;
		height: 26rpx;
	}

	.nomal-tab {
		font-size: 26rpx;
		font-weight: 400;
		color: #696d70;
	}

	.selected-tab {
		font-weight: 500;
		font-size: 32rpx;
		color: #2d3033;

	}



	.sticky-view {

		position: sticky;
		position: -webkit-sticky;
		left: 0;
		right: 0;
		background-color: white;
	}

	.tab-list {
		height: 64rpx;
		line-height: 64rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;

	}

	.goods-list {
		display: flex;
		margin-top: 24rpx;
		width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;

		.item {
			margin-top: 16rpx;
			flex-shrink: 0;
			width: 343rpx;
			height: 520rpx;
			border-radius: 18rpx;
			border: 1rpx solid #e6eaed;
			margin-left: 21.3rpx;
			position: relative;
			overflow: hidden;

			.img {
				width: 100%;
				height: 343rpx;
			}

			.price {
				margin-bottom: 28rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #939699;
				line-height: 26rpx;

				.amount {
					font-size: 40rpx;
					font-weight: 400;
					color: #2b2f33;
					line-height: 42rpx;
				}

				.ex {
					font-size: 24rpx;
					font-weight: 400;
					color: #2b2f33;
					line-height: 26rpx;
				}
			}

			.info {
				padding: 0 24rpx;
				display: flex;
				flex-direction: column;
				height: 177rpx;

				.title {
					margin-top: 10rpx;
					font-size: 28rpx;
					font-weight: 600;
					color: #2b2f33;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; //这个代表你要在几行显示省略号
					-webkit-box-orient: vertical;
				}

				.tip {
					display: inline-block;
					height: 30rpx;
					line-height: 30rpx;
					margin-right: 10rpx;
					width: 60rpx;
					border-radius: 4rpx;
					border: 1rpx solid #00bfb6;
					text-align: center;
					font-weight: 500;
					color: #00bfb6;
					font-size: 20rpx;
				}

				.tip:before,
				.tip:after {
					display: inline-block;
					vertical-align: middle;
					content: "";
					height: 100%;
				}
			}
		}
	}
</style>
