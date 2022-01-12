<template>
  <view class="my-container">
    <custom-navbar
      opacity="0"
      :showBack="true"
    ></custom-navbar>
    <view
      class="backgroundStyle"
      :style="{backgroundImage:`url(${bgImg})`,backgroundSize:'cover'}"
    >
			<!-- <view class="mask">
				<view class="linearStyle" />
			</view> -->
    </view>

    <view class="my-body">
      <view class="my-header">
        <view
          class="avatar-img"
          v-if="!userId"
          @click="handlerPersonalData()"
        >
          <image
            src="https://ali-image.dabanjia.com/image/20210513/10/162087290165628.png"
            class="avatar"
            mode="aspectFill"
          />
          <view class="user-name">
            <view class="name">
              <text class="name">
                {{userName}}
              </text>
              <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/back.svg" />
            </view>
          </view>
        </view>
        <view
          class="avatar-img"
          v-else
          @click="handlerPersonalData()"
        >
          <image
            :src="`${userInfo.avatar}?x-oss-process=image/resize,m_mfit,w_240,h_240`"
            class="avatar"
            mode="aspectFill"
          />
          <view class="user-name">
            <text class="name">{{userName}} </text>
            <view class="edit-info">
              <text>编辑个人资料</text>
            </view>
          </view>
        </view>

        <view  class="set-up"  @click="handleSetUp">
          <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/setting.svg" />
        </view>
      </view>

      <view class="my-order">
        <view class="order-header">
          <view class="order">我的订单</view>
          <view class="total" @click="handlerViewAll()" >
            <text>全部订单</text>
            <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/gray_array_back.svg"/>
          </view>
        </view>
        <view class="order-line" />
        <view class="order-body">
          <view
            class="item"
            v-for="(item,index) in orderStatusList"
            :key="item.key"
            @click="handlerOrder(item)"
          >
            <view
              class="waitPayIcon"
              v-if="index == 0 && waitPayOrderNum"
              :class="{twoNumber:waitPayOrderNum > 9 && waitPayOrderNum < 100,threeNumber:waitPayOrderNum>=100}"
            >
              {{ waitPayOrderNum }}
            </view>
            <image :src="item.image"/>
            <text style="color:#333333;font-size: 24rpx;">{{item.value}}</text>
          </view>
        </view>
      </view>
      <view class="my-tools">
        <view class="header"> 更多功能</view>
        <view class="tool-line" />
        <view class="tool-body">
          <view
            class="tool-item"
            v-for="item2 in list"
            :key="item2.key"
            @click="handlePersonalItem(item2)"
          >
            <view class="left">
              <image :src="item2.image" />
              <text>{{item2.value}}</text>
            </view>

            <view class="right" >
              <text v-if="isShowStoreValue && item2.key==1">{{storeValueCard? Number(storeValueCard)/100 :'0.00' }}元</text>
               <text v-if="item2.key==2">3张</text>
							<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/gray_array_back.svg"/>
            </view>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniBadge } from "@dcloudio/uni-ui";
