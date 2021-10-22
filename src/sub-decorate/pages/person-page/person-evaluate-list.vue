<template>
  <view class="person-evaluate-list">
    <view class="aggregations">
      <view class="left">
        全部评价（{{pageInfo.totalRow}}）
      </view>
      <view class="right">综合好评率 {{totalNum}}</view>
    </view>
    <scroll-view :scroll-y="true" style="height:100%" @scrolltolower="bindscrolltolower">
      <personEvaliateItem :last='index===evaluate.list.length-1' v-for="item in evaluate.list" :item='item' :key='item.id'></personEvaliateItem>
    </scroll-view>
  </view>
</template>

<script>
  import personEvaliateItem from './components/person-evaliate-item.vue'
  import {getComments} from '@/api/decorate.js'
  export default{
    components:{
      personEvaliateItem
    },
    data(){
      return{
        personId:0,
        evaluate:{
          list:[]
        },
        pageInfo:{
          page:1,
          totalPage:0,
          totalRow:0
        },
        totalNum:0
      }
    },
    onLoad(e){
      this.personId = e.id
    },
    mounted(){
      this.getComments()
    },
    methods:{
      getComments(){
      	let params = 
      	 {
      		userId:this.personId,
          page:this.pageInfo.page,
          rows:10
      	}
      	getComments(params).then(data => {
      		if(data){
      			this.totalNum = data.aggregations
      			this.evaluate.list = this.evaluate.list.concat(data.list)
            this.pageInfo.totalPage = data.totalPage
            this.pageInfo.totalRow = data.totalRows
      		}
      	})
      },
      bindscrolltolower(){
        // console.log(this.pageInfo.totalPage>this.pageInfo.page)
        if(this.pageInfo.totalPage>this.pageInfo.page){
          this.pageInfo.page++
          this.getComments()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .person-evaluate-list{
    background-color: #fff;
    padding: 140rpx 32rpx 32rpx;
    height: 100%;
    padding-bottom: 88rpx;
    .aggregations{
      box-sizing: border-box;
      width: 686rpx;
      position: fixed;
      top: 0;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.03);
      border-radius: 12px;
      border: 0.5px solid #E5E5E5;
      background-color: #fff;
      padding: 0 32rpx;
      z-index: 10;
      // margin-bottom: 40rpx;
      margin: 0 auto 40rpx;
      .left{
        color: #111;
        font-weight: 500;
        font-size: 32rpx;
      }
      .right{
        color: #21C091;
        font-size: 28rpx;
        font-weight: 500;
      }
    }
  }
</style>
