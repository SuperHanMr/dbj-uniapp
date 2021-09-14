<template>
  <view class="service-steward">
    <view class="steward-list">
      <view class="list-item">
        <view class="item-top">
          <view class="title">拆除阶段完工申请</view>
          <view class="time">2021-08-19 20:20:00</view>
        </view>
        <view class="item-content">
          <text>这个工人做的很好记得给他发奖金,谁能尽快给你发个都开始发那拉氏奶粉离开纽芬兰省你发来的思念疯狂了呢</text>
          <view class="img-list">
            <image></image>
            <image></image>
            <image></image>
            <image></image>
            <image></image>
            <image></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
  .service-steward{
    margin: 24rpx;
  }
  .list-item{
    padding: 24rpx;
    background: #ffffff;
    border-radius: 12px;
    .item-top{
      height: 130rpx;
      border-bottom: 1px solid #F4F4F4;
      display: flex;
      align-items: center;
      .title{
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
        color: #333;
        text-align: left;
      }
      .time{
        font-size: 24rpx;
        font-weight: 400;
        color: #999;
        width: 100%;
      }
    }
    .item-content{
      padding-top: 24rpx;
      .img-list{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        max-height: 430rpx;
        margin-top: 24rpx;
        
        image{
          width: 220rpx;
          height: 220rpx;
          opacity: 1;
          border-radius: 4px;
          background-color: #eee;
          margin-bottom: 6rpx;
        }
      }
      text{
        font-size: 26rpx;
        color: #333;
      }
      
    }
  }
</style>