import {
  queryToBePaidOrderNum,
  queryStoreValueCard,
} from "../../../api/order.js";
export default {
  components: {
    uniBadge,
  },
  data() {
    return {
      bgImg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/myPage_bgImg.svg",
      waitPayOrderNum: "",
      isShowStoreValue: false,
      storeValueCard: "",
      isLogin: false,
      userName: "用户名称",
      userInfo: {},
      userId: "",
      MarketStoreSwitch: false,
      list: [
        // {
        // 	key: "2",
        // 	image: "../../../static/order/images/ic_coupon.svg",
        // 	value: "优惠券",
        // 	url: "../../../sub-my/pages/coupon-list/coupon-list",
        // },
        {
          key: "3",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/shopping_Cart.svg",
          value: "购物车",
          url: "../../../sub-my/pages/shopping-cart/shopping-cart",
        },
        {
          key: "4",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/collection.svg",
          value: "我的收藏",
          url: "../../../sub-my/pages/personal-center/my-collection/my-collection?firstEntry=true",
        },
        {
          key: "5",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/attention.svg",
          value: "我的关注",
          url: "../../../sub-my/pages/personal-center/my-attention/my-attention",
        },
        {
          key: "6",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/houseGgr.svg",
          value: "房屋管理",
          url: "../../../sub-my/pages/my-house/my-house?isMy=true",
        },
      ],
      orderStatusList: [
        {
          key: "1",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/wait_pay.svg",
          value: "待付款",
          url: "../../../sub-my/pages/my-order/my-order?index=1&firstEntry=true",
        },
        {
          key: "2",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/inprogress.svg",
          value: "进行中",
          url: "../../../sub-my/pages/my-order/my-order?index=2&firstEntry=true",
        },
        {
          key: "3",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/order_done.svg",
          value: "已完成",
          url: "../../../sub-my/pages/my-order/my-order?index=3&firstEntry=true",
        },
        {
          key: "4",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/evaluate.svg",
          value: "评价",
          url: "../../../sub-my/pages/evaluate/evaluate",
        },
        {
          key: "5",
          image: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/refund.svg",
          value: "退款", //退款列表
          url: "../../../sub-my/pages/refund-list/refund-list",
        },
      ],
    };
  },
  mounted() {
    uni.showTabBar();
  },
  onShow() {
    if (getApp().globalData.goHomeUrl) {
      getApp().globalData.goHomeUrl = false;
      uni.switchTab({
        url: "/pages/home/index/index",
      });
      return;
    }
    if (getApp().globalData.MarketStoreSwitch && this.list[0].key != "1") {
      this.MarketStoreSwitch = true;
      this.list.unshift({
        key: "1",
        image: "../../../static/order/images/ic_storeValueCard.svg",
        value: "储值卡",
        url: "../../../sub-my/pages/deposit-card/deposit-card",
      });
    }
    uni.showTabBar();
    this.userId = getApp().globalData.token;
    if (!this.userId) {
      this.waitPayOrderNum = 0;
      this.userName = "点击登录";
      this.isLogin = false;
      this.userInfo = null;
      this.isShowStoreValue = false;
      this.storeValueCard = null;
    } else {
      this.isLogin = true;
      this.isShowStoreValue = true;
      this.userInfo = getApp().globalData.userInfo;
      this.userName = this.userInfo.name;
      queryToBePaidOrderNum().then((e) => {
        this.waitPayOrderNum = e ? e : 0;
      });
      queryStoreValueCard().then((e) => {
        console.log("!!!!!!!!!!!!! e=", e);
        if (e !== null) {
          console.log("????????????????");
          this.storeValueCard = e;
        }
      });
    }
    this.$store.dispatch("updateTabBarBadge");
  },

  onLoad() {
    getApp().globalData.currentRoute = "/pages/my/index/index";
  },

  methods: {
    toLogin() {
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      }
    },
    handlerToSetUp() {
      console.log("点击了设置");
      uni.navigateTo({
        url: "../../real-case/real-case",
      });
    },

    handleSetUp() {
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      } else {
        console.log("点击设置");
        uni.navigateTo({
          url: "../../../sub-my/pages/set-up/set-up",
        });
      }
    },
    handlerPersonalData() {
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      } else {
        uni.navigateTo({
          url: "../../../sub-my/pages/edit-personal-data/edit-personal-data",
        });
      }
    },
    handlePersonalItem(item) {
      console.log(item.url, "key");
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      } else {
        uni.navigateTo({
          url: item.url,
        });
      }
    },

    handlerViewAll() {
      console.log("点击我的订单全部按钮");
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      } else {
        uni.navigateTo({
          url: "../../../sub-my/pages/my-order/my-order?index=99&firstEntry=true",
        });
      }
    },
    handlerOrder(item) {
      console.log(item.value);
      if (!this.isLogin) {
        uni.navigateTo({
          url: "../../login/login",
        });
      } else {
        uni.navigateTo({
          url: item.url,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  display: flex;
  flex-direction: column;
  position: relative;

  .backgroundStyle {
    position: absolute;
    width: 750rpx;
    height: 490rpx;
  //   .mask {
		// 	opacity: 1;
		// 	z-index: 1;
		// 	position: relative;
		// 	width: 100%;
		// 	height: 100%;
		// 	.linearStyle {
		// 		filter: blur(13rpx);
		// 		width: 100%;
		// 		height: 22px;
		// 		bottom: 0;
		// 		left: 0;
		// 		z-index: 1;
		// 		position: absolute;
		// 	}
		// }
  }

  .my-body {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 180rpx;
    z-index: 2;
    padding-bottom: 32rpx;
  }

  .my-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 34rpx 0 36rpx;

    .avatar-img {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        border: 2rpx solid #ffffff;
        object-fit: cover;
        opacity: 1;
        margin-right: 24rpx;
      }
    }

    .user-name {
      .name {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 44rpx;
        line-height: 44rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #222222;
        image {
          width: 40rpx;
          height: 40rpx;
          display: block;
        }
      }

      .edit-info {
        margin-top: 8rpx;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 26rpx;
        line-height: 26rpx;
        opacity: 1;
        font-size: 22rpx;
        color: #999999;
        // image {
        // 	width: 32rpx;
        // 	height: 32rpx;
        // 	object-fit: cover;
        // }
      }
    }

    .set-up {
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .my-order {
    height: 300rpx;
    margin: 68rpx 22rpx 16rpx 24rpx;
    display: flex;
    background-color: #fff;
    flex-flow: column nowrap;
    border-radius: 16rpx;

    .order-header {
      display: flex;
      flex-wrap: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx;

      .order {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
      }

      .total {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #999999;

        image {
          margin-left: 8rpx;
          width: 24rpx;
          height: 24rpx;
        }
      }
    }

    .order-line {
      height: 0.5px;
      background: #f4f4f4;
      margin: 0 32rpx;
    }

    .order-body {
      display: flex;
      flex-flow: row nowrap;
      padding: 32rpx 40rpx 48rpx;
      justify-content: space-between;

      .item {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        font-size: 22rpx;
        color: #111111;
        font-weight: 400;
        position: relative;

        image {
          width: 64rpx;
          height: 64rpx;
          object-fit: cover;
          margin-bottom: 12rpx;
        }

        .waitPayIcon {
          position: absolute;
          width: 32rpx;
          height: 32rpx;
          line-height: 26rpx;
          box-sizing: border-box;
          text-align: center;
          background: #ff3347;
          border: 1rpx solid #ffffff;
          border-radius: 50%;
          top: 0;
          left: 40rpx;
          color: #ffffff;
          font-size: 18rpx;
          z-index: 99;
        }
      }

      .item:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }

  .my-tools {
    margin: 0 22rpx 0 24rpx;
    border-radius: 16rpx;
    background-color: #ffffff;

    .header {
      color: #333333;
      padding: 32rpx;
      font-size: 32rpx;
      font-weight: 600;
    }

    .tool-line {
      height: 0.5px;
      background: #f4f4f4;
      margin: 0 32rpx;
    }

    .tool-body {
      .tool-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 26rpx 32rpx;

        .left {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
          image {
            width: 48rpx;
            height: 48rpx;
            margin-right: 20rpx;
          }
        }

        .right {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          text {
            font-size: 24rpx;
            color: #999999;
          }
          image {
            margin-left: 16rpx;
            width: 24rpx;
            height: 24rpx;
          }
        }
      }
    }
  }
}

.twoNumber {
  width: 40rpx !important;
  border-radius: 18rpx !important;
}

.threeNumber {
  width: 50rpx !important;
  border-radius: 18rpx !important;
}
</style>
