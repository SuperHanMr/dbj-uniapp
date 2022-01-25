<template>
  <view class="good-toast">
    <uni-popup
      ref="noBuyToast"
      type="bottom"
      :mask-click="false"
    >
      <view class="toast-content">
        <view class="good-tip">
          <view>
            <text class="tip-word">部分商品在当前地址下暂时不支持购买，点击确认后会将该商品移回至购物车，其他商品可继续进行结算</text>
          </view>
        </view>
        <address-picker
          originFrom="orderToast"
          :houseId="houseId"
          @closeToast="closeToast"
          v-if="addressShow"
        >
        </address-picker>
        <scroll-view
          scroll-y="true"
          class="shop-scroll"
        >
          <view class="content">
            <view
              class="shop-item"
              v-for="(shopItem, index) in noStoreInfos.storeInfos"
              :key='index'
            >
              <view v-if="shopItem.skuInfos.length">
                <view class="shop-name">{{shopItem.storeName}}</view>
                <view
                  class="goods-item"
                  @click="toDetails(goodsItem.id)"
                  v-for="(goodsItem, index) in shopItem.skuInfos"
                  :key="index"
                >
                  <view class="goods-item-content">
                    <image
                      :src="goodsItem.imageUrl"
                      class="goodsItemImg"
                    ></image>
                    <!-- <image src="https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png" class="goodsItemImg"></image> -->
                    <view class="goods-info">
                      <view class="goods-desc">
                        <text class="goods-type">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
                        {{goodsItem.spuName}}
                      </view>
                      <view class='tag'>tag type</view>
                      <!-- <view class="totalNum">共1件</view> -->
                      <view class="goods-spec">
                        <view class="goods-money">
                          ￥
                          <text class="integer-price">{{String(goodsItem.price).split(".")[0]?String(goodsItem.price).split(".")[0]:0}}</text>
                          <text>.{{String(goodsItem.price).split(".")[1]?String(goodsItem.price).split(".")[1]:0}}</text>
                          <text>/{{goodsItem.unit?goodsItem.unit:""}}</text>
                        </view>
                        <view v-if="Number(goodsItem.deposit)">押金 ¥{{goodsItem.deposit}}</view>
                      </view>
                    </view>
                  </view>
                  <view class="no-send-tip">
                    <view class="item-reduce-box">
                      <text v-if="goodsItem.errorType === 1">不在服务范围</text>
                      <text v-if="goodsItem.errorType === 2">当前地址无法配送该商品，请更换地址</text>
                      <text v-if="goodsItem.errorType === 3">该房屋下已购买该服务，不可重复购买</text>
                      <text v-if="goodsItem.errorType === 6">您已跳过该工序，不可购买</text>
                      <text v-if="goodsItem.errorType === 7">暂不可购买，请在精算服务结束后于精算单中购买</text>
                      <text v-if="goodsItem.errorType === 9">暂不可购买，请在管家服务结束后于精算单中购买</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="bottom">
          <button @click="backShopCart">返回购物车</button>
          <button
            @click="confirm"
            :class="{'no-confirm': !hasCanBuy}"
          >确定</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    houseId: 0,
    hasCanBuy: true,
    noStoreInfos: {},
  },
  data() {
    return {
      goodsList: [1],
      shopList: [1],
      addressShow: false,
    };
  },
  methods: {
    showPupop() {
      this.$refs.noBuyToast.open();
      console.log(this.houseId, "houseId");
      this.addressShow = true;
    },
    confirm() {
      if (!this.hasCanBuy) {
        return;
      }
      this.$emit("toastConfirm");
      this.$refs.noBuyToast.close();
    },
    backShopCart() {
      this.$refs.noBuyToast.close();
      this.$emit("backCart");
      uni.navigateTo({
        url: "/sub-my/pages/shopping-cart/shopping-cart",
      });
    },
    closeToast() {
      this.$refs.noBuyToast.close();
    },
  },
  watch: {
    noStoreInfos: {
      handler(v) {
        console.log(this.hasCanBuy, "noSend");
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.toast-content {
  background-color: #f5f6f7;
  border-radius: 16px 16px 0px 0px;
}

.good-toast .good-tip {
  height: 121rpx;
  background-color: #ffffff;
  border-radius: 16px 16px 0px 0px;
}

.good-tip view {
  height: 140rpx;
  border-radius: 16px 16px 0px 0px;
  background-color: rgba(254, 144, 0, 0.05);
  padding: 20rpx 32rpx;
}

.good-tip .tip-word {
  color: #fe9000;
  font-size: 24rpx;
}

.shop-scroll {
  height: 600rpx;
}

.shop-item {
  margin-top: 25rpx;
  padding: 0 32rpx;
  background-color: #ffffff;
}

.shop-name {
  height: 106rpx;
  line-height: 106rpx;
}

.goods-item {
  margin-bottom: 20rpx;
}

.goods-item-content {
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 25rpx;
}

.goods-item-content .goodsItemImg {
  width: 192rpx;
  height: 192rpx;
  display: block;
  margin-right: 24rpx;
  border-radius: 8rpx;
}

.goods-item-content .goods-info {
  height: 192rpx;
  position: relative;
  flex: 1;
}

.goods-info .goods-desc {
  width: 420rpx;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-overflow: ellipsis;
}

.goods-info .goods-desc .goods-type {
  width: 60rpx;
  height: 30rpx;
  padding: 2rpx 10rpx 2rpx 10rpx;
  margin-right: 4rpx;
  border: 2rpx solid #35c4c4;
  border-radius: 4rpx;
  font-size: 20rpx;
  font-weight: 500;
  color: #35c4c4;
  line-height: 28rpx;
  text-align: center;
}

.goods-info .goods-spec {
  width: fit-content;
  text-overflow: ellipsis;
  padding: 4rpx;
  margin: 12rpx 0 12rpx 0;
  font-size: 22rpx;
  display: flex;
}

.goods-info .tag {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #999999;
  position: absolute;
  padding: 4rpx 10rpx;
  line-height: 38rpx;
  text-align: center;
  background-color: #fafafa;
  border: 2rpx solid #f0f0f0;
  border-radius: 6rpx;
}

.goods-info .totalNum {
  top: 50%;
  right: 0;
  font-size: 28rpx;
  color: #999999;
  position: absolute;
}

.goods-money {
  font-size: 24rpx;
  color: #333333;
  vertical-align: bottom;
  font-weight: bold;
  position: absolute;
  bottom: 0;
}

.goods-money .integer-price {
  font-size: 30rpx;
}

.no-send-tip {
  position: relative;
  height: 56rpx;
}

.item-reduce-box {
  height: 50rpx;
  width: 666rpx;
  line-height: 50rpx;
  background-color: #fff6f7;
  border-radius: 8rpx;
  padding-left: 20rpx;
  color: #ff3347;
  font-size: 22rpx;
  position: absolute;
  bottom: 16rpx;
}

.bottom {
  height: 136rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 0 15rpx;
}

.bottom button {
  width: 300rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 8px;
  font-size: 30rpx;
  font-weight: 500;
}

.bottom button:nth-child(1) {
  background-color: #ffffff;
  border: 1px solid #F83112;
  color: #F83112;
}

.bottom button:nth-child(2) {
  background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
  color: #ffffff;
}

.no-confirm {
  opacity: 0.5;
}
</style>
