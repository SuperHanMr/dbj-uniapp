<template>
  <view class="notice" catchtouchmove="true" :style="{height:systemHeight}">
    <view class="notice-mask"></view>
    <view class="notice-view">
      <scroll-view class="item-list" :style="{height:scrollHeight}" scroll-y="true">
       <view class="item">
  <!--                 <view
            class="notice-item"
            @click="to(3)"
          > 
            <view class="item-top">
              <view class="item-top-left">
                <image
                  src="../../static/home_owner.png"
                  mode=""
                ></image>
                <text class="item-title">量房服务</text>
              </view>
              <text class="item-top-right">2021-08-21 13:00:00</text>
            </view>
            <view class="item-content">
              <text>有量房员接单啦，请确认</text>
              <image src="../../static/images/ic_more_black.svg"></image>
            </view>
          </view> -->
          <view class="notice-item" @click="to(item)" v-for="item of list" :key='item.id'>
            <view class="item-top">
              <view class="item-top-left">
                <!-- <image src="../../static/home_owner.png" mode=""></image> -->
                <i :class="item.icon" class='icon' :style="{color:item.iconColor}"></i>
                <text class="item-title">{{item.pushTitle}}服务</text>
              </view>
              <text class="item-top-right">{{item.createTime|formatDate}}</text>
            </view>
            <view class="item-content">
              <text>{{item.pushContent}}</text>
              <i class="icon-ic_zhuangxiuxianchang_jingsuangengduo_csn icon" ></i>
              <!-- <image src="../../static/images/ic_more_black.svg"></image> -->
            </view>
          </view>
        </view>

      </scroll-view>
      <view class="close-icon">
        <i class="icon-ic_wodejia_danchuang_quxiao_csn" @click="close()"></i>
      <!--  <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg" mode="" @click="close()"> -->
        </image>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getMsgList,
  } from "../../api/decorate.js";
  import sysMessage from "@/utils/sys-message-tpl.json"
  import {
    formatDate
  } from '@/utils/common.js'

  export default {
    name: "decorate-notice",
    props: {
      current: {
        type: Number,
        default: () => {
          return 1
        }
      },
      num: 0
    },
    filters: {
      formatDate
    },
    data() {
      return {
        systemHeight: '',
        list: [],
        scrollHeight: ''
      };
    },
    mounted() {
      this.systemHeight = wx.getSystemInfoSync().windowHeight + 'px'
      this.getMsg()
    },
    watch: {
      current(newVal) {
        this.getMsg()
      }
    },
    methods: {
      close() {
        // console.log(123)
        this.$emit("closeNotice");
      },
      to(param) {
        getApp().globalData.decorateMsg = {
          ...param.data,
          ...param
        }
        console.log(getApp().globalData.decorateMsg)
        uni.navigateTo({
          url: param.url||'/sub-decorate/pages/grab/grab'
        });
        this.close();
      },
      getMsg() {
        getMsgList(this.current).then(res => {
          res.map(item => {
            item.data = JSON.parse(item.msgBody)
            item.url = sysMessage[item.msgType].url
            if(item.msgType==='sys_design_stage_report_msg'&&item.data.isOnline){
              item.url = '/sub-decorate/pages/design-online-disclosure/design-online-disclosure'
            }
            
            let name = item.data.serveType == 14?item.data.serveType+''+item.data.workerType:item.data.serveType
            
            item.icon = sysMessage[name].icon?sysMessage[name].icon:'icon-liangfang'
            item.iconColor = sysMessage[name].color?sysMessage[name].color:'#43d9e1'
            
          })
          this.list = res
          this.scrollHeight = res.length * 140 * 2 + 'rpx'
          console.log(this.scrollHeight)
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  .notice {
    position: fixed;
    top: 0;
    width: 100%;
    // height: 100vh;
    z-index: 100;

    .notice-view {
      position: relative;
      height: 90%;
      padding-top: 164rpx;
    }

    .item-list {
      position: absolute;
      width: 100%;
      bottom: 106rpx;
      max-height: 1160rpx;
      // padding: 24rpx;
      z-index: 101;
    }

    // .item{
    //   position: absolute;
    //   // flex-direction:column-reverse;
    //   overflow: auto;
    //   width: 100%;
    //   // bottom: 0;
    //   bottom: 206rpx;
    //   max-height: 10rpx;
    //   // padding: 24rpx;
    //   z-index: 101;
    // }
    .close-icon {
      position: absolute;
      bottom: 30rpx;
      // margin-top: 88rpx ;
      text-align: center;
      width: 100%;
      z-index: 111;

      i {
        font-size: 24rpx;
        color: #fff;
      }
    }

    .notice-item {
      background-color: #fff;
      margin: 24rpx;
      // width: 351px;
      height: 168rpx;
      opacity: 1;
      background: #ffffff;
      border-radius: 12px;
      padding: 32rpx 24rpx;
      .icon{
        display: inline-block;
        vertical-align: middle;
        margin-right: 20rpx;
      }
      // z-index: 11;
      .item-top {
        display: flex;
        justify-content: space-between;
        padding: 0 8rpx;

        .item-top-left {
          image {
            // font-size: 26rpx;
            width: 32rpx;
            height: 32rpx;
            margin-right: 16rpx;
            vertical-align: middle;
          }

          text {
            color: #333;
            font-size: 28rpx;
            font-weight: 400;
            vertical-align: middle;
          }
        }

        .item-top-right {
          font-size: 24rpx;
          color: #999;
        }
      }

      .item-content {
        height: 104rpx;
        line-height: 104rpx;
        background: #fbfbfb;
        border-radius: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16rpx 0 24rpx;
        margin-top: 24rpx;

        text {
          color: #333;
          font-size: 30rpx;
          font-weight: 500;
        }

        i {
          font-size: 16rpx;
          color: #999;
        }
      }
    }

    .notice-mask {
      position: absolute;
      width: 100%;
      height: 100vh;
      // top: -304rpx;
      // background-color: #000;
      // opacity: 0.8;
      z-index: 100;
      // filter: blur(10rpx);
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(16rpx);
    }
  }
</style>
