<template>
  <view class="person-dynamic-list">
    <scroll-view :scroll-y="true" style="height: 100%" @scrolltolower="bindscrolltolower">
    <decorateDynamic :dynamics='dynamics' :isPerson='true' @likeC='likeC' @commentC='commentC'></decorateDynamic>
    </scroll-view>
  </view>
</template>

<script>
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
        pageInfo:{
          page:1,
          totalPage:0
        }
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
      requestDynamic(){
      	let params = 
      	 {
      		prjectId: 46,
      		userTypes: [2,3],
          page:this.pageInfo.page,
          rows:10
      	}
      	getDecorateDynamic(params).then(data => {
      		if(data){
      			
      			this.dynamics = this.dynamics.concat(data.list)
            this.pageInfo.totalPage = data.totalPage
      		}
      	})
      },
      bindscrolltolower(){
        if(this.pageInfo.totalPage>this.pageInfo.page){
          this.pageInfo.page++
          this.requestDynamic()
        }
      }
    }
  }
</script>

<style lang="scss">
  .person-dynamic-list{
    background-color: #fff;
    padding-left: 32rpx;
    height: 100%;
  }
</style>
