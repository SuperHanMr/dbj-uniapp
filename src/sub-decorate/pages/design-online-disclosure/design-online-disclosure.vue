<template>
  <view class="wrap">
    <view class="avtor-wrap flex-row-bet">
    	<view class="flex-row-start">
    		<image class="avtor"></image>
    		<view class="tigs">
    			<view class="username">李易峰</view>
    			<view class="role">管家</view>
    		</view>
    	</view>
    	<view class="date">2020-09-09 09:00:00</view>
    </view>
    <view class="desc">
      设计师后台编辑的线上交底文案，我也不知道设计师会写啥文案但是我觉得八成会写业主你好我是你的设计师这是我的线上交底文案你赶快确认下吧谢谢！
    </view>
    <button class="btn" @click="confirm">确认线上交底</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "是否确认该线上交底?确认后设计服务将完成",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #fff;
    padding: 32rpx;
    height: 100%;
  }
  .avtor-wrap {
  	margin: 48rpx 0 23rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 24rpx;
  	.avtor {
  		width: 104rpx;
  		height: 104rpx;
  		border: 2rpx solid #000;
  		border-radius: 50%;
  		margin-right: 16rpx;
  	}
  	.tigs {
  		.username {
  			width: 90rpx;
  			height: 42rpx;
  			font-size: 30rpx;
  			font-family: PingFangSC, PingFangSC-Medium;
  			font-weight: 700;
  			text-align: left;
  			color: #333333;
  			line-height: 42rpx;
  		}
  		.role {
  			height: 32rpx;
  			background: linear-gradient(45deg,#6d95ef, #84b9fc);
  			border-radius: 6rpx;
  			font-size: 24rpx;
  			font-family: PingFangSC, PingFangSC-Regular;
  			font-weight: 400;
  			text-align: center;
  			color: #ffffff;
  			line-height: 32rpx;
  		}
  	}
  	.date {
  		height: 36rpx;
  		font-size: 26rpx;
  		font-family: PingFangSC, PingFangSC-Regular;
  		font-weight: 400;
  		text-align: right;
  		color: #666666;
  		line-height: 36rpx;
  	}
  }
  .desc {
    height: 132rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    letter-spacing: 1rpx;
    margin-bottom: 180rpx;
  }
  .flex-row-bet {
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	flex-direction: row;
  }
  .flex-row-start {
  	display: flex;
  	justify-content: flex-start;
  	align-items: center;
  	flex-direction: row;
  }
 .btn {
    position: fixed;
    bottom: 64rpx;
    width: calc(100% - 64rpx);
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #00c2b2, #00c2bf);
    border-radius: 12rpx;
    font-size: 32rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }
</style>
