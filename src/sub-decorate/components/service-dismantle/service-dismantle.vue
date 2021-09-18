<template>
  <view class="service-dismantle">
    <view class="item" v-for="item of list">
      <view class="item-top">
        <text class="name">{{item.workItemName}}</text>
        <text class="time">{{item.completionTime|formatDate}}</text>
      </view>
      <view class="image-list">
        <imagePreview :list="item.fileUrls" :row="1"></imagePreview>
      </view>
    </view>
  </view>
</template>

<script>
  import {getComplateDetail} from '../../../api/decorate.js'
  import imagePreview from '../../../components/image-preview/image-preview.vue'
  import { formatDate } from '../../../utils/common.js'
  export default{
    components:{
      imagePreview
    },
    props:{
      serveId:0,
      projectId:0,
      tab:{}
    },
    data(){
      return{
        list:[]
      }
    },
    filters:{
      formatDate
    },
    watch:{
      serveId(){
        this.getComplateDetail()
      }
    },
    methods:{
      getComplateDetail(){
        getComplateDetail({serveId:this.serveId,projectId:this.projectId}).then(res=>{
          console.log(res)
          this.list = res
          if(res.length===0){
            this.$emit('isEmpty',this.tab.nodeType)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .service-dismantle{
    margin: 40rpx 32rpx;
    .item{
      
    }
    .item-top{
      display: flex;
      justify-content: space-between;
      margin-bottom: 26rpx;
      .name{
        color: #333333;
        font-size: 28rpx;
      }
      .time{
        font-size: 24rpx;
        color: #999;
      }
    }
    .image-list{
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      overflow: hidden;
      // height: 500rpx;
      height: 220rpx;
      image{
        width: 220rpx;
        height: 220rpx;
        border-radius: 8rpx;
        background-color: #fff;
      }
    }
  }
</style>
