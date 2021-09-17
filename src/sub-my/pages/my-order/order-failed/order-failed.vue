<template>
  <view class="container">
    <!-- 退款详情 --退款关闭   退款取消与商家拒接 两个页面-->
		<view class="order-container" v-if="type =='refund'" :style="{paddingBottom:systemBottom}">
			<view class="order-status" >
				<view class="backgroundStyle" />
				<view class="status">
					<image src="@/static/order/ic_order_failed@2x.png" mode=""></image>
					<text v-if="status == 3 || status == 4">退款关闭</text>
					<text v-if="status == 5">退款失败</text>
				</view>
				<text class="time">{{refundInfo.refundTime | formaDate}}</text>
			</view>

			<view class="order-header">
				<image v-if="status == 5 " src="../../../static/ic_order_refund_failed@2x.png" mode=""></image>
				<image v-else src="@/static/order/ic_failed@2x.png" mode=""></image>
				<view class="cancel-text" v-if="status == 3">
					商家拒绝了您的申请，如有问题未解决，您可以重新申请
				</view>
				
				<view class="cancel-text" v-if="status == 4">
					您已取消了本次退款，如有问题未解决，您可以重新申请
				</view>
				
				<view class="cancel-text failed-text" v-if="status == 5">
					您的退款账户存在异常，您可联系客服或者重新发起申请
				</view>
			</view>

			<view class="body1" v-for="item in refundInfo.detailAppVOS" :key="item.id">
					<order-item :dataList="item" :refundType="true"></order-item>
			</view>

			<order-refund-info :refundInfo="refundInfo"></order-refund-info>
			
			
			
			<view
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
			    class="Reapply"
			    @click="toApplayForRefund(refundInfo)"
			  >
			    重新申请
			  </view>
			</view>
			
			

		</view>
		
		
		
		<!-- 订单详情  已关闭页面 -->
		<view class="order-container" v-if="type =='close'"  :style="{paddingBottom:systemBottom}">
      <view class="order-status">
				<view class="backgroundStyle" />
        <view class="status">
          <image
            src="@/static/order/ic_order_failed@2x.png"
            mode=""
          ></image>
          <text>已关闭</text>
        </view>
      </view>

     <order-user-base-info :data="orderInfo"></order-user-base-info>

      <view class="body2"  v-for="(item,index) in orderInfo.details" :key="index">
        <view class="header">
         <text>{{item.storeName}}</text>
          <image
            src="@/static/order/ic_more@2x.png"
            mode=""
          ></image>
        </view>
				
				<view v-for="item2 in item.details" :key="item2.id">
					<order-item  :dataList="item2"></order-item>
				</view>
				
      </view>
			<order-price
				:data="orderInfo"
				:waitPay="true"
			/>
			
			<order-info 
				:orderNo="orderInfo.orderNo"
				:createTime="orderInfo.createTime"
				:cancelTime="orderInfo.cancelTime"
				:showCancelTime="true"
			/>

    </view>

  </view>
</template>

<script>
	import {formaDate} from "../../../../utils/common.js"
	import {getRefundDetail,getOrderDetail} from "@/api/order.js"
	export default {
		
		filters:{
			formaDate
		},
		data() {
			return {
				type:"close",//type:refund退款详情   close是订单关闭
				id:-1,
				status:"",
				
				refundInfo:{},
				orderInfo:{},
				
				systemBottom: "",
			};
		},
	
		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			console.log(this.systemBottom);
		},
	
		onLoad(e){
			this.type = e.type,
			this.id = Number(e.id),
			this.status =Number(e.status)
			if(this.type == 'refund'){//退款成功页面
				this.refundDetail()
			}
			if(this.type == 'close'){//订单关闭页面
				this.orderDetail()
			}
			
			
			
		},
		
		onShow() {
		
		},
	
		methods: {
			orderDetail(){
				console.log("订单完成页面")
				getOrderDetail({id:this.id}).then(e=>{
					this.orderInfo = e
					console.log("获取详情数据data=",this.orderInfo)
				})
			},
			refundDetail(){
				getRefundDetail({id:this.id}).then(e=>{
					this.refundInfo = e
					console.log("获取详情数据data=",this.refundInfo,)
				})
				
			},
			
			// 申请退款
			toApplayForRefund(data) {
				wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(data));
				uni.navigateTo({
					url: `/sub-my/pages/apply-for-refund/apply-for-refund?id=${this.id}&type=whole&status=1`,
				});
			},
			// 联系客服
			contactCustomer(){
				//跳转到客服的页面
				console.log("联系客服")
			}
		}
	};
</script>

<style lang="scss" scoped>
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
			  background-color:#C6C6C6;
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
			.failed-text{
				color: #FF3347 !important;
			}
    }

    .body1 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx;
      margin-bottom: 16rpx;
    }
    .body2 {
      padding: 32rpx 32rpx 0;
      background: #ffffff;
      border-radius: 24rpx 24rpx 0 0;

      .header {
        margin-top: 16rpx;
        margin-bottom: 16rpx;
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
  padding: 12rpx 32rpx;
  .Reapply {
		margin-left: 32rpx;
    width: 140rpx;
    height: 56rpx;
    line-height: 56rpx;
    box-sizing: border-box;
    background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
    border-radius: 8rpx;
    font-size: 24rpx;
    text-align: center;
    font-weight: 400;
    color: #ffffff;
  }
  .contact-customer {
    margin: 18rpx 0;
    width: 140rpx;
		height: 56rpx;
		line-height: 56rpx;
    box-sizing: border-box;
    text-align: center;
    background: #ffffff;
    border-radius: 8rpx;
    color: #111111;
    font-size: 24rpx;
    border: 2rpx solid #eaeaea;
  }
}
</style>
