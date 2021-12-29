<template>
  <view class="service-hunman">
    <view class="design-top" v-if="isDesign">
      <view class="design-name">{{designData.severName||(designName.length > 0 && designName[0].serveName)}}</view>
      <view class="design-change" @click="openPopup" v-if="designName.length>1">
        <text>更换设计类型</text>
        <i class="icon-a-ic_zhuangxiuxianchang_jingsuanzhankai_csn"></i>
      </view>
    </view>
    <view class="service-content">
      <view class="msg">
        <image class="avatar" @click="toPerson" :src="isDesign&&(designData.designServerVO && designData.designServerVO.avatar)||tab.avatar" mode="aspectFit"></image>
        <view class="name-msg">
          <view>
            <view class="name">{{isDesign&&(designData.designServerVO && designData.designServerVO.userName)||tab.name}}</view>
            <view class="text">{{tab.nodeName}}</view>
          </view>
        </view>
      </view>
      <view class="service-progress" @click="toTimeLine">
        <text>服务进度</text>
        <i class="icon-ic_zhuangxiuxianchang_jingsuangengduo_csn"></i>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      isDesign:{
        type:Boolean,
        default:false
      },
      tab:{
        type:Object,
        default:()=>{
          return{}
        }
      },
      designName:{
        type:Array,
        default:()=>{
          return []
        }
      },
      designData:{
        type:Object,
        default:()=>{
          return{}
        }
      },
    },
		mounted() {
			console.log(this.designData, this.isDesign, '>>><<<>>>');
		},
    methods:{
      toTimeLine(item){
        console.log(this.tab)
        uni.navigateTo({
          url:'/sub-decorate/pages/time-line/time-line?id='+(this.isDesign&&this.designData.designServerVO.serverId||this.tab.serveCardId+'&name='+this.tab.nodeName)
        })
      },
      toPerson(item){
        // console.log(this.tab)
        uni.navigateTo({
          url:'/sub-decorate/pages/person-page/person-page?personId='+this.tab.zeusId
        })
      },
      openPopup(){
        console.log(123312)
        this.$emit('openPopup')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-hunman{
    padding: 0 16rpx 0 32rpx;
    background-color: #fff;
    margin: 24rpx;
    border-radius: 12px;
    i{
      font-size: 20rpx;
      color: #999;
      margin-left: 10rpx;
    }
  }
  .design-top{
    height: 92rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #F0F0F0;
    .design-name{
      color: #333333;
      font-size: 32rpx;
      
    }
    .design-change{
      display: flex;
      align-items: center;
      text{
        font-size: 26rpx;
        color: #666;
      }
      image{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
    }
  }
  .service-content{
    height: 176rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .msg{
      display: flex;
      flex-wrap: wrap;
      .avatar{
        width: 104rpx;
        height: 104rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }
      .name-msg{
        display: flex;
        align-items: center;
      }
      .name{
        // width: 100%;
        font-size: 30rpx;
        color: #333;
        font-weight: 500;
        display: block;
        margin-bottom: 8rpx;
        max-width: 330rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .text{
        display: block;
        width: 76rpx;
        height: 28rpx;
        opacity: 1;
        background: linear-gradient(45deg,#6d95ef, #84b9fc);
        border-radius: 6px;
        line-height: 28rpx;
        text-align: center;
        font-size: 20rpx;
        color: #fff;
      }
    }
    .service-progress{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text{
        font-size: 26rpx;
        color: #666;
        display: inline-block;
        margin-right: 8rpx;
      }
      image{
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
</style>
