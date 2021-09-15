<template>
	<view class="sceneContainer">
		<view class="header">
			<view class="houseInfo">
				<view class="location">{{projectInfo.estateNeighbourhood}}</view>
				<view class="focus">
					<view class="browse">浏览 {{estateViewCount}}</view>
					<view class="attention">关注 {{estateFocusOnCount}}</view>
				</view>
				<view class="itself">
					<view class="type">
						<view class="typeInner">{{projectInfo.estateUnitsType}}</view>
						<view class="tag">户型</view>
					</view>
					<view class="area">
						<view class="areaInner">{{projectInfo.estateArea}}平米</view>
						<view class="tag">面积</view>
					</view>
				</view>
			</view>
			<!-- <image class="houseImg" src=""></image> -->
		</view>
		<view class="navBar">
			<view class="construction" @click="toConstruction">
				<image class="toConstruction" src="../../static/ic_construction_drawings@2x.png"></image>
				<view>施工图纸</view>
			</view>
			<view class="cost">
				<image class="toCost" src="../../static/ic_cost_statistics@2x.png"></image>
				<view>花销统计</view>
			</view>
			<view class="decorate">
				<image class="toDecorate" src="../../static/ic_decorate_calendar@2x.png"></image>
				<view>装修日历</view>
			</view>
			<view class="video" @click="toVideoSite">
				<image class="toVideoSite" src="../../static/ic_video_site@2x.png"></image>
				<view>工地视频</view>
			</view>
		</view>
		<view class="process">
			<view class="title">装修流程</view>
			<view class="content">
				<image class="startWork" src="../../static/start_work@2x.png"></image>
				<view class="mainWrap">
					
					<view class="workType">
						<view v-for="(item,index) in nodeTypes" :key="index">{{item.name}}</view>
					</view>
					<view class="progressBar">
						<view class="connectStartLine"></view>
						<view class="steps">
							<view class="dot"
								:class="{'done':item.nodeStatus===4||item.nodeStatus===3,
								'doing':item.nodeStatus===2,'unpaid':item.nodeStatus===1}"
								v-for="(item,index) in nodesInfo" :key="index"
							>
								<view class="connectLine" :class="{'line-green':item.nodeStatus===3||item.nodeStatus===4,'line-gray':item.nodeStatus===1||item.nodeStatus===2}"></view>
							</view>
						</view>
					</view>
					<view class="column">
						<view
							:class="{'active':item.nodeStatus===2||item.nodeStatus===3}"
							v-for="(item,index) in nodesInfo" :key="index"></view>
					</view>
					<view class="worker">
						<view v-for="(item,index) in workers" :key="item.id">
							<image class="avatar" :src="item.avatar"></image>
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
				<image class="endWork" src="../../static/end_work@2x.png"></image>
			</view>
		</view>
		<view class="dynamic">
			<view class="top">
				<view class="title">装修动态</view>
				<view class="filter" @click="selectC">
					<view class="text">筛选</view>
					<image class="icon" src="../../static/ic_filtrate@2x.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="item in dynamics" :key="item.id">
					<image class="avatar" :src="item.avatar"></image>
					<view class="acitonInfo">
						<view class="header">
							<view>
								<view class="workerName">{{item.userName}}</view>
								<view class="role">{{item.nodeName}}</view>
							</view>
							<view class="date">{{item.normDateStr}}</view>
						</view>
						<view class="report">{{item.content}}</view>
						<view class="evidence">
							<image class="img" :src="url" v-for="(url,index) in item.imagesList.slice(0,6)" :key="index"></image>
						</view>
						<view class="footer">
							<view class="actionType">{{item.recordName}}</view>
							<view class="right">
								<view class="like">
									<image v-if="!item.selfLike" @click="likeClick" src="../../static/ic_like@2x.png"></image>
									<image v-else @click="likeClick" src="../../static/ic_liked@2x.png"></image>
									<view class="text">{{item.likeCount}}</view>
								</view>
								<view class="comments">
									<image @click="showComments=true" src="../../static/ic_comments@2x.png"></image>
									<view class="text">{{item.commentCount}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomBox"></view>
		<view class="footer">
			<view class="consult">
				<image src="../../static/consult@2x.png" mode=""></image>
				<view>咨询客服</view>
			</view>
			<view class="userWant">
				<image src="../../static/decorate@2x.png" mode=""></image>
				<view>我要装修</view>
			</view>
			<view class="focusOn" @click="focusC">
				<image class="add" src="../../static/ic_add_focus@2x.png"></image>
				<view>{{isFocus?'已关注':'关注'}}</view>
			</view>
		</view>
		<view class="mask" v-if="showNodeType">
			<view class="popupSelects">
				<view class="selArea">
					<view class="cancel" @click="cancelC">取消</view>
					<view class="confirm" @click="confirmC">确定</view>
				</view>
				<ul class="options">
					<li :class="{'active':selectedIndex===-1}">全部</li>
					<li
						:class="{'active':selectedIndex===index}"
						@click="switchC(index,item.nodeType)"
						v-for="(item,index) in selectNodeTypes"
						:key="index"
					>{{item.nodeName}}</li>
				</ul>
			</view>
		</view>
		<view class="mask" v-if="showComments">
			<view class="popupComments">
				<view class="topArea">
					<view class="mainTit">评论</view>
					<image @click="showComments=false" class="close" src="../../static/ic_closed_black@2x.png"></image>
				</view>
				<view class="commentList">
					<view class="commentItem">
						<view class="mainContent">
							<image class="avatar" src="../../static/avatar@2x(1).png"></image>
							<view class="commentInfo">
								<view class="info">
									<view class="userName">王红</view>
									<view class="role">业主</view>
									<view class="date">2021-09-12</view>
								</view>
								<view class="text">尊敬的业主，您好！打扮家管家-姜文为您新家质量保驾护航，今日巡查房屋情况：今天停工</view>
							</view>
						</view>
						<view class="reply">
							<image class="avatar" src="../../static/avatar@2x.png"></image>
							<view class="replyInfo">
								<view class="info">
									<view class="userName">姜文</view>
									<view class="role">管家</view>
									<view class="date">2021-09-12</view>
								</view>
								<view class="text">尊敬的业主，您好！打扮家管家-姜文为您新家质量保驾护航，今日巡查房屋情况：今天停工</view>
							</view>
						</view>
						<view class="expand">
							<view class="test">展开1条回复</view>
							<image class="img" src="../../static/ic_expand@2x.png"></image>
						</view>
						<view class="packUp">
							<view class="test">收起</view>
							<image class="img" src="../../static/ic_packUp@2x.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getDecorateProcess,getDecorateDynamic,getSelectOptions,setAttentions,getFocusBrowse} from "../../../api/real-case.js"
	import {formatDate} from "../../../utils/common.js"
	export default {
		filters:{
			formatDate
		},
		data(){
			return {
				showNodeType: false,
				showComments: false,
				selectedIndex: -1,
				selectedType: 0,
				projectInfo: {},
				nodeTypes: [],
				nodesInfo: [],
				workers: [],
				dynamics: [],
				selectNodeTypes: [],
				processId: 0,
				isFocus: false,
				estateFocusOnCount: 0,
				estateViewCount: 0
			}
		},
		created(){
			// this.userId = uni.getStorageSync("userId")
			this.userId = 6388
			this.requestDecorateSteps()
			this.requestDynamic()
			
		},
		methods:{
			focusC(){
				let deviceId = 0
				uni.getSystemInfo({
					success:res => {
						deviceId = res.deviceId
					}
				})
				let params = {
					routeId: 3001,
					relationId: this.projectInfo.id,
					authorId: this.projectInfo.estateId,
					equipmentId: deviceId,
					userId: this.userId,
					type: 3,
					bizType: 4,
					subBizType: this.projectInfo.estateCityId
				}
				setAttentions(params).then( data => {
					if(data){
						console.log(data)
						this.isFocus = !this.isFocus
					}
				})
			},
			selectC(){
				this.showNodeType=true
				this.requestSelectOptions()
			},
			cancelC(){
				this.showNodeType=false
			},
			confirmC(){
				this.showNodeType=false
				this.requestDynamic(this.selectedType)
			},
			switchC(index,type){
				this.selectedIndex = index
				this.selectedType = type
			},
			toVideoSite(){
				uni.navigateTo({
					url:"./video-site"
				})
			},
			toConstruction(){
				uni.navigateTo({
					url:"/sub-home/pages/decorate-scene/construction-drawings",
					success:res => {
						res.eventChannel.emit('acceptDataFromOpenerPage', 2)
					}
				})
			},
			requestSelectOptions(){
				let params = {
					projectId: 39,
					processId: 1,
					allNodesFlag: false
				}
				getSelectOptions(params).then(data => {
					if(data&&data.length){
						this.selectNodeTypes = data
					}
				})
			},
			getFocus(){
				let params = {
					userId: this.userId,
					relationId: this.projectInfo.id,
					subBizType: this.projectInfo.estateCityId,
				}
				getFocusBrowse(params).then(data => {
					if(data){
						this.estateFocusOnCount = data.estateFocusOnCount
						this.estateViewCount = data.estateViewCount
						this.isFocus = data.isSelfFocusOn
						
						console.log(data)
					}
				})
			},
			requestDynamic(type){
				let params
				params = type? {
					projectId: 40,
					nodeType: type,
					userTypes: [2,3]
				} : {
					projectId: 40,
					userTypes: [2,3]
				}
				getDecorateDynamic(params).then(data => {
					if(data){
						console.log(data)
						let {list,page,rows,totalRows,start,end} = data
						this.dynamics = list
					}
				})
			},
			requestDecorateSteps(){
				let params = {
					projectId: 1
				}
				getDecorateProcess(params).then(data => {
					if(data){
						let {projectInfo,nodes} = data
						this.projectInfo = projectInfo
						this.processId = nodes[0].processId
						this.getFocus()
						nodes.map((item,index) => {
							this.nodeTypes.push({
								name: item.nodeName,
								type: item.nodeType
							})
							this.nodesInfo.push({
								id: item.id,
								nodeStatus: item.nodeStatus,
								nextNodeId: item.nextNodeId
							})
							this.workers.push({
								id: item.serveId,
								name: item.serveName,
								avatar: item.serveAvatar
							})
							return item 
						})
						for (let i = 0;i < this.nodesInfo.length - 1 ; i++) {
							this.nodesInfo[i].nextNodeStatus = this.nodesInfo[i+1].nodeStatus
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bottomBox{
		width: 100%;
		height: 136rpx;
		padding-bottom: 40rpx;
	}
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
	.popupComments{
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
	.popupComments .topArea{
		height: 120rpx;
		border-radius: 32rpx 32rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
	}
	.topArea .mainTit{
		width: 64rpx;
		height: 44rpx;
		margin-left: 344rpx;
		margin-right: 258rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
	}
	.topArea .close{
		width: 64rpx;
		height: 64rpx;
		display: block;
		margin-right: 20rpx;
	}
	.commentItem:first-child .mainContent{
		margin-top: 24rpx;
	}
	.commentItem{
		width: 686rpx;
		margin-left: 32rpx;
		border-bottom: 2rpx solid #efefef;
	}
	.commentItem .mainContent{
		width: 100%;
		height: 132rpx;
		margin-top: 32rpx;
		display: flex;
	}
	.commentItem .mainContent .avatar{
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		display: block;
	}
	.commentItem .mainContent .commentInfo{
		width: 598rpx;
		height: 36rpx;
	}
	.commentInfo .info{
		display: flex;
		align-items: center;
		margin-top: 8rpx;
		margin-bottom: 8rpx;
	}
	.commentInfo .text{
		width: 598rpx;
		height: 80rpx;
		font-size: 26rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.info .userName{
		width: 52rpx;
		height: 36rpx;
		margin-right: 8rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.info .role{
		width: 56rpx;
		height: 28rpx;
		font-size: 20rpx;
		line-height: 28rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(45deg,#f2af1a, #ffd698);
		border-radius: 6rpx;
	}
	.info .date{
		width: 146rpx;
		height: 36rpx;
		font-size: 26rpx;
		color: #999999;
		line-height: 36rpx;
		margin-left: 336rpx;
	}
	.commentItem .reply{
		width: 100%;
		height: 150rpx;
		margin-top: 24rpx;
		margin-left: 80rpx;
		display: flex;
	}
	.commentItem .reply .avatar{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		display: block;
	}
	.commentItem .reply .replyInfo{
		width: 550rpx;
		height: 120rpx;
	}
	.replyInfo .info{
		width: 550rpx;
		height: 36rpx;
		display: flex;
		align-items: center;
		margin-top: 2rpx;
		margin-top: 8rpx;
	}
	.replyInfo .info .date{
		margin-left: 288rpx;
	}
	.replyInfo .info .role{
		background: linear-gradient(45deg,#6d95ef, #84b9fc);
	}
	.replyInfo .text{
		width: 550rpx;
		height: 120rpx;
		font-size: 26rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.expand{
		width: 164rpx;
		height: 36rpx;
		margin-left: 136rpx;
		margin-bottom: 32rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #00c2b8;
		display: flex;
		align-items: center;
	}
	.expand .img{
		width: 14rpx;
		height: 8rpx;
		display: block;
		margin-left: 8rpx;
	}
	.packUp{
		width: 74rpx;
		height: 36rpx;
		margin-left: 136rpx;
		margin-bottom: 32rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #00c2b8;
		display: flex;
		align-items: center;
	}
	.packUp .img{
		width: 14rpx;
		height: 8rpx;
		display: block;
		margin-left: 8rpx;
	}
	.popupSelects{
		width: 100%;
		height: 670rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		border-radius: 24rpx 24rpx 0rpx 0rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
	.popupSelects .selArea{
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		background: #f9fafb;
		border-radius: 0rpx 0rpx 8rpx 8rpx;
	}
	.cancel{
		width: 60rpx;
		height: 42rpx;
		margin: 40rpx 0 38rpx 48rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #999999;
	}
	.confirm{
		width: 60rpx;
		height: 42rpx;
		margin: 40rpx 48rpx 38rpx 0;
		font-size: 30rpx;
		font-weight: 500;
		text-align: center;
		color: #00c2b8;
		line-height: 42rpx;
	}
	.options{
		width: 100%;
		height: 550rpx;
		overflow: auto;
		list-style: none;
	}
	.options li{
		width: 670rpx;
		height: 110rpx;
		margin: 0 40rpx;
		line-height: 110rpx;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
	}
	.options .active{
		border-top: 2rpx solid #e2e4ea;
		border-bottom: 2rpx solid #e2e4ea;
		color: #00c2b8;
	}
	.sceneContainer{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.sceneContainer>.header{
		width: 100%;
		height: 400rpx;
		/* background-color: pink; */
		background-repeat: no-repeat;
		background-image: url('http://dbj.dragonn.top/static/mp/dabanjia/images/home/bg%402x.png');
	}
	.sceneContainer>.footer{
		width: 100%;
		height: 136rpx;
		padding-bottom: 40rpx;
		background: #ffffff;
		display: flex;
		position: fixed;
		left: 0rpx;
		bottom: 0rpx; 
	}
	.houseInfo{
		width: 70%;
		padding-top: 56rpx;
	}
	.location{
		width: fit-content;
		max-width: 406rpx;
		height: 56rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 56rpx;
		margin-left: 32rpx;
	}
	.focus{
		margin-left: 32rpx;
		height: 34rpx;
		line-height: 34rpx;
		display: flex;
	}
	.focus view{
		width: 110rpx;
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #ffffff;
	}
	.focus .browse{
		margin-right: 32rpx;
	}
	.itself{
		width: 406rpx;
		height: 96rpx;
		margin-left: 32rpx;
		margin-top: 38rpx;
		border: 1rpx solid rgba(255,255,255,0.10);
		border-radius: 16rpx;
		display: flex;
	}
	.itself .line{
		width: 2rpx;
		height: 36rpx;
		margin: 30rpx 40rpx;
		background: rgba(255,255,255,0.10);
	}
	.type{
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	.type view{
		height: 34rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 34rpx;
	}
	.typeInner{
		/* width: fit-content; */
		width: 150rpx;
		margin-top: 14rpx;
	}
	.type .tag{
		width: 48rpx;
	}
	.area{
		margin-right: 58rpx;
	}
	.area view{
		height: 34rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 34rpx;
	}
	.area .tag{
		width: 48rpx;
	}
	.areaInner{
		/* width: fit-content; */
		width: 148rpx;
		margin-top: 14rpx;
	}
	
	.navBar{
		margin-top: -80rpx;
		width: 100%;
		height: 176rpx;
		background: #ffffff;
		border-radius: 40rpx;
		display: flex;
		justify-content: space-evenly;
	}
	.navBar>view{
		margin-top: 32rpx;
	}
	.navBar>view>view{
		margin-bottom: 30rpx;
		width: 96rpx;
		height: 34rpx;
		font-size: 24rpx;
		text-align: center;
		color: #333333;
		line-height: 34rpx;
	}
	.navBar image{
		width: 80rpx;
		height: 80rpx;
		display: block;
	}
	.process{
		width: 100%;
		height: 364rpx;
		margin-top: 24rpx;
		background: #ffffff;
		border-radius: 40rpx;
	}
	.process .title{
		width: 128rpx;
		height: 44rpx;
		padding-top: 32rpx;
		padding-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.content{
		width: 100%;
		height: 250rpx;
		margin-top: 40rpx;
		margin-bottom: 32rpx;
		display: flex;
	}
	.content>image{
		width: 40rpx;
		height: 72rpx;
		display: block;
		margin-top: 20rpx;
		margin-left: 32rpx;
	}
	.content .endWork{
		margin-left: 0;
		margin-right: 32rpx;
	}
	.content .mainWrap{
		width: 606rpx;
	}
	.workType{
		margin: 0 8rpx 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.workType>view{
		width: 44rpx;
		height: 32rpx;
		font-size: 22rpx;
		color: #333333;
		line-height: 32rpx;
	}
	.progressBar{
		display: flex;
		align-items: center;
	}
	.connectStartLine{
		width: 22rpx;
		height: 2rpx;
		background: #01C2C3;
	}
	.connectEndLine{
		width: 22rpx;
		height: 2rpx;
		background: #C2C2C2;
	}
	.steps{
		width: 562rpx;
		height: 16rpx;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	
	.dot{
	  width: 16rpx;
	  height: 16rpx;
	  border-radius: 50%;
	}
	.done{
	  background: #01C2C3 !important;
	}
	.doing{
		background: #ffffff;
		border: 2rpx solid #35c4c4;
	}
	.unpaid{
	  background: #ffffff;
	  border: 2rpx solid #c2c2c2;
	} 
	.connectLine{
	  width: 44rpx;
	  height: 2rpx;
		margin-top: 8rpx;
		margin-left: 16rpx;
	}
	.line-gray{
		background: #C2C2C2; 
	}
	.line-green{
	  background: #01C2C3;  
	}
	
	.column{
		height: 24rpx;
		margin: 0 29rpx;
		display: flex;
		justify-content: space-between;
	}
	.column>view{
		width: 1rpx;
		height: 24rpx;
		border-right: 1rpx dotted #c2c2c2;
	}
	.column>view:active{
		border-right: 1rpx dotted #01c2c3;
	}
	.worker{
		margin: 0 8rpx;
		display: flex;
		justify-content: space-between;
	}
	.worker>view{
		width: 40rpx;
		height: 128rpx;
		background: #f5f6f6;
		border-radius: 20rpx;
	
	}
	.worker>view>view{
		width: 20rpx;
		height: 72rpx;
		margin: 10rpx 10rpx 14rpx;
		font-size: 20rpx;
		color: #333333;
		line-height: 24rpx;
	}
	.worker .avatar{
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		display: block;
		margin: 2rpx 6rpx 0;
	}
	
	.dynamic{
		width: 100%;
		height: 1200rpx;
		overflow: auto;
		margin-top: 24rpx;
		margin-bottom: 80rpx;
		background: #ffffff;
		border-radius: 40rpx;
	}
	.dynamic .top{
		width: 100%;
		height: 78rpx;
		display: flex;
		justify-content: space-between;
	}
	.top .title{
		width: 128rpx;
		height: 44rpx;
		margin-top: 32rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.top .filter{
		width: 104rpx;
		height: 46rpx;
		margin-top: 32rpx;
		margin-right: 32rpx;
		background: #f5f6f6;
		border-radius: 22rpx;
		display: flex;
		align-items: center;
	}
	.top .filter .text{
		width: 48rpx;
		height: 34rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #333333;
	}
	.top .filter .icon{
		display: block;
		width: 14rpx;
		height: 8rpx;
		margin-left: 5rpx;
	}
	.list{
		width: 100%;
		height: 1200rpx;
		overflow: auto;
	}
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
		height: 120rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.acitonInfo .evidence{
		width: 100%;
		height: 394rpx;
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
	.acitonInfo .footer .comments image{
		width: 24rpx;
		height: 24rpx;
		display: block;
		margin-right: 8rpx;
	}
	.sceneContainer .footer .consult{
		width: 88rpx;
		height: 76rpx;
		margin: 36rpx 40rpx 24rpx 32rpx;
	}
	.consult image,.userWant image{
		width: 40rpx;
		height: 40rpx;
		display: block;
		margin-left: 24rpx;
		margin-bottom: 4rpx;
	}
	.consult view,.userWant view{
		width: 88rpx;
		height: 32rpx;
		font-size: 22rpx;
		text-align: center;
		color: #999999;
		line-height: 32rpx;
	}
	.sceneContainer .footer .userWant{
		width: 88rpx;
		height: 76rpx;
		margin-top: 36rpx;
	}
	.sceneContainer .footer .focusOn{
		width: 422rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin: 24rpx 32rpx 24rpx 48rpx;
	}
	.focusOn .add{
		width: 18rpx;
		height: 18rpx;
		display: block;
		margin-left: 166rpx;
		margin-right: 8rpx;
	}
	.focusOn view{
		width: 96rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #ffffff;
		line-height: 32rpx;
	}
</style>
