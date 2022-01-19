<template>
  <view class="person-service person-content-item" :class="{'is-first':isFirst}" v-if="serviceList.length>0">
   <view class="title">
      Ta的服务
    </view>
    <view class="service-list" >
      <scroll-view class="scroll-view" scroll-x="true">
        <!-- <view class="" style="width: 100%;"> -->
          <view class="service-item" v-for="item of serviceList" :key='item.id' @click="toBuy(item)">
              <image :src="item.imageUrl" mode="aspectFill"></image>
              <view class="item-msg">
                <view class="name">{{item.name}}</view>
                <view class="price">¥
                    <text class="integer">{{item.convertedPrice?item.convertedPrice.split('.')[0]:'0'}}</text>
                    <text class="decimals">.{{item.convertedPrice?item.convertedPrice.split('.')[1]:'00'}}</text>
                    <text class="unit"  v-if="item.unitName">/{{item.unitName}}</text>
                  </view>
                </view>
              </view>
  <!--      </view> -->
        
</scroll-view>
          </view>
        </view>
      

    <!-- <view class="empty" v-else>
      暂无服务
    </view> -->
    <!-- <view class="click-text" v-if="serviceData.length>3" @click="open">
    <text>{{isOpen?'收起全部服务':'展开全部服务'}}</text><i :class="{'icon-gerenzhuye_anlihefuwu_shouqiic':isOpen,'icon-gerenzhuye_anlihefuwu_zhankaiic':!isOpen}"></i>
    </view> -->
    
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
      },
      isFirst:{
        type:Boolean,
        default:false
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
          this.serviceList = this.serviceData
          console.log(this.serviceData)
        },
        immediate:true
      }
    },
    methods:{
      // open(){
      //   console.log(this.isOpen)
      //   if(this.isOpen){
      //     this.serviceList = this.serviceData.slice(0,3);
      //   }else{
      //     this.serviceList = this.serviceData
      //   }
      //   this.isOpen = !this.isOpen
      //   console.log(this.isOpen)
      // },
      toBuy(item){
        console.log(item)
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
    background-color: #fff;
  }
  .is-first{
    border-radius: 32rpx 32rpx 0 0;
  }
  .service-list{
    margin-top: 32rpx;
  }
  .scroll-view{
    white-space: nowrap;
    		width: 100%;
    height: 360rpx;
  }
  .service-item{
    // height: 240rpx;
    margin-right: 24rpx;
    display: inline-block;
    vertical-align: top;
    // flex-wrap: wrap;
    width: 244rpx;
    image{
      width: 244rpx;
      height: 244rpx;
      background: #EBEBEB;
      border-radius: 16rpx;
    }
    .item-msg{
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // padding-bottom: 24rpx;
      // padding-right: 32rpx;
      // width: calc(100% - 176rpx);
      // border-bottom: 0.5px solid #F4F4F4;
        .name{
          max-width: 244rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        .price{
          color: #999;
          font-size: 20rpx;
          display: inline-block;
          .integer{
            font-size: 28rpx;
            color: #333;
          }
          .decimals{
            color: #333;
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
      
      .btn{
        width: 118rpx;
        height: 58rpx;
        background: #fff;
        border-radius: 12rpx;
        font-size: 26rpx;
        text-align: center;
        color: #666;
        line-height: 58rpx;
        border: 2rpx solid #ccc;
      }
      
    }
  }

</style>
