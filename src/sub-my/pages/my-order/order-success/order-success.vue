<template>
  <view class="container">
    <custom-navbar
      :opacity="scrollTop/100"
      :title="headerTitle"
    >
      <template v-slot:back>
        <i
          class="icon-ic_cancel_white back-icon"
          :style="{color: (scrollTop/100>1)?'black':'white'}"
          @click="toBack"
        ></i>
      </template>
    </custom-navbar>

    <!-- 退款成功 -->
    <view class="order-container" v-if="type=='refund'" :style="{paddingBottom:systemBottom}">
      <view style="position: relative;">
        <view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"/>
        <view :style="{height:navBarHeight}"></view>
        <view class="order-status">
          <view class="status">
            <image src="../../../static/ic_order_success.svg" mode=""/>
            <text>退款成功</text>
          </view>
          <text class="time">{{refundInfo.createTime | formatDate}}</text>
        </view>
      </view>

      <view class="order-header1">
        <view class="refund-price">
          <text>退款总金额</text>
          <view style="color:#FF3347;">
            <text style="font-size:26rpx;">￥</text>
            <text style="font-size:40rpx;" class="price-font" >
							{{handlePrice(refundInfo.refundAmount)[0]}}.
						</text>
            <text  style="font-size:26rpx;" class="price-font">
							{{handlePrice(refundInfo.refundAmount)[1]}}
						</text>
          </view>
        </view>
				<!-- 储值卡需求 -->
				<view class="router" v-if="refundInfo.deductedAmount" :style="{marginBottom:(refundInfo.weChatRefundedAmount || refundInfo.cardRefundedAmount)?'16rpx':'0'}">
				  <text  style="color: #999999;font-size: 26rpx;">变更单抵扣</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.deductedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.deductedAmount)[1]}}
						</text>
				  </view>
				</view>
				<view class="router" v-if="refundInfo.cardRefundedAmount" :style="{marginBottom:refundInfo.weChatRefundedAmount?'16rpx':'0'}">
				  <text  style="color: #999999;font-size: 26rpx;">原路径退回至储值卡</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.cardRefundedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.cardRefundedAmount)[1]}}
						</text>
				  </view>
				</view>
        <view class="router" v-if="refundInfo.weChatRefundedAmount" :style="{marginBottom:refundInfo.couponRefundedAmount?'16rpx':'0'}" >
          <text style="color: #999999;font-size: 26rpx;">原路径退回至原账户</text>
          <view>
            <text style="font-size: 20rpx;">￥</text>
            <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.weChatRefundedAmount)[0]}}.
						</text>
            <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.weChatRefundedAmount)[1]}}
						</text>
          </view>
        </view>
				<!-- 优惠卡需求 -->
				<view class="router" v-if="refundInfo.couponRefundedAmount"  style="margin-bottom: 0">
				  <text  style="color: #999999;font-size: 26rpx;">退回优惠券</text>
				  <view>
				    <text style="font-size: 20rpx;">￥</text>
				    <text style="font-size:28rpx;" class="price-font">
							{{handlePrice(refundInfo.couponRefundedAmount)[0]}}.
						</text>
				    <text style="font-size:20rpx;" class="price-font" >
							{{handlePrice(refundInfo.couponRefundedAmount)[1]}}
						</text>
				  </view>
				</view>
      </view>

      <view class="body1" v-for="item1 in refundInfo.detailAppVOS" :key="item1.id">
        <order-item
					v-if="refundInfo.type !==5"
          :dataList="item1"
          :orderType="2"
          :refundType="true"
          @handleDetail="productDetail(item1,'refund')"
        />
				<store-calue-card-item
					v-else
					:dataInfo="item1"
				/>
      </view>
			<order-refund-info :refundInfo="refundInfo"></order-refund-info>
    </view>

    <!-- 订单完成页面 -->
    <view class="order-container" v-if="type == 'complete'" :style="{paddingBottom:systemBottom}">
      <view  style="position: relative;">
        <!-- 占位 -->
        <view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}" />
        <view :style="{height:navBarHeight}"></view>
        <view class="order-status">
          <view class="status">
            <image src="../../../static/ic_order_success.svg" mode=""/>
            <text>已完成</text>
          </view>
        </view>
      </view>

			<order-user-base-info
			 v-if="orderInfo.customerName && orderInfo.customerPhone && orderInfo.estateInfo"
			 :data="orderInfo"
		 />

      <view class="body2">
        <view class="part1" v-for="(item2,index2) in orderInfo.details" :key="index2" >
          <view class="header">
            <view class="header-content" v-if="orderInfo.type !==5 ">
              <text style="color: #333333;"  @click="gotoShop(item2)" >
								{{item2.storeName}}
							</text>
              <image src="../../../static/ic_more.svg" mode=""/>
            </view>
						<view class="header-content" v-else>
						  <text style="color: #333333;" >
								{{orderInfo.orderName}}
							</text>
						</view>
            <view class="icon"></view>
          </view>

          <view v-for="item3 in item2.details" :key="item3.id" class="orederItem" >
            <order-item
							v-if="item3.type !==5"
              :dataList="item3"
              :orderStatus="3"
              @handleDetail="productDetail(item3)"
            />

						<store-calue-card-item :dataInfo ="item3" v-else/>
          </view>
        </view>
      </view>

      <order-price :data="orderInfo" />

      <order-info
        v-if="orderInfo.orderNo"
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
        :showPayTime="true"
				:payChannel="orderInfo.payChannel"
        :payTime="orderInfo.payTime"
        :showPayType="true"
      />

      <view v-if=" orderInfo.showRefundBtn " class="applyforRefund-container" :style="{paddingBottom:systemBottom,}">
        <view class="applyforRefund" @click="toApplayForRefund(orderInfo,2)" >
          申请退款
        </view>
			</view>

			<!-- 申请售后的按钮 -->
			<view v-if="orderInfo.showApplyAfterSalesBtn" class="applyforRefund-container" :style="{paddingBottom:systemBottom,}">
			  <view class="applyforRefund" @click="toApplyForAfterSales()" >
			    申请售后
			  </view>
			</view>

			<view class="applyforRefund-confirmReceipt2" :style="{paddingBottom:systemBottom}"
				v-if="!orderInfo.showRefundBtn && orderInfo.refundApplyMode == 2 && (orderInfo.stockType == 0 || orderInfo.type == 5)">

				<view class="refundOrderStatus"
					v-if="orderInfo.refundBillStatus == 0 || (orderInfo.refundBillStatus == 1 && orderInfo.type == 5)"
					@click="refundCancel(orderInfo)">
					取消退款
				</view>

				<view class="refundOrderStatus" v-if="orderInfo.refundBillStatus == 2"
					@click="refundSuccess(orderInfo)">
					退款成功
				</view>

				<view class="refundOrderStatus" style="color:#FF3347;" v-if="orderInfo.refundBillStatus == 5"
					@click="refundFailed(orderInfo)">
					退款失败
				</view>
				<!-- shipmentStatus 发货状态（0待发货 1待收货 2已收货） -->
				<view class="refundOrderStatus"
					v-if="(orderInfo.refundBillStatus == 3 || orderInfo.refundBillStatus == 4) && (orderInfo.type ==5 && orderInfo.shipmentStatus == -1 )"
					@click="refundClose(orderInfo)">
					退款关闭
				</view>
      </view>
    </view>
		<!-- 取消退款的弹框 -->
		<popup-dialog
			ref="cancelRefund"
			:title="title"
			@close="cancelRefundClose"
			@confirm="cancelRefundConfirm"
		/>
  </view>
