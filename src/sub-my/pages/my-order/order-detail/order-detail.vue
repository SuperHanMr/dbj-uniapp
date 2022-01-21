<template>
  <view class="container">
    <custom-navbar
      :opacity="scrollTop/100"
      :title="headerTitle"
    >
      <template v-slot:back>
        <i class="icon-ic_cancel_white back-icon"
          :style="{color: (scrollTop/100>1)?'black':'white'}"
          @click="toBack"
        ></i>
      </template>
    </custom-navbar>

    <!-- 订单详情  已关闭页面 -->
    <view class="order-container" v-if="type =='close'" :style="{paddingBottom:systemBottom}">
      <view style="position: relative;">
        <view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}" />
        <view :style="{height:navBarHeight}"></view>
        <view class="order-status">
          <!-- <view class="status1">
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_failed.svg" mode="" />
            <view class="text">已关闭</view>
          </view> -->
					<view class="status1">
					  <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_order_success.svg" mode=""/>
					  <view class="text">已完成</view>
					</view>
        </view>
				<!-- <view class="order-status">
				  <view class="status">
				    <image
				      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/ic_status_wait_pay.svg"
				      mode="scaleToFill"
				    />
				    <view class="text">待付款</view>
				  </view>
				  <view
				    class="time"
				    v-if="orderInfo.showCancelOrderTime"
				  >
				    <text style="margin-right: 16rpx;">剩余支付时间</text>
				    <count-down
				      class="countStyle"
				      :start="orderInfo.remainTime"
				      @finish="goToCancelDetail"
				    ></count-down>
				  </view>
				</view> -->
      </view>
      <order-user-base-info v-if="orderInfo.customerName && orderInfo.customerPhone && orderInfo.estateInfo" :data="orderInfo"></order-user-base-info>
      
			<view class="body" v-for="(item2,index2) in orderInfo.details" :key="index2">
				<view class="header">
          <view class="header-content">
            <view v-if="orderInfo.type !==5" class="storeName" @click="gotoShop(item2)" >{{item2.storeName}}</view>
            <view v-else class="storeName" >{{orderInfo.orderName}}</view>
						<image v-if="orderInfo.type !==5 " src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode=""/>
          </view>
          <view class="icon"></view>
        </view>
        <view v-for="item3 in item2.details" :key="item3.id" >
          <order-item
						v-if="item3.type !== 5"
            :dataList="item3"
            @handleDetail="productDetail(item3)"
          />
          <store-calue-card-item :dataInfo="item3" :showActualPay="true" v-else />
        </view>
      </view>
			
			<!-- 已关闭订单信息 -->
      <!-- <order-price
        :data="orderInfo"
        :orderFailed="true"
      />
      <order-info
        v-if="orderInfo.orderNo"
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
        :cancelTime="orderInfo.cancelTime"
        :showCancelTime="true"
        :payChannel="orderInfo.payChannel"
      /> -->
			<!-- 已完成订单信息 -->
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
			
				<view class="refundOrderStatus" style="color:#FA4D32;" v-if="orderInfo.refundBillStatus == 5"
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
    <expenses-toast
      ref='expensesToast'
      :expensesType="expensesType"
    />
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
import { getRefundDetail, getOrderDetail,cancelRefund } from "@/api/order.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      scrollTop: 0,
      headerTitle: "订单详情",
			
      type: "close", //type:refund退款详情   close是订单关闭
      id: -1,
      status: "", //退款状态 0待确认 1退款中 2退款完成 3已拒绝 4已取消 5退款失败  退款处理中(0,1) 退款成功(2) 退款关闭(3,4)"
      from: "",
      showReApply: false,//重新申请
			showContactCustomer:false,//联系客服

      orderInfo: {},
      expensesType: 0,

      systemBottom: "",
      containerPaddingBottom: "",
      title: "",
      areaId: "",
      navBarHeight: "",
      bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/decorate/order_bg.png",
    };
  },

  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.containerPaddingBottom = menuButtonInfo.bottom + 112 + "rpx";
    console.log(this.systemBottom);
  },
  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },
  onLoad(e) {
    this.type = e.type;
    this.id = Number(e.id);
    this.status = Number(e.status);
    this.from = e.from;
    // 获取胶囊按钮的位置
    const systemInfo = uni.getSystemInfoSync();
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.navBarHeight =
      menuButtonInfo.top +
      (menuButtonInfo.top - systemInfo.statusBarHeight) +
      menuButtonInfo.height +
      "px";
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
    if (this.type == "close") {
      //订单关闭页面
      this.headerTitle = "订单详情";
      this.orderDetail();
      const currentHouse = getApp().globalData.currentHouse;
      console.log("currentHouse=", currentHouse);
      this.areaId = currentHouse.areaId;
    }
  },

  methods: {
    orderDetail() {
      console.log("订单完成页面");
      getOrderDetail({ id: this.id }).then((e) => {
        this.orderInfo = e;
        console.log("获取详情数据data=", this.orderInfo);
      });
    },

    // 改变返回下一个页面的路径
    toBack() {
      if (this.from == "waitPay") {
        uni.redirectTo({
          url: `../my-order?index=1&firstEntry=true`,
        });
      } else if (this.from == "inprogress") {
        uni.redirectTo({
          url: `../my-order?index=2&firstEntry=true`,
        });
      } else if(this.from == "multiple"){
				uni.redirectTo({
					 url: `../my-order?index=4&firstEntry=true`,
				})
			}
			else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },

    readExpenses(num) {
      this.expensesType = num;
      this.$refs.expensesToast.showPupop();
    },

  
    // 跳转到商品详情页面
    productDetail(item, type) {
      console.log("item=", item, "type=", type);
      uni.navigateTo({
				url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
			});
    },
    // 跳转到店铺页面
    gotoShop(item) {
      console.log("去店铺首页！！！！");
      uni.navigateTo({
        url: `../../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`,
      });
    },
    // 联系客服
    contactCustomer() {
      //跳转到客服的页面
      console.log("联系客服");
      this.$store.dispatch("openCustomerConversation");
    },
    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
		
		
		
		
		// 已完成页面独有的接口
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
.bgcStyle {
  width: 100%;
  // height: 32rpx;
	height: 116%;
  position: absolute;
  bottom: -32rpx;
  z-index: -1;
}
.back-icon {
  color: white;
  font-size: 40rpx;
  padding: 20rpx;
}

.container {
  .order-container {
    width: 100%;
    height: 100%;
    overflow: auto;
		.order-status {
      width: 100%;
      // height: 140rpx;
      color: #ffffff;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .status,.status1 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 8rpx;
        image {
          width: 64rpx;
          height: 64rpx;
					display: block;
          margin-right: 12rpx;
        }
        .text {
					height: 64rpx;
					line-height: 62rpx;
          font-size: 40rpx;
          font-weight: 500;
          color: #ffffff;
        }
      }
			.status1{
				margin-bottom: 32rpx;
			}

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        font-weight: 400;
				margin-bottom: 32rpx;
      }
    }

    .order-header {
      margin-bottom: 16rpx;
      padding: 32rpx;
      background: #ffffff;
      border-radius: 20rpx;
      color: #333333;
      box-sizing: border-box;
      display: flex;
      flex: 1;
      flex-flow: row nowrap;
      justify-content: flex-start;
      image {
        width: 32rpx;
        height: 32rpx;
        object-fit: cover;
        margin: 8rpx 16rpx 0 0;
      }
      .cancel-text {
        color: #333333;
        font-size: 30rpx;
        line-height: 46rpx;
        word-wrap: break-word;
        word-break: break-all;
      }
      .failed-text {
        color: #ff3347 !important;
      }
    }

     .body {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;
      .header {
        margin-bottom: 32rpx;
        display: flex;
        justify-content: space-between;
        .header-content {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .storeName {
						height: 40rpx;
						color: #333333;
            font-weight: 500;
            max-width: 476rpx;
            font-size: 28rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
        .icon {
          width: 1rpx;
        }
      }
    }

    .contact-service {
      margin-top: 16rpx;
      background-color: #ffffff;
      padding: 38rpx 32rpx;
      border-radius: 24rpx;
      font-size: 26rpx;
      height: 112rpx;
      text-align: center;
      box-sizing: border-box;
    }
  }
}

// 底部 联系客服 及重新申请按钮
.contact-customer-Reapply {
  position: fixed;
  bottom: 0;
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 20rpx 32rpx;
  .Reapply {
    margin-left: 32rpx;
    width: 184rpx;
    height: 72rpx;
    line-height: 72rpx;
    box-sizing: border-box;
    background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
    border-radius: 12rpx;
    font-size: 28 rpx;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
  }
  .contact-customer {
    width: 184rpx;
    height: 72rpx;
    line-height: 72rpx;
    box-sizing: border-box;
    text-align: center;
    background: #ffffff;
    border-radius: 12rpx;
    color: #111111;
    font-size: 28 rpx;
    font-weight: 500;
    border: 0.5rpx solid #eaeaea;
  }
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
  padding: 30rpx 32rpx 26rpx 32rpx;
  .applyforRefund {
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
  color: #FA4D32 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}

::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
