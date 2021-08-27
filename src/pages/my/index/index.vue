<template>
  <view class="my-container">
    <view class="my-header">
      <view class="avatar-img">
        <image
          src="../../login/imgs/Lark20210823-152715.png"
          mode="center"
        />
      </view>
      <view class="user-name">
        用户名称
        <view
          class="edit-info"
          @click="handlerPersonalData"
        >
          编辑个人资料
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
        <uni-list :border="false">
          <uni-list-item
            link
            to="../my-order/my-order"
            @click="onClick($event,1)"
          >
            <template slot="header">
              我的订单
            </template>
            <template slot="footer">
              全部
            </template>
          </uni-list-item>
        </uni-list>
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
        url: "../edit-personal-data/index",
      });
    },
    handlePersonalItem(item) {
      console.log(item.url, "key");
      uni.navigateTo({
        url: item.url,
      });
    },
  },
};
</script>

<style  scoped>
.my-container {
  display: flex;
  flex-direction: column;
}
.my-container .my-header {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  background-color: #c0c0c0;
}
.my-container .my-header .avatar-img image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.my-container .my-order {
  width: 100%;
  height: 400rpx;
  background-color: #c0c0c0;
  margin-top: 20rpx;
  display: flex;
}
.my-container .my-order .order-header {
  width: 100%;
}
.personal-center {
  width: 100%;
  margin-top: 20rpx;
  background-color: #c0c0c0;
}

.personal-center .personal-body {
  width: 100%;
  background-color: pink;
}
.personal-center .personal-body .main-body {
  display: flex;
  flex: 1;
  overflow: auto;
}
.personal-center .personal-body .main-body .item-style {
  width: 200rpx;
  margin: 20rpx;
  padding: 12rpx;
  background-color: #4cd964;
}
</style>

