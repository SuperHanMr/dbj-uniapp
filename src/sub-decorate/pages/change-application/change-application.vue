<template>
  <view class="application-wrap">
    <view class="title-wrap add-item">
      <title :type="1" :money="add"></title>
      <view class="list">
        <change-item v-for="(item, index) in [1,2,3,4]" :type="1" :key="index"></change-item>
      </view>
      <view class="zhu">注：</view>
      <view class="tips">该增项金额是根据您房屋实际需要补充的工艺项核算后的金额；支付完成后服务者会根据增加的工艺项为您提供服务</view>
    </view>
    <view class="title-wrap subtract-item">
      <title :type="0" :money="subtract"></title>
      <view class="list">
        <change-item v-for="(item, index) in [1,2,3,4]" :type="0" :key="index"></change-item>
      </view>
      <view class="zhu">注：</view>
      <view class="tips">该减项金额是根据您房屋实际需要减少的工艺项；您同意后会按照变更后的结果为您服务并退还减少的工艺项的差额</view>
    </view>
    <view class="summary">
      <view class="add-money">
        <view class="label">增项费用</view>
        <view class="money price-font">￥<text class="ft-28">{{(add/100).toFixed(2)}}</text></view>
      </view>
      <view class="recd-money">
        <view class="label">减项费用</view>
        <view class="money price-font">-￥<text class="ft-28">{{(subtract/100).toFixed(2)}}</text></view>
      </view>
      <view class="total-money">
        <view class="label">合计</view>
        <view class="money price-font">{{total < 0 ? "-" : ""}}￥<text
            class="ft-28">{{(Math.abs(total)/100).toFixed(2)}}</text></view>
      </view>
    </view>
    <view class="store-money-card" v-if="total > 0">
      <view class="yu-e">
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/ic_store_store_card2x.png"></image>
        <view class="c-1">储值卡</view>
        <view class="c-2">(可用余额：￥{{(storeValue/100).toFixed(2)}})</view>
      </view>
      <check-box :borderRadius="'50%'" height="36rpx" width="36rpx" :checked="checkStoreValueCard"
        @change="changStoreValueCard"></check-box>
    </view>
    <view class="pay-way" v-if="total > 0">
      <view class="label">支付方式</view>
      <view class="wx">微信支付</view>
    </view>
    <view class="pay-wrap">
      <view class="b-t-1" @click="refuse">拒绝申请</view>
      <view class="b-t-1 b-t-p" v-if="total > 0">同意并支付<text class="unit price-font">￥</text><text
          class="price-font">{{(total/100).toFixed(2)}}</text></view>
      <view class="b-t-1 b-t-p" v-if="total === 0">同意申请</view>
      <view class="b-t-1 b-t-p" v-if="total < 0">同意并退还您<text class="unit price-font">￥</text><text
          class="price-font">{{(Math.abs(total)/100).toFixed(2)}}</text></view>
    </view>
  </view>
</template>

<script>
  import Title from "./item-title.vue"
  import ChangeItem from "./change-item.vue"
  import CheckBox from "../../components/check-box/check-box.vue"
  export default {
    components: {
      Title,
      ChangeItem,
      CheckBox
    },
    data() {
      return {
        checkStoreValueCard: false,
        msg: {},
        storeValue: 232,
        add: 1999,
        subtract: 1000
      };
    },
    computed: {
      total() {
        return (this.add - this.subtract) * 100 / 100
      }
    },
    onLoad(option) {
      this.msg = {
        title: "拆除工工艺项变更申请"
      }
      uni.setNavigationBarTitle({
        title: this.msg.title
      })
    },
    methods: {
      changStoreValueCard(value) {
        this.checkStoreValueCard = value
      },
      refuse() {
        console.log("拒绝申请变更")
        uni.navigateTo({
          url: "/sub-decorate/pages/refused-apply/refused-apply"
        })
      }
    }
  }
</script>

<style lang="scss">
  .application-wrap {
    padding-top: 16rpx;
    background: #f5f6f6;
  }

  .list {
    padding-bottom: 32rpx;
    background-color: #fff;
  }

  .summary {
    padding: 24rpx 32rpx;
    background-color: #fff;
    margin-bottom: 16rpx;
  }

  .add-money,
  .recd-money,
  .total-money {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .label {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 40rpx;
    }

    .money {
      height: 40rpx;
      font-size: 24rpx;
      font-weight: 400;
      text-align: right;
      color: #333333;
      line-height: 40rpx;

      .ft-28 {
        font-size: 32rpx;
      }
    }
  }

  .store-money-card {
    padding: 34rpx 32rpx;
    background-color: #fff;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .yu-e {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
    }

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 12rpx;
    }

    .c-1 {
      width: 84rpx;
      height: 28rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 28rpx;
    }

    .c-2 {
      height: 28rpx;
      font-size: 24rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999;
      line-height: 28rpx;
    }

  }

  .zhu {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999;
    line-height: 34rpx;
    background-color: #fff;
    padding: 0 32rpx;
  }

  .tips {
    height: 68rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999;
    line-height: 34rpx;
    margin-bottom: 16rpx;
    background-color: #fff;
    padding: 0 32rpx 32rpx;
  }

  .pay-way {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 32rpx;
    background-color: #fff;
    margin-bottom: 48rpx;

    .label {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 40rpx;
    }

    .wx {
      height: 32rpx;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      padding-left: 44rpx;
      color: #111111;
      line-height: 32rpx;
      background-image: url("http://dbj.dragonn.top/static/mp/dabanjia/images/ic_order_wechat2x.png");
      background-size: 32rpx 32rpx;
      background-repeat: no-repeat;
    }
  }

  .pay-wrap {
    padding: 24rpx 32rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .b-t-1 {
      width: 188rpx;
      height: 88rpx;
      line-height: 88rpx;
      border: 1rpx solid #cccccc;
      border-radius: 16rpx;
      text-align: center;
      font-size: 30rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
    }

    .b-t-p {
      flex: 1;
      background: linear-gradient(135deg, #00ccbe, #00c2bf);
      margin-left: 32rpx;
      color: #fff;

      .unit {
        font-size: 24rpx;
      }
    }
  }
</style>
