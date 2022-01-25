<template>
  <view
    class="waterfall-item"
    @click="toDetail(item)"
  >
    <view class="withdraw-container" />
    <view class="case-withdraw-text">该内容已下架</view>
    <image
      class="product-check"
      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/product_unChecked.png"
      mode=""
    ></image>
    <!-- <image
			class="product-check"
			src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/product_checked.png"
			mode=""
		></image> -->

    <image
      class="case-type"
      src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/icon_video.png"
      mode=""
    ></image>

    <image
      class="product-img"
      :src="item.imageUrl"
      mode="widthFix"
      lazy-load
      @load="onImageLoad"
    >
    </image>
    <view
      class="info-container"
      :class="{hasDown:isActive}"
    >
      <!-- <view class="withdraw-text">
			商品已下架
		</view> -->
      <view class="flex-row">
        <!-- <text class="icon" :class="{iconDown:isActive}">物品</text> -->
        <text class="title">
          {{ item.name }}
        </text>

      </view>
      <!-- <view class="price">
			<text>￥</text>
			<text style="font-size: 34rpx;font-weight: 500;">3000</text>
			<text>.00 /个</text>
		</view> -->
      <view class="avatar-name">
        <image
          src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/message/ic_interaction@2x.png"
          mode=""
        ></image>
        <text>小橘子干啊 小橘子干啊 小橘子干啊 </text>
      </view>

    </view>

  </view>
</template>

<script>
export default {
  name: "water-fall-item",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    onImageLoad(e) {
      this.$emit("load", e);
    },
    toDetail(e) {
      this.$emit("detail", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.waterfall-item {
  width: 344rpx;
  margin-top: 32rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  .withdraw-container {
    position: absolute;
    width: 344rpx;
    height: 100%;
    border-radius: 16rpx;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  .case-withdraw-text {
    position: absolute;
    left: 0;
    bottom: 44%;
    width: 344rpx;
    height: 44rpx;
    line-height: 44rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 500;
    z-index: 1;
  }

  .product-check {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    object-fit: cover;
    left: 14rpx;
    top: 16rpx;
  }
  .case-type {
    position: absolute;
    width: 44rpx;
    height: 44rpx;
    object-fit: cover;
    right: 16rpx;
    top: 16rpx;
  }

  .product-img {
    width: 344rpx;
    display: block;
  }

  .info-container {
    padding: 20rpx 16rpx 26rpx 16rpx;
    position: relative;
    color: #333333;
    .withdraw-text {
      position: absolute;
      width: 360rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 22rpx;
      color: #ffffff;
      opacity: 1;
      background: rgba(0, 0, 0, 0.35);
      top: -50rpx;
      left: -16rpx;
    }
    .flex-row {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 28rpx;
      line-height: 40 rpx;
      width: 294rpx;
      position: relative;
      .icon {
        width: 60rpx;
        height: 30rpx;
        margin-right: 8rpx;
        line-height: 28rpx;
        border-radius: 4rpx;
        border: 2rpx solid #35c4c4;
        color: #35c4c4;
        font-size: 20rpx;
        text-align: center;
        display: inline-block;
      }
      .title {
        font-size: 26rpx;

        line-height: 32rpx;
      }
    }

    .hasDown {
      color: #999999 !important;
    }
    .iconDown {
      border: 2rpx solid #cccccc !important;
      color: #999999 !important;
    }

    .price {
      margin-top: 22rpx;
      font-size: 22rpx;
    }
    .avatar-name {
      width: 312rpx;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-top: 18rpx;
      flex: 1;
      image {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 8rpx;
      }
      text {
        font-size: 24rpx;
        color: #999999;
        height: 34rpx;
        line-height: 34rpx;
        max-width: 268rpx;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
      }
    }
  }
}
</style>
