<template>
  <view class="construction-item">
    <view class="item-top">
      <view class="top-left">
        <image :src="item.initiatorPortrait" mode="aspectFill"></image>
        <view class="top-left-right">
          <view class="name">
            <view class="name-text">{{item.initiatorName}}</view>
            <view class="tag">
              {{item.initiatorRoleDesc}}
            </view>
          </view>
          <view class="time">
            {{item.createdAt |formatDate }}
          </view>
        </view>
      </view>
      <view class="top-right" v-if="item.state!=3">
        <view class="pay-status" :style="{color:item.state!=2?'#999':item.totalAmount>0?'#FE9000':'#00BFB6'}">
          {{item.state!=2?item.totalAmount>0?'已支付':'已退还':item.totalAmount>0?'待付款':'待退还'}}
        </view>
        <view class="money">
          <text>¥</text>{{(Math.abs(item.totalAmount)/100).toFixed(2)}}
        </view>
      </view>
    </view>
    <view class="item-content">
      <view><text v-if="item.increasedCount>0">增项：{{item.increasedCount}}项；</text> <text v-if="item.reducedCount">减项：{{item.reducedCount}}项</text></view>
      <!-- <text>{{item.content}}</text> -->
    </view>
  </view>
</template>

<script>
  import { formatDate } from '@/utils/common.js'
  export default{
    props:{
      item:{
        type:Object,
        default:()=>{
          return{}
        }
      }
    },
    filters:{
      formatDate
    },
    data(){
      return{
        colorVaule:{
          0:'#999999',
          5:'#FE9000',
          6:'#00BFB6'
        },
        textValue:{
          7:'已支付',
          8:'已退还',
          5:'待付款',
          6:'待退还'
        }
          
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction-item{
    margin-top: 24rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 24rpx;
    background: #ffffff;
    border-radius: 16rpx;
    // height: 234rpx;
    .item-top{
      display: flex;
      justify-content: space-between;
      .top-left{
        image{
          width: 72rpx;
          height: 72rpx;
          margin-right: 22rpx;
          border-radius: 50%;
        }
        .top-left-right{
          display: inline-block;
          .name{
            display: flex;
            align-items: center;
          }
          .name-text{
            color: #333;
            font-size: 28rpx;
            margin-right: 16rpx;
            
          }
          .tag{
            height: 32rpx;
            background: linear-gradient(90deg,#40bff5, #53a9ff);
            border-radius: 6rpx;
            font-size: 20rpx;
            color: #fff;
            text-align: center;
            line-height: 32rpx;
            padding: 0 8rpx;
          }
          .time{
            font-size: 22rpx;
            color: #999;
          }
        }
      }
      .top-right{
        .pay-status{
          font-size: 26rpx;
          color: #999;
          text-align: right;
        }
        .money{
          margin-top: 8rpx;
          color: #333;
          font-size: 32rpx;
          font-family: PriceFont;
          text{
            font-size: 24rpx;
            display: inline-block;
            margin-right: 4rpx;
          }
        }
      }
    }
    .item-content{
      margin-top: 20rpx;
      padding: 0 40rpx;
      height: 68rpx;
      line-height: 68rpx;
      background: #f6f7f7;
      border: 0.5px solid #ffffff;
      border-radius: 8rpx;
      font-size: 26rpx;
      color: #333;
    }
  }
</style>