</template>

<script>
import { formatDate } from "../../../../utils/common.js";
import { getRefundDetail, getOrderDetail ,cancelRefund} from "@/api/order.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      type: "complete", //type:refund退款详情   complete是订单完成
      id: -1,
      status: "",

      refundInfo: {},
      orderInfo: {},

      systemBottom: "",
      areaId: "",
      navBarHeight: "",
      scrollTop: 0,
      headerTitle: "",
			title:"",
      bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png",
    };
  },

  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    console.log(this.systemBottom);
  },

  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },

  onLoad(e) {
    this.type = e.type;
    console.log("页面显示类型 this.type=", this.type);
    this.id = Number(e.id);
    console.log("退款单id=", this.id);
    // this.status = e.status?Number(e.status):"";

    const currentHouse = getApp().globalData.currentHouse;
    this.areaId = currentHouse.areaId;
    const systemInfo = uni.getSystemInfoSync();
    //状态栏高度
    this.tophight = systemInfo.statusBarHeight + "px";
    // 获取胶囊按钮的位置
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.navBarHeight =
      menuButtonInfo.top +
      (menuButtonInfo.top - systemInfo.statusBarHeight) +
      menuButtonInfo.height +
      "px";
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#23d5c6",
      animation: {
        duration: 400,
        timingFunc: "easeIn",
      },
    });
  },
	onShow() {
		if (this.type == "complete") {
		  //订单完成页面
		  this.headerTitle = "订单详情";
		  this.orderDetail();
		}

		if (this.type == "refund") {
		  //退款成功页面
		  this.headerTitle = "退款详情";
		  console.log("退款成功页面");
		  this.refundDetail();
		}
	},


  methods: {
    orderDetail() {
      console.log("订单完成页面", this.id);
      getOrderDetail({
        id: this.id,
      }).then((e) => {
        this.orderInfo = e;
        console.log("获取详情数据data=", this.orderInfo);
      });
    },
    toBack() {
      uni.navigateBack({
        delta: 1,
      });
    },

    refundDetail() {
      getRefundDetail({
        id: this.id,
      }).then((e) => {
        this.refundInfo = e;
        console.log("获取详情数据data=", this.refundInfo);
      });
    },
    // 申请退款
    toApplayForRefund(data, type) {
      // wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
			uni.navigateTo({
        url: `/sub-my/pages/apply-for-refund/apply-for-refund?orderId=${this.id}&type=whole&status=2&applyMode=2`,
      });
    },
		toApplyForAfterSales(){
			console.log("申请售后 跳转到客服聊天页面")
			this.$store.dispatch("openCustomerConversation");
		},

    handlePrice(price) {
      if (!price) return ["0", "00"];
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },

    // 跳转到商品详情页面
    productDetail(item, type) {
      console.log("item=", item, "type=", type);
      if (type == "refund") {
        uni.navigateTo({
          url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.relationId}`,
        });
      } else {
        uni.navigateTo({
          url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
          // url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=1382`,
        });
      }
    },

    // 跳转到店铺页面
    gotoShop(item2) {
      console.log("去店铺首页！！！！", item2);
			if(item2.type==5)return
      console.log("item.storeId=", item2.storeId, "this.areaId=", this.areaId);
      uni.navigateTo({
        url: `../../../../sub-classify/pages/shops/shops?storeId=${item2.storeId}&areaId=${this.areaId}`,
      });
    },

		// 取消退款
		refundCancel(item) {
			this.itemId = item.refundId;
			this.title = "确定要取消本次申请退款？";
			this.$refs.cancelRefund.open();
		},
		cancelRefundClose() {
			this.$refs.cancelRefund.close();
		},
		cancelRefundConfirm() {
			cancelRefund({
				id: this.itemId,
			}).then(() => {
				this.$refs.cancelRefund.close();
				this.orderDetail();
			});
		},
		// 申请退款成功
		refundSuccess(item) {
			uni.navigateTo({
				url: `../order-success/order-success?type=refund&id=${item.refundId}`,
			});
		},
		refundFailed(item) {
			console.log("item数据=", item, "测试");
			const showReApply = item.shipmentStatus !== 2 ? true : false;
			console.log("showReApply=", showReApply);
			uni.navigateTo({
				url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
			});
		},

		refundClose(item) {
			console.log("item数据=", item);
			const showReApply = item.shipmentStatus !== 2 ? true : false;
			console.log("showReApply=", showReApply);
			uni.navigateTo({
				url: `../order-failed/order-failed?type=refund&id=${item.refundId}&showReApply=${showReApply}&status=${item.refundBillStatus}`,
			});
		},
  },
};
</script>

