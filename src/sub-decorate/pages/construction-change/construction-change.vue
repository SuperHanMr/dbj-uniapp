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
        <swiper-item class="swiper-item">
          <constructionItem v-for="(item) in sureData" :key="item.id" :item='item'></constructionItem>
        </swiper-item>
        <swiper-item>
          <constructionItem v-for="(item) in waitData" :key="item.id" :item='item'></constructionItem>
        </swiper-item>
        <swiper-item>
          <constructionItem v-for="(item) in refuseData" :key="item.id" :item='item'></constructionItem>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  import constructionItem from './components/construction-item.vue'
  export default{
    components:{
      constructionItem
    },
    data(){
      return{
        currentActive:0,
        sureData:[
          {
            img:'https://file02.16sucai.com/d/file/2014/0829/b871e1addf5f8e96f3b390ece2b2da0d.jpg',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',
            status:'已支付',
            statusColor:0,
            money:'1055.32',
            content:'增项：3项；减项：2项'
          },
          {
            img:'',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',
            status:'已退还',
            statusColor:0,
            money:'1055.32',
            content:'增项：3项；减项：2项'
          }
        ],
        waitData:[
          {
            img:'',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',
            status:'待付款',
            statusColor:1,
            money:'1055.32',
            content:'增项：3项；减项：2项'
          },
          {
            img:'',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',
            status:'待退还',
            statusColor:2,
            money:'1055.32',
            content:'增项：3项；减项：2项'
          },
        ],
        refuseData:[
          {
            img:'',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',

            content:'增项：3项；减项：2项'
          },
          {
            img:'',
            name:'曹山',
            tag:'管家',
            time:'2021-10-24 16:01:11',

            content:'增项：3项；减项：2项'
          },
        ],
      }
    },
    methods:{
      ontabchange(e){
        this.currentActive = e.detail.current
      },
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
  .swiper{
    height: 500px;
  }
  .swiper-item{
    padding: 0 24rpx;
    box-sizing: border-box;
    height: fit-content;
  }
</style>
