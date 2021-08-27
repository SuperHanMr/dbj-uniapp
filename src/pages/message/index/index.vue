<template>
  <view class="im-container">
    <!-- <view class="im-header">
      消息
    </view> -->
    <view class="im-common-message-list">
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            88
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
    </view>
    <view class="im-chat-message-list">
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <group-avatars :list="avatarList" />
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
      <view class="im-message-item">
        <view class="im-message-avatar">
          <image src="http://iph.href.lu/100x100"></image>
        </view>
        <view class="im-message-content">
          <view class="im-message-name">
            在线客服
          </view>
          <view class="im-message-msg">
            好的。
          </view>
        </view>
        <view class="im-message-info">
          <view class="im-message-time">
            08-08
          </view>
          <view class="unread-count">
            1
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import GroupAvatars from "../../../components/group-avatars/group-avatars.vue"
  export default {
    components: {
       GroupAvatars
    },
    data() {
      return {
        avatarList: [
          "http://iph.href.lu/100x100",
          "http://iph.href.lu/100x100",
          "http://iph.href.lu/100x100",
          "http://iph.href.lu/100x100",
        ]
      }
    }
  }
</script>

<style>
  .im-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    background: #f9f9f9;
  }
  .im-common-message-list, .im-chat-message-list {
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
  }
  .im-chat-message-list {
    margin-top: 32rpx;
  }
  .im-message-item {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: 24rpx 32rpx;
    align-items: center;
    box-sizing: border-box;
    position: relative;
  }
  .im-message-avatar, .im-message-avatar image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 6px;
  }
  .im-message-avatar {
    margin-right: 24rpx;
  }
  .im-message-content {
    flex: 1;
    margin-right: 148rpx;
    height: 100rpx;
    box-sizing: border-box;
    padding-top: 12rpx;
  }
  .im-message-name {
    line-height: 44rpx;
    font-size: 16px;
    color: #111;
  }
  .im-message-msg {
    margin-top: 4rpx;
    font-size: 12px;
    color: #999;
  }
  .im-message-info {
    position: absolute;
    right: 32rpx;
    top: 24rpx;
    height: 100rpx;
    padding-top: 16rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: top;
    line-height: 28rpx;
    box-sizing: border-box;
  }
  .im-message-time {
    font-size: 10px;
    color: #bbb;
  }
  .unread-count {
    margin-top: 12rpx;
    height: 32rpx;
    min-width: 32rpx;
    line-height: 32rpx;
    background: #ff3b30;
    border-radius: 16rpx;
    padding: 0 6rpx;
    font-size: 12px;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }
</style>
