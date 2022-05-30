<template>
  <view class="replace-worker">
    <view class="content">
      <text class="replace-tip">请选择更换的原因</text>
      <view class="radio-group">
        <view class="radio-item" v-for="(item, index) in items" :class="{last:item.id===4}" :key="item.id"
          @click="radioChange(item)">
          <view class="text">{{item.reason}}</view>
          <view class="circle" v-if="currentId!==item.id" >
            <view></view>
          </view>
          <view class="circle" v-else>
            <image src="" mode=""></image>
          </view>
        </view>
      </view>
      <view class="text-area" v-if="currentId === 4">
        <textarea v-model="otherReason" :show-confirm-bar='false' class="replace-text-area" :maxlength='500' placeholder="请输入原因详情" />
        <text class="text-area-warning" v-if="!otherReason">（必填）</text>
        <text class="text-area-info" v-if="otherReason">{{otherReason.length>500?500:otherReason.length}}/500</text>
      </view>
    </view>
    <bottom-btn style="width: 100%;" :showDefaultBtn="false">
      <button class="add-btn" @click="submit">提交</button>
    </bottom-btn>
  </view>
</template>

<script>
  import {
    rejectChangeOrder,
    rejectReson
  } from "../../../api/decorate.js";
  import upload from '../../../utils/upload.js'
  export default {
    data() {
      return {
        num: 0,
        items: [],
        currentId: "",
        imageValue: [],
        otherReason: "",
        changeOrderId: '',
        isServed:false
      };
    },
    onLoad(e) {
      this.changeOrderId = e.changeOrderId || 1,
      this.isServed = e.isServed
      this.rejectReson()
    },
    methods: {
      rejectReson(){
        rejectReson().then(res=>{
          console.log(res)
          this.items = res
        })
      },
      radioChange(evt) {
        this.currentId = evt.id;
      },
      submit() {
        if (!this.currentId) {
          uni.showToast({
            title: "请您选择更换原因",
            duration: 2000,
            icon: "none",
          });
          return;
        } else if (this.currentId === 4 && this.otherReason.length === 0) {
          uni.showToast({
            title: "请您描述具体原因",
            duration: 2000,
            icon: "none",
          });
          return;
        }
        this.submitQuery()
      },
      submitQuery() {
        let data = {
          changeOrderId: this.changeOrderId,
          optionId: this.currentId,
          optionMsg: this.currentId!==4?this.items[this.currentId-1].reason:this.otherReason.substr(0,500)
        }
          rejectChangeOrder(data).then(res => {
            uni.showToast({
              title: '已提交申请',
              duration: 2000,
              icon: 'success'
            })
            uni.switchTab({
              url: "/pages/decorate/index/index",
            });
          })
      }
    },
  };
</script>

<style lang="scss">
  .replace-worker {
    // padding: 0 32rpx;
    background-color: #fff;
    height: 100%;

    .content {
      padding: 0 32rpx;
    }

    .replace-tip {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #999;
    }

    .radio-item {
      height: 104rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.5px solid #efefef;

      .text {
        font-size: 28rpx;
        font-weight: 400;
        color: #333;
      }

      .circle {
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        border: 0.5px solid #bababa;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .isActive {
        border: 0.5px solid #35c4c4;

        view {
          width: 16rpx;
          height: 16rpx;
          border-radius: 50%;
          background: #35c4c4;
        }
      }
    }

    .last {
      border-bottom: none;
    }

    .text-area {
      position: relative;

      .replace-text-area {
        width: calc(100% - 24px);
        height: 232rpx;
        padding: 24rpx 24rpx 68rpx;
        opacity: 1;
        background: #f5f6f6;
        border-radius: 24rpx;
        font-size: 26rpx;
        color: #333;
        font-weight: 400;
        letter-spacing: 2rpx;
      }

      .text-area-warning,
      .text-area-info {
        color: #ea3434;
        font-size: 26rpx;
        position: absolute;
        bottom: 24rpx;
        right: 24rpx;
      }
      .text-area-info {
        color: #999;
      }
    }

    .upload-tip {
      height: 104rpx;
      line-height: 104rpx;
      color: #333;
      font-size: 28rpx;
      font-weight: 400;

      text {
        color: #999;
      }
    }

    .upload-contet {
      width: 100%;
      height: 100%;
      background-color: #f5f6f6;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        width: 56rpx;
        height: 56rpx;
        margin: 0 auto;
        display: block;
        color: #B1B1B1;
        text-align: center;
        line-height: 56rpx;
      }

      text {
        font-size: 24rpx;
        color: #999;
        font-weight: 400;
        display: block;
      }
    }
  }

  .add-btn {
    // margin-top: 20rpx;
    height: 88rpx;
    background: linear-gradient(115.75deg, #FA3B34 -3.13%, #FF6A33 92.1%);
    border-radius: 12rpx;
    width: 686rpx;
    line-height: 88rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
  }
</style>
