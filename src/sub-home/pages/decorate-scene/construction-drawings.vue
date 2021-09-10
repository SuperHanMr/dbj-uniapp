<template>
	<view class="constructionWrap">
		<view class="topTab">
			<view :class="navIndex===0?'active':''" @click="checkIndex(0)">量房图</view>
			<view :class="navIndex===1?'active':''" @click="checkIndex(1)">平面图</view>
			<view :class="navIndex===2?'active':''" @click="checkIndex(2)">设计图</view>
			<view :class="navIndex===3?'active':''" @click="checkIndex(3)">施工图</view>
			<view :class="navIndex===4?'active':''" @click="checkIndex(4)">全景图</view>
		</view>
		<view v-if="navIndex===0" class="underline"></view>
		<view v-if="navIndex===0" class="content">
			<view class="itemWrap">
				<view class="drawing">
					<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
					<view class="name">量房图item</view>
				</view>
				<view class="drawing">
					<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
					<view class="name">量房图item</view>
				</view>
			</view>
			<view class="drawing">
				<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
				<view class="name">量房图item</view>
			</view>
			<view class="drawing">
				<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png"></image>
				<view class="name">量房图item</view>
			</view>
		</view>
		<view v-if="navIndex===1" class="content">平面图list</view>
		<view v-if="navIndex===2" class="content">设计图list</view>
		<view v-if="navIndex===3" class="content">施工图list</view>
		<view v-if="navIndex===4" class="content">全景图list</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				navIndex: 0
			}
		},
		methods:{
			checkIndex(index){
				console.log(index)
				this.navIndex = index
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
		width: 84rpx;
		height: 40rpx;
		margin: 28rpx 32rpx 20rpx 34rpx;
		color: #999999;
		font-size: 28rpx;
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
	.itemWrap{
		display: flex;
		justify-content: space-between;
	}
	.content .drawing{
		width: 328rpx;
		height: 268rpx;
		margin-top: 32rpx;
	}
	.content .drawing .img{
		width: 328rpx;
		height: 216rpx;
		display: block;
		/* border: 2rpx solid #f5f6f6; */
		border-radius: 12rpx;
	}
	.content .drawing .name{
		width: 100%;
		height: 36rpx;
		margin-top: 16rpx;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
	}
</style>
