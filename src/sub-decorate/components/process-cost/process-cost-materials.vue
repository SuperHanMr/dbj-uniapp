<template>
  <view class="content">
    <view class="title-wrap">
      <view class="title">
        <view class="s-4level-name">{{content.categoryName}}</view>
      </view>
    </view>
    <view class="index">
      <view class="item-list">
        <view class="item" v-for="(item,index) in itemList" :key="item.productId">
          <view class="img-name-tag-guige">
            <check-box :checked="item.checked" @change="(val) => {checkItem(val, item)}"></check-box>
            <image class="img" :src="item.imageUrl"></image>
            <view class="tag-name-guige-price-edit">
              <view class="spu-name-gui-ge-count">
                <view class="spu-name">
                  <view class="tag">{{item.label}}</view>
                  <view class="name">{{item.name}}</view>
                </view>
                <view class="gui-ge-count">
                  <view class="gui-ge">{{item.specification}}</view>
                  <view class="count">共{{item.count}}件</view>
                </view>
              </view>
              <view class="price-edit">
                <view class="price">
                  <text>￥</text>
                  <text>{{item.price | filterPrice}}</text>
                </view>
                <view class="edit">编辑商品</view>
              </view>
            </view>
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
      }
    },
    data() {
      return {
        itemList: []
      }
    },
    mounted() {
      this.initItemList()
    },
    watch: {
      content(newVal, oldVal) {
        this.initItemList()
      }
    },
    filters: {
      filterPrice(val) {
        return (val / 100).toFixed()
      }
    },
    methods: {
      initItemList() {
        this.itemList = this.content.itemList.map(item => {
          return {
            ...item,
            checked: true
          }
        })
      },
      checkItem(val, item) {
        item.checked = val
        // this.itemList
        this.$emit("change", {
          val,
          productId: item.productId
          // productIds: this.content.itemList.map(it => it.productId)
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



  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-bottom: 32rpx;

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

    .tag-name-guige-price-edit {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      height: 136rpx;
    }

    .spu-name {
      width: 475rpx;
      margin-bottom: 8rpx;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: flex-end;
    }

    .tag {
      width: 60rpx;
      height: 30rpx;
      box-sizing: border-box;
      border: 1rpx solid #35c4c4;
      border-radius: 4rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #35c4c4;
      line-height: 27rpx;
      margin-right: 8rpx;
    }

    .name {
      width: 403rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 32rpx;
    }

    .price-edit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .price {
        font-size: 32rpx;
        font-family: Unnamed, Unnamed-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 32rpx;
      }

      .edit {
        height: 34rpx;
        font-size: 24rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 700;
        text-align: right;
        color: #00bfb6;
        line-height: 34rpx;
      }
    }

    .gui-ge-count {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .gui-ge,
      .count {
        font-size: 22rpx;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        line-height: 26rpx;
      }
    }
  }
</style>
