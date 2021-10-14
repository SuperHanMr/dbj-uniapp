<template>
  <div class="no-service">
    <image class="bg" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/empty.png">
      </view>
      <view class="text" v-for="(item,index) in wordscp">{{item}}</view>
  </div>
</template>

<script>
  export default {
    props: ["words"],
    data() {
      return {
        wordscp: []
      }
    },
    mounted() {
      if (this.words.includes(',')) {
        this.wordscp = this.words.split(',')
      } else {
        this.wordscp = [this.words]
      }
    }
  }
</script>

<style scoped>
  .no-service {
    height: 360rpx;
    margin: 0 24rpx 24rpx 24rpx;
    border-radius: 20rpx;
    padding: 0 64rpx 0 32rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .no-service .bg {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 24rpx;
  }

  .no-service .text {
    /* width: 196rpx; */
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #999999;
    line-height: 40rpx;
  }
</style>
