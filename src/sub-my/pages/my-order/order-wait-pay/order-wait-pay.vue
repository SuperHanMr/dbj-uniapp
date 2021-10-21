<template>
  <view class="container">
		<custom-navbar :opacity="scrollTop/100" :title="headerTitle">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: (scrollTop/100>1)?'black':'white'}"
					@click="toBack"></i>
			</template>
		</custom-navbar>


    <view class="order-container" :style="{paddingBottom:112+containerBottom+'rpx'}">
			<view style="position: relative;" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<view class="bgcStyle" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"/>
				<view :style="{height:navBarHeight}"></view>
				<view class="order-status">
					<view class="status">
						<image src="../../../static/ic_status_wait_pay.svg" mode="scaleToFill"/>
						<text>待付款</text>
					</view>
					<view class="time" v-if="orderInfo.showCancelOrderTime" >
						<text style="margin-right: 16rpx;">剩余支付时间</text>
						<count-down :start="orderInfo.remainTime" @finish="goToCancelDetail"></count-down>
					</view>
				</view>
			</view> 

			<order-user-base-info :data="orderInfo"></order-user-base-info>
			
      <view class="store-container" v-for="(item,index) in orderInfo.details" :key="index">
				<view v-if="index > 0" style="height:0.5px;margin: 0 32rpx;background-color: #EBEBEB;" />
        <view class="storeItem" :class="{paddingBottom: item.stockType == 1 }" :style="{borderRadius:index >= 1 ? '0' :'24rpx 24rpx 0 0'}">
          <view class="header" @click="gotoShop(item)">
            <text style="color: #333333;">{{item.storeName}}</text>
            <image src="../../../static/ic_more.svg" mode=""/>
          </view>
          <view v-for="item2 in item.details" :key="item2.id">
            <order-item
              :orderStatus="1"
              :dataList="item2"
              @handleDetail="productDetail(item2)"
            />
          </view>

          <view class="discount-container" v-if="item.showFreight" >
            <view class="left">
              <view class="item" v-if="item.type == 1" >
                <text>运费</text><text>￥{{item.freight?`￥${item.freight}`:"--"}}</text>
              </view>
              <view class="item" v-if="item.platformDiscount">
                <text>平台优惠</text><text>￥{{item.platformDiscount}}</text>
              </view>
            </view>

            <view class="line1" v-if="item.handlingFees || item.storeDiscount" />
            <view class="line2" v-else/>

            <view class="right">
              <view class="item" v-if="item.type == 1">
                <text>搬运费</text><text>{{item.handlingFees?`￥${item.handlingFees}`:"--"}}</text>
              </view>
              <view class="item" v-if="item.storeDiscount">
                <text>商家优惠</text><text>￥{{item.storeDiscount}}</text>
              </view>
            </view>
          </view>

          <view v-if="orderInfo.stockType == 1">
            <view class="tips" v-if="item.freeShipCount || item.fullExemptionAmount ">
              <text>本次支付</text>
              <text style="color: #333333;">满{{item.fullExemptionAmount}}元</text>
              <text>，可获得</text>
              <text style="color: #333333;">{{item.freeShipCount}}次免邮费额度，</text>
              <text>搬运费需要根据实际要货时进行核算</text>
            </view>
            <view class="tips"  v-else >
              <text>搬运费需要根据实际要货时进行核算</text>
            </view>
          </view>
        </view>
        <view class="split-line" />
      </view>

      <order-price
        :data="orderInfo"
        :waitPay="true"
      />

      <view class="payment-method">
        <text>支付方式</text>
        <view class="method">
          <image  src="@/static/order/ic_order_wechat@2x.png" mode="" />
          <text>微信支付</text>
        </view>
      </view>

      <order-info
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
      />

      <!-- 底部按钮 -->
      <view
        v-if="orderInfo.showCancelBtn || orderInfo.showToPayBtn "
        :class="{noCancelBtn:true}"
        class="waitPayBottom"
        :style="{paddingBottom:systemBottom,height:systemHeight,justifyContent:bottomStyle }"
      >
        <view
          class="canclePay"
          v-if="orderInfo.showCancelBtn"
          @click="handleCancelOrder"
        >
          取消订单
        </view>
        <view
          class="gotoPay"
          v-if="orderInfo.showToPayBtn"
          @click="toPay"
        >
          去付款
        </view>
      </view>

    </view>
    <!-- 取消该订单弹框 -->
    <popup-dialog
      ref="cancleOrder"
      :title="title"
      @close="cancelOrderClose"
      @confirm="cancleConfirm"
    >
    </popup-dialog>
  </view>
