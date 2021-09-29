<template>
  <view class="person-evaluate person-content-item">
    <view class="title">Ta的评价</view>
    <view class="" v-if="evaluate.list.length>0">
      <personEvaliateItem class="person-item" :last='index===evaluate.list.length-1' v-for="(item,index) in evaluate.list" :item='item' :key='item.id'></personEvaliateItem>
    </view>
    <view class="empty" v-else>
      暂无评价
    </view>
    <view class="click-text" v-if="evaluate.totalPage>1" @click="toEvaluateList">查看全部评价<image src="" mode=""></image></view>
  </view>
</template>

<script>
  import '../style/common.scss'
  import personEvaliateItem from './person-evaliate-item.vue'
  import {getComments} from '@/api/decorate.js'
  export default{
    props:{
      personId:0
    },
    components:{
      personEvaliateItem
    },
    data(){
      return{
        num:3,
        evaluate:{}
      }
    },
    mounted() {
      this.getComments()
    },
    methods:{
      getComments(){
        let data = {
          page:1,
          rows:2,
          userId:this.personId||6862
        }
        getComments(data).then(res=>{
          this.evaluate = res
          
          this.getEvaluate()
        })
      },
      toEvaluateList(){
        uni.navigateTo({
          url:'/sub-decorate/pages/person-page/person-evaluate-list?id='+this.personId
        })
      },
      getEvaluate(){
        this.$emit('getEvaluate',this.evaluate.totalRows)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
