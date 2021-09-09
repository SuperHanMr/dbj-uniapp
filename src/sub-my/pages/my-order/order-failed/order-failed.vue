<template>
  <view class="container">
    <!-- 退款详情 --退款关闭   退款取消与商家拒接 两个页面-->
    <view class="order-container" v-if="type =='refund' ">
			<view class="order-status" >
				<view class="backgroundStyle" />
				<view class="status">
					<image src="@/static/order/ic_order_failed@2x.png" mode=""></image>
					<text>退款关闭</text>
				</view>
				<text class="time">{{refundInfo.createTime}}</text>
			</view>

			<view class="order-header">
				<image src="@/static/order/ic_failed@2x.png" mode=""></image>
				<view class="cancel-text" v-if="status == 4">
					您已取消了本次退款，如有问题未解决，您可以重新申请
				</view>
				<view class="cancel-text" v-if="status == 3">
					商家拒绝了您的申请，如有问题未解决，您可以重新申请
				</view>
			</view>

			<view class="body1">
					<order-item :dataList="refundInfo.detailAppVOS"></order-item>
			</view>

			<order-refund-info :refundInfo="refundInfo"></order-refund-info>

			<view class="contact-service" v-if="status == 3">
				联系客服
			</view>

		</view>
		
		
		
		
		
		

    <!-- 订单详情  已关闭页面 -->
    <view class="order-container" v-if="type == 'close'"  >
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

     <order-user-base-info :data="orderInfo.estateVO"></order-user-base-info>

      <view class="body2"  v-for="(item,index) in orderInfo.details" :key="index">
        <view class="header">
         <text>{{itme.storeName}}</text>
          <image
            src="@/static/order/ic_more@2x.png"
            mode=""
          ></image>
        </view>
         <order-item :dataList="item.details"></order-item>
      </view>
			<order-price
				:totalAmount="orderInfo.totalAmount"
				:freight="orderInfo.freight"
				:handlingFees="orderInfo.handlingFees"
				:storeDiscount="orderInfo.storeDiscount"
				:platformDiscount="orderInfo.platformDiscount"
				:totalActualIncomeAmount="orderInfo.totalActualIncomeAmount"
			/>
			
			<order-info 
				:orderNo="orderInfo.orderNo"
				:createTime="orderInfo.createTime"
				:payTime="orderInfo.payTime"
			/>

    </view>

  </view>
</template>

<script>
	import {getRefundDetail,getOrderDetail} from "@/api/order.js"
	export default {
	
  data() {
    return {
			type:"close",//type:refund退款详情   close是订单关闭
			id:-1,
			status:"",
			
			refundInfo:{},
			orderInfo:{},
		};
  },
	// watch:{
	// 	type(){}
	// },
	onLoad(e){
		this.type = e.type,
		this.id = Number(e.id),
		this.status =Number(e.status)
		if(this.type == 'refund'){//退款成功页面
			this.refundDetail()
		}
		if(this.type == 'complete'){//订单关闭页面
			this.orderDetail()
		}
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
		
			
		
		
	},
	
};
</script>

<style lang="scss" scoped>
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
</style>
