<template>
	<view class="constructionWrap">
		<view class="topTab">
			<!-- <view :class="navIndex===0?'active':''" @click="checkIndex(0)">全案设计</view>
			<view :class="navIndex===1?'active':''" @click="checkIndex(1)">单空间设计</view>
			<view :class="navIndex===2?'active':''" @click="checkIndex(2)">设计图</view>
			<view :class="navIndex===3?'active':''" @click="checkIndex(3)">施工图</view> -->
			<view
				:class="navIndex===index?'active':''"
				@click="checkIndex(index,item.type)"
				v-for="(item,index) in serveTypes"
				:key="item.type"
			>{{item.severName}}</view>
		</view>
		<view v-if="navIndex===0" class="underline"></view>
		<view v-if="navIndex===0" class="content">
			<view class="category" v-for="category in drawings" :key="category.categoryName">
				<view class="title">{{category.categoryName}}</view>
				<view class="itemWrap">
					<view class="drawing" v-for="imgItem in category.imageFileList" :key="imgItem.createTime">
						<!-- <image class="img" :src="imgItem.fileUrl"></image> -->
						<img :src="imgItem.fileUrl" class="img">
						<view class="name">{{imgItem.fileName}}</view>
					</view>
					<!-- <view class="drawing">
						<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
						<view class="name">量房图item</view>
					</view>
					<view class="drawing">
						<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
						<view class="name">量房图item</view>
					</view>
					<view class="drawing">
						<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
						<view class="name">量房图item</view>
					</view> -->
				</view>
			</view>
		</view>
		<view v-if="navIndex===1" class="content">平面图list</view>
		<view v-if="navIndex===2" class="content">设计图list</view>
		<view v-if="navIndex===3" class="content">施工图list</view>
		<view v-if="navIndex===4" class="content">全景图list</view>
	</view>
</template>

<script>
	import {getServeTypes,getDrawings} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				projectId: 0,
				navIndex: 0,
				serveTypes: [],
				serverList: [],
				drawings: []
			}
		},
		onLoad(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage',( data )=> {
				this.projectId = data
			})  
		},
		mounted(){
			this.requestPage()
		},
		methods:{
			checkIndex(index,type){
				console.log(index)
				this.navIndex = index
				this.requestPage(type)
			},
			requestPage(type){
				getServeTypes(this.projectId).then(data => {
					if(data){
						this.serveTypes = data
						let params = {
							projectId: this.projectId,
							severType: type || 1
						}
						getDrawings(params).then(data => {
							if(data){
								this.serverList = data.serverVOS
								this.drawings = data.fileListVO
							}
						})
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	.constructionWrap{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #ffffff;
	}
  .topTab{
    width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #efefef;
    display: flex;
    align-items: center;
  }
	.topTab>view{
		width: fit-content;
		height: 44rpx;
		margin: 28rpx 48rpx 10rpx 0;
		color: #999999;
		font-size: 28rpx;
	}
	.topTab>view:first-child{
		margin-left: 32rpx;
	}
	.topTab .active{
		color: #333333;
	  font-weight: 500;
	}
	.underline{
		position: absolute;
		top: 96rpx;
		left: 52rpx;
		width: 48rpx;
		height: 6rpx;
		background: linear-gradient(129deg,#00cdec 0%, #00ed7d 92%);
	}
  .content{
		width: 686rpx;
		height: 1528rpx;
		margin: 0 32rpx;
	}
	.content .category{
		
	}
	.category .title{
		width: 84rpx;
		height: 40rpx;
		margin-top: 40rpx;
		font-weight: 500;
		font-size: 28rpx;
		color: #333333;
	}
	.category .itemWrap{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.itemWrap .drawing{
		width: 328rpx;
		height: 268rpx;
		margin-top: 48rpx;
	}
	.itemWrap .drawing:first-child{
		margin-top: 26rpx;
	}
	.itemWrap .drawing:nth-child(2){
		margin-top: 26rpx;
	}
	.itemWrap .drawing .img{
		width: 328rpx;
		height: 216rpx;
		display: block;
		/* border: 2rpx solid #f5f6f6; */
		border-radius: 12rpx;
	}
	.itemWrap .drawing .name{
		width: 100%;
		height: 36rpx;
		margin-top: 16rpx;
		font-size: 26rpx;
		color: #333333;
	}
</style>
