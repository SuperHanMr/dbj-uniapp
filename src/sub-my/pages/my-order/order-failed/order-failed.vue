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

    <!-- 退款详情 --退款关闭   退款取消与商家拒接 两个页面-->
    <view
      class="order-container"
      v-if="type =='refund'"
      :style="{paddingBottom:containerPaddingBottom}"
    >
      <view
        style="position: relative;"
        :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
      >
        <view
          class="bgcStyle"
          :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
        />
        <view :style="{height:navBarHeight}"></view>
        <view class="order-status">
          <view class="status">
            <image
              src="../../../static/ic_order_failed.svg"
              mode=""
            />
            <text v-if="status == 3 || status == 4">退款关闭</text>
            <text v-if="status == 5">退款失败</text>
          </view>
          <text class="time">{{refundInfo.refundTime | formatDate}}</text>
        </view>
      </view>

      <view class="order-header">
        <image
          v-if="status == 5 "
          src="../../../static/ic_order_refund_failed.svg"
          mode=""
        />
        <image
          v-else
          src="../../../static/ic_failed.svg"
          mode=""
        />

        <view
          v-if="status == 3"
          class="cancel-text"
        >商家拒绝了您的申请，如有问题未解决，您可以重新申请</view>
        <view
          v-if="status == 4"
          class="cancel-text"
        >您已取消了本次退款，如有问题未解决，您可以重新申请</view>
        <view
          v-if="status == 5"
          class="cancel-text failed-text"
        >您的退款账户存在异常，您可联系客服或者重新发起申请</view>

      </view>

      <view class="body1">
        <order-item
          v-for="item in refundInfo.detailAppVOS"
					v-if="item.type !==5"
          :key="item.id"
          :dataList="item"
          :refundType="true"
          @handleDetail="productDetail(item,'refund')"
        />
        <store-calue-card-item :showActualPay="true" v-else />

        <view
          class="refund-money"
          v-if="refundInfo.freight || refundInfo.handlingFees"
        >
          <!--运费 -->
          <view
            class="price-item"
            v-if="refundInfo.freight"
          >
            <view class="title">
              <text style="margin-right: 8rpx;">运费</text>
              <image
                src="../../../../static/price_icon.svg"
                class="icon"
                mode=""
                @click="readExpenses(1)"
              ></image>
            </view>
            <view class="price">
              <text>￥</text>
              <text class="price-style price-font">{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>
            </view>
          </view>

          <!-- 搬运费 -->
          <view
            class="price-item"
            v-if="refundInfo.handlingFees"
          >
            <view class="title">
              <text style="margin-right: 8rpx;">搬运费</text>
              <image
                src="../../../../static/price_icon.svg"
                class="icon"
                mode=""
                @click="readExpenses(2)"
              ></image>
            </view>
            <view>
              <text>￥</text><text class="price-style price-font">{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>
            </view>
          </view>
        </view>
      </view>

      <order-refund-info :refundInfo="refundInfo"></order-refund-info>

      <view
        v-if="status == 3 || status == 5 || showReApply==true "
        class="contact-customer-Reapply"
        :style="{paddingBottom:systemBottom,height:systemHeight}"
      >
        <view
          v-if="status == 3 || status == 5 "
          class="contact-customer"
          @click="contactCustomer()"
        >
          联系客服
        </view>

        <view
          v-if="showReApply==true"
          class="Reapply"
          @click="toApplayForRefund(refundInfo)"
        >
          重新申请
        </view>
      </view>
    </view>

    <!-- 订单详情  已关闭页面 -->
    <view
      class="order-container"
      v-if="type =='close'"
      :style="{paddingBottom:systemBottom}"
    >
      <view
        style="position: relative;"
        :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
      >
        <view
          class="bgcStyle"
          :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"
        />
        <view :style="{height:navBarHeight}"></view>
        <view class="order-status">
          <view class="status">
            <image
              src="../../../static/ic_order_failed.svg"
              mode=""
            />
            <text>已关闭</text>
          </view>
        </view>
      </view>
      <order-user-base-info :data="orderInfo"></order-user-base-info>
      <view
        class="body2"
        v-for="(item,index) in orderInfo.details"
        :key="index"
      >
        <view class="header">
          <view class="header-content">
            <text
              style="color: #333333;"
              @click="gotoShop(item)"
            >{{item.storeName}}</text>
            <image
              src="../../../static/ic_more.svg"
              mode=""
            />
          </view>
          <view class="icon"></view>
        </view>
        <view
          v-for="item2 in item.details"
          :key="item2.id"
        >
          <order-item
					v-if="item2.type !== 5"
            :dataList="item2"
            @handleDetail="productDetail(item2)"
          />
          <store-calue-card-item :showActualPay="true" v-else />
        </view>
      </view>
      <order-price
        :data="orderInfo"
        :orderFailed="true"
      />
      <order-info
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
        :cancelTime="orderInfo.cancelTime"
        :showCancelTime="true"
        :payChannel="orderInfo.payChannel"
      />
    </view>
    <expenses-toast
      ref='expensesToast'
      :expensesType="expensesType"
    ></expenses-toast>
  </view>
</template>

<script>
import { formatDate } from "../../../../utils/common.js";
import { getRefundDetail, getOrderDetail } from "@/api/order.js";
export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      type: "close", //type:refund退款详情   close是订单关闭
      id: -1,
      status: "",
      from: "",
      showReApply: true,

      refundInfo: {},
      orderInfo: {},

      systemBottom: "",
      containerPaddingBottom: "",
      title: "",
      areaId: "",
      navBarHeight: "",
      scrollTop: 0,
      headerTitle: "",
      bgImg:
        "https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_gray.png",
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
    this.showReApply = true;
    console.log("this.showReApply=", this.showReApply);
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
    if (this.type == "refund") {
      //退款成功页面
      this.refundDetail();
      console.log("this.status=", this.status);
      switch (this.status) {
        case 3:
          this.headerTitle = "退款关闭";
          break;
        case 4:
          this.headerTitle = "退款关闭";
          break;
        case 5:
          this.headerTitle = "退款失败";
      }
    }

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
          url: `../my-order?index=1`,
        });
      } else if (this.from == "inprogress") {
        uni.redirectTo({
          url: `../my-order?index=2`,
        });
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },

    readExpenses(num) {
      this.expensesType = num;
      this.$refs.expensesToast.showPupop();
    },

    refundDetail() {
      getRefundDetail({ id: this.id }).then((e) => {
        this.refundInfo = e;
        this.showReApply = this.refundInfo.reapplyed;
        console.log("获取详情数据data=", this.refundInfo);
        console.log("this.showReApply = ", this.showReApply);
      });
    },

    // 申请退款
    toApplayForRefund(data) {
      if (data.isWarehoused) {
        console.log(data);
        // 有仓库跳转到成龙的页面
        getApp().globalData.naviData = data;
        let type = 0;
        if (data.isReturnInventory) {
          type = 1;
        }
        uni.redirectTo({
          url: `/sub-decorate/pages/warehouse-refund/warehouse-refund?refundType=${data.type}&id=${data.id}&type=${type}`,
        });
      } else {
        wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
        uni.redirectTo({
          url: `/sub-my/pages/apply-for-refund/apply-for-refund?refundId=${data.id}`,
        });
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
        });
      }
    },
    // 跳转到店铺页面
    gotoShop(item) {
      console.log("去店铺首页！！！！");
			if(item.type !==5) return 
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
  },
};
</script>

<style lang="scss" scoped>
.bgcStyle {
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
      .backgroundStyle {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 172rpx;
        background-color: #c6c6c6;
      }
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

    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
      .refund-money {
        padding-bottom: 32rpx;
        .price-item {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
          color: #808080;
          font-size: 24rpx;
          font-weight: 400;
          margin-bottom: 16rpx;
          .title {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            .icon {
              width: 24rpx;
              height: 24rpx;
              object-fit: cover;
            }
          }
        }
        .price-item:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
    .body2 {
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
    background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
    border-radius: 12rpx;
    font-size: 28 rpx;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
  }
  .contact-customer {
    margin: 20rpx 0;
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
</style>
