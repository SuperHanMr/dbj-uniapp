<template>
  <view class="search-result">
    <view class="search">
      <uni-search-bar  @confirm="searchConfirm" clearButton="auto" cancelButton="false"></uni-search-bar>
    </view>
    <scroll-view class="content" scroll-y="true">
      <view class="content-item" v-for="(v,k) in listArr" :key="k" @click="toDetails">
        <image src="../../../static/arrow_b.svg" ></image>
        <view class="content-info">
          <text class="info-title">水电工程</text>
          <text class="info-size">555/平米</text>
          <text class="info-room">工作室</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        listArr: [1,2,3,4,5,6,7,8,9]
      }
    },
    methods: {
      searchConfirm(resText) {
        console.log(resText.value)
      },
      toDetails(){
        uni.navigateTo({
          url: "/pages/classify/goods-detail/goods-detail"
        })
      }
    }
  }
</script>

<style scoped>
    .search-result{
      height: 100%;
    }
    .content-item{
      height: 20%;
      display: flex;
      border-bottom: 1px solid #ccc;
    }
    .content-item image{
      width: 200rpx;
      height: 200rpx;
    }
    .content-item .content-info{
      flex:1;
      position: relative;
    }
    .content-info .info-size{
      position:absolute;
      bottom: 50rpx;
      left:0;
    }
    .content-item .info-room{
      position:absolute;
      bottom: 10rpx;
      left:0;
    }
</style>
