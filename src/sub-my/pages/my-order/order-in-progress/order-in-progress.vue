<template>
  <view class="container">
		<!-- 退款详情 -->
   <!-- <view class="order-container">
      <view class="order-status">
				
        <view class="backgroundStyle" />
				
				<view class="status">
					<image
						src="../../../static/ic_status_inprogress@2x.png"
						mode="scaleToFill"
					></image>
					<text>退款中</text>
				</view>
				
			</view>
				
			<view class="refund-product-info">
				<order-item></order-item>
			</view>
				
			<order-refund-info></order-refund-info>
				
			<view class="delete-button">
				<view class="delete" @click="cancelToPay()">
					取消退款
				</view>
			</view>
		</view> -->
			
				
				
				
			<view class="order-container">
				<view class="order-status">
					<view class="backgroundStyle" />
					<!-- <view class="status">
						<image
							src="../../../static/ic_status_wait_pay@2x.png"
							mode="scaleToFill"
						></image>
					  <text>待付款</text>
					</view>
					
					<view class="time">
					  <text style="margin-right: 16rpx;">剩余支付时间</text>
					  16:58:26
					</view> -->
					<view class="status">
						<image src="../../../static/ic_status_inprogress@2x.png" mode="scaleToFill"></image>
					  <text>进行中</text>
					</view>
					
				</view>
				
				<order-user-base-info></order-user-base-info>
				
				<view class="body2">
					<view class="header">
						<text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
						<image src="@/static/order/ic_more@2x.png" mode=""></image>
					</view>
				
					<order-item ></order-item>
					<view class="apply-refund-container">
						<view class="button">
							申请退款
						</view>
					</view>
					<order-item :paddingBottom="24"></order-item>
					
				</view>
			
				<order-price></order-price>
			
				<order-info></order-info>
				
				<view class="bottom-inprogress">
					<view class="confirm" @click="confirmReceipt()">确认收货</view>
				</view>
			
			
			
			
			
			

      <view class="body2">
        <view class="shop-item">
          <view class="header">
            <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
            <image
              src="@/static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>
					
          <order-item :paddingBottom="24"></order-item>

          <view class="discount-container1">
            <view class="left">
              <view class="item">
                <text>平台优惠</text>
                <text>--</text>
              </view>
              <!-- <view class="item">
								<text>商家优惠</text>
								<text>￥100.00</text>
							</view> -->
            </view>
            <view class="line" />
            <view class="right">
              <view class="item">
                <text>押金</text>
                <text>--</text>
              </view>
              <view class="item">
                <text>商家优惠</text>
                <text>￥100.00</text>
              </view>
            </view>
          </view>
          
					<view class="split-line" />
					<!-- <view class="tips">
						<text>本次支付</text>
						<text style="color: #333333;">满100元</text>
						<text>，可获得</text>
						<text style="color: #333333;">10次免邮费额度，</text>
						<text>搬运费需要根据实际要货时进行核算</text>
					</view>
					<view class="tips">
						<text>搬运费需要根据实际要货时进行核算</text>
					</view> -->

          <view class="tips">
						<text>本次支付</text>
						<text style="color: #333333;">满100元</text>
						<text>，可获得</text>
						<text style="color: #333333;">10次免邮费额度，</text>
						<text>搬运费需要根据实际要货时进行核算</text>
					</view>
					
        </view>
				
				

        <view class="shop-item">
          <view class="header">
            <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
            <image
              src="@/static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>
          <order-item :paddingBottom="24"></order-item>

          <!-- <view class="discount-container2">
						<view class="left">
							<view class="item">
								<text>运费</text>
								<text>--</text>
							</view>
							<view class="item">
								<text>商家优惠</text>
								<text>￥100.00</text>
							</view>
						</view>
						<view class="line"/>
						<view class="right">
							<view class="item">
								<text>搬运费</text>
								<text>--</text>
							</view>
							<view class="item">
								<text>平台优惠</text>
								<text>￥100.00</text>
							</view>
							<view class="item">
								<text>押金</text>
								<text>￥100.00</text>
							</view>
						</view>
					</view> -->
          <view class="discount-container3">
            <view class="right">
              <view class="item">
                <text>押金</text>
                <text>￥100.00</text>
              </view>
            </view>
          </view>

          <!-- <view class="tips">
						<text>本次支付</text>
						<text style="color: #333333;">满100元</text>
						<text>，可获得</text>
						<text style="color: #333333;">10次免邮费额度，</text>
						<text>搬运费需要根据实际要货时进行核算</text>
					</view> -->

        </view>

      </view>

      <order-price></order-price>
			

      <view class="payment-method">
        <text>支付方式</text>
        <view class="method">
          <image
            src="@/static/order/ic_order_wechat@2x.png"
            mode=""
          ></image>
          <text>微信支付</text>
        </view>
      </view>

      <order-info></order-info>

      <view class="go-to-pay">
        <text>取消付款</text>
        <view
          class="button"
          @click="toPay()"
        >
          去付款
        </view>
      </view>
			
      <view class="go-to-apply-for-refund">
        <view class="button"  @click="open()">申请退款</view>
      </view>
    
		</view>
		
		<!-- 取消退款的弹框 -->
		<uni-popup ref="cancelRefund" type="dialog">
		    <uni-popup-dialog
					mode="base"
					title="确定要取消本次退款申请？"
					:before-close="true" 
					@close="cancelToPayClose" 
					@confirm="confirmCancelToPay">
				</uni-popup-dialog>
		</uni-popup>
		<!-- 确认收货的弹框 -->
		<uni-popup ref="confirmReceipt" type="dialog">
		    <uni-popup-dialog
					mode="base"
					title="确定要确认收货？"
					:before-close="true" 
					@close="confirmReceiptClose" 
					@confirm="receiptConfirm">
				</uni-popup-dialog>
		</uni-popup>

  </view>
