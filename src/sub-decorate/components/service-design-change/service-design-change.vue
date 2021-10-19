<template>
  <view class="service-design-change">
    <view class="card-top">
      <view class="title">
        更换设计类型
      </view>
      <!-- <image></image> -->
      <i class="icon-xiaochengxu_youshangjiaodankuangguanbi_ic" @click="close"></i>
    </view>
    <view class="card-list">
      <scroll-view id="tab-bar" class="scroll-h" scroll-y="true" :show-scrollbar="false">
        <view class="card-item" v-for="item of list" :key='item.severId' @click="chooseItem(item)">
          <view class="card-item-left">
            <i class="icon-sheji"></i>
            <view :class="{isActive:currentId===item.severId}">{{item.serveName}}（{{item.userName}})</view>
          </view>
          <i class="icon-ic_wodejia_gouxuan_csn choose-icon" v-if="currentId===item.severId"></i>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      currentId:0,
      list:[]
    },
    data(){
      return{
        
      }
    },
    methods:{
      chooseItem(e){
        this.$emit('chooseItem',e)
      },
      close(){
        this.$emit('closeDesign',)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .service-design-change{
    height: 666rpx;
    background: #ffffff;
    border-radius: 16px 16px 0px 0px;
    
    .card-top{
      height: 104rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      // padding: 0 16rpx;
      border: 0.5px solid #f2f2f2;
      position: relative;
      border-radius: 16px 16px 0px 0px;
      .title{
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
      }
      i{
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        right: 16rpx;
        line-height: 80rpx;
            text-align: center;
        // background-color: #eee;
      }
    }
    .card-list{
      padding: 0 32rpx;
    }
    .scroll-h{
      height: 526rpx;
    }
    .card-item{
      height: 102rpx;
      border-bottom: 0.5px solid #F4F4F4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .card-item-left{
        display: flex;
        align-items: center;
        i{
          width: 32rpx;
          height: 32rpx;
          margin-right: 16rpx;
          color: #2bbaf2;
        }
        view{
          font-size: 28rpx;
          font-weight: 400;
          color: #333;
        }
        .isActive{
          color: #00BFB6;
        }
      }
      .choose-icon{
        width: 48rpx;
        height: 48rpx;
        color: #00BFB6;
      }
    }
  }
</style>
