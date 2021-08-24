<template>
  <view class="content">

    <view
      class="navi-header-state"
      :style="{height:tophight}"
    >

       
    </view>
    <view
      class="navi-header"
      :style="{height:navBarHeight}"
      @click="toNextPage"
    >
      <view class="select-city">

      </view>

    </view>
  </view>

</template>

<script>
export default {
  data() {
    return {
      tophight: 0,
      imgUrl: "../../../static/app-plus/uni@2x.png",
      navBarHeight: 0,
    };
  },
  onLoad() {
    getApp().globalData.userInfo = {
      name: "张三",
      token: "asdasdasd",
    };
    const systemInfo = uni.getSystemInfoSync();
    //状态栏高度
    this.tophight = systemInfo.statusBarHeight + "px";
    // 获取胶囊按钮的位置
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
    this.navBarHeight =
      (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
      menuButtonInfo.height +
      "px";
    let menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    let menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    let menuHeight = menuButtonInfo.height;
  },
  methods: {
    toNextPage() {
      console.log(getApp().globalData.userInfo);
      uni.navigateTo({
        url: "../../decorate/warehouse-list/warehouse-list",
      });
    },
  },
};
</script>

<style lang="scss">
.banner {
  height: 2000rpx;
  background-color: yellow;
}

.navi-header-state {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: red;
}

.navi-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: blue;
  align-items: center;

  .select-city {
    width: 30rpx;
    height: 20rpx;
    background-color: green;
  }
}
</style>
