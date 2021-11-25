<template>
  <view class="construction-change">
    <view class="construction-top">
      <view class="top-item" :class="{'top-item-active':currentActive==0}" @click="currentActive=0">
        已确认
      </view>
      <view class="top-item" :class="{'top-item-active':currentActive==1}" @click="currentActive=1">
        待处理
      </view>
      <view class="top-item" :class="{'top-item-active':currentActive==2}" @click="currentActive=2">
        已拒绝
      </view>
    </view>
    <view class="construction-content">
      <swiper :current="currentActive" @change="ontabchange" class="swiper" :interval="3000" :duration="1000">
        <swiper-item class="swiper-item" :class="{'empty-bcakground':dataObj.allList.length==0}">
          <constructionItem v-for="(item) in dataObj.allList" :key="item.id" :item='item'></constructionItem>
          <view class="earn-empty" v-if="dataObj.allList.length==0">
            <view class="earn-empty-block">
              <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/construction_empty.png" mode=""></image>
              <text>暂无相关内容</text>
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiper-item" :class="{'empty-bcakground':dataObj.allList.length==0}">
          <constructionItem v-for="(item) in dataObj.auditList" :key="item.id" :item='item'></constructionItem>
          <view class="earn-empty" v-if="dataObj.auditList.length==0">
            <view class="earn-empty-block">
              <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/construction_empty.png" mode=""></image>
              <text>暂无相关内容</text>
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiper-item" :class="{'empty-bcakground':dataObj.rejectList.length==0}">
          <constructionItem v-for="(item) in dataObj.rejectList" :key="item.id" :item='item'></constructionItem>
          <view class="earn-empty" v-if="dataObj.rejectList.length==0">
            <view class="earn-empty-block">
              <image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/construction_empty.png" mode=""></image>
              <text>暂无相关内容</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  import constructionItem from './components/construction-item.vue'
  import {getListChangeOrders} from '@/api/decorate.js'
  export default{
    components:{
      constructionItem
    },
    data(){
      return{
        currentActive:0,
        projectId:0,
        dataObj:{
          allList:[],
          auditList:[],
          rejectList:[]
        }
      }
    },
    onLoad(e){
      this.projectId = e.porjectId||2
      this.getListChangeOrders()
    },
    methods:{
      ontabchange(e){
        this.currentActive = e.detail.current
      },
      getListChangeOrders(){
        getListChangeOrders(this.projectId).then(res=>{
          this.dataObj = res
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .construction-change{
    height: 100%;
    box-sizing: border-box;
  }
  .construction-top{
    height: 80rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .top-item{
      font-size: 30rpx;
      color: #999;
      text-align: center;
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
    }
    .top-item-active{
      font-weight: 500;
      color: #333;
      position: relative;
    }
    .top-item-active:after{
      content: "";
      display: inline-block;
      width: 32rpx;
      height: 4rpx;
      opacity: 1;
      background: linear-gradient(129deg,#00cdec 0%, #00ed7d 92%);
      border-radius: 100px 100px 0px 0px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
  .construction-content{
    height: calc(100% - 80rpx);
  }
  .swiper{
    height: 100%;
  }
  .swiper-item{
    padding: 0 24rpx;
    box-sizing: border-box;
    height: fit-content;
  }
  .empty-bcakground{
    background-color: #fff;
  }
  .earn-empty{
    width: 100%;
    height: 100%;
    margin-top: 312rpx;
    image{
      display: block;
      width: 360rpx;
      height: 360rpx;
      // background-color: #eee;
      margin:0 auto 24rpx;
    }
    text{
      text-align: center;
      font-size: 28rpx;
      color: #999;
      display: inline-block;
          width: 100%;
    }
  }
</style>
