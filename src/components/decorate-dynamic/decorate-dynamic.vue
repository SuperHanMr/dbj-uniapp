<template>
  <view class="decorate-dynamic">
    		<view class="item" v-for="(item,index) in dynamics" :key="item.id">
    			<image class="avatar" :class="{'avatar-person':isPerson}" :src="item.avatar"></image>
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
    					<image-preview :list='item.imagesList' :imgWidth='192' :imgHeight="192" :lineSpace='10' :colSpace="11" :row="2"></image-preview>
    				</view>
    				<view class="footer">
    					<view class="actionType">{{item.recordName}}</view>
    					<view class="right">
    						<view class="like">
    							<image v-if="!item.selfLike" @click="likeC(index,true,item)" src="../../static/images/ic_like@2x.png"></image>
    							<image v-else @click="likeC(index,false,item)" src="../../static/images/ic_liked@2x.png"></image>
    							<view class="text">{{item.likeCount}}</view>
    						</view>
    						<view class="comment">
    							<image @click="commentC(item.id)" src="../../static/images/ic_comments@2x.png"></image>
    							<view class="text">{{item.commentCount}}</view>
    						</view>
    					</view>
    				</view>
            <view class="map-item" v-if="isPerson" @click="toDecorate(item)">
              <image></image>
              <text>{{item.estateName}}</text>
            </view>
    			</view>
    		</view>
  </view>
</template>

<script>
  export default {
    name:"decorate-dynamic",
    props:{
      dynamics:[],
      isPerson:false,
    },
    data() {
      
      return {
        
      };
    },
    methods:{
      likeC(index,isAdd,item){
      	this.$emit('likeC',index,isAdd,item)
      },
      commentC(id){
      	this.$emit('commentC',id)
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
		margin-left: 31rpx;
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
		// width: 136rpx;
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
    }
  }
</style>
