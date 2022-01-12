<template>
	<view style="background-color: #FFF;">
		<custom-navbar :opacity="scrollTop/100" title="找设计" bgcolor="#FFF">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white header-back" :style="{color: (scrollTop/100>1)?'black':'white'}">
					</i>
				</view>
			</template>
		</custom-navbar>
		
		<view class="top-bg">
			<view class="pleaholder">
			</view>
		</view>
		<view class="sticky-view" :style="{top:navBarHeight}">
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
		<design-list ref="designList"></design-list>

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
		</view>
 -->
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
				goodsList: []
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

<style lang="scss">
	page {
		background: #FFF;
	}
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

	.top-bg {
		width: 100%;
		height: 420rpx;
		background: url("https://ali-image.dabanjia.com/static/mp/dabanjia/images/home/find_design_bg.png");
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
