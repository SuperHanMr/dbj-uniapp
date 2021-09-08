<template>
  <view class="wrap">
    <view class="message">
      管家发起竣工验收申请，系统将在72:00:00后自动确认验收
    </view>
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
      尊敬的业主您好，拆除已全部完工，墙体拆除无漏项，拆除口整齐美观，先查过无垃圾，整洁干净
    </view>
    <view class="picture flex-row">
      <view class="imgs" v-for="(item, index) in measureImgList" :key="index">
        <image :src="item" @click="clickImg(measureImgList)"></image>
      </view>
    </view>
    <view class="bt-btn-wrap flex-row">
      <view class="btn-l" @click="refuse">拒绝通过</view>
      <view class="btn-r" @click="confirm">验收通过</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        measureImgList: [
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD",
          "http://iph.href.lu/328x216?text=三维图交付&fg=EB7662&bg=FFE2DD"
        ],
      }
    },
    methods: {
      clickImg(url) {
        let arr = new Array();
        if (url instanceof Array) {
          arr = [...url]
        } else {
          arr.push(url)
        }
        console.log(arr)
        uni.previewImage({
          // current: 1,
          urls: arr,
          // longPressActions:{}
        })
      },
      confirm() {
        uni.showModal({
          title: "",
          content: "是否通过竣工验收?",
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
      refuse() {
        uni.navigateTo({
          url: "/pages/housekeeper-refuse/housekeeper-refuse"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    padding: 0 32rpx;
    position: relative;
    height: 100%;
  }

  .message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #00bfb6;
    background: rgba(0, 191, 182, 0.06);
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .bt-btn-wrap {
    width: calc(100% - 64rpx);
    position: fixed;
    bottom: 64rpx;
    justify-content: space-between;
  }

 .avtor-wrap {
    padding-top: 112rpx;
  	margin-bottom: 23rpx;
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
  .picture {
    justify-content: space-between;
    flex-wrap: wrap;
    .imgs {
      margin-bottom: 8rpx;
      width: 32%;
      image {
        box-sizing: border-box;
        width: 100%;
        height: 220rpx;
        border: 2rpx solid #f5f6f6;
        border-radius: 12rpx;
      }

      .sub-title {
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 34rpx;
      }
    }
  }
  .desc {
    height: 88rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 44rpx;
    margin-bottom: 24rpx;
  }
  .btn-l {
    width: 188rpx;
    height: 88rpx;
    line-height: 88rpx;
    border: 1rpx solid #cccccc;
    border-radius: 16rpx;
    font-size: 30rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #666666;
  }

  .btn-r {
    width: 466rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 30rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(135deg, #00bfaf, #00bfbc);
    border-radius: 16rpx;
  }
</style>
