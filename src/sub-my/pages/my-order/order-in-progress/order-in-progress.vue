<template>

  <view class="container">
    <!-- 进行中 -->
    <view
      class="order-container"
      :style="{paddingBottom:112+containerBottom+'rpx'}"
    >
      <view class="order-status">
        <view class="backgroundStyle" />

        <view class="status">
          <image
            src="../../../static/ic_status_inprogress@2x.png"
            mode="scaleToFill"
          ></image>
          <text>进行中</text>
        </view>

      </view>

      <order-user-base-info :data="orderInfo"></order-user-base-info>

      <view class="storeContainer">
        <view
          v-for="item in orderInfo.details"
          :key="item.storeId"
          class="item"
        >
          <view class="header" @click="gotoShop(item)">
            <text>{{item.storeName}}</text>
            <image
              src="@/static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>

          <view
            v-for="item2 in item.details"
            :key="item2.id"
            class="orederItem"
          >
            <order-item
							@handleDetail="goToDetail(item2)"
              :dataList="item2"
              :orderStatus="2"
							:showOriginPrice="orderInfo.discount && item.details.length"
              @toApplayForRefund="toApplayForRefund(item2,1)"
							@refundCancel="refundCancel(item2)"
							@refundSuccess="refundSuccess(item2)"
							@refundFailed = "refundFailed(item2,1)"
							@refundClose = "refundClose(item2)"
            ></order-item>
          </view>

        </view>

        <order-price
          :data="orderInfo"
        />

      </view>

      <order-info
        :orderNo="orderInfo.orderNo"
        :createTime="orderInfo.createTime"
				:showPayTime="true"
        :payTime="orderInfo.payTime"
      />

      <view
        class="applyforRefund-confirmReceipt"
        :style="{paddingBottom:systemBottom,height:systemHeight}"
      >
        <view
          class="applyforRefund"
          @click="toApplayForRefund(orderInfo,2)"
          v-if="orderInfo.showRefundBtn"
        >
          申请退款
        </view>
        <view
          class="confirmReceipt"
          @click="handleConfirmReceipt"
          v-if="orderInfo.shipmentStatus == 1"
        >
          确认收货
        </view>
      </view>

    </view>

    <!-- 确认收货的弹框 -->
    <uni-popup
      ref="confirmReceipt"
      type="dialog"
    >
      <uni-popup-dialog
        mode="base"
        title="确定要确认收货？"
        :before-close="true"
        @close="confirmReceiptClose"
        @confirm="receiptConfirm"
      />
    </uni-popup>
		
		
		<!-- 取消退款的弹框 -->
		<uni-popup
			ref="cancelRefund"
			type="dialog"
		>
      <uni-popup-dialog
        mode="base"
        title="确定要取消退款吗？"
        :before-close="true"
        @close="cancelRefundClose"
        @confirm="cancelRefundConfirm"
      />
    </uni-popup>
  </view>

</template>

