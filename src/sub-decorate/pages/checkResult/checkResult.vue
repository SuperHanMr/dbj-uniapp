<template>
  <view class="check-result">
    <result-content :scrollTop='scrollTop'></result-content>
    <bottom-btn style="width: 100%;" :showDefaultBtn="false">
      <button class="add-btn" @click="submit">确认验房结果</button>
    </bottom-btn>
  </view>
</template>

<script>
  import resultContent from '../../components/result-content/result-content.vue'
  import {
    
    confirmCheckResult
  } from '../../../api/decorate.js'
  export default {
    components:{
      resultContent
    },
    data(){
      return{
        scrollTop:0
      }
    },
    onPageScroll(scrollTop){
      this.scrollTop = scrollTop.scrollTop   
    },
    submit() {
      // console.log(1231)
      confirmCheckResult(30).then(res => {
        uni.navigateBack({})
      })
    }
  }
</script>

<style lang="scss" scoped>
  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    border-radius: 12rpx;
    width: 686rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
