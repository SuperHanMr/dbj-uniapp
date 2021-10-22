<template>
  <view class="person-service person-content-item">
<!--    <view class="title">
      Ta的服务
    </view> -->
    <view class="service-list" v-if="serviceList.length>0">
      <view class="service-item" v-for="item of serviceList" :key='item.id'>
        <image :src="item.imageUrl" mode=""></image>
        <view class="item-msg">
          <view class="item-msg-left">
            <view class="item-msg-title">{{item.name}}</view>
            <view class="pay-num">{{item.sales}}人付款</view>
            <view class="item-msg-tip">
              <view class="price">¥
                <text class="integer">{{item.convertedPrice.split('.')[0]||'0'}}</text>
                <text class="decimals">.{{item.convertedPrice.split('.')[1]||'00'}}</text>
                <text class="unit"  v-if="item.unitName">/{{item.unitName}}</text>
              </view>
              <view class="service-tag" v-if="item.showMiddleServerTitle">中级服务</view>
            </view>
          </view>
          <view class="btn" @click="toBuy(item)">
            去购买
          </view>
        </view>
      </view>
    </view>
    <view class="empty" v-else>
      暂无服务
    </view>
    <view class="click-text" v-if="serviceData.length>3" @click="open">
    <text>{{isOpen?'收起全部服务':'展开全部服务'}}</text><i :class="{'icon-gerenzhuye_anlihefuwu_shouqiic':isOpen,'icon-gerenzhuye_anlihefuwu_zhankaiic':!isOpen}"></i>
    </view>
    
  </view>
</template>

<script>
  import '../style/common.scss'
  export default{
    props:{
      serviceData:{
        type:Array,
        default:()=>{
          return[]
        }
      }
    },
    data(){
      return{
        serviceList:[],
        isOpen:false,
      }
    },
    watch:{
      serviceData:{
        handler(){
          console.log(this.serviceData)
          this.serviceList = this.serviceData.slice(0,3);
          console.log(this.serviceData)
        },
        immediate:true
      }
    },
    methods:{
      open(){
        console.log(this.isOpen)
        if(this.isOpen){
          this.serviceList = this.serviceData.slice(0,3);
        }else{
          this.serviceList = this.serviceData
        }
        this.isOpen = !this.isOpen
        console.log(this.isOpen)
      },
      toBuy(item){
        uni.navigateTo({
          url:'/sub-classify/pages/goods-detail/goods-detail?goodId='+item.id
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .person-service{
    padding: 38rpx 0 16rpx 32rpx;
  }
  .service-item{
    height: 140rpx;
    margin-bottom: 26rpx;
    display: flex;
    // flex-wrap: wrap;
    image{
      width: 120rpx;
      height: 120rpx;
      background: #EBEBEB;
      border-radius: 12rpx;
      margin-right: 24rpx;
    }
    .item-msg{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 24rpx;
      padding-right: 32rpx;
      width: calc(100% - 176rpx);
      border-bottom: 0.5px solid #F4F4F4;
      .item-msg-left{
        .item-msg-title{
          width: 364rpx;
          font-size: 28rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          margin-bottom: 4rpx;
        }
        .pay-num{
          font-size: 22rpx;
          color: #999;
          margin-bottom: 6rpx;
        }
        .price{
          color: #333;
          font-size: 20rpx;
          display: inline-block;
          .integer{
            font-size: 28rpx;
          }
          .decimals{
            font-size: 24rpx;
          }
          .unit{
            font-size: 22rpx;
          }
        }
        .service-tag{
          display: inline-block;
          width: 94rpx;
          height: 30rpx;
          border-radius: 6rpx;
          border: 0.5px solid rgba(197, 165, 141, 0.3);
          font-size: 20rpx;
          color: #C5A58D;
          text-align: center;
          line-height: 30rpx;
          margin-left: 8rpx;
        }
      }
      .btn{
        width: 118rpx;
        height: 58rpx;
        background: linear-gradient(135deg, #00BFAF 0%, #00BFBC 100%);
        border-radius: 12rpx;
        font-size: 26rpx;
        text-align: center;
        color: #fff;
        line-height: 58rpx;
      }
      
    }
  }

</style>
