<template>
    <view class="tabs">
       <view class="search">
          <view class="uni-searchbar">
          	<view :style="{borderRadius:radius+'px',backgroundColor: bgColor}" class="uni-searchbar__box" @click="searchClick">
          		<view class="uni-searchbar__box-icon-search">
          			<uni-icons color="#999999" size="18" type="search" />
          		</view>
          		<text  class="uni-searchbar__text-placeholder">请输入</text>
          	</view>
          </view>
        </view> 
        <view class="content-view">
          <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
              <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                  <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
              </view>
          </scroll-view>
          <swiper :current="tabIndex"  style="flex: 1;height: 100%" :duration="300" @change="ontabchange">
              <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
                  <index-item :options="newsitem" @click="goDetail(newsitem)"></index-item>
              </swiper-item>
          </swiper>
        </view>
    </view>
</template>
<script>
    import indexItem from './index-item.vue';

    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

    export default {
        components: {
            indexItem
        },
        data() {
            return {
                navBarHeight: 0,
                newsList: [1,2,3,4],
                cacheTab: [],
                tabIndex: 0,
                tabBars: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '推荐',
                    id: 'tuijian'
                }, {
                    name: '体育',
                    id: 'tiyu'
                }, {
                    name: '热点',
                    id: 'redian'
                }],
                scrollInto: "",
                navigateFlag: false
            }
        },
        onLoad() {
              // this.getList(0);
        },
        methods: {
            searchClick(){
              uni.navigateTo({
              	url: "/pages/classify/search/index"
              })
            },
            getList(index) {
                
            },
            goDetail(e) {
                if (this.navigateFlag) {
                    return;
                }
                this.navigateFlag = true;
                uni.navigateTo({
                    url: './detail/detail?title=' + e.title
                });
                setTimeout(() => {
                    this.navigateFlag = false;
                }, 200)
            },
            ontabtap(e) {
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
            },
            ontabchange(e) {
                let index = e.target.current || e.detail.current;
                this.switchTab(index);
            },
            switchTab(index) {
                if (this.tabIndex === index) {
                    return;
                }
                this.tabIndex = index;
                this.scrollInto = this.tabBars[index].id;
            }
        }
    }
</script>

<style scoped > 
  .uni-searchbar {
  	display: flex;
  	flex-direction: row;
  	position: relative;
  	padding: $uni-spacing-col-base;
  	// background-color: $uni-bg-color;
  }
  
  .uni-searchbar__box {
  	display: flex;
  	box-sizing: border-box;
  	overflow: hidden;
  	position: relative;
  	flex: 1;
  	justify-content: center;
  	flex-direction: row;
  	align-items: center;
  	height: 70rpx;
  	padding: 5px 8px 5px 0px;
  	border-width: 0.5px;
  	border-style: solid;
  	border-color: $uni-border-color;
  }
  
  .uni-searchbar__box-icon-search {
  	flex-direction: row;
  	// width: 32px;
  	padding: 0 8px;
  	justify-content: center;
  	align-items: center;
  	color: $uni-text-color-placeholder;
  }
  
  .uni-searchbar__text-placeholder {
  	font-size: $uni-font-size-base;
  	color: $uni-text-color-placeholder;
  	margin-left: 5px;
  }
  
    .content-view{
      height:100%
    }
    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifndef APP-PLUS */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
		/* #ifdef H5 */
		width:100%;
		/* #endif */
		height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }


    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        text-align: center;
        width: 25%;
     /*   padding-left: 34rpx;
        padding-right: 34rpx; */
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
		width:100%;
    }
</style>
