<template>
  <view class="person-service person-content-item" :class="{'is-first':isFirst}" v-if="serviceList.length>0">
   <view class="title">
      Ta的服务
    </view>
    <view class="service-list" >
      <scroll-view class="scroll-view" scroll-x="true">
        <!-- <view class="" style="width: 100%;"> -->
          <view class="service-item" v-for="item of serviceList" :key='item.id' @click="toBuy(item)">
              <image v-if='item.houseType.split("|")[0]==="单空间"' src="../../../../static/images/person-single-bg.png" mode="aspectFill"></image>
              <image v-if='item.houseType.split("|")[0]==="全屋"' src="../../../../static/images/person-all-bg.png" mode="aspectFill"></image>
              <view class="top-bg" :class="{'all':item.houseType.split('|')[0]==='全屋'}"></view>
              <view class="item-msg">
                <view class="name">{{item.name}}</view>
                <view class="type">{{item.houseType.split('|')[0]}} <view class="type-string">
                  |
                </view> {{item.houseType.split('|')[1]}}</view>
                <view class="tag-list">
                  <view v-for="el of item.serviceTag" :key='el.code'>{{el.name}}</view>
                  
                </view>
                <view class="" v-if="item.serviceMinPrice">
                <view class="price" v-if="item.serviceMaxPrice===item.serviceMinPrice">¥
                    <text class="integer">{{((item.serviceMinPrice/100).toFixed(2)).split('.')[0]}}</text>
                    <text class="decimals">.{{((item.serviceMinPrice/100).toFixed(2)).split('.')[1]}}</text>
                    <text class="unit"  v-if="item.salesUnits.unitName">/{{item.salesUnits.unitName}}</text>
                </view>
                <view class="price" v-else>
                  ¥
                  <text class="integer">{{((item.serviceMinPrice/100).toFixed(2)).split('.')[0]}}</text>
                  <text class="decimals">.{{((item.serviceMinPrice/100).toFixed(2)).split('.')[1]}}</text>
                  <text class="interval">
                    ~
                  </text>
                  <text class="integer">{{((item.serviceMaxPrice/100).toFixed(2)).split('.')[0]}}</text>
                  <text class="decimals">.{{((item.serviceMaxPrice/100).toFixed(2)).split('.')[1]}}</text>
                  <text class="unit"  v-if="item.salesUnits.unitName">/{{item.salesUnits.unitName}}</text>
                </view>
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
      },
      userId:{
        type:Number,
        default:0
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
        console.log(`/sub-classify/pages/product-detail/service-product-index?spuId=${item.id}`)

        uni.navigateTo({
          url:`/sub-classify/pages/product-detail/service-product-index?spuId=${item.id}`
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .person-service{
    padding: 38rpx 0 16rpx 32rpx;
    background-color: #fff;
    box-sizing: border-box;
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
    height: 260rpx;
  }
  .service-item{
    // height: 240rpx;
    margin-right: 24rpx;
    display: inline-block;
    vertical-align: top;
    // flex-wrap: wrap;
    width: 400rpx;
    height: 224rpx;
    padding: 4rpx;
    border: 0.5px solid #E8E8E8;
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;
    image{
      position: absolute;
      top: 8rpx;
      left: 0;
      width: 384rpx;
      height: 60rpx;
      border-radius: 8px 8px 0 0;
    }
    .top-bg{
      position: absolute;
      top: 8rpx;
      width: 384rpx;
      height: 60rpx;
      background: linear-gradient(180deg, #FBF6F0 0%, rgba(255, 255, 255, 0.1) 100.23%);
      border-radius: 8px 8px 0 0;
    }
    .all{
      background: linear-gradient(183.61deg, rgba(217, 225, 238, 0.4) 7.58%, rgba(255, 255, 255, 0) 103.66%);
    }
    .item-msg{
        margin: 20rpx;
        position: relative;
        z-index: 10;
        .name{
          max-width: 352rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28rpx;
          color: #333;
          margin-bottom: 6rpx;
        }
        .type{
          font-size: 22rpx;
          line-height: 30rpx;
          color: #999;
          margin-bottom: 6rpx;
          max-width: 100%;
          overflow: hidden;
          .type-string{
            display: inline-block;
            margin: 0 8rpx;
          }
        }
        .tag-list{
          white-space: normal;
          overflow: hidden;
          height: 60rpx;
          view{
            border: 0.5px solid #CCCCCC;
            box-sizing: border-box;
            border-radius: 2px;
            padding: 2rpx 8rpx;
            color: #999;
            font-size: 20rpx;
            margin-right: 12rpx;
            margin-bottom: 16rpx;
            display: inline-block;
          }
        }
        .price{
          color: #333;
          font-size: 20rpx;
          display: inline-block;
          .integer{
            font-size: 28rpx;
            color: #333;
            font-family: PriceFont;
          }
          .decimals{
            color: #333;
            font-size: 24rpx;
            font-family: PriceFont;
          }
          .interval{
            font-size: 20rpx;
            color: #333;
            margin: 0 10rpx;
          }
          .unit{
            font-size: 22rpx;
            color: #333;
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
