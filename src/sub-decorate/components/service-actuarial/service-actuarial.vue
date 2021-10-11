<template>
  <view class="service-actuarial">
    <view class="content" v-if="hasReport">
      <text class="name">我的精算单</text>
      <view class="click-check" @click="toCost">
        <text>点击查看</text>
        <image src="" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {getActuaryReport} from '../../../api/decorate.js'
  export default{
    props:{
      serverId:{
        type:Number,
        default:0
      },
      projectId:0
    },
    data(){
      return{
        hasReport:false
      }
    },
    mounted(){
      this.getActuaryReport()
    },
    methods:{
      getActuaryReport(){
        getActuaryReport(this.projectId).then(res=>{
          this.hasReport = true
        }).catch(err=>{
          console.log(err)
        })
      },
      toCost(){
        uni.navigateTo({
          url:'/sub-decorate/pages/current-cost/current-cost?id='+this.serverId+'&isCost=1'+'&projectId='+this.projectId
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-actuarial{
    margin: 0 24rpx;
    .content{
      height: 100rpx;
      opacity: 1;
      background: #ffffff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16rpx 0 36rpx;
      .name{
        font-size: 28rpx;
        color: #333;
      }
      .click-check{
        display: flex;
        align-items: center;
        text{
          font-size: 26rpx;
          color: #666;
        }
        image{
          width: 24rpx;
          height: 24rpx;
          margin-left: 8rpx;
        }
      }
    }
  }
</style>