<script>
import { getOrderDetail, confirmReceiptOrder ,cancelRefund} from "../../../../api/order.js";
export default {
  data() {
    return {
      orderNo: "",
      orderInfo: {},
			type:"",

      systemBottom: "",
      systemHeight: "",
      containerBottom: "",
			areaId:"",
    };
  },

  mounted(e) {
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.containerBottom = menuButtonInfo.bottom;
    this.systemBottom = menuButtonInfo.bottom + "rpx";
    this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
  },

  onLoad(e) {
    if (e && e.orderNo) {
      this.orderNo = e.orderNo;
    }

    this.orderDetail();
		const currentHouse =JSON.parse(uni.getStorageSync('currentHouse'))
		this.areaId =currentHouse.areaId
		
  },

  methods: {
  


    orderDetail() {
      getOrderDetail({ id: this.orderNo }).then((e) => {
				this.orderInfo = e;
        // console.log("this.orderInfo=", this.orderInfo);
      });
    },

    toApplayForRefund(data, type) {
      if (type == 1) {
        //type 1部分退款
      console.log("部分退款");
        wx.setStorageSync("particalRefundOrderInfo", JSON.stringify(data));
        uni.navigateTo({
          url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.orderNo}&type=partical&status=1`,
        });
      } else {
        //type 2 整体退款
				console.log("全部退款")
        wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
        uni.navigateTo({
          url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.orderNo}&type=whole&status=1`,
        });
      }
    },
		refundCancel(){
			this.$refs.cancelRefund.open()
		},
		cancelRefundClose(){
			this.$refs.cancelRefund.close()
		},
		cancelRefundConfirm(){
			cancelRefund({id:this.itemId}).then(e=>{
				this.$refs.cancelRefund.close()
				this.orderDetail()
			})
		},	
		
		// 申请退款成功
		refundSuccess(item){
			uni.navigateTo({
				url:`../order-success/order-success?type=refund&id=${item.refundId}`
			})
		},
		refundFailed(item){},
		refundClose(item){
			uni.navigateTo({
				url:`../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.id}`
			})
		},
		
		// 点击商品区域，跳转到商品详情页面
		goToDetail(item2){   
			uni.navigateTo({ 
				url:`../../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item2.id}`
			})
		},
		// 跳转到店铺页面
		gotoShop(item) {
		  console.log("去店铺首页！！！！");
			console.log("this.storeId=",item.storeId,"this.areaId=",this.areaId)
			uni.navigateTo({
				url:`../../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`
			});
		},
			
		
		// 确认收货
    handleConfirmReceipt() {
      this.$refs.confirmReceipt.open();
    },

    confirmReceiptClose() {
      this.$refs.confirmReceipt.close();
    },
    receiptConfirm(value) {
      // 调用申请退款的接口
      //goodIsd 商品id(不传代表整个订单收货)"
      confirmReceiptOrder({ id: this.orderNo, goodIsd: "" }).then((e) => {
        if (res.code == 1) {
          // 成功就关闭弹框
          this.$refs.confirmReceipt.close();
          uni.navigateTo({
            // url:"../success/success?type=confirmReceipt"
            url: "../my-order?index=0",
          });
        }
      });
    },
		
		
		formatTime(msTime) {
		  let time = msTime / 1000;
		  let hour = Math.floor(time / 60 / 60) % 24;
		  if (!hour) {
		    hour = 0;
		  }
		  let minute = Math.floor(time / 60) % 60;
		  if (!minute) {
		    minute = 0;
		  }
		  let second = Math.floor(time) % 60;
		  return [hour, minute, second];
		},
  },
};
</script>

<style lang="scss" scoped>
	
	
.header {
  margin-bottom: 32rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text {
    font-weight: 1000;
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

.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 100rpx;
  .order-container {
    .order-status {
      width: 100%;
      height: 140rpx;
      color: #ffffff;
      background-size: 100% 172rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      position: relative;
      .backgroundStyle {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 172rpx;
        background-color: #ffb245;
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
    }

    .storeContainer {
      .item {
        padding: 32rpx 32rpx 2rpx;
        background: #ffffff;
        border-radius: 24rpx 24rpx 0 0;
        .orederItem {
        }
      }
    }
    .body2 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;

      .shop-item {
        margin-bottom: 32rpx;

        .split-line {
          height: 1rpx;
          background-color: #ebebeb;
        }
      }
      .shop-item:nth-last-child(1) {
        margin-bottom: 0;
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

// 底部 确认收货 及申请退款按钮
.applyforRefund-confirmReceipt {
  position: fixed;
  bottom: 0;
  width: 686rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: 12rpx 32rpx;
  .confirmReceipt {
    width: 248rpx;
    height: 88rpx;
    line-height: 88rpx;
    box-sizing: border-box;
    background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
    border-radius: 12rpx;
    font-size: 32rpx;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
  }
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

