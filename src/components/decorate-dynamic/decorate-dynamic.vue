<template>
  <view class="decorate-dynamic" >
    		<view class="item" v-for="(item,index) in dynamicsArr" :key="item.id" :catchtouchmove="isOpenComment">
          <image class="avatar" :src="item.avatar" mode="aspectFill" ></image>
    			<view class="acitonInfo" :class="{'acitonInfo-person':isPerson}">
    				<view class="header">
    					<view>
    						<view class="workerName">{{item.userName}}</view>
    						<view class="role">{{item.roleName}}</view>
    					</view>
    					<view class="date">{{item.normDateStr}}</view>
    				</view>
    				<view class="report">{{item.content}}</view>
    				<view class="evidence">
    					<!-- <image class="img" :src="url" v-for="(url,index) in item.imagesList.slice(0,6)" :key="index"></image> -->
    					<image-preview :list='item.imagesList' :imgWidth='192' :imgHeight="192" :lineSpace='12' :colSpace="12" :row="2"></image-preview>
    				</view>
    				<view class="footer">
    					<view class="actionType">{{item.recordName}}</view>
    					<view class="right">
    						<view class="like">
    							<image v-if="!item.selfLike" @click="likeC(index,true,item)" src="../../static/images/ic_like@2x.png"></image>
    							<image v-else @click="likeC(index,false,item)" src="../../static/images/ic_liked@2x.png"></image>
    							<view class="text">{{item.likeCount}}</view>
    						</view>
    						<view class="comment" @click="commentC(item,index)">
    							<image  src="../../static/images/ic_comments@2x.png"></image>
    							<view class="text">{{item.commentCount}}</view>
    						</view>
    					</view>
    				</view>
            <view class="map-item" v-if="isPerson" @click="toDecorate(item)">
              <image src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/decorate/houseAddress.png"></image>
              <text>{{item.estateName}}</text>
            </view>
    			</view>
    		</view>
        <view class="" >
          <dynamicComments ref='comments' v-if="hiddenComment" :index="activeIndex" :ParentTotalRows='activeTotalRows' @change="changeComments" :userId='personId' :houseOwnerId='houseOwnerId' :dynamicId='dynamicId'></dynamicComments>
        </view>
        
  </view>
</template>

<script>
  import dynamicComments from './dynamic-comments.vue'
  export default {
    name:"decorate-dynamic",
    components:{
      dynamicComments
    },
    props:{
      dynamics:{
        type:Array,
        default:()=>{
          return []
        }
      },
      isPerson:false,
      personId:0
    },
    data() {
      return {
        dynamicId:0,
        houseOwnerId:0,
        activeIndex:0,
        dynamicsArr:[],
        activeTotalRows:0,
        hiddenComment:true,
        isOpenComment:''
      };
    },
    watch:{
      dynamics:{
        handler:function(){
          
          this.dynamicsArr = [...this.dynamics]
        },
        immediate:true
        
      }
    },
    methods:{
      likeC(index,isAdd,item){
      	this.$emit('likeC',index,isAdd,item)
      },
      commentC(item,index){
        if(this.isPerson){
          this.hiddenComment = true
          this.$nextTick(function(){
            this.$refs.comments.showComments = true
            this.dynamicId = item.id
            this.activeIndex = index
            this.activeTotalRows = item.commentCount
            console.log(this.activeIndex)
            this.houseOwnerId = item.houseOwnerId
          })
          
        }
      	this.$emit('commentC',item.id)
        
      },
      commentOpen(e){
        this.isOpenComment = e
      },
      changeComments(item,index){
        
        this.dynamicsArr[index].commentCount = item
        this.hiddenComment = false
      },
      toDecorate(item){
        console.log(item.projectId)
        uni.navigateTo({
          url:'/sub-home/pages/decorate-scene/decorate-scene?projectId='+item.projectId
        })
      },
    }
  }
</script>

<style scoped lang="scss">
	.item{
		width: 100%;
		display: flex;
	}
	.item .avatar{
		width: 74rpx;
		height: 74rpx;
		border-radius: 50%;
		display: block;
		margin-top: 39rpx;
		// margin-left: 31rpx;
    background-size: contain;
	}
  view .item{
    .avatar-person{
      margin-left: 0;
    }
    .acitonInfo-person{
      margin: 48rpx 0 0 16rpx;
    }
  }
	.item .acitonInfo{
		width: 598rpx;
		margin: 48rpx 32rpx 0 16rpx;
		padding-bottom: 36rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.item:last-child .acitonInfo{
		border-bottom: 0rpx;
	}
	.acitonInfo .header{
		width: 100%;
		height: 42rpx;
		margin-bottom: 16rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.acitonInfo .report{
		width: 100%;
		// height: 120rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.acitonInfo .evidence{
		width: 100%;
		/* height: 394rpx; */
		margin: 16rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap
	}
	.evidence .img{
		width: 192rpx;
		height: 192rpx;
		display: block;
		margin-bottom: 10rpx;
		border-radius: 12rpx;
	}
	.acitonInfo .footer{
		width: 100%;
		height: 34rpx;
		display: flex;
		justify-content: space-between;
	}
	.acitonInfo .header>view{
		display: flex;
		align-items: center;
	}
	.acitonInfo .header .workerName{
		width: fit-content;
		/* width: 60rpx; */
		height: 42rpx;
		margin-right: 8rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		line-height: 42rpx;
    max-width: 330rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 16rpx;
	}
	.acitonInfo .header .role{
		width: 82rpx;
		height: 32rpx;
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
		border-radius: 6rpx;
		font-size: 22rpx;
		text-align: center;
		color: #ffffff;
		line-height: 32rpx;
	}
	.acitonInfo .header .date{
		width: 136rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .actionType{
		width: fit-content;
		/* width: 104rpx; */
		height: 32rpx;
		background: #f5f6f6;
		border-radius: 6rpx;
		font-size: 22rpx;
		color: #333333;
		text-align: center;
		line-height: 32rpx;
    padding: 0 8rpx;
	}
	.acitonInfo .footer .right{
		width: 166rpx;
		height: 34rpx;
		display: flex;
	}
	.acitonInfo .footer .right>view{
		display: flex;
		align-items: center;
	}
	.acitonInfo .footer .right .text{
		width: 30rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.acitonInfo .footer .right .like{
		margin-right: 32rpx;
	}
	.acitonInfo .footer .like image{
		width: 26rpx;
		height: 26rpx;
		display: block;
		margin-right: 8rpx;
	}
	.acitonInfo .footer .comment image{
		width: 24rpx;
		height: 24rpx;
		display: block;
		margin-right: 8rpx;
	}
  .map-item{
    margin-top: 16rpx;
    height: 54rpx;
    // display: flex;
    // align-items: center;
    background-color: #F5F6F6;
    border: 1px solid #edf0f0;
    border-radius: 6rpx;
    padding-left: 2rpx;
    display: flex;
    align-items: center;
    width: fit-content;
    image{
      width: 48rpx;
      height: 48rpx;
      background: #C1C1C1;
      border-radius: 4rpx;
      margin-right: 18rpx;
    }
    text{
      display: inline-block;
      // max-width: 296rpx;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      color: #666;
      font-size: 24rpx;
      max-width: 296rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
