<template>
	<view class="constructionWrap">
		<view class="topTab">
			<view
				:class="navIndex===index?'active':''"
				@click="checkIndex(index,item.type)"
				v-for="(item,index) in serveTypes"
				:key="item.type"
			>{{item.severName}}</view>
		</view>
		<view v-if="navIndex===0" class="underline"></view>
		<view v-if="navIndex===1" class="underline left_1"></view>
		<view v-if="navIndex===2" class="underline left_2"></view>
		<view v-if="navIndex===3" class="underline left_3"></view>
		<view class="designer" v-if="serverList.length>=2">
			<view class="designerInfo">
				<image class="avatar" :src="serverList[selectedIndex].avatar"></image>
				<view>
					<view class="designerName">{{serverList[selectedIndex].userName}}</view>
					<view class="role">{{serverList[selectedIndex].role}}</view>
				</view>
			</view>
			<view class="select" @click="switchC">
				<view>切换设计师</view>
				<image class="switch" src="../../static/ic_switch@2x.png"></image>
			</view>
		</view>
		<view class="contentWrap">
			<view class="content"
				v-if="navIndex===index"
				v-for="(item,index) in serveTypes"
				:key="item.type"
				>
				<view class="category" v-for="(category,index) in drawings" :key="category.categoryName">
					<view class="title">{{category.categoryName}}</view>
					<view class="itemWrap">
						<view class="drawing" v-for="imgItem in category.imageFileList" :key="imgItem.createTime">
							<image class="img" :src="imgItem.fileUrl"></image>
							<view class="name">{{imgItem.fileName}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="showSwitchDesigner">
			<view class="popupSwitch">
				<view class="topArea">
					<view class="mainTit">切换设计师</view>
					<image class="close" @click="showSwitchDesigner=false" src="../../static/ic_closed_black@2x.png"></image>
				</view>
				<ul class="options">
					<li
						v-for="(item,index) in serverList"
						:key="item.severId"
						@click="selectC(item.severId,index)"
						>
						<view class="designerInfo">
							<image class="avatar" :src="item.avatar"></image>
							<view class="designerName">{{item.userName}}</view>
							<view class="role">{{item.role}}</view>
						</view>
						<image class="img" v-if="item.checked" src="../../static/ic_checked@2x.png"></image>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	import {getServeTypes,getDrawings,updateDrawings} from "../../../api/real-case.js"
	export default {
		data(){
			return {
				projectId: 2,
				navIndex: 0,
				serveTypes: [],
				serverList: [],
				drawings: [],
				showSwitchDesigner: false,
				selectedIndex: 0
			}
		},
		onLoad(option) {
				this.projectId = option.projectId 
		},
		mounted(){
			this.requestPage()
		},
		methods:{
			switchC(){
				this.showSwitchDesigner = true
			},
			selectC(severId,index){
				this.selectedIndex = index
				this.serverList[index].checked = true
				updateDrawings(severId).then(data => {
					if(data){
						this.$nextTick(()=>{
							this.drawings = data
						})
					}
				})
			},
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
								this.serverList = data.serverVOS.map(item => {
									item.checked = false
									return item
								})
								this.drawings = data.fileListVO
								console.log(this.drawings)
							}
						})
						
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mask {
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.3);
	  position: fixed;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  z-index: 998;
	}
	.popupSwitch{
		width: 100%;
		height: 840rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
	.popupSwitch .options{
		width: 100%;
		height: 786rpx;
		overflow: auto;
	}
	.options li{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 120rpx;
		background: #ffffff;
		border-top: 2rpx solid #f2f2f2;
	}
	.options .img{
		width: 48rpx;
		height: 48rpx;
		display: block;
		margin: 36rpx 24rpx 36rpx 0;
	}
	.options .designerInfo{
		display: flex;
		width: 302rpx;
		height: 76rpx;
		margin: 22rpx 32rpx;
	}
	.options .designerInfo .avatar{
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		display: block;
	}
	.options .designerInfo .designerName{
		/* width: fit-content; */
		width: 100rpx;
		height: 42rpx;
		margin: 18rpx 8rpx 16rpx 24rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
	}
	.options .designerInfo .role{
		width: 76rpx;
		height: 28rpx;
		margin: 24rpx 0;
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
		border-radius: 6rpx;
		font-size: 20rpx;
		text-align: center;
		color: #ffffff;
		line-height: 28rpx;
	}
	.popupSwitch .topArea{
		height: 120rpx;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
	}
	.topArea .mainTit{
		width: 160rpx;
		height: 40rpx;
		margin-left: 296rpx;
		margin-right: 208rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}
	.topArea .close{
		width: 64rpx;
		height: 64rpx;
		display: block;
		margin-right: 20rpx;
	}
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
	.left_1{
		left: 222rpx;
	}
	.left_2{
		left: 382rpx;
	}
	.left_3{
		left: 552rpx;
	}
	.designer{
		width: 702rpx;
		height: 176rpx;
		background: #f7f7f7;
		border-radius: 24rpx;
		margin: 24rpx;
		margin-bottom: 0;
		display: flex;
	}
	.designer .select{
		display: flex;
		margin: 72rpx 0 68rpx 274rpx;
	}
	.select>view{
		width: 130rpx;
		height: 36rpx;
		font-size: 26rpx;
		color: #666666;
	}
	.select .switch{
		width: 24rpx;
		height: 24rpx;
		display: block;
		margin: 6rpx 22rpx 6rpx 10rpx;
	}
	.designer .designerInfo{
		display: flex;
		margin: 36rpx 0 36rpx 32rpx;
	}
	.designer .designerInfo .avatar{
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		display: block;
	}
	
	.designerInfo>view .designerName{
		width: 90rpx;
		height: 42rpx;
		margin: 8rpx 0;
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
	}
	.designerInfo>view .role{
		width: 76rpx;
		height: 28rpx;
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
		border-radius: 6rpx;
		font-size: 20rpx;
		text-align: center;
		color: #ffffff;
		line-height: 28rpx;
	}
	.contentWrap{
		width: 100%;
		height: fit-content;
		/* height: 1528rpx; */
		overflow: auto;
	}
  .content{
		width: 686rpx;
		height: fit-content;
		/* height: 1528rpx; */
		margin: 0 32rpx;
	}
	.content .category{
		
	}
	.category .title{
		width: fit-content;
		/* width: 84rpx; */
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
