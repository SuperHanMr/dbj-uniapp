<template>
  <view class="amount-delivery">
    <amount-house :checkData="checkData"></amount-house>
    <bottom-btn style="width: 100%;" :showDefaultBtn="false">
      <view class="btn">
        <view class="btn-left" @click="change">
          <image src="" mode=""></image>
          <text>申请修改</text>
        </view>
        <button class="add-btn" @click="submit">确认量房图</button>
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
    margin-right: 17rpx;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;

    image {
      width: 28rpx;
      height: 28rpx;
    }

    text {
      display: block;
      font-size: 22rpx;
      color: #666;

    }
  }

  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(135deg, #53d5cc, #4fc9c9);
    border-radius: 12rpx;
    width: 560rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
