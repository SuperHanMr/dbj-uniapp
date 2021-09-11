<template>
  <view class="container">
    <!-- 订单完成/确认收货 -->
    <!-- 退款成功 -->
    <view class="order-container" v-if="type=='refund'"  :style="{paddingBottom:systemBottom}">
      <view class="order-status">
        <view class="backgroundStyle" />
        <view class="status">
          <image
            src="@/static/order/ic_order_success@2x.png"
            mode=""
          ></image>
          <text>退款成功</text>
        </view>
       <text class="time">{{refundInfo.createTime}}</text>
      </view>

      <view class="order-header1">
        <view class="refund-price">
          <text>退款总金额</text>
          <view style="color:#FF3347;">
            <text style="font-size:26rpx;">￥</text>
            <text style="font-size:40rpx;">8888.</text>
            <text style="font-size:26rpx;">00</text>
          </view>
        </view>
        <view class="router">
          <text style="color: #999999;font-size: 26rpx;">原路径返回微信</text>
          <view>
            <text style="font-size: 20rpx;">￥</text>
            <text style="font-size:28rpx;">8888</text>
            <text style="font-size:20rpx;">.00</text>
          </view>
        </view>
      </view>
			
			<view class="body1">
					<order-item :dataList="refundInfo.detailAppVOS"></order-item>
			</view>
			
			<order-refund-info :refundInfo="refundInfo"></order-refund-info>
    </view>
		
		
		
		
		
		
		<!-- 订单完成页面 -->
    <view class="order-container" v-if="type == 'complete'"  :style="{paddingBottom:systemBottom}">
      <view class="order-status">
        <view class="backgroundStyle" />
        <view class="status">
          <image
            src="@/static/order/ic_order_success@2x.png"
            mode=""
          ></image>
          <text>已完成</text>
        </view>
        
      </view>

      <order-user-base-info :data="orderInfo"></order-user-base-info>

      <view class="body2" >
        <view class="part1" v-for="(item,index) in orderInfo.details" :key="index">
          <view class="header">
            <text>{{itme.storeName}}</text>
            <image
              src="../../../../static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>
					
					<view  v-for="item2 in item.details" :key="item2.id" class="orederItem">
						<order-item :dataList="item2" :orderStatus="3" @toApplayForRefund="applyForReFund"></order-item>
					</view>
         
					
          <view class="price-special" v-if="item.stockType==0 && item.showRefundBtn">
						<view class="button" @click="applyForReFund">
							申请退款
						</view>
						
					</view>
					
        </view>
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
	import {getRefundDetail,getOrderDetail,} from "@/api/order.js"
	export default {
		data() {
			return {
				type:"complete",//type:refund退款详情   complete是订单完成
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
			this.type = e.type
			this.id = Number(e.id)
			this.status =Number(e.status)
			
			if(this.type == 'complete'){//订单完成页面
				this.orderDetail()
			}
			
			if(this.type == 'refund'){//退款成功页面
				this.refundDetail()
			}
		},
	
		methods: {
			orderDetail(){
				console.log("订单完成页面",this.id)
				getOrderDetail({id:this.id}).then(e=>{
					this.orderInfo = e
					console.log("获取详情数据data=",this.orderInfo)
				})
			},
			refundDetail(){
				getRefundDetail({id:this.id}).then(e=>{
					this.refundInfo = e
					console.log("获取详情数据data=",this.refundInfo)
				})
			},
			applyForReFund(){
				console.log("申请退款")
				uni.navigateTo({
					url:`../../apply-for-refund/apply-for-refund?id=${this.id}`
				})
			},
		}
	
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
        background-color: #23d5c6;
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

    .order-header1 {
      height: 170rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 32rpx;
      color: #333333;
      font-size: 30rpx;
      box-sizing: border-box;
      flex: 1;
      margin-bottom: 16rpx;
      .refund-price,
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
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-flow: row nowrap;
          padding-bottom: 32rpx;
          text {
            font-weight: 1000;
            max-width: 476rpx;
            font-size: 28rpx;
            line-height: 40rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333333;
          }

          image {
            width: 34rpx;
            height: 34rpx;
            object-fit: cover;
          }
        }
				
				
				.price-special{
					padding: 16rpx 0 34rpx;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-end;
					.button{
						width: 160rpx;
						height: 56rpx;
						line-height: 56rpx;
						text-align:center;
						background: #FFFFFF;
						color:#111111 ;
						font-size: 24rpx;
						border-radius: 16rpx;
						border: 2rpx solid #EAEAEA;
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
</style>
