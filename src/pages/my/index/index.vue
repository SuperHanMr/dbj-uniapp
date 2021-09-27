<template>
  <view class="my-container">
    <custom-navbar opacity="0"  :showBack="true" ></custom-navbar>
    <view
      v-if="userInfo && userInfo.avatar"
      class="backgroundStyle"
      :style="{backgroundImage:userInfo.avatar?`url(${userInfo.avatar})`:url(),backgroundSize: 'cover'}"
    >
      <view class="mask" />
    </view>
    <view v-else  class="backgroundStyle"  style="backgroundColor:#cac8c8"/>
		
    <view class="my-header">
      <view class="avatar-img">
				<image :src="userInfo.avatar" class="avatar" />
        <view class="user-name">
          <text class="name"  @click="toLogin" >{{userName}} </text>
					 <view class="edit-info"  @click="handlerPersonalData()">
            <image  src="../../../static/order/images/mineEdit@2x.png"  mode=""/>
            <text>编辑个人资料</text>
          </view>
        </view>
      </view>
      <view  class="set-up" @click="handleSetUp">
        <image src="../../../static/order/images/setting@2x.png" mode="" />
      </view>
    </view>

    <view class="my-order">
      <view class="order-header">
        <view class="order">我的订单</view>
        <view  class="total"  @click="handlerViewAll()">
          <text>查看全部</text>
          <image  src="../../../static/order/images/arraw_right_@2x.png"  mode="" />
        </view>
      </view>
      <view class="order-line" />
      <view class="order-body">
        <view   class="item"   v-for="(item,index) in orderStatusList"  :key="item.key"
          @click="handlerOrder(item)">
					<view class="waitPayIcon" v-if="index == 0" >{{ waitPayOrderNum }}</view>
          <image :src="item.image" mode="" />
					 {{item.value}}
        </view>
      </view>
    </view>

    <view class="my-tools">
      <view class="header">  更多功能</view>
      <view class="tool-line" />
      <view class="tool-body">
        <view
          class="tool-item"
          v-for="item2 in list"
          :key="item2.key"
          @click="handlePersonalItem(item2)"
        >
          <view class="left">
            <image :src="item2.image"  mode="" />
						<text>{{item2.value}}</text>
          </view>
          <view class="right">
            <image  src="../../../static/order/images/arraw_right_@2x.png"  mode="" />
          </view>
        </view>
      </view>
    </view>

    <view @click="handlerToSetUp">真实案例</view>
    <view @click="handlerToPerson">个人主页</view>

  </view>
</template>

