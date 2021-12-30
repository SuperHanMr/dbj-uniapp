<template>
  <view class="time-line">
    <view class="time-content">
      <view class="line-block" v-if="list.length>1">
        
      </view>
      <view class="line-content">
        <view class="item" v-if="list.length>0" v-for="(item,index) of list" :key='item.operatorId'>
            <view class="out">
            </view>
            
              <view class="rightContent real">
                <view class="text">{{item.name}}</view>
                <view class="time">{{item.operateTime |formatDate}}</view>
              </view>
        <!--     <view class="rightContent false" >
                <view class="text">{{item.name}}</view>
                <view class="time">{{item.operateTime |formatDate}}</view>
              </view> -->
              
            </view>
      </view>
    </view>
    
    
    
  </view>
</template>

<script>
  import {getLogs} from '../../../api/decorate.js'
  import { formatDate } from '@/utils/common.js'
  export default {
    data() {
      return { 
        list: {}
      }
    },
    onLoad(e) {
      this.getData(e.id)
      uni.setNavigationBarTitle({
        title:e.name+'服务进度'
      })
    },
    filters:{
      formatDate
    },
    methods: {
      getData(id) {
        getLogs(id).then(res=>{
          this.list = res
          
          // let query = uni.createSelectorQuery();
          // console.log(query.select(".line-content"))
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .time-line {
    min-height: 100%;
    padding: 0 32rpx 40rpx;
    background-color: #fff;
    box-sizing: border-box;
  }
  .time-content{
    position: relative;
  }
  .item {
    display: flex;
    position: relative;
    align-items: top;
    // height: 144rpx;
  }
  .line-block{
    width: 4rpx;
    background: #00C2B8;
    height: calc(100% - 36rpx);
    position: absolute;
    top: 36rpx;
  }
  .out {
    box-sizing: border-box;
    position: absolute;
        top: 50%;
        left: 0.5px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    opacity: 1;
    background: #00c2b8;
    border: 2px solid #e0f7f7;
    border-radius: 50%;
    z-index: 10;
  }
  .item:first-child::after {
    content:"";
    color: red;
    position: absolute;
    left: -2rpx;
    height: 50%;
    top: 0;
    width: 4px;
    background-color: #fff;
  }
  
  .item:last-child::after {
    content:"";
    color: red;
    position: absolute;
    left: -2rpx;
    height: calc(50% - 12rpx);
    bottom: 0;
    width: 4px;
    background-color: #fff;
  }
  .real{
    // position: absolute;
    // top: -50%;
  }
  .false{
    visibility: hidden;
  }
  .rightContent {
    box-sizing: border-box;
    width: 638rpx;
    margin-left: 34rpx;
    padding: 30rpx 24rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    
    background-color: #F5F6F6;
    // height: 96rpx;
    margin-top: 36rpx;
    
    border-radius: 12rpx;
    .text {
      color: #333;
      font-weight: 500;
      max-width: 292rpx;
          // overflow: hidden;
          word-break: break-all;
    }

    .time {
      color: #999;
      font-size: 400;
    }
  }
</style>
