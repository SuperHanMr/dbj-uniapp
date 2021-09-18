<template>
  <view class="service-steward">
    <view class="steward-list">
      <view class="list-item" v-for="item of list" :key='item.createTime'>
        <view class="item-top">
          <view>
          <view class="title">{{item.title}}</view>
          <view class="time">{{item.createTime | formatDate}}</view>
          </view>
        </view>
        <view class="item-content">
          <text>{{item.content}}</text>
          <view class="img-list">
            <imagePreview :list='item.imageList' :row='2'></imagePreview>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {getStewardService} from '../../../api/decorate.js'
  import imagePreview from '../../../components/image-preview/image-preview.vue'
  import { formatDate } from '../../../utils/common.js'
  
  export default{
    components:{
      imagePreview
    },
    props:{
      serverId:0
    },
    data(){
      return{
        list:[],
      }
    },
    filters:{
      formatDate
    },
    // mounted(){
    //   this.getStewardService()
    // },
    watch:{
      serverId(){
        this.getStewardService()
      }
    },
    methods:{
      getStewardService(){
        getStewardService(this.serverId).then(res=>{
          console.log(res)
          this.list = res.progressList
          if(this.list.length===0){
            this.$emit('isEmpty',5)
          }
        })
      },
      // previewImage(list,index){
      //   let urls = []
      //   list.forEach(item=>{
      //     urls.push(item.url||item)
      //   })
      //   uni.previewImage({
      //   	urls: urls,
      //   	current: index
      //   });
      // },
    }
  }
</script>

<style lang="scss" scoped>
  .service-steward{
    margin: 24rpx;
  }
  .list-item{
    padding: 24rpx;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 24rpx;
    .item-top{
      height: 130rpx;
      border-bottom: 1px solid #F4F4F4;
      display: flex;
      align-items: center;
      .title{
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
        color: #333;
        text-align: left;
      }
      .time{
        font-size: 24rpx;
        font-weight: 400;
        color: #999;
        width: 100%;
        text-align: right;
      }
    }
    .item-content{
      padding-top: 24rpx;
      .img-list{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        max-height: 430rpx;
        margin-top: 24rpx;
        overflow: hidden;
        image{
          width: 212rpx;
          height: 212rpx;
          opacity: 1;
          border-radius: 4px;
          background-color: #eee;
          margin-bottom: 6rpx;
        }
      }
      text{
        font-size: 26rpx;
        color: #333;
      }
      
    }
  }
</style>