<script>
import { uniBadge } from "@dcloudio/uni-ui";
import {queryToBePaidOrderNum} from "../../../api/order.js"
export default {
  components: { uniBadge },
  data() {
    return {
			waitPayOrderNum:"",
      isLogin: false,
      userName: "用户名称",
      userInfo: {},
			list: [
        {
          key: "1",
          image: "../../../static/order/images/shopping_Cart@2x.png",
          value: "购物车",
          url: "../../../sub-my/pages/shopping-cart/shopping-cart",
        },
        {
          key: "2",
          image: "../../../static/order/images/collection_@2x.png",
          value: "我的收藏",
          url: "../../../sub-my/pages/personal-center/my-collection/my-collection",
        },
        {
          key: "3",
          image: "../../../static/order/images/attention_@2x.png",
          value: "我的关注",
          url: "../../../sub-my/pages/personal-center/my-attention/my-attention",
        },
        {
          key: "4",
          image: "../../../static/order/images/housemGgr_@2x.png",
          value: "房屋管理",
          url: "../../../sub-my/pages/my-house/my-house?isMy=true",
        },
      ],
			orderStatusList: [
        {
          key: "1",
          image: "../../../static/order/images/wait_pay@2x.png",
          value: "待付款",
          url: "../../../sub-my/pages/my-order/my-order?index=1",
        },
        {
          key: "2",
          image: "../../../static/order/images/inprogress_@2x.png",
          value: "进行中",
          url: "../../../sub-my/pages/my-order/my-order?index=2",
        },
        {
          key: "3",
          image: "../../../static/order/images/order_done@2x.png",
          value: "已完成",
          url: "../../../sub-my/pages/my-order/my-order?index=3",
        },
        {
          key: "4",
          image: "../../../static/order/images/evaluate_@2x.png",
          value: "评价",
          url: "../../../sub-my/pages/evaluate/evaluate",
        },
        {
          key: "5",
          image: "../../../static/order/images/refund_@2x.png",
          value: "退款", //退款列表
          url: "../../../sub-my/pages/refund-list/refund-list",
        },
      ],
    };
  },

  onShow() {
    if (!uni.getStorageSync("userId")) {
      this.userName = "点击登录";
      this.isLogin = false;
      this.userInfo = null;
    } else {
      this.isLogin = true;
      this.userInfo = getApp().globalData.userInfo;
      console.log("!!!!!!!!!!!!!");
      this.userName = this.userInfo.name;
    }
		queryToBePaidOrderNum().then(data=>{
			this.waitPayOrderNum = data
		})
		
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
      uni.navigateTo({
        url: item.url,
      });
    },
    handlerViewAll() {
      console.log("点击我的订单全部按钮");
      uni.navigateTo({
        url: "../../../sub-my/pages/my-order/my-order?index=99",
      });
    },
    handlerOrder(item) {
      console.log(item.value);
      uni.navigateTo({
        url: item.url,
      });
    },
    handlerToPerson() {
      uni.navigateTo({
        url: "/sub-decorate/pages/person-page/person-page",
      });
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
		filter: blur(4rpx);
    width: 750rpx;
    z-index: -1;
    height: 524rpx;
    image {
      width: 100%;
      // height: 100%;
    }
    .mask {
      width: 100%;
      height: 100%;
      opacity: 0.3;
      z-index: -1;
      background-color: #111;
    }
  }

  .my-header {
    margin-top: 190rpx;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx 32rpx 32rpx;
    .avatar-img {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      .avatar {
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        border: 4rpx solid #ffffff;
        box-sizing: border-box;
        object-fit: cover;
        opacity: 1;
        margin-right: 8rpx;
      }
    }
    .user-name {
      .name {
        height: 44rpx;
        line-height: 44rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: #ffffff;
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
        color: rgba(255, 255, 255, 0.8);
        image {
          width: 32rpx;
          height: 32rpx;
          object-fit: cover;
        }
      }
    }
    .set-up {
      image {
        width: 60rpx;
        height: 60rpx;
        object-fit: cover;
      }
    }
  }

  .my-order {
    height: 300rpx;
    margin: 64rpx 22rpx 24rpx 24rpx;
    display: flex;
    background-color: #fff;
    flex-flow: column nowrap;
    border-radius: 24rpx;
    .order-header {
      display: flex;
      flex-wrap: row nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx;
      .order {
        font-weight: bold;
        font-size: 36rpx;
        color: #111111;
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
          object-fit: cover;
        }
      }
    }
    .order-line {
      height: 1rpx;
      background: #f4f4f4;
      padding: 0 32rpx;
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
				.waitPayIcon{
					position: absolute;
					width: 32rpx;
					height: 32rpx;
					line-height: 26rpx;
					text-align: center;
					box-sizing: border-box;
					background: #ff3347;
					border: 2rpx solid #ffffff;
					border-radius: 50%;
					top: 0;
					right: -8rpx;
					color: #FFFFFF;
					font-size: 18rpx;
				}
      }
      .item:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }

  .my-tools {
    margin: 0 22rpx 0 24rpx;
    border-radius: 24rpx;
    background-color: #ffffff;
    .header {
      padding: 32rpx;
      font-size: 36rpx;
      font-weight: 600;
    }
    .tool-line {
      height: 1rpx;
      background: #f4f4f4;
      padding: 0 32rpx;
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
            object-fit: cover;
            margin-right: 20rpx;
          }
        }
        .right {
          image {
            width: 24rpx;
            height: 24rpx;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>

