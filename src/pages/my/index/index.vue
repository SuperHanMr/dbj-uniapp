<template>
  <view class="my-container">
    <view class="my-header">
      <view class="avatar-img">
        <image
          src="../../login/imgs/Lark20210823-152715.png"
          mode="center"
          class="avatar"
        />
        <view class="user-name">
          用户名称
          <view
            class="edit-info"
            @click="handlerPersonalData()"
          >
            <text>编辑个人资料</text>
            <image
              src="../../../static/order/ic_more@2x.png"
              mode=""
            ></image>
          </view>
        </view>
      </view>
      <view
        class="set-up"
        @click="handleSetUp"
      >
        设置
      </view>
    </view>
    <view class="my-order">
      <view class="order-header">
        <view class="order">我的订单</view>
        <view
          class="total"
          @click="handlerTotalOrder()"
        >
          <text>全部</text>
          <image
            src="../../../static/order/ic_more@2x.png"
            mode=""
          ></image>
        </view>
      </view>
      <view class="order-body">
        <view
          class="item"
          v-for="item in orderStatusList"
          :key="item.key"
          @click="handlerOrder(item)"
        >
          {{item.value}}
        </view>

      </view>
    </view>
    <view class="personal-center">
      <view class="personal-header">
        个人中心
      </view>
      <view class="personal-body">
        <view class="main-body">
          <view
            class="item-style"
            v-for="(item,index) in list"
            :key="index"
            @click="handlePersonalItem(item)"
          >
            {{item.value}}
          </view>

        </view>
      </view>
    </view>
    <view @click="handlerToMyHouse">我的房屋</view>
    <view @click="handlerToShop">购物车</view>
    <view @click="handlerToSetUp">真实案例</view>
  </view>

</template>

<script>
import { uniBadge } from "@dcloudio/uni-ui";
export default {
  components: { uniBadge },
  data() {
    return {
      list: [
        {
          key: "1",
          value: "我的收藏",
          url: "../personal-center/my-collection/my-collection",
        },
        {
          key: "2",
          value: "我的关注",
          url: "../personal-center/my-attention/my-attention",
        },
        // {
        //   key: "3",
        //   value: "购物车",
        //   url: "../shopping-car/index",
        // },
        {
          key: "4",
          value: "我的钱包",
          url: "../personal-center/my-wallet/my-wallet",
        },
        {
          key: "5",
          value: "投诉与建议",
          url: "../personal-center/complaints-and-suggestions/complaints-and-suggestions",
        },
      ],
      orderStatusList: [
        {
          key: "1",
          value: "待付款",
          url: "../my-order/my-order?index=1",
        },
        {
          key: "2",
          value: "进行中",
          url: "../my-order/my-order?index=2",
        },
        {
          key: "3",
          value: "已完成",
          url: "../my-order/my-order?index=3",
        },
        {
          key: "4",
          value: "评价",
          url: "../evaluate/evaluate",
        },
        {
          key: "5",
          value: "退款",
          // url: "../refund-list/refund-list",
          url: "/sub-my/pages/apply-for-refund/apply-for-refund",
        },
      ],
    };
  },
  methods: {
    handlerToShop() {
      console.log("点击了");
      uni.navigateTo({
        url: "../shopping-cart/shopping-cart",
      });
    },
    handlerToSetUp() {
      console.log("点击了设置");
      uni.navigateTo({
        url: "../../real-case/real-case",
      });
    },
    handleSetUp() {
      console.log("点击设置");
      uni.navigateTo({
        url: "../set-up/set-up",
      });
    },
    handlerPersonalData() {
      console.log("编辑个人资料");
      uni.navigateTo({
        url: "../edit-personal-data/edit-personal-data",
      });
    },
    handlePersonalItem(item) {
      console.log(item.url, "key");
      uni.navigateTo({
        url: item.url,
      });
    },
    handlerTotalOrder() {
      console.log("点击我的订单全部按钮");
      uni.navigateTo({
        url: "../my-order/my-order?index=1",
      });
    },
    handlerOrder(item) {
      console.log(item.value);
      uni.navigateTo({
        url: item.url,
      });
    },
    handlerToMyHouse() {
      uni.navigateTo({
        url: "/pages/my/my-house/my-house?isMy=true",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  display: flex;
  flex-direction: column;
  .my-header {
    background-color: #ffffff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    .avatar-img {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .avatar {
        width: 120rpx;
        height: 120rpx;
        background-color: red;
        border-radius: 50%;
        margin-right: 24rpx;
      }
    }
    .user-name {
      font-weight: 800;
      .edit-info {
        display: flex;
        align-items: center;
        margin-top: 8rpx;
        font-size: 24rpx;
        font-weight: normal;
        image {
          width: 34rpx;
          height: 34rpx;
          object-fit: cover;
        }
      }
    }
    .set-up {
    }
  }

  .my-order {
    height: 300rpx;
    padding: 0 32rpx;
    margin-top: 16rpx;
    display: flex;
    background-color: #fff;
    flex-flow: column nowrap;
    .order-header {
      display: flex;
      flex-wrap: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx 0;
      .order {
        font-weight: bold;
        font-size: 32rpx;
      }
      .total {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        image {
          width: 34rpx;
          height: 34rpx;
          object-fit: cover;
        }
      }
    }
    .order-body {
      display: flex;
      flex-flow: row nowrap;
      .item {
        width: 140rpx;
        height: 140rpx;
        line-height: 140rpx;
        background-color: pink;
        text-align: center;
        margin-right: 24rpx;
      }
      .item:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }

  .personal-center {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
    .personal-header {
      padding: 32rpx;
      font-weight: bold;
      font-size: 32rpx;
    }
    .personal-body {
      width: 100%;
      background-color: pink;
      .main-body {
        display: flex;
        flex: 1;
        overflow: auto;
        .item-style {
          width: 200rpx;
          margin: 20rpx;
          padding: 12rpx;
          background-color: #4cd964;
        }
      }
    }
  }
}
</style>

