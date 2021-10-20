<template>
  <view class="service-design">
    <view class="design-report">
      <view class="report-item" v-if="designData.customReport">
        <view class="title">设计报告详情</view>
        <view class="check" @click="toDesign">
          <text>立即查看</text>
          <i class="icon-ic_wodejia_beiwanglugengduo_csn"></i>
        </view>
      </view>
      <view class="report-item" v-if="designData.beautyReport">
        <view class="title">颜值报告详情</view>
        <view class="check" @click="toBeatiful">
          <text>立即查看</text>
          <i class="icon-ic_wodejia_beiwanglugengduo_csn"></i>
        </view>
      </view>
    </view>
    <view class="design-list" v-for="item of list" :key='item.categoryName'>
      <text>{{item.categoryName}}</text>
      <view class="design-img-list">
        <view class="item" v-for="el of item.imageFileList" :key='el.fileUrl'>
          <image :src="el.fileUrl"></image>
          <text>{{el.fileName}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getMyDesignServe} from '../../../api/decorate.js'
  export default{
    props:{
      serverId:0,
      index:0,
      projectId:0
    },
    data(){
      return{
        list:[],
        designData:{}
      }
    },
    mounted(){
      this.getMyDesignServe()
    },
    watch:{
        serverId:{
          handler:function(){
            console.log(this.projectId)
            this.getMyDesignServe()
          },
          immediate: true
        }
      
    },
    methods:{
      getMyDesignServe(){
        getMyDesignServe(this.serverId).then(res=>{
          this.list = res.fileListVO
          this.designData = res
          this.$emit('changeDesign',res)
          if(res.fileListVO.length===0){
            this.$emit('isEmpty',this.index)
          }
        })
      },
      toDesign(){
        uni.navigateTo({
          url:`/sub-decorate/pages/custom-report/custom-report?id=${this.customReport.id}+&serveId=${this.serverId}`
        })
      },
      toBeatiful(){
        uni.navigateTo({
          url:'/sub-decorate/pages/beatiful-report/beatiful-report?themeId='+this.designData.beautyReport.templateId+'&id='+this.designData.beautyReport.id +'&serveId='+this.serverId
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-design{
    margin: 24rpx;
    .design-report{
      
      
      padding: 0 20rpx 0 32rpx;
      background-color: #fff;
      border-radius: 24rpx;
      margin-bottom: 48rpx;
      .report-item{
        height: 100rpx;
        border-bottom: 0.5px solid #F4F4F4;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .report-item:last-child{
        border: none;
      }
      .title{
        font-size: 28rpx;
        font-weight: 500;
        color: #333;
      }
      .check{
        display: flex;
        align-items: center;
        text{
          font-size: 26rpx;
          color: #666;
        }
        i{
          width: 24rpx;
          height: 36rpx;
          font-size: 20rpx;
          line-height: 36rpx;
          color: #999;
          margin-left: 16rpx;
        }
      }
    }
    .design-list{
      margin-top: 8rpx;
      text{
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
      }
      .design-img-list{
        margin-top: 26rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
          width: 328rpx;
          margin-bottom: 48rpx;
        }
        image{
          width: 328rpx;
          height: 216rpx;
          opacity: 1;
          border: 0.5px solid #f5f6f6;
          border-radius: 12rpx;
          margin-bottom: 16rpx;
          background-color: #eee;
        }
        text{
          font-weight: 400;
          text-align: left;
          color: #333333;
          font-size: 24rpx;
        }
        
      }
    }
  }
</style>
