<template>
  <view class="content">
    <view class="title-wrap">
      <view class="title">
        <view class="s-4level-name">{{content.categoryName}}</view>
      </view>
      <view class="edit" v-if="noArtificial">编辑</view>
    </view>
    <view class="index">
      <view class="item-list">
        <view class="item" v-for="(item,index) in content.itemList" :key="item.productId">
          <view class="img-name-tag-guige">
            <check-box v-if="noArtificial" :checked="checked" @change="(val) => {checkItem(val, item)}"></check-box>
            <image class="img" :src="item.imageUrl"></image>
            <view class="tag-name-guige">
              <view class="spu-name">
                <view class="tag">{{item.label}}</view>
                <view class="name">{{item.name}}</view>
              </view>
              <view class="gui-ge">{{item.specification}}</view>
            </view>
          </view>
          <view class="price-count">
            <view class="price">
              <text>￥</text>
              <text>{{item.price / 100}}</text>
            </view>
            <view class="count">共{{item.count}}件</view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  import CheckBox from "../check-box/check-box.vue"
  export default {
    components: {
      CheckBox
    },
    props: {
      content: {
        type: Object,
        required: true
      },
      noArtificial: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        checked: true
      }
    },
    methods: {
      checkItem(val, item) {
        this.checked = !this.checked
        this.$emit("change", {
          val,
          // productIds: this.content.itemList.map(it => it.productId)
          productId: item.productId
        })
      },

      goDetail(productId) {
        uni.setStorageSync('goodId', productId)
        uni.navigateTo({
          url: "/sub-classify/pages/goods-detail/goods-detail"
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    border-bottom: 2rpx solid #f4f4f4;
    padding-bottom: 32rpx;
  }

  .s-4level-name {
    height: 36rpx;
    margin-left: 16rpx;
    font-size: 26rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 36rpx;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    padding: 30rpx 0;
  }

  .edit {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #999999;
    line-height: 34rpx;
    padding: 31rpx 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    .img-name-tag-guige {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
    }

    .img {
      width: 136rpx;
      height: 136rpx;
      margin-right: 16rpx;
      margin-left: 24rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 8rpx;
      box-sizing: border-box;
    }

    .spu-name {
      width: 370rpx;
      height: 64rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 32rpx;
      margin-bottom: 8rpx;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: flex-end;
    }

    .tag {
      width: 60rpx;
      height: 30rpx;
      border: 1rpx solid #35c4c4;
      border-radius: 4rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #35c4c4;
      line-height: 30rpx;
      margin-right: 8rpx;
      display: inline-block;
    }

    .name {
      display: inline-block;
    }

    .gui-ge {
      height: 26rpx;
      font-size: 22rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      line-height: 26rpx;
    }

    .price-count {
      text-align: right;

      .price {
        height: 32rpx;
        font-size: 32rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        margin-bottom: 12rpx;
      }

      .count {
        height: 26rpx;
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #999999;
        line-height: 26rpx;
      }
    }
  }
</style>
