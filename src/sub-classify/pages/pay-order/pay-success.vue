<template>
  <view class="pay-success">
    <!--   <custom-navbar opacity="1" :title="title" titleColor="#ffb245" bgcolor="#ffb245">
    	<template v-slot:back>
    		<view @click="toBack">
    			<i class="icon-ic_cancel_white" style="color: white;">
    			</i>
    		</view>
    	</template>
    </custom-navbar> -->
    <view class="head">
      <view>
        <img src='../../static/image/pay-bg.png' alt="" style='height: 600rpx; width:100%'>
      </view>
      <view class="icon-text">
        <view class="icon"></view>
        <view class="text1">支付成功</view>
        <view class="text2">感谢您的支持</view>
      </view>
    </view>
    <view class="bottom">
      <button class="button1" @click="backHome">返回首页</button>
      <button class="button2" @click="toOrderDetail">查看订单</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        orderId: 0,
        from: ''
      }
    },
    onLoad(val) {
      this.orderId = val.orderId
      this.from = val.from
    },
    methods: {
      toBack() {

      },
      backHome() {
        uni.switchTab({
          url: '/pages/home/index/index'
          // });
        }),
      },
      toOrderDetail() {
        uni.redirectTo({
          url: "../../../sub-my/pages/my-order/my-order?firstEntry=true&index=3"
        });
      }
    }
  }
</script>

<style scoped>
  .pay-success {
    position: relative;
  }

  .icon-text {
    position: absolute;
    top: 200rpx;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    width: 200rpx;
    height: 308rpx;
    justify-content: center;
    align-content: space-between;
    flex-wrap: wrap;
    color: #FFFFFF;
    font-size: 26rpx;
  }

  .icon-text .icon {
    width: 180rpx;
    height: 182rpx;
    background-image: url('../../static/image/pay-icon.png');
    background-size: cover;
  }

  .icon-text .text1 {
    font-size: 36rpx;
    font-weight: 500;
  }

  .bottom {
    position: absolute;
    right: 0;
    left: 0;
    top: 740rpx;
    margin: auto;
    display: flex;
    width: 400rpx;
    height: 220rpx;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .bottom button {
    width: 396rpx;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    font-weight: 500;
    font-size: 32rpx;
    border-radius: 12rpx;
  }

  .bottom .button1 {
    background: linear-gradient(135deg, #36d9cd, #28c6c6);
    color: #FFFFFF;
  }

  .bottom .button2 {
    border: 1px solid #dedede;
  }
</style>
