<template>
  <view class="my-decorate">
   <view class="my-decorate-top">
     <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false">
       <view v-for="(tab,index) in dataList" class="item" :key="index" :data-current="index" @click="ontabtap">
         <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
       </view>
     </scroll-view>
     <view class="cost" @click="toCost">
        当前花销
      </view>
   </view>
    
    <swiper :current="tabIndex" style="flex: 1;height: 100%" :duration="300" @change="ontabchange">
      <swiper-item class="swiper-item" v-for="(tab,index1) in dataList" :key="index1">
        <keep-alive>
        </keep-alive>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        dataList:[
          {
            name:'量房',
            key:'amount'
          },
          {
            name:'验房',
            key:'check'
          },
          {
            name:'设计',
            key:'desgin'
          },
          {
            name:'设计',
            key:'desgin'
          },
          {
            name:'设计',
            key:'desgin'
          },
          {
            name:'设计',
            key:'desgin'
          },
          {
            name:'设计',
            key:'desgin'
          },
        ]
      };
    },
    methods: {
      toCost() {
        uni.navigateTo({
          url: '/sub-decorate/pages/current-cost/current-cost'
        })
      }
    }
  }
</script>

<style lang="scss">
.my-decorate-top{
  display: flex;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 32rpx;
  background-color: #fff;
  .cost{
    padding-top: 28rpx;
    width: 104rpx;
    font-size: 26rpx;
    color: #333;
    font-weight: 400;
  }
}
.scroll-h{
  white-space: nowrap;
  height: 88rpx;
  max-width: 550rpx;
}
.item{
  display: inline-block;
  width: 64rpx;
  margin-top: 28rpx;
  color: #999;
  font-size: 28rpx;
  margin-right: 48rpx;
}
</style>
