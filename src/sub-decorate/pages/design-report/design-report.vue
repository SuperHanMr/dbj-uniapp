<template>
  <view class="wrap">
    <view class="avtor-wrap flex-row-bet">
      <view class="flex-row-start">
        <image class="avtor"></image>
        <view class="tigs">
          <view class="username">{{this.decorateMsg.customerName}}</view>
          <view class="role">设计</view>
        </view>
      </view>
      <view class="date">{{this.decorateMsg.serviceTime}}</view>
    </view>
    <view class="card flex-row-bet">
      <view class="t">设计报告详情</view>
      <view class="lookDetail flex-row-start" @click="goDetail">
        <view>立即查看</view>
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
      </view>
      <view class="lookDetail flex-row-start" @click="goDetail">
        <view>立即查看</view>
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_more.svg"></image>
      </view>
    </view>
    <button class="btn" @click="confirm">确认设计报告</button>
  </view>
</template>

<script>
  import { confirmDesignReport } from "../../../api/decorate.js"
  export default {
    data() {
      return {
        decorateMsg: getApp().globalData.decorateMsg || {
          "serveId": 1, //服务卡id
          "projectId": 1, //项目id
          "customerId": 1, //客户id
          "customerName": "王先生", //客户id
          "serveType": 1, // 服务类型
          "serveTypeName": "全案设计", //类型名称
          "stageId": 10, //阶段id
          "stageName": "平面布局", //阶段id
          "fullName": "纯设计|全案设计", //SPU + SKU
          "provinceName": "山西省", //房产省名称
          "cityName": "太原市", //房产市名称
          "housingEstate": "龙城小区", //小区名称
          "estateArea": "100平", //房产面积
          "serviceTime": "发布时间" //设计师发布报告时间
        }
      }
    },
    onLoad() {},
    methods: {
      confirm() {
        uni.showModal({
          title: "",
          content: "确认通过设计报告验收?",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              console.log("点击了确认")
              // confirmDesignReport(this.decorateMsg.serveId).then(data => {
              //   uni.navigateTo({
              //     url: `/sub-dec`
              //   })
              // })
            } else {
              console.log("点击了取消")
            }
          }
        })
      },
      goDetail() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    padding: 24rpx;
    background: #ffffff;
    height: 100%;
  }

  .avtor-wrap {
    margin-bottom: 33rpx;
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 24rpx;

    .avtor {
      width: 104rpx;
      height: 104rpx;
      border: 2rpx solid #000;
      border-radius: 50%;
      margin-right: 33rpx;
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
        background: linear-gradient(45deg, #6d95ef, #84b9fc);
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

  .card {
    height: 100rpx;
    background: #f7f7f7;
    border-radius: 24rpx;
    padding: 30rpx 16rpx 30rpx 36rpx;
  }

  .t {
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 40rpx;
  }

  .lookDetail {
    view {
      height: 36rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      color: #666666;
      line-height: 36rpx;
    }

    image {
      width: 24rpx;
      height: 24rpx;
    }
  }
</style>
