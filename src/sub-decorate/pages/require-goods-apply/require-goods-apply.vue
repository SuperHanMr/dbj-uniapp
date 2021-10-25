<template>
  <view>
    <view class="house">

      <image
        class="img"
        src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_location.png"
      ></image>
      <view class="content">
        <view class="city">
          {{currentHouse.area}}
        </view>
        <view class="address">
          {{currentHouse.housingEstate}} {{currentHouse.address}}
        </view>
        <view class="owenr">
          业主 {{currentHouse.contactName}}
        </view>
      </view>
    </view>
    <view class="store">
      <!-- <view class="header">
        {{item.title}}
      </view> -->
      <view
        class="items"
        v-for="(sub,subIndex) in cartList"
        :key="subIndex"
      >
        <image
          class="img"
          :src="sub.imgUrl"
          mode=""
        ></image>
        <view class="content">
          <view class="title">
            {{sub.fullName}}
          </view>
          <view class="sub-title">
            本次要货:{{sub.count}}{{sub.unit}}
          </view>
        </view>
      </view>
    </view>
    <view style="height: 200rpx;">

    </view>
    <bottom-btn
      btnContent="确认要货"
      @submit="submit"
    ></bottom-btn>
  </view>
</template>

<script>
import { goodsApply } from "../../../api/decorate.js";
import { queryEstates } from "../../../api/decorate.js";
export default {
  data() {
    return {
      cartList: [],
      list: [
        {
          title: "京东",
          children: [
            {
              img: "",
              title:
                "开工保护（开工后对各区域进行的全方位保护全方位保护位保护位保护位保护位）…",
              sub: "本次要货：1卷",
            },
            {
              img: "",
              title:
                "开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…",
              sub: "本次要货：1卷",
            },
          ],
        },
        {
          title: "天猫",
          children: [
            {
              img: "",
              title:
                "开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…",
              sub: "本次要货：1卷",
            },
            {
              img: "",
              title:
                "开工保护（开工后对各区域进行的全方位保护位保护位保护位保护位）…",
              sub: "本次要货：1卷",
            },
          ],
        },
      ],
      currentHouse: {},
      projectId: "",
    };
  },
  onShow() {
    uni.$once("selectedHouse", (item) => {
      this.currentHouse = item;
    });
  },
  onLoad(e) {
    this.cartList = getApp().globalData.naviData;
    this.currentHouse = getApp().globalData.currentEstate;
    if (e && e.projectId) {
      this.projectId = e.projectId;
    }
  },
  methods: {
    changeHouse() {
      uni.navigateTo({
        url: "/sub-my/pages/my-house/my-house",
      });
    },
    // async getCurrentHouse() {
    // 	let houseList = await queryEstates();
    // 	let house = null;
    // 	let defaultHouse;
    // 	if (houseList && houseList.length) {
    // 		defaultHouse = houseList.find((e) => {
    // 			return e.defaultEstate == true;
    // 		});
    // 	}
    // 	if (defaultHouse) {
    // 		house = defaultHouse;
    // 	} else if (houseList.length) {
    // 		house = houseList[0];
    // 	}
    // 	this.currentHouse = house;
    // },
    submit() {
      let list = [];
      this.cartList.forEach((e) => {
        list.push({
          stockId: e.id,
          goodsId: e.goodsId,
          orderId: e.orderId,
          orderDetailId: e.orderDetailId,
          requireNumber: e.count,
        });
      });
      let params = {
        creatorType: 0,
        details: list,
      };
      goodsApply(params).then((e) => {
        uni.redirectTo({
          url: `../require-success/require-success?projectId=${this.projectId}`,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.house {
  background-color: #fff;
  padding: 32rpx;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;

  .img {
    padding: 2rpx;
    width: 46rpx;
    height: 46rpx;
    margin-right: 8rpx;
  }

  .content {
    flex: 1;

    .city {
      line-height: 48rpx;
      color: #999;
      font-size: 26rpx;
    }

    .address {
      margin-top: 6rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      line-height: 42rpx;
    }

    .owenr {
      margin-top: 8rpx;
      font-size: 24rpx;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 40rpx;
    }
  }
}

.store {
  padding: 0 32rpx;
  background-color: #fff;
  margin-top: 16rpx;

  .items {
    display: flex;
    padding: 32rpx 0;
    border-bottom: 1rpx solid #f2f2f2;

    .img {
      width: 192rpx;
      height: 192rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 8rpx;
      background-color: yellow;
    }

    .content {
      flex: 1;
      margin-left: 24rpx;

      .title {
        color: #333333;
        font-size: 28rpx;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }

      .sub-title {
        margin-top: 16rpx;
        font-size: 22rpx;
        color: #999999;
      }
    }
  }

  .header {
    width: 100%;
    height: 74rpx;
    display: flex;
    align-items: flex-end;
    color: #333333;
    font-size: 28rpx;
    font-weight: 500;
  }
}
</style>