</template>

<script>
import { orderDetail, orderPay } from "../../../../api/order.js";
export default {
  data() {
    return {
      orderNo: "",
    };
  },
  onLoad(e) {
    if (e && e.orderNo) {
      this.orderNo = e.orderNo;
      // this.getOrderDetail();
    }
  },
  methods: {
    toPay() {
      orderPay({ orderId: this.orderNo, payType: 1 }).then((e) => {
        console.log(e);
      });
    },
    toApplayForRefund() {
      uni.navigateTo({
        url: "/sub-my/pages/apply-for-refund/apply-for-refund",
      });
    },
    getOrderDetail() {
      orderDetail({ id: this.orderNo }).then((e) => {
        console.log(e);
      });
    },
		
		
		
		
		
		cancelToPay() {
			this.$refs.cancelRefund.open()
		},
		cancelToPayClose() {
			this.$refs.cancelRefund.close()
		},				
		confirmCancelToPay(value) {
			// 调用申请退款的接口
			// 成功就关闭弹框
			this.$refs.cancelRefund.close()
			console.log("点击了确认按钮")
		},
		
		
		confirmReceipt(){
			this.$refs.confirmReceipt.open()
		},
			
		confirmReceiptClose(){
			this.$refs.confirmReceipt.close()
		},
		receiptConfirm(value) {
			// 调用申请退款的接口
			// 成功就关闭弹框
			this.$refs.confirmReceipt.close()
			console.log("点击了确认按钮11")
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
	
	.tips {
		background: #f7f7f7;
		border-radius: 16rpx;
		color: #999999;
		font-size: 22rpx;
		padding: 16rpx 24rpx;
		box-sizing: border-box;
	}
	
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 100rpx;
	
	
  // background-color: skyblue;
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

      .time {
        color: #ffffff;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        font-weight: 400;
        display: flex;
        align-items: center;
      }
    }
		
		.refund-product-info{
			padding:32rpx 32rpx 0 32rpx ;
			background-color: #FFFFFF;
			margin-bottom: 16rpx;
			border-radius: 24rpx;
		}
		.delete-button{
			margin: 60rpx 0;
			background: #FEFFFE;
			padding: 24rpx 32rpx;
			.delete{
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 500;
				background: linear-gradient(135deg, #53D5CC 0%, #4FC9C9 100%);
				border-radius: 12rpx;
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
    }

    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
    }
    .body2 {
      padding: 32rpx;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;
			.apply-refund-container{
				padding: 24rpx 0 32rpx 0;
				display: flex;
				justify-content: flex-end;
				.button{
					width: 160rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					box-sizing: border-box;
					background: #FFFFFF;
					border-radius: 12px;
					border: 2rpx solid #EAEAEA;
					font-size: 24rpx;
					font-weight: 400;
					color: #111111;
				}
			}
      .shop-item {
        margin-bottom: 32rpx;
        

        .discount-container1 {
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
            height: 40rpx;
            background: #ebebeb;
            margin: 16rpx 40rpx;
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

        .discount-container3 {
          margin-bottom: 24rpx;
          display: flex;
          flex-flow: row nowrap;
          flex: 1;
          align-items: flex-start;
          justify-content: flex-end;
          font-size: 22rpx;
          color: #999999;
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
          }
        }

        .split-line {
          height: 1rpx;
          background-color: #ebebeb;
        }

        
      }
      .shop-item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
		
		.bottom-inprogress{
			margin-bottom: 40rpx;
			padding:12rpx 32rpx ;
			background-color: #FFFFFF;
			display: flex;
			justify-content: flex-end;
			.confirm{
				width: 248rpx;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);
				border-radius: 12rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #FFFFFF;
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

    .go-to-pay {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 12rpx 32rpx;
      background-color: #ffffff;
      color: #333333;
      font-size: 26rpx;
      .button {
        width: 248rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 32rpx;
        text-align: center;
        color: #ffffff;
        background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
        border-radius: 12rpx;
      }
    }
    .go-to-apply-for-refund {
      margin-top: 40rpx;
      display: flex;
      flex: 1;
      padding: 28rpx 32rpx;
      align-items: flex-end;
      justify-content: flex-end;
      background-color: #FFFFFF;
      .button {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        color: #111111;
        font-size: 24rpx;
        border: 2rpx solid #eaeaea;
      }
    }
  }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
	// 弹框样式
	::v-deep .uni-popup-dialog{
		width: 560rpx !important;
		border-radius: 24rpx !important;
		background-color: #fff !important;
	} 
	::v-deep .uni-dialog-title-text{
	 color: #111111 !important;
	 font-size: 32rpx !important;
	 font-weight: 550 !important;
	}
	::v-deep .uni-dialog-title{
		padding: 48rpx 0 !important;
		
	}
	::v-deep .uni-dialog-content {
		display:  none !important;
	}
	::v-deep .uni-dialog-button-group{
		border-top:2rpx solid #F5F5F5;
	}
	::v-deep .uni-dialog-button{
		height: 82rpx !important;
	}
	::v-deep .uni-button-color{
		color:#FF3347  !important;
		font-size: 30rpx !important;
		font-weight: 500;
	}
	::v-deep .uni-dialog-button-text{
		font-size: 30rpx !important;
	}
	
</style>

