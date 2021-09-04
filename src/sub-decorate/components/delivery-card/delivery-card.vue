<template>
  <view class="view-item">
    <view class="title" :style="{background:color}">{{title}}
      <text>({{data.value}}项)</text>
    </view>
    <view class="list">
      <view class="list-item" v-for="item of data.arr" :key="item.title" @click="toDetail(item)">
        <view class="item-left">
          <text class="item-title">{{item.title}}</text>
          <text class="item-body">{{item.content}}</text>
        </view>
        <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      color:'',
      title:'',
      data:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){},
    methods:{
      toDetail(){
        console.log(123)
        uni.navigateTo({
          url:'/sub-decorate/pages/result-detail/result-detail'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view-item{
    margin-top: 32rpx;
    background-color: #fff;
    border-radius: 12px 12px 0px 0px;
    .title{
      // width: 351px;
      padding-left: 24rpx;
      height: 80rpx;
      opacity: 1;
      line-height: 80rpx;
      border-radius: 12px 12px 0px 0px;
      font-size: 30rpx;
      font-size: 500;
      color: #fff;
      text{
        width: 88rpx;
        text-align: center;
        font-size: 25rpx;
        display: inline-block;
      }
    }
    .list{
      padding: 0 24rpx;
    }
    .list-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      border-bottom: 1px solid #efefef;
      height: 228rpx;
      .item-left{
        width: 600rpx;
        margin-right: 24rpx;
        .item-title{
          color: #333;
          font-size: 30rpx;
          font-weight: 500;
          display: block;
        }
        .item-body{
          margin-top: 8rpx;
          color: #999;
          font-weight: 400;
          font-size: 26rpx;
          -webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数
          display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
          -webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
          text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
          word-break: break-all;
          overflow: hidden;
        }
      }
      image{
        width: 16rpx;
        height: 16rpx;
      }
    }
    .list-item:last-child{
      border: none;
    }
  }
</style>
