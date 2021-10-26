<template>
  <view class="page-body">
    <scroll-view class="nav-left" scroll-y :scroll-top="scrollLeftTop" scroll-with-animation>
      <view class="left-title-block">
        <view class="nav-left-item" @click="categoryClickMain(index2)"
          :class="{'active': index2==categoryActive, 'preNode': index2==categoryActive -1, 'nextNode': index2==categoryActive +1}"
          v-for="(menu2,index2) in detailData" :key="index2" v-if="detailData[categoryActive]['children'].length">
          {{menu2.name}}
        </view>
        <view class="nav-left-item" :class="{'nextNode':  categoryActive === detailData.length - 1}"></view>
      </view>
    </scroll-view>
    <scroll-view class="nav-right" scroll-y="true">
      <view class="right-view" v-for="(menu3, index3) in detailData[categoryActive]['children']" :key="index3" v-if="menu3['children'].length">
        <text class="menu3-title">{{menu3.name}}</text>
        <scroll-view class="right-card" scroll-y="true">
          <view class="card-box">
            <view class="right-detail" v-for="(detail, detailK) in menu3['children']" :key="detailK"
              @click="toGoodsList(detail.name, detail.id)">
              <view class="img-view">
                <image :src="detail.imageUrl  + '?x-oss-process=image/resize,m_lfit,w_124,h_124' "></image>
              </view>
              <text class="detail-name">{{detail.name}}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Array,
        default: []
      },
      tabIndex: 0
    },
    data() {
      return {
        height: 0,
        categoryActive: 0,
        scrollLeftTop: 0,
        arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672, 7017], //初始值，后边计算会根据手机适配覆盖
        leftItemHeight: 51, //49行会计算出新值进行覆盖
        navLeftHeight: 0, //左边scroll-view 内层nav的总高度
        diff: 0, //左边scroll-view 内层nav的总高度与视口之差
        tabBarHeight: 170,
        rightArr: [1, 2, 3, 4, 5, 6, 7],
        imgArr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    onShow() {
      this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
      this.getHeightList();
    },
    onload() {
      console.log('load-show')
    },
    methods: {
      getHeightList() {
        console.log(111)
        let _this = this;
        let selectorQuery = uni.createSelectorQuery().in(this);
        selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
          _this.leftItemHeight = rects[0].height;
          _this.navLeftHeight = _this.leftItemHeight * _this.detailData.length;
          _this.diff = _this.navLeftHeight - _this.height;
          let arr = [0];
          let top = 0;
          rects.forEach(function(rect) {
            // 					rect.id      // 节点的ID
            // 					rect.dataset // 节点的dataset
            // 					rect.left    // 节点的左边界坐标
            // 					rect.right   // 节点的右边界坐标
            // 					rect.top     // 节点的上边界坐标
            // 					rect.bottom  // 节点的下边界坐标
            // 					rect.width   // 节点的宽度
            // 					rect.height  // 节点的高度
            top += rect.height;
            arr.push(top)
          })
          _this.arr = arr
        }).exec()
      },
      categoryClickMain(index) {
        const query = uni.createSelectorQuery().in(this);
        console.log(query.selectAll('#tabs')[0])
        query.selectAll('#tabs').node(data => {
        }).exec();
        this.categoryActive = index;
        (this.diff > 0) && (this.scrollLeftTop = Math.round((this.categoryActive * this.diff) / (this.detailData
          .length - 1)));
      },
      toGoodsList(name, id) {
        uni.navigateTo({
          url: "/sub-classify/pages/search-result/search-result?searchText=" + name + "&categoryId=" + id  + "&originFrom=classify4"
        })
      }
    },
    watch: {
      tabIndex(v) {
        this.categoryActive = 0
      }
    }
  }
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
    background: #FFFFFF;
  }

  .left-title-block {
    background-color: #F7F7F7;
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
    background-color: #FFFFFF;
  }

  .active {
    color: #111111;
    background: #F7F7F7;
  }

  .nav-right {
    padding: 0 35rpx;
    background-color: #F7F7F7;
    width: 75%;
  }

  .right-view {
    margin-top: 30rpx;
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
  .card-box{
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
  }
  .right-detail .img-view{
    border-radius: 10rpx;
    overflow: hidden;
    width: 124rpx;
    height: 124rpx;
  }
  .img-view image{
    width: 100%;
    height: 100%;
  }
  .right-detail .detail-name {
    font-size: 24rpx;
    display: inline-block;
    width: 124rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .rigth-other-bar {
    background-color: #FFFFFF;
  }

  ::-webkit-scrollbar {
    /*取消小程序的默认导航条样式*/
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
