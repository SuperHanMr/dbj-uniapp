<template>
  <view class="construction-item">
    <view class="item-top">
      <view class="top-left">
        <image :src="item.img" mode="aspectFill"></image>
        <view class="top-left-right">
          <view class="name">
            <view class="name-text">{{item.name}}</view>
            <view class="tag">
              {{item.tag}}
            </view>
          </view>
          <view class="time">
            {{item.time}}
          </view>
        </view>
      </view>
      <view class="top-right" v-if="item.status">
        <view class="pay-status" :style="{color:colorVaule[item.statusColor]}">
          {{item.status}}
        </view>
        <view class="money">
          <text>¥</text>{{item.money}}
        </view>
      </view>
    </view>
    <view class="item-content">
      <!-- <text>增项：3项； 减项：2项</text> -->
      <text>{{item.content}}</text>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      item:{
        type:Object,
        default:()=>{
          return{}
        }
      }
    },
    data(){
      return{
        colorVaule:[
          '#999999',
          '#FE9000',
          '#00BFB6'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction-item{
    margin-top: 24rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 32rpx 24rpx;
    background: #ffffff;
    border-radius: 16rpx;
    height: 234rpx;
    .item-top{
      display: flex;
      justify-content: space-between;
      .top-left{
        image{
          width: 76rpx;
          height: 76rpx;
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
            font-size: 30rpx;
            margin-right: 16rpx;
            
          }
          .tag{
            height: 32rpx;
            background: linear-gradient(90deg,#40bff5, #53a9ff);
            border-radius: 6rpx;
            font-size: 22rpx;
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
          text{
            font-size: 24rpx;
          }
        }
      }
    }
    .item-content{
      margin-top: 24rpx;
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
