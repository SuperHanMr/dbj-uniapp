<template>
  <message-bubble :message="message" class="goods-message" no-padding>
    <view class="goods-element" @click="handlePreview">
      <view class="goods-thumbnail">
        <image class="goods-image" :src="params.imageUrl + '?x-oss-process=image/resize,m_mfit,w_376,h_376'" mode="aspectFill"></image>
      </view>
      <view class="goods-content">
        <view class="goods-title">
          <view class="goods-price price-font">
            <text class="price-prefix">¥</text>{{priceSplit[0]}}<text class="price-suffix" style="font-size: 12px;">.{{priceSplit[1]}}/{{params.unitName}}</text>
          </view>
          <view v-if="params.showMarketPrice" class="goods-price-sub price-font">
            <text class="price-prefix">¥</text>{{priceSubSplit[0]}}<text class="price-suffix">.{{priceSubSplit[1]}}/{{params.unitName}}</text>
          </view>
        </view>
        <view class="goods-price-tag" v-if="params.showSubsidizedPrice">
          打扮家补贴{{ params.subsidizedPrice }}元
        </view>
        <view class="goods-name-wrapper">
          <view class="goods-tag">
            {{ params.productType === 1 ? '物品' : '服务' }}
          </view>
          <view class="goods-name">
            {{ params.fullName }}
          </view>
        </view>
      </view>
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

export default {
  name: "GoodsElement",
  components: {
    MessageBubble,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    payload() {
      if (!this.message) {
        return {};
      }
      return this.message.payload;
    },
    params() {
      return this.message.payloadData.params || {};
    },
    priceSplit() {
      return ((this.params.price || 0)/100).toFixed(2).split(".");
    },
    priceSubSplit() {
      return ((this.params.marketPrice || 0)/100).toFixed(2).split(".");
    }
  },
  methods: {
    handlePreview() {
      uni.navigateTo({
        url: "/sub-classify/pages/goods-detail/goods-detail?from=c_im&goodId=" + this.params.skuId + "&originType=5|" + this.params.fromZeusId + "|" + this.params.fromZeusId
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.goods-element {
  background: #fff;
  border-radius: 8px;
  width: 376rpx;
  overflow: hidden;
  .goods-thumbnail, .goods-image {
    width: 376rpx;
    height: 376rpx;
  }
  .goods-content {
    padding: 10rpx 20rpx 24rpx;
  }
  .goods-title {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    color: #333;
    line-height: 24px;
  }
  .goods-price {
    font-size: 18px;
    white-space: nowrap;
  }
  .price-prefix,
  .price-suffix {
    font-size: 10px;
    vertical-align: baseline;
  }
  .goods-price-sub {
    font-size: 14px;
    white-space: nowrap;
    color: #bcbcbc;
    text-decoration: line-through;
    margin-left: 8px;
  }
  .goods-price-tag {
    color: #FF3347;
    font-size: 10px;
    border: 1px solid rgba(255,51,71,0.30);
    display: inline-block;
    padding: 0 4px;
    line-height: 15px;
    margin-bottom: 5px;
  }
  .goods-name-wrapper {
    color: #666;
    margin-top: 10rpx;
    line-height: 19px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goods-tag {
    background: linear-gradient(135deg,#00ccbe, #00c2bf);
    border-radius: 2px;
    display: inline-block;
    color: #fff;
    font-size: 10px;
    padding: 0 5px;
    height: 15px;
    line-height: 15px;
    vertical-align: 1px;
    margin-right: 4px;
  }
  .goods-name {
    display: inline;
  }
}
</style>
