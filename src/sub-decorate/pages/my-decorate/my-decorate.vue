<template>
  <view class="my-decorate">
    <view @click="toCost">
      当前花销
    </view>
    <scroll-view id="tab-bar" class="scroll-h" scroll-x="true" :show-scrollbar="false">
      <view v-for="(tab,index) in dataList" :key="index" :data-current="index" @click="ontabtap">
        <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
      </view>
    </scroll-view>
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

</style>
