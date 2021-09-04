<template>
  <view class="message-send-box">
    <view class="icon-audio"></view>
    <input 
      class="message-send-input" 
      placeholder-class="message-send-input-placeholder" 
      placeholder="聊点什么吧"/>
    <view class="icon-face"></view>
    <view class="icon-plus-circle"></view>
  </view>
</template>

<script>
  export default {
    name: "MessageSendBox",
  }
</script>

<style>
  .message-send-box {
    flex: none;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    height: 100rpx;
    align-items: center;
    padding: 0 8rpx;
  }
  .message-send-box .icon-audio,
  .message-send-box .icon-face,
  .message-send-box .icon-plus-circle {
    font-size: 22px;
    flex: none;
  }
  .message-send-box .icon-audio {
    margin-right: 8rpx;
  }
  .message-send-box .icon-face,
  .message-send-box .icon-plus-circle {
    margin-left: 8rpx;
  }
  .message-send-input {
    background: #f5f5f5;
    flex: 1;
    height: 76rpx;
    border-radius: 38rpx;
    padding: 0 16px;
    font-size: 16px;
    color: #111;
  }
  .message-send-input-placeholder {
    color: #999;
    font-size: 16px;
  }
</style>
