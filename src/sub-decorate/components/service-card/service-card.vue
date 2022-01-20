<template>
  <view class="wrap" :style="{marginBottom: setting.isLast ? 0 : '16rpx'}">
    <view class="title">
      <view class="title-check">
        <slot name="check"></slot>
        <text class="text">{{setting.title}}{{setting.level | filterLevel(setting.cardtype)}}</text>
      </view>
      <view v-if="setting.cardtype == 'design' && setting.insideArea && showLevel" class="change-service" @click="changeLevel">
        <text>更换等级</text>
        <i class='icon-alert_notice_jump'></i>
      </view>
    </view>
    <server-content :content="setting" @selectAnother="selectAnother"></server-content>
    <view class="door-time-wrap" v-if="(setting.serviceType == 2 || setting.title == '验房服务') && setting.appointmentRequired">
      <view class="door-time"><text class="label">选择期望上门时间</text><text class="value">{{setting.doorTime}}</text>
      </view>
      <image @click="selectDoorTime" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/arrow-r-gr.svg" class="change-img"></image>
    </view>
  </view>
</template>

<script>
  import ServerContent from "./service-content.vue";

  export default {
    name: "ServiceCard",
    components: {
      ServerContent
    },
    props: {
      setting: {
        required: true,
        type: Object,
        default: () => {}
      },
      showLevel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      };
    },
    methods: {
      selectAnother() {
        this.$emit("selectAnother")
      },
      changeLevel() {
        this.$emit("changeLevel")
      },
      selectDoorTime() {
        this.$emit("setDoorTime")
      }
    },
    filters: {
      filterLevel(value, cardtype) {
        if (cardtype !== "design") return ""
        let res = ""
        switch (value) {
          case 1:
            res = "(中级)"
            break;
          case 2:
            res = "(高级)"
            break;
          case 3:
            res = "(特级)"
            break;
          case 4:
            res = "(钻石)"
            break;
          default:
            res = "(中级)"
            break;
        }
        return res;
      }
    }
  }
</script>

<style scoped lang="scss">
  button {
    padding: 0;
    margin: 0;
  }

  .wrap {
    width: 100%;
    box-sizing: border-box;
    min-height: 300rpx;
    background: #fff;
    border-radius: 32rpx;
    padding: 32rpx;
  }

  .title-check {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .text {
      margin-left: 16rpx;
      height: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #333;
      line-height: 44rpx;
    }

    // .change-service.change-level {
    //   width: 124rpx;
    // }

    .change-service {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 124rpx;
      height: 44rpx;
      // background: #f5f6f6;
      border-radius: 12rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      border-radius: 12rpx;
      border: 0 solid #f5f6f6;
      outline: none;
      color: #333333;
      font-size: 22rpx;
      box-sizing: border-box;

      text {
        font-size: 22rpx;
        margin-right: 8rpx;
      }
      i {
       font-size: 12rpx;
      }
    }
  }

  .door-time-wrap {
    margin: 32rpx 0 0 56rpx;
    padding: 32rpx 0;
    border-top: 2rpx solid #efefef;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .door-time {
      .label {
        height: 40rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 40rpx;
      }

      .value {
        height: 32rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #333;
        line-height: 32rpx;
        padding-left: 20rpx;
      }
    }

    image {
      width: 24rpx;
      height: 24rpx;
    }
  }
</style>
