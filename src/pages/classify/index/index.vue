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
          <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" v-if="dataList.length > 1">
              <view v-for="(tab,index) in dataList" :key="index" :class="{'uni-tab-item': dataList.length >3, 'uni-tab-item-short3': dataList.length === 3, 
              'uni-tab-item-short2': dataList.length === 2}" :id="index" :data-current="index" @click="ontabtap">
                  <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
              </view>
          </scroll-view>
          <swiper :current="tabIndex"  style="flex: 1;height: 100%" :duration="300" @change="ontabchange">
              <swiper-item class="swiper-item" v-for="(tab,index1) in dataList" :key="index1">
                  <index-item :detailData="tab['children']"></index-item>
              </swiper-item>
          </swiper>
        </view>
    </view>
</template>
<script>
    import indexItem from './index-item.vue';
    import {getClassifyList} from "../../../api/classify.js";
    console.log(getClassifyList)

    export default {
        components: {
            indexItem
        },
        data() {
            return {
                navBarHeight: 0,
                dataList: [],
                newsList: [1,2,3,4],
                cacheTab: [],
                tabIndex: 0,
                scrollInto: ""
            }
        },
        onLoad() {
          console.log(111)
        },
        onReady() {
          console.log(222)
        },
        onShow() {
          this.getList();
        },
        methods: {
            searchClick(){
              uni.navigateTo({
              	url: "/pages/classify/search/index"
              })
            },
            getList() {
                getClassifyList().then((data) => {
                  this.dataList = data
                  console.log(data)
                })
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
                console.log(index)
                this.scrollInto = index;
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
        height: 100vh;
    }

    .scroll-h {
        width: 750rpx;
        width:100%;
        height: 80rpx;
        flex-direction: row;
        white-space: nowrap;
    }


    .uni-tab-item-short2 {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        text-align: center;
        width: 50%;
    }
    .uni-tab-item-short3 {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        text-align: center;
        width: 33.3%;
    }
    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        text-align: center;
        width: 25%;
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
        font-size: 15px;
        font-family: PingFangSC;
        color: #999999;
    }

    .uni-tab-item-title-active {
      position: relative;
      color: #111111;
    }
    .uni-tab-item-title-active::after{
      content: "";
      display: inline-block;
      width: 32rpx;
      height: 4rpx;
      background-color: #00ed7d;
      border-radius: 100px 100px 0px 0px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
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
