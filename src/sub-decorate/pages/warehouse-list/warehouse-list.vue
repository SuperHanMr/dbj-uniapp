<template>
	<view class="fill">
		<view class="top-tab">
			<view v-for="(item,index) in tabList" :key="item.id" class="item" :class="{selected:index==currentIndex}"
				@click="currentIndex=index">
				<view class="tab-text">
					{{item}}
				</view>
				<view class="bottom-icon" />
			</view>
		</view>
		<swiper class="swiper" :current="currentIndex" :duration="200" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item,tabindex) in tabList" :key="item">
				<scroll-view class="scroll-view" :enable-back-to-top="true" scroll-y="true" lower-threshold="10"
					refresher-background="#FFF" refresher-enabled="true" :refresher-triggered="triggered"
					@scroll="onScroll" @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">

					<view v-if="currentList.length==0" class="no-list-content">
						<image class="no-list" src="../../../static/order/blank_house@2x.png" mode=""></image>
						<view class="tip-text">
							您还没有任何数据~
						</view>
					</view>

					<warehouse-item v-for="(item,index) in currentList" :item="item" :key="item.id" @detail="toDetail"
						@refund="toRefund" @confirmGoods="onConfirmGoods" :showRecived="currentIndex==1&&ownered"
						:showBacking="currentIndex==3&&ownered" :showPrePrice="currentIndex==3" :showSubCount="currentIndex!=3" :showDetail="currentIndex==3">
					</warehouse-item>
					<view v-if="currentIndex==0" style="height: 200rpx;">
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<bottom-btn v-if="currentIndex==0&&list0.length&&ownered" btnContent="要货" @submit="toRequire"></bottom-btn>
	</view>
</template>

