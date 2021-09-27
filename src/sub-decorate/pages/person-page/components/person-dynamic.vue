<template>
  <view class="person-dynamic person-content-item">
    <view class="title">Ta的动态</view>
    <decorateDynamic :dynamics='dynamics' :isPerson='true' @likeC='likeC' @commentC='commentC'></decorateDynamic>
    <view class="click-text" v-if="totalPage>1" @click="toAllDynamics">查看全部动态</view>
  </view>
</template>

<script>
  import '../style/common.scss'
  import decorateDynamic from '@/components/decorate-dynamic/decorate-dynamic.vue'
  import {getDecorateDynamic,setAttentions,
  getFocusBrowse,getComments,expandReplies,createReply,removeComment} from "@/api/real-case.js"
  export default{
    components:{
      decorateDynamic,
    },
    props:{
      personId:0
    },
    data(){
      return{
        dynamics:[],
        projectInfo:{},
        totalPage:0
      }
    },
    mounted(){
      this.requestDynamic()
    },
    methods:{
      likeC(index,isAdd,item){
        let deviceId = 0
        uni.getSystemInfo({
        	success:res => {
        		deviceId = res.deviceId
        	}
        })
        let params = {
        	routeId: 3001,
        	relationId: item.recordId,
        	authorId: this.personId||6842,
        	equipmentId: deviceId,
        	// userId: this.userId,
        	// type: 0,
        	// bizType: 6,
        	subBizType: item.recordType
        }
        setAttentions(params).then( data => {
        	if(data){
        		console.log(data)
        		this.dynamics[index].selfLike = !this.dynamics[index].selfLike
        		isAdd ? ++this.dynamics[index].likeCount : --this.dynamics[index].likeCount
        	}
        })
      },
      commentC(){},
      toAllDynamics(){
        uni.navigateTo({
          url:'/sub-decorate/pages/person-page/person-dynamic-list'
        })
      },
      requestDynamic(){
      	let params = 
      	 {
      		prjectId: 46,
      		userTypes: [2,3],
          page:1,
          rows:4
      	}
      	getDecorateDynamic(params).then(data => {
      		if(data){
      			
      			this.dynamics = data.list
            this.totalPage =  data.totalPage
      		}
      	})
      },
    }
  }
</script>

<style lang="scss">
  
</style>
