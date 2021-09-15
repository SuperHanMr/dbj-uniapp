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
				<text class="time">2021-01-12 16:58:26</text>
			</view>

			<view class="order-header">
				<image src="@/static/order/ic_failed@2x.png" mode=""></image>
			<!-- 	<view class="cancel-text">
					您已取消了本次退款，如有问题未解决，您可以重新申请
				</view> -->
				<view class="cancel-text">
					商家拒绝了您的申请，如有问题未解决，您可以重新申请
				</view>
			</view>

			<view class="body1">
				<order-item></order-item>
			</view>

			<order-refund-info></order-refund-info>

			<view class="contact-service">
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

      <order-user-base-info></order-user-base-info>

      <view class="body2">
        <view class="header">
          <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
          <image
            src="@/static/order/ic_more@2x.png"
            mode=""
          ></image>
        </view>
        <order-item></order-item>
      </view>

      <order-price></order-price>

      <order-info></order-info>

    </view>

  </view>
</template>

<script>
	import {getRefundDetail} from "@/api/order.js"
	export default {
	
  data() {
    return {
			type:"",//type:refund退款详情   close是订单关闭
			id:"",
			data:[]
		};
  },
	watch:{
		type(){}
	},
	onLoad(options){
		this.type = options.type,
		this.id = Number(options.id),
		console.log("this.id=",this.id, "typeof this.id=",typeof this.id)
		this.getDetailData()
	},
	
  methods: {
		getDetailData(){
			console.log("获取详情数据")
			
			getRefundDetail({id:this.id}).then(data=>{
				this.data=data;
				console.log(data,"Data")
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