<script>
	import {
		deliveredList,
		reimburseList,
		receivedList,
	} from "../../../api/order.js";
	import {
		confirmGoods,
		judgeOwner
	} from "../../../api/decorate.js";
	export default {
		data() {
			return {
				projectId: "0",
				list0: [],
				list1: [],
				list2: [],
				list3: [],
				tabList: ["待发货", "待收货", "已收货", "退款"],
				lastId: ["", "", "", ""],
				triggered: false, //控制刷新显示字段
				currentIndex: 0,
				refreshIndex: -1,
				ownered:false
			};
		},
		computed: {
			currentList() {
				if (this.currentIndex == 0) {
					return this.list0;
				} else if (this.currentIndex == 1) {
					return this.list1;
				} else if (this.currentIndex == 2) {
					return this.list2;
				} else {
					return this.list3;
				}
			},
		},
		onLoad(e) {
			if (e && e.projectId) {
				this.projectId = e.projectId;
				judgeOwner({projectId:this.projectId}).then(e=>{
					this.ownered=e.ownered
				})
			}
			if (e && e.type) {
				this.currentIndex = Number(e.type);
			}

			if (this.currentIndex == 0) {
				this.getList(true);
			}
		},
		onShow() {
			// this.onRefresh()
		},
		methods: {
			onConfirmGoods(item) {
				let vm = this;
				uni.showModal({
					title: "是否确认收货?",
					success: function(res) {
						if (res.confirm) {
							confirmGoods({
								id: item.id,
							}).then((e) => {
								uni.showToast({
									title: "确认收货成功",
									icon: "none",
								});
								vm.onRefresh();
							});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
			toDetail(e) {
				let id;
				if (this.currentIndex == 0) {
					id = e.orderId;
				} else {
					id = e.id;
				}
				if (this.currentIndex != 3) {
					uni.navigateTo({
						url: `/sub-decorate/pages/warehouse-refund-detail/warehouse-refund-detail?type=${this.currentIndex}&id=${id}&projectId=${this.projectId}&stockStatus=${e.stockStatus}`,
					});
				} else {
					uni.navigateTo({
						url: `/sub-decorate/pages/warehouse-refund-state/warehouse-refund-state?type=${this.currentIndex}&id=${id}&projectId=${this.projectId}&stockStatus=${e.stockStatus}`,
					});
				}
			},
			toRequire() {
				getApp().globalData.naviData=[]
				uni.navigateTo({
					url: `/sub-decorate/pages/require-goods/require-goods?projectId=${this.projectId}`,
				});
			},
			toRefund() {
				getApp().globalData.naviData = {};
				uni.navigateTo({
					url: "/sub-decorate/pages/warehouse-refund/warehouse-refund?projectId=${this.projectId}",
				});
			},
			onScroll(e) {},
			swiperChange(e) {
				let index = e.target.current || e.detail.current;
				this.currentIndex = index;
				if (this.currentIndex == 0 && this.list0.length) {
					return;
				}
				if (this.currentIndex == 1 && this.list1.length) {
					return;
				}
				if (this.currentIndex == 2 && this.list2.length) {
					return;
				}
				if (this.currentIndex == 3 && this.list3.length) {
					return;
				}
				this.getList(false);
			},
			getList(isRefresh) {
				if (this.lastId[this.currentIndex] == "-1") {
					return;
				}
				let params = {};
				params.projectId = this.projectId;
				params.rows = 10;
				if (this.lastId[this.currentIndex]) {
					params.lastId = this.lastId[this.currentIndex];
				}
				if (this.currentIndex == 0) {
					deliveredList(params)
						.then((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
							if (e.length) {
								this.lastId[this.currentIndex] = e[e.length - 1].orderId;
								e.forEach(item=>{
									item.stockAppVOS.forEach(subItem=>{
										subItem.number=subItem.stockNumber;
									})
								})
								console.log(e)
								this.list0 = this.list0.concat(e);
							} else {
								if (this.lastId[this.currentIndex]) {
									this.lastId[this.currentIndex] = "-1";
								}
							}
						})
						.catch((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
						});
				} else if ([1, 2].includes(this.currentIndex)) {
					params.status = this.currentIndex + 1;
					receivedList(params)
						.then((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
							if (e.length) {
								this.lastId[this.currentIndex] = e[e.length - 1].id;
								if (this.currentIndex == 1) {
									this.list1 = this.list1.concat(e);
								}
								if (this.currentIndex == 2) {
									this.list2 = this.list2.concat(e);
								}
							} else {
								if (this.lastId[this.currentIndex]) {
									this.lastId[this.currentIndex] = "-1";
								}
							}
						})
						.catch((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
						});
				} else {
					reimburseList(params)
						.then((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
							if (e.length) {
								this.lastId[this.currentIndex] = e[e.length - 1].id;
								this.list3 = this.list3.concat(e);
							} else {
								if (this.lastId[this.currentIndex]) {
									this.lastId[this.currentIndex] = "-1";
								}
							}
						})
						.catch((e) => {
							if (isRefresh) {
								this.triggered = false;
								this.refreshIndex = -1
							}
						});
				}
			},
			onLoadMore() {
				this.getList(false);
			},
			onRefresh() {
				if (this.refreshIndex == -1) {
					this.refreshIndex = this.currentIndex;
				} else {
					return
				}
				this.triggered = true;
				this.lastId[this.currentIndex] = "";
				if (this.currentIndex == 0) {
					this.list0 = [];
				}
				if (this.currentIndex == 1) {
					this.list1 = [];
				}
				if (this.currentIndex == 2) {
					this.list2 = [];
				}
				if (this.currentIndex == 3) {
					this.list3 = [];
				}
				this.getList(true);
			},
		},
	};
</script>

<style scoped lang="scss">
	.no-list-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.no-list {
		width: 248rpx;
		height: 248rpx;
	}

	.tip-text {
		margin-top: 24rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
	}

	.fill {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		// overflow-y: hidden;
	}

	.item {
		width: 100%;
		height: 96rpx;
		color: #999999;
		font-size: 30rpx;
		position: relative;

		.tab-text {
			width: 150rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
		}
	}

	.top-tab {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 96rpx;
		background-color: #ffffff;

		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #999999;
		}

		.selected {
			color: #111111;
			font-weight: 500;
			font-size: 30rpx;

			.bottom-icon {
				position: absolute;
				width: 32rpx;
				height: 4rpx;
				background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
				border-radius: 200rpx 200rpx 0px 0px;
				bottom: 10rpx;
				left: 50%;
				margin-left: -16rpx;
			}
		}
	}


	.swiper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.swiper-item {
		height: 100%;
		overflow: auto;
	}

	.scroll-view {
		flex: 1;
		height: 100%;
	}
</style>
