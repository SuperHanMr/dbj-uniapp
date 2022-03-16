<template>
  <view class="page-body">
    <scroll-view class="nav-left" scroll-y :scroll-top="scrollLeftTop" scroll-with-animation>
      <view class="left-title-block">
        <view class="nav-left-item" @click="categoryClickMain(menu2, index2)"
          :class="{'active': index2==categoryActive, 'preNode': index2==categoryActive -1, 'nextNode': index2==categoryActive +1}"
          v-for="(menu2,index2) in detailData" :key="index2">
          <text v-if="detailData[categoryActive]['children'].length">{{menu2.name}}</text>
        </view>
        <view class="nav-left-item" :class="{'nextNode':  categoryActive === detailData.length - 1}"></view>
      </view>
    </scroll-view>
    <scroll-view class="nav-right" scroll-y="true" :scroll-into-view="'tab' + activeId" scroll-with-animation="true"
      @scroll="rightScroll">
      <view v-for="(menu2, index2) in detailData" :key="index2" :id="'tab' + menu2.id" ref='itemBox'>
        <view class="right-view" v-for="(menu3, index3) in menu2['children']" :key="index3">
          <view v-if="menu3['children'].length">
            <text class="menu3-title">{{menu3.name}}</text>
            <scroll-view class="right-card" scroll-y="true">
              <view class="card-box">
                <view class="right-detail" v-for="(menue4, index4) in menu3['children']" :key="index4"
                  @click="toGoodsList(menue4.name, menue4.id)">
                  <view class="img-view">
                    <image :src="menue4.imageUrl  + '?x-oss-process=image/resize,m_lfit,w_124,h_124' "></image>
                  </view>
                  <view class="detail-name">{{menue4.name}}</view>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>

    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Array,
        default: [],
      },
      tabIndex: 0,
    },
    data() {
      return {
        activeId: 0,
        categoryActive: 0,
      };
    },
    created(){
      console.log(this.detailData)
    },
    watch: {
      tabIndex: {
        handler(v) {
          this.categoryActive = 0;
        },
        immediate: true
      },
    },
    methods: {
      categoryClickMain(menu, index) {
        this.activeId = menu.id
        this.categoryActive = index;
      },
      rightScroll(e) {
        console.log(this.$refs, e)
      },
      toGoodsList(name, id) {
        uni.navigateTo({
          url: "/sub-classify/pages/search-result/search-result?searchText=" +
            name +
            "&categoryId=" +
            id +
            "&originFrom=classify4",
        });
      },
    }
  };
</script>

<style scoped>
  .page-body {
    display: flex;
    height: calc(100% - 150rpx);
    background: #fff;
    overflow: hidden;
    font-size: 28rpx;
    color: #666666;
  }

  .nav {
    display: flex;
    width: 100%;
  }

  .nav-left {
    width: 25%;
    background: #ffffff;
  }

  .left-title-block {
    background-color: #f7f7f7;
  }

  .nav-left .preNode {
    border-radius: 0px 0px 8px 0px;
  }

  .nav-left .nextNode {
    border-radius: 0px 8px 0px 0px;
  }

  .nav-left-item {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }

  .active {
    color: #FA4D32;
    background: #f7f7f7;
  }

  .nav-right {
    padding: 0 35rpx;
    background-color: #f7f7f7;
    width: 75%;
  }

  .right-view {
    padding-top: 30rpx;
  }

  .menu3-title {
    font-size: 30rpx;
    color: #111111;
  }

  .right-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24rpx;
    width: 510rpx;
  }

  .card-box {
    border-radius: 16rpx;
    overflow: hidden;
    background-color: white;
  }

  .right-detail {
    display: inline-block;
    /* height: 172rpx; */
    width: 124rpx;
    text-align: center;
    margin: 30rpx 0 30rpx 37rpx;
    vertical-align: text-top;
  }

  .right-detail .img-view {
    border-radius: 10rpx;
    overflow: hidden;
    width: 124rpx;
    height: 124rpx;
  }

  .img-view image {
    width: 100%;
    height: 100%;
  }

  .right-detail .detail-name {
    font-size: 24rpx;
    width: 124rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    margin-top: 14rpx;
  }

  .rigth-other-bar {
    background-color: #ffffff;
  }

  ::-webkit-scrollbar {
    /*取消小程序的默认导航条样式*/
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
