<template>
  <view class="person-service person-content-item">
<!--    <view class="title">
      Ta的服务
    </view> -->
    <view class="service-list">
      <view class="service-item" v-for="item of serviceData">
        <image :src="item.imageUrl" mode=""></image>
        <view class="item-msg">
          <view class="item-msg-left">
            <view class="item-msg-title">{{item.name}}</view>
            <view class="pay-num">{{item.sales}}人付款</view>
            <view class="item-msg-tip">
              <view class="price">¥
                <text class="integer">{{convertedPrice}}</text>
                <text class="decimals">.{{convertedPrice.split('.')[1]}}</text>
                <text class="unit">/{{item.unitName}}</text>
              </view>
              <view class="service-tag" v-if="item.showMiddleServerTitle">中级服务</view>
            </view>
          </view>
          <view class="btn">
            去购买
          </view>
        </view>
      </view>
    </view>
    <view class="click-text">展开全部房屋<image src="" mode=""></image></view>
  </view>
</template>

<script>
  import '../style/common.scss'
  export default{
    props:{
      serviceData:[]
    }
  }
</script>
<style lang="scss" scoped>
  .person-service{
    padding: 38rpx 0 16rpx 32rpx;
  }
  .service-item{
    height: 140rpx;
    margin-bottom: 26rpx;
    display: flex;
    // flex-wrap: wrap;
    image{
      width: 120rpx;
      height: 120rpx;
      background: #EBEBEB;
      border-radius: 12rpx;
      margin-right: 24rpx;
    }
    .item-msg{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 24rpx;
      padding-right: 32rpx;
      width: calc(100% - 176rpx);
      border-bottom: 1px solid #F4F4F4;
      .item-msg-left{
        .item-msg-title{
          width: 364rpx;
          font-size: 28rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          margin-bottom: 4rpx;
        }
        .pay-num{
          font-size: 22rpx;
          color: #999;
          margin-bottom: 6rpx;
        }
        .price{
          color: #333;
          font-size: 20rpx;
          display: inline-block;
          .integer{
            font-size: 28rpx;
          }
          .decimals{
            font-size: 24rpx;
          }
          .unit{
            font-size: 22rpx;
          }
        }
        .service-tag{
          display: inline-block;
          width: 94rpx;
          height: 30rpx;
          border-radius: 6rpx;
          border: 1px solid rgba(197, 165, 141, 0.3);
          font-size: 20rpx;
          color: #C5A58D;
          text-align: center;
          line-height: 30rpx;
          margin-left: 8rpx;
        }
      }
      .btn{
        width: 118rpx;
        height: 58rpx;
        background: linear-gradient(135deg, #00BFAF 0%, #00BFBC 100%);
        border-radius: 12rpx;
        font-size: 26rpx;
        text-align: center;
        color: #fff;
        line-height: 58rpx;
      }
      
    }
  }
  .click-text{
    width: calc(100% - 32rpx);
    text-align: center;
    font-size: 26rpx;
    color: #00BFB6;
    margin-bottom: 24rpx;
    image{
      width: 26rpx;
      height: 26rpx;
      margin-left: 10rpx;
      background-color: #eee;
      vertical-align: middle;
    }
  }
</style>