</template>

<script>
import {
  getOrderDetail,
  orderPay,
  cancelOrder,
  confirmReceiptOrder,
} from "../../../../api/order.js";
export default {
  data() {
    return {
      orderNo: "",
      orderInfo: {},

      systemBottom: "",
      systemHeight: "",
      containerBottom: "",
      title: "您确定要取消该订单吗？",
      areaId: "",
			from:"",
			navBarHeight: "",
			bottomStyle:"",
			scrollTop: 0,
			headerTitle:"",
			bgImg:'http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/order_bg_orange.png'
    };
  },

  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.containerBottom = menuButtonInfo.bottom;
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
    console.log(this.systemBottom);
  },
	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	},
  onLoad(e) {
		this.from= e.from
    this.orderNo = Number(e.orderNo) || getApp().globalData.decorateMsg.orderId;
    const currentHouse = getApp().globalData.currentHouse;
    this.areaId = currentHouse.areaId;

		// 获取胶囊按钮的位置
		const systemInfo = uni.getSystemInfoSync();
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.navBarHeight =
			menuButtonInfo.top +
			(menuButtonInfo.top - systemInfo.statusBarHeight) +
			menuButtonInfo.height +
			"px";
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor:'#ffb245',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})
	},
  onShow() {
		this.headerTitle="订单详情"
    this.orderDetail();
  },
  methods: {
    orderDetail() {
      getOrderDetail({
        id: this.orderNo,
      }).then((e) => {
        console.log(e);
        this.orderInfo = e;
				this.bottomStyle= this.orderInfo.showCancelBtn?'space-between':'flex-end'
        console.log("this.orderInfo=", this.orderInfo);
      });
    },
		// 改变返回下一个页面的路径
		toBack(){
			if(this.from=="waitPayOrder"){
				uni.redirectTo({
					url:"../my-order?firstEntry=true&index=1"
				})
			}else{
				uni.navigateBack({
				    delta: 1
				});
			}
		},

    // 跳转到商品详情页面
    productDetail(item) {
      uni.navigateTo({
        url: `../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`,
      });
    },
    // 跳转到店铺页面
    gotoShop(item) {
      console.log("去店铺首页！！！！");
      console.log("this.storeId=", item.storeId, "this.areaId=", this.areaId);
      uni.navigateTo({
        url: `../../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`,
      });
    },
    // 倒计时间触发到的时间
    goToCancelDetail() {
      uni.redirectTo({
        url: `../order-failed/order-failed?type=close&id=${this.orderNo}&from=waitPay`,
      });
    },

    // 去申请退款页面
    toApplayForRefund() {
      uni.navigateTo({
        url: "/sub-my/pages/apply-for-refund/apply-for-refund",
      });
    },
    // 取消订单
    handleCancelOrder() {
      this.$refs.cancleOrder.open();
    },
    cancelOrderClose() {
      this.$refs.cancleOrder.close();
    },
    cancleConfirm() {
      //点击确定后订单会被取消且该订单会被移入已关闭订单中
      cancelOrder({
        id: this.orderNo,
      }).then((e) => {
        this.$refs.cancleOrder.close();
        uni.redirectTo({
          url: `../order-failed/order-failed?type=close&id=${this.orderNo}&from=waitPay`,
        });
      });
    },

    //去支付
    toPay() {
      // 先判断是否支付超额拆单了 // 拆单之后直接跳转到拆单页面	// 未拆单 直接支付
      console.log(this.orderInfo, "orderInfo.orderId=", this.orderInfo.orderId);
      if (this.orderInfo.isSplitPay) {
        // orderId 是订单id
        uni.navigateTo({
          url: `../multiple-payments/multiple-payments?orderId=${this.orderNo}&type=detail&remainTime=${this.orderInfo.remainTime}`,
        });
      } else {
        let openId = uni.getStorageSync("openId");
        orderPay({
          orderId: this.orderNo,
          payType: 1, //支付类型  1微信支付",
          openid: openId,
        }).then((e) => {
          const payInfo = e.wechatPayJsapi;
          uni.requestPayment({
            provider: "wxpay",
            ...payInfo,
            success(res) {
              uni.showToast({
                title: "支付成功！",
                icon: "none",
                duration: 1000,
              });
              uni.redirectTo({
                url: `../../../../sub-classify/pages/pay-order/pay-success?orderId=${this.orderNo}`,
              });
            },
            fail(e) {
              uni.showToast({
                title: "支付失败",
                icon: "none",
                duration: 2000,
              });
            },
          });
        });
      }
    },

    formatTime(msTime) {
      let time = msTime / 1000;
      let hour = Math.floor(time / 60 / 60);
      if (!hour) {
        hour = 0;
      }
      let minute = Math.floor(time / 60) % 60;
      if (!minute) {
        minute = 0;
      }
      let second = Math.floor(time) % 60;
      console.log("hour=", hour, "minute=", minute, "second=", second);
      return [hour, minute, second];
    },

    handlePrice(price) {
      let list = String(price).split(".");
      if (list.length == 1) {
        return [list[0], "00"];
      } else {
        return [list[0], list[1]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
	.bgcStyle{
		width: 100%; 
		height: 32rpx;
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
  // background-color: skyblue;
  .order-container {
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
      position: relative;

      // .backgroundStyle {
      //   position: absolute;
      //   z-index: -1;
      //   width: 100%;
      //   height: 172rpx;
      //   // background-color: #ffb245;
      // }

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
        font-size: 24rpx;
        font-weight: 400;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }
    }

    .store-container {
      .storeItem {
        padding: 32rpx 32rpx 0;
        background: #ffffff;
        border-radius: 24rpx 24rpx 0 0;

        .header {
          margin-bottom: 32rpx;
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

        .tips {
          background: #f7f7f7;
          border-radius: 16rpx;
          color: #999999;
          font-size: 22rpx;
          padding: 16rpx 24rpx;
          box-sizing: border-box;
        }

        .discount-container {
          padding-bottom: 32rpx;
          display: flex;
          flex-flow: row nowrap;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
          font-size: 22rpx;
          color: #999999;

          .left,
          .right {
            .item {
              width: 302rpx;
              height: 32rpx;
              line-height: 32rpx;
              display: flex;
              flex: 1;
              flex-flow: row nowrap;
              justify-content: space-between;
              margin-bottom: 8rpx;
            }

            .item:nth-last-child(1) {
              margin-bottom: 0;
            }
          }

          .line1 {
            width: 2rpx;
            height: 40rpx;
            background: #ebebeb;
            margin: 16rpx 40rpx;
          }

          .line2 {
            width: 2rpx;
            height: 20rpx;
            background: #ebebeb;
            margin: 6rpx 40rpx;
          }
        }

        .discount-container2 {
          margin-bottom: 24rpx;
          display: flex;
          flex-flow: row nowrap;
          flex: 1;
          align-items: flex-start;
          justify-content: flex-end;
          font-size: 22rpx;
          color: #999999;

          .left,
          .right {
            .item {
              width: 302rpx;
              height: 32rpx;
              line-height: 32rpx;
              display: flex;
              flex: 1;
              flex-flow: row nowrap;
              justify-content: space-between;
              margin-bottom: 8rpx;
            }

            .item:nth-last-child(1) {
              margin-bottom: 0;
            }
          }

          .line {
            width: 2rpx;
            height: 80rpx;
            background: #ebebeb;
            margin: 16rpx 40rpx;
          }
        }
      }

      .paddingBottom {
        padding-bottom: 32rpx !important;
      }
    }

    .payment-method {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      height: 112rpx;
      color: #333333;
      font-size: 30rpx;
      font-weight: 500;
      padding: 32rpx;
      margin-bottom: 16rpx;
      border-radius: 24rpx;
      box-sizing: border-box;

      .method {
        display: flex;
        align-items: center;

        image {
          width: 32rpx;
          height: 32rpx;
          object-fit: cover;
          margin-right: 16rpx;
        }

        text {
          font-size: 28rpx;
        }
      }
    }
  }
}

// 底部 取消支付按钮样式 确认收货 及申请退款按钮
.waitPayBottom {
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 12rpx 32rpx;
  position: fixed;
  bottom: 0;

  .gotoPay {
    width: 248rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(99deg, #00CCBE 0%, #00C2BF 100%);
    border-radius: 12rpx;
  }
}

//头部倒计时样式
// ::v-deep .uni-countdown__number {
//   width: 36rpx !important;
//   height: 36rpx !important;
// }

// ::v-deep .uni-countdown__splitor {
//   line-height: 32rpx !important;
//   color: #ffffff !important;
// }

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
