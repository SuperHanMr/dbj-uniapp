<template>
  <view class="person-evaluate person-content-item"  v-if="evaluate.list.length!==0">
    <view class="title">对Ta的评价</view>
    <view class="" v-if="evaluate.list.length>0">
      <personEvaliateItem class="person-item" :last='index===evaluate.list.length-1' v-for="(item,index) in evaluate.list" :item='item' :key='item.id'></personEvaliateItem>
    </view>
    <view class="empty" v-else>
      暂无评价
    </view>
    <view class="click-text" v-if="evaluate.totalPage>1" @click="toEvaluateList"><text>查看全部评价</text><i class="icon-gerenzhuye_pingjiatiaozhuanwu_ic"></i></view>
  </view>
</template>

<script>
  import '../style/common.scss'
  import {formatDate} from "@/utils/common.js"
  import personEvaliateItem from './person-evaliate-item.vue'
  import {getComments} from '@/api/decorate.js'
  export default{
    props:{
      personId:0,
      isGrab:{
        type:Boolean,
        default:false,
      }
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
          rows:this.isGrab?8:2,
          userId:this.personId||6862
        }
        getComments(data).then(res=>{
          this.evaluate = res
          this.evaluate.list.map(item=>{
            console.log(formatDate(item.createTime,'YYYY-MM-DD'))
            item.createTime = formatDate(item.createTime,'YYYY-MM-DD')
          })
          this.$emit('contentEmpty','evaluateEmpty',res.list.length>0?true:false)
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
  .grab-padding{
    padding: 38rpx 0 16rpx ;
  }
</style>
