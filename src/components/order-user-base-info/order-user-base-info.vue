<template>
  <view class="container">
    <image
      src="../../static/order/ic_location.svg"
      mode=""
    ></image>
    <view class="basic-info">
      <view style="font-weight: bold;margin-top: 4rpx;">
        <text>{{data.customerName}}</text>
        <text style="margin-left: 24rpx;">{{data.customerPhone}}</text>
      </view>
      <view class="address">
        {{data.estateInfo?data.estateInfo:''}}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "order-user-base-info",
  props:{
		data:{
			type:Object,
			required:true
		}
	},
  data() {
    return {};
  },
	mounted() {
		console.log("this.data=",this.data)
	}
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 16rpx;
  padding: 32rpx;
  background: #ffffff;
  border-radius: 20rpx ;
  color: #333333;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  image {
    width: 48rpx;
    height: 48rpx;
    object-fit: cover;
  }
  .basic-info {
    width: 638rpx;
    font-size: 28rpx;
    line-height: 42rpx;
    .address {
      margin-top: 12rpx;
      color: #999999;
      font-size: 26rpx;
      line-height: 36rpx;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
</style>
