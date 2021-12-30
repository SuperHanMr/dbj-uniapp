<template>
  <view class="wrap">
    <view class="text-area-wrap">
      <textarea @input="onInput" @blur="bindTextAreaBlur" :value="reason" maxlength="500" class="tx"
        placeholder-style="color: #999999" placeholder="请填写拒绝通过的原因，可以让服务者更快速的解决问题～" />
      <view class="maxlength">{{reason.length}}/500</view>
    </view>
    <view class="tips">建议与服务者沟通后再拒绝通过</view>
    <view class="bt-btn-wrap" :style="{paddingBottom:systemBottom}">
      <button class="btn" @click="confirm">提交</button>
    </view>
  </view>
</template>

<script>
  import {
    ownerInsertAudit
  } from "../../../api/construction.js"
  export default {
    onLoad(option) {
      this.id = option.id
      // this.serveTypeName = option.serveTypeName 
    },
    onShow() {
      // uni.setNavigationBarTitle({
      //   title: this.serveTypeName
      // })
    },
    data() {
      return {
        reason: "",
        id: null,
        containerBottom: null,
        systemBottom: null,
        systemHeight: null,
      }
    },
    mounted() {
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      this.containerBottom = menuButtonInfo.bottom;
			this.systemBottom = menuButtonInfo.bottom * 2 + "rpx";
			// #ifdef H5
			this.systemBottom = menuButtonInfo.bottom * 4 + "rpx";
			// #endif
      this.systemHeight = menuButtonInfo.bottom * 2 + 24 + "rpx";
    },
    methods: {
      bindTextAreaBlur: function(e) {
        console.log(e.detail.value)
      },
      onInput(e) {
        this.reason = e.target.value
      },
      confirm() {

        if (this.reason.trim() == false) {
          uni.showToast({
            title: "请填写原因后提交",
            icon: "none"
          })
          return
        }
        ownerInsertAudit({
          applyId: this.id,
          auditResult: this.reason,
          status: 4
        }).then(data => {
          uni.showToast({
            title: "已提交申请",
            icon: false
          })
          // uni.navigateTo({
          //   url: "/pages/decorate/index/index"
          // })
          uni.navigateBack({
            delta: 2
          })
        })
      }
    },
    // watch: {
    //   reason(val) {
    //     console.log(val)
    //   }
    // }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    padding: 32rpx;
    background: #fff;
  }

  .tx {
    width: 100%;
    height: 380rpx;
    background: #f5f6f6;
    border-radius: 24rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    box-sizing: border-box;
  }

  .tips {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #808080;
    line-height: 34rpx;
    margin-bottom: 24rpx;
  }

  .bt-btn-wrap {
    position: fixed;
    background-color: #fff;
    height: 88rpx;
    width: 100%;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 24rpx 32rpx;
  }

  .btn {
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

  .text-area-wrap {
    padding-top: 32rpx;
    position: relative;
  }

  .maxlength {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    // width: 70rpx;
    height: 40rpx;
    font-size: 22rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 40rpx;
    letter-spacing: 1rpx;
  }
</style>