<style lang="scss" scoped>
.container {
  .back-icon {
    color: white;
    font-size: 40rpx;
    padding: 20rpx;
  }
  .bgcStyle {
    width: 100%;
		height: 116%;
    // height: 32rpx;
    position: absolute;
    bottom: -32rpx;
    z-index: -1;
  }
  .order-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    .order-status {
      width: 100%;
      height: 140rpx;
      color: #ffffff;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .status {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;

        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-right: 12rpx;
        }

        text {
          font-size: 48rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        font-weight: 400;
      }
    }

    .order-header1 {
      background: #ffffff;
      border-radius: 20rpx;
      padding: 32rpx;
      color: #333333;
      font-size: 30rpx;
      box-sizing: border-box;
      flex: 1;
      margin-bottom: 16rpx;

      .refund-price{
				display: flex;
				flex: 1;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 16rpx;
			}
      .router {
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16rpx;
      }
    }

    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
    }

    .body2 {
      background: #ffffff;
      border-radius: 24rpx;

      .part1 {
        padding: 32rpx 32rpx 0;
        border-radius: 24rpx 24rpx 0 0;
        background: #ffffff;

        .header {
          margin-bottom: 32rpx;
          display: flex;
          justify-content: space-between;
          .header-content {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            text {
              font-weight: 500;
              max-width: 476rpx;
              font-size: 28rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            image {
              width: 34rpx;
              height: 34rpx;
              object-fit: cover;
            }
          }
          .icon {
            width: 1rpx;
          }
        }

        .price-special {
          padding: 16rpx 0 34rpx;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;

          .button {
            width: 160rpx;
            height: 56rpx;
            line-height: 56rpx;
            text-align: center;
            background: #ffffff;
            color: #111111;
            font-size: 24rpx;
            border-radius: 16rpx;
            border: 2rpx solid #eaeaea;
          }
        }
      }
    }

    .refund-info {
      display: flex;
      flex-flow: column nowrap;
      padding: 32rpx;
      border-radius: 24rpx;
      background: #ffffff;
      color: #333333;

      .header {
        font-size: 30rpx;
        font-weight: 1000;
        height: 48rpx;
        line-height: 48rpx;
        margin-bottom: 16rpx;
      }

      .item {
        font-size: 28rpx;
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-bottom: 16rpx;

        .item-header {
          width: 140rpx;
          height: 40rpx;
          line-height: 40rpx;
          color: #999999;
          display: block;
          flex: 1;
        }

        .item-body {
          width: 546rpx;
          line-height: 40rpx;
          display: flex;
          flex-flow: row nowrap;
        }
      }

      .item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
}

.copy-style {
  display: block;
  width: 72rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 8rpx;
  text-align: center;
  border: 2rpx solid #eaeaea;
  font-size: 20rpx;
  color: #111111;
}

// 底部 确认收货 及申请退款按钮
.applyforRefund-container,
.applyforRefund-confirmReceipt2 {
  position: fixed;
  bottom: 0;
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 12rpx 32rpx;

  .applyforRefund {
    margin: 18rpx 0;
    box-sizing: border-box;
    width: 160rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    background: #ffffff;
    border-radius: 16rpx;
    color: #111111;
    font-size: 24rpx;
    border: 2rpx solid #eaeaea;
  }
}
.applyforRefund-confirmReceipt2 {
		padding-top: 30rpx;

		.refundOrderStatus {
			width: 160rpx;
			height: 56rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 16rpx;
			border: 2rpx solid #eaeaea;
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
		}
	}

// 弹框样式
::v-deep .uni-popup-dialog {
  width: 560rpx !important;
  border-radius: 24rpx !important;
  background-color: #fff !important;
}

::v-deep .uni-dialog-title-text {
  color: #111111 !important;
  font-size: 32rpx !important;
  font-weight: 550 !important;
}

::v-deep .uni-dialog-title {
  padding: 48rpx 0 !important;
}

::v-deep .uni-dialog-content {
  display: none !important;
}

::v-deep .uni-dialog-button-group {
  border-top: 2rpx solid #f5f5f5;
}

::v-deep .uni-dialog-button {
  height: 82rpx !important;
}

::v-deep .uni-button-color {
  color: #ff3347 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}

::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
