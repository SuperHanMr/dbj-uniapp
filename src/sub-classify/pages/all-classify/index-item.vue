<template>
  <view class="page-body">
    <scroll-view class="nav-left" scroll-y :scroll-top="scrollLeftTop" scroll-with-animation
      :scroll-into-view="'left' + categoryActive">
      <view class="left-title-block">
        <view class="nav-left-item" @click="categoryClickMain(index2, menu2)"
          :class="{'active': index2==categoryActive, 'preNode': index2==categoryActive -1, 'nextNode': index2==categoryActive +1}"
          v-for="(menu2,index2) in detailData" :key="index2" :id="'left' + index2">
          <view v-if="menu2.brandTag">
            <image src="../../static/image/brand_active.png" mode="" v-if="index2==categoryActive"></image>
            <image src="../../static/image/brand_icon.png" mode="" v-else></image>
          </view>
          <text v-if="detailData[categoryActive]['children'].length && !menu2.brandTag">{{menu2.name}}</text>
        </view>
        <view class="nav-left-item" :class="{'nextNode':  categoryActive === detailData.length - 1}"></view>
      </view>
    </scroll-view>
    <scroll-view class="nav-right" scroll-y="true" :scroll-into-view="'tab' + activeId" scroll-with-animation="true"
      @scroll="rightScroll">
      <view v-for="(menu2, index2) in detailData" :key="index2" :id="'tab' + menu2.id" class='itemBox'>
        <view class="right-view" v-for="(menu3, index3) in menu2['children']" :key="index3">
          <view v-if="menu3['children'].length">
            <text class="menu3-title">{{menu3.name}}</text>
            <scroll-view class="right-card" scroll-y="true">
              <view class="card-box">
                <view class="right-detail" v-for="(menue4, index4) in menu3['children']" :key="index4"
                  @click="toGoodsList(menu2.brandTag, menue4.id)">
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
      category1Id: 0,
    },
    data() {
      return {
        timer: null,
        heightList: [],
        categoryActive: 0,
        activeId: 0,
        isClickMenu2: false
      };
    },
    watch: {
      category1Id: {
        handler(v) {
          this.categoryActive = 0;
          this.activeId = 0
        },
        immediate: true
      },
      detailData: {
        handler(v) {
          v.forEach((item, key) => {
            uni.createSelectorQuery().in(this).select(`#tab${item.id}`).boundingClientRect(res => {
              this.heightList.push(res.height)
            }).exec()
          })
        },
        deep: true
      },
    },
    methods: {
      categoryClickMain(index, menu) {
        this.categoryActive = index;
        this.activeId = menu.id
        this.isClickMenu2 = true
      },
      rightScroll(e) {
        clearTimeout(this.timer)
        this.timer = null
        let timeStamp = e.timeStamp
        this.timer = setTimeout(() => {
          if (timeStamp === e.timeStamp) {
            this.isClickMenu2 = false
          }
        })
        if (this.isClickMenu2) {
          return
        }
        let scrollHeight = this.heightList[0]
        let scrollIndex = 0
        while (scrollHeight <= e.detail.scrollTop) {
          scrollIndex++
          scrollHeight += this.heightList[scrollIndex]
        }
        this.categoryActive = scrollIndex

      },
      toGoodsList(brandTag, id) {
        let brandId, category4Id
        if(brandTag) {
          brandId = id
          category4Id = 0
        } else {
          brandId = 0
          category4Id = id
        }
        uni.navigateTo({
          url: `/sub-classify/pages/search-result/search-result?category1Id=${this.category1Id}&category4Id=${category4Id}&brandId=${brandId}`
        });
      },
    }
  };
</script>

<style scoped lang="scss">
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

    image {
      width: 80rpx;
      height: 30rpx;
    }
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
