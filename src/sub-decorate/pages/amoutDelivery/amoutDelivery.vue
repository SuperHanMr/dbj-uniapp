<template>
  <view class="amount-delivery">
    <amount-house :checkData="checkData" :isReport='true'></amount-house>
    <bottom-btn style="width: 100%;" :showDefaultBtn="false">
      <view class="btn">
        <view class="btn-left" @click="change">
          <i class="icon-ic_wodejia_shenqinggenghuan_csn"></i>
          <text>申请修改</text>
        </view>
        <view class="add-btn" @click="submit">确认量房图</view>
      </view>
    </bottom-btn>

  </view>
</template>

<script>
  import {
    replaceAmount,
    sureAmount
  } from '../../../api/decorate.js'
  export default {
    data() {
      return {
        checkData:{
          serveId:0,
          type:11
        }
      };
    },
    mounted() {
      let {serveId,serveType:type}  = getApp().globalData.decorateMsg
      this.checkData = {serveId,type}
    },
    methods: {
      submit() {
        uni.showModal({
          content: "是否确认该量房结果？",
          success: (res) => {
            if (res.confirm) {
              this.sureAmount()
              
            }
          },
        });
      },
      change(){
        uni.showModal({
          content: "请先与量房员沟通需要修改的内容？",
          success: (res) => {
            if (res.confirm) {
              this.changeAmount()
              
            }
          },
        });
      },
      sureAmount() {
        sureAmount(this.checkData).then(res => {
          uni.switchTab({
            url: "/pages/decorate/index/index",
          });
        })
      },
      changeAmount(){
        replaceAmount(this.checkData).then(res=>{
          uni.switchTab({
            url: "/pages/decorate/index/index",
          });
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .amount-delivery {
    height: 100%;
    background-color: #fff;
  }

  .btn {
    display: flex;
    padding: 0 32rpx;
  }

  .btn-left {
    margin-right: 32rpx;
    display: flex;
    // align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 200rpx;
    height: 88rpx;
    background: #ffffff;
    border: 0.5px solid #cbcccc;
    border-radius: 12rpx;
    i{
      width: 28rpx;
      height: 28rpx;
      color: #333;
      font-size: 16rpx;
      line-height: 28rpx;
      text-align: center;
      color: #333;
    }
  
    text {
      display: block;
      font-size: 26rpx;
      color: #333;
  
    }
  }

  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    border-radius: 12rpx;
    width: 454rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
