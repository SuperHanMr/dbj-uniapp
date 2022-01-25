<template>
  <view class="person-dynamic person-content-item" v-if="dynamics.length!==0">
    <view class="title" >Ta的动态</view>
    <decorateDynamic v-if="dynamics.length>0" :dynamics='dynamics' :personId='personId' :isPerson='true' @likeC='likeC' @commentC='commentC'></decorateDynamic>
    <view class="empty" v-else>
      暂无动态
    </view>
    <view class="click-text" v-if="totalPage>1" @click="toAllDynamics"><text>查看全部动态</text><i class="icon-gerenzhuye_pingjiatiaozhuanwu_ic"></i></view>
    
  </view>
</template>

<script>
  import '../style/common.scss'
  import decorateDynamic from '../../../components/decorate-dynamic/decorate-dynamic.vue'
  import {getPersonDynamic,setAttentions,getDecorateDynamic} from "@/api/real-case.js"
  export default{
    components:{
      decorateDynamic,
    },
    props:{
      personId:0,
      isGrab:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        dynamics:[],
        projectInfo:{},
        totalPage:0
      }
    },
    mounted(){
      console.log(1112222)
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
        	relationId: item.id,
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
          url:'/sub-decorate/pages/person-page/person-dynamic-list?personId='+this.personId
        })
      },
      requestDynamic(){
        console.log(this.personId)
      	let params = 
      	 {
      		creatorId: this.personId,
      		userTypes: [2,3],
          page:1,
          rows:4
      	}
        if(getApp().globalData.token){
          getPersonDynamic(params).then(data => {
          	if(data){
          		
          		this.dynamics = data.list
              this.totalPage =  data.totalPage||0
              console.log()
              this.$emit('contentEmpty','dynamicEmpty',data.list.length>0?true:false)
          	}else{
              this.$emit('contentEmpty','dynamicEmpty',false)
            }
          })
        }else{
          getDecorateDynamic(params).then(data => {
          	if(data){
          		
          		this.dynamics = data.list
              this.totalPage =  data.totalPage||0
              this.$emit('contentEmpty','dynamicEmpty',data.list.length>0?true:false)
          	}else{
              this.$emit('contentEmpty','dynamicEmpty',false)
            }
          })
        }
      	
      },
    }
  }
</script>

<style lang="scss" scoped>
  .person-dynamic{
    background-color: #fff;
  }
</style>
