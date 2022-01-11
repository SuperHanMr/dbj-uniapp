<template>
  <view class="content">
    <view class="title-wrap">
      <view class="title">
        <view class="s-4level-name">{{content.categoryName}}</view>
      </view>
    </view>
    <view class="index">
      <view class="item-list">
        <view class="item" v-for="(item, index) in content.itemList" :key="item.id" @click="goDetail(item.id)">
          <image class="img" :src="item.imageUrl+'?x-oss-process=image/resize,m_mfit,w_68,h_68'"></image>
          <view class="tag-name-guige">
            <view class="cctb">
              <view class="spu-name">
                <view class="tag">{{item.productType | filterProductType}}</view>
                <view class="name">{{item.spuName}}</view>
              </view>
              <view class="price-count">
                <view class="gui-ge">{{item.name}}</view>
                <view class="count">共{{item.count}}{{item.unit}}</view>
              </view>
            </view>
            <view class="price">
              <text>￥</text>
              <text>{{(item.price/100).toFixed(2)}}</text>
            </view>
          </view>
          <!-- <view class="img-name-tag-guige" >
            
          </view> -->
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
    },
    filters: {
      filterProductType(val) {
        let res = ""
        switch (Number(val)) {
          case 1:
            res = "物品"
            break;
          case 2:
            res = "服务"
            break;
          case 3:
            res = "虚拟"
            break;
          default:
            break;
        }
        return res
      }
    },
    methods: {
      goDetail(id) {
        uni.setStorageSync('goodId', id)
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
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 40rpx;
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
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    padding-bottom: 32rpx;

    // .img-name-tag-guige {
    //   display: flex;
    //   justify-content: flex-start;
    //   flex-direction: row;
    //   align-items: center;
    // }

    .img {
      width: 136rpx;
      height: 136rpx;
      margin-right: 16rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 8rpx;
      box-sizing: border-box;
    }

    .tag-name-guige {
      flex: 1;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 136rpx;
    }

    .cctb {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .price {
      height: 32rpx;
      font-size: 32rpx;
      font-family: Unnamed, Unnamed-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      margin-bottom: 12rpx;
    }

    .spu-name {
      width: 425rpx;
      height: 30rpx;
      font-size: 26rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 30rpx;
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
      background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
      border-radius: 4rpx;
      font-size: 20rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 600;
      text-align: center;
      color: #212121;
      line-height: 27rpx;
      margin-right: 8rpx;
      display: inline-block;
    }

    .name {
      width: 355rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

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
