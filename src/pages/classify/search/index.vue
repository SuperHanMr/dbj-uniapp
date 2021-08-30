<template>
  <view class="search-page">
    <view class="search">
      <uni-search-bar  @confirm="searchConfirm" :focus="true"  class="search-bar"></uni-search-bar>
    </view>
    <view class="history-search">
      <view class="history-search-title">
        <text>历史搜索</text>
        <uni-icons color="#999999" size="18" type="trash" class="history-icon" @click="clearHistory"/>
      </view>
      <view class="history-content">
        <text v-for="(v,k) in list" :key="k" class="history-content-item">{{v}}</text>
      </view>
    </view>
    <view class="hot-search">
      <view class="hot-search-title">
        <text>热门搜索</text>
      </view>
      <view class="hot-content">
        <text v-for="(v,k) in list" :key="k" class="hot-content-item">{{v}}</text>
      </view>
    </view>
    <view>
     <uni-popup ref="cancelDialog">
        <uni-popup-dialog class="uni-popup-dialog" type="sucess" title="通知" content="欢迎" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>  
</template>

<script>
  export default {
    data() {
      return {
        list: ['test','test','test','test','test']
      }
    },
    methods: {
      searchConfirm(resText){
        console.log(resText.value)
        uni.navigateTo({
          url: "/pages/classify/search-result/search-result"
        })
      },
      clearHistory() {
        this.$refs.cancelDialog.open()
      },
      dialogConfirm() {},
      dialogClose() {}
    }
  }
</script>

<style scoped>
  .hot-content-item, .history-content-item{
    display: inline-block;
    margin: 5rpx;
    border-radius: 10rpx;
    width: 105rpx;
    height: 55rpx;
    background-color: #ccc;
    text-align: center;
  }
  .history-icon{
    float: right;
  }
  .search-page .uni-popup-dialog /deep/ .uni-dialog-button-group .uni-border-left .uni-dialog-button-text{
  	color: rgba(255,51,71,1);
  	font-size: 30rpx;
  	font-family: PingFangSC, PingFangSC-Medium;
  	font-weight: 500;
  	text-align: left;
  }
  .search-page .uni-popup-dialog /deep/ .uni-dialog-title .uni-dialog-title-text{
  	font-size: 32rpx;
  	font-family: PingFangSC, PingFangSC-Medium;
  	font-weight: 500;
  	text-align: center;
  	color: #111111;
  }
</style>
