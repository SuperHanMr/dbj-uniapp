<template>
  <view class="tabs">
    <view class="item" v-for="(item, index) in items" @click="changeItem(item)" :key="index"
      :class="{active: item === current}">
      <view class="name">{{item}}</view>
      <view class="bt" src="http://iph.href.lu/48x6?fg=00ed7d"></view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array
      },
      current: {
        type: String
      }
    },
    methods: {
      changeItem(item) {
        this.$emit("changeItem", item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    padding: 28rpx 0 0 48rpx;
    border-bottom: 2rpx solid #EFEFEF;
    margin-bottom: 24rpx;
    box-sizing: border-box;
    background-color: #fff;

    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      margin-right: 24rpx;

      .name {
        margin-bottom: 14rpx;
        width: 56rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 700;
        text-align: center;
        color: #333333;
        line-height: 40rpx;
      }

      .bt {
        transition: all 0.2s;
        display: none;
      }
    }

    .active {
      .bt {
        transition: all 0.2s;
        display: block;
        width: 32rpx;
        height: 4rpx;
        background: linear-gradient(129deg, #00cdec 0%, #00ed7d 92%);
        border-radius: 200rpx 200rpx 0rpx 0rpx;
      }
    }
  }
</style>
