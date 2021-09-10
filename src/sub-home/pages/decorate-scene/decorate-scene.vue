<template>
	<view class="sceneContainer">
		<view class="header">
			<view class="houseInfo">
				<view class="location">金茂府1栋2单元106</view>
				<view class="focus">
					<view class="browse">浏览 1300</view>
					<view class="attention">关注 120</view>
				</view>
				<view class="itself">
					<view class="type">
						<view class="typeInner">5室3厅3卫</view>
						<view class="tag">户型</view>
					</view>
					<view class="line"></view>
					<view class="area">
						<view class="areaInner">368平米</view>
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
						<view>设计</view>
						<view>设计</view>
						<view>设计</view>
					</view>
					<view class="progressBar">
						<view class="connectStartLine"></view>
						<view class="tl-steps">
							<view class="tl-dot tl-green"></view>
							<view class="tl-line" :class="lineShow ? 'tl-line-green' : ''"></view>
							<view class="tl-dot tl-gray" :class="lineShow ? 'tl-green' : ''"></view>
							<view class="tl-line" :class="show3 ? 'tl-line-green' : ''"></view>
							<view class="tl-dot tl-gray" :class="show3 ? 'tl-green' : ''"></view>
						</view>
						<view class="connectEndLine"></view>
					</view>
					<view class="column">
						<view></view>
						<view></view>
						<view></view>
					</view>
					<view class="worker">
						<view>
							<image class="avatar" src="../../static/avatar@2x.png"></image>
							<view>张三</view>
						</view>
						<view>
							<image class="avatar" src="../../static/avatar@2x.png"></image>
							<view>张三</view>
						</view>
						<view>
							<image class="avatar" src="../../static/avatar@2x.png"></image>
							<view>张三</view>
						</view>
					</view>
				</view>
				<image class="endWork" src="../../static/end_work@2x.png"></image>
			</view>
		</view>
		<view class="dynamic">
			<view class="top">
				<view class="title">装修动态</view>
				<view class="filter" @click="showWorkType=true">
					<view class="text">筛选</view>
					<view class="icon"></view>
					<!-- <image  src="../../static/ic_arraw_down@2x.png"></image> -->
				</view>
			</view>
			<view class="list">
				<view class="item">
					<image class="avatar" src="../../static/avatar@2x(1).png"></image>
					<view class="acitonInfo">
						<view class="header">
							<view>
								<view class="workerName">姜文</view>
								<view class="role">管家</view>
							</view>
							<view class="date">2021-06-12</view>
						</view>
						<view class="report">尊敬的业主，您好！打扮家管家-姜文为您新家质量保驾护航，今日巡查房屋情况如下：今天停工</view>
						<view class="evidence"></view>
						<view class="footer">
							<view class="actionType">开工签到</view>
							<view class="right">
								<view class="like">
									<image @click="likeClick" src="../../static/ic_like@2x.png"></image>
									<view class="text">56</view>
								</view>
								<view class="comments">
									<image @click="showComments=true" src="../../static/ic_comments@2x.png"></image>
									<view class="text">56</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="consult">
				<image src="../../static/consult@2x.png" mode=""></image>
				<view>咨询客服</view>
			</view>
			<view class="userWant">
				<image src="../../static/decorate@2x.png" mode=""></image>
				<view>我要装修</view>
			</view>
			<view class="focusOn">
				<image class="add" src="../../static/ic_add_focus@2x.png"></image>
				<view>关注</view>
			</view>
		</view>
		<view class="mask" v-if="showWorkType">
			<view class="popupSelects">
				<view class="selArea">
					<view class="cancel" @click="showWorkType=false">取消</view>
					<view class="confirm">确定</view>
				</view>
				<ul class="options">
					<li @click="isSelected=true" :class="{'active':isSelected}">全部</li>
					<li>管家</li>
					<li>管家</li>
					<li>管家</li>
					<li>管家</li>
					<li>管家</li>
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
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				showWorkType: false,
				showComments: false,
				isSelected: false,
			}
		},
		methods:{
			toVideoSite(){
				uni.navigateTo({
					url:"./video-site"
				})
			},
			toConstruction(){
				uni.navigateTo({
					url:"./construction-drawings"
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
		margin-top: 60rpx;
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
		width: 406rpx;
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
		margin-left: 58rpx;
	}
	.type view{
		height: 34rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 34rpx;
	}
	.typeInner{
		width: 116rpx;
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
		width: 92rpx;
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
	.workType{
		margin: 0 8rpx 16rpx;
		width: 500rpx;
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
	.tl-steps{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}          
	
	.tl-dot{
	  width: 16rpx;
	  height: 16rpx;
	  border-radius: 50%;  
	}
	.tl-line{
	  width: 250rpx;
	  height: 2rpx;
	  background: #C2C2C2;  
	}
	.tl-line-green{
	  width: 250rpx;
	  height: 2rpx;
	  background: #01C2C3;  
	}
	.tl-green{
	  background: #01C2C3 !important;
	}
	.tl-gray{
	  background: #DCDCDC;;
	}    
	.column{
		width: 500rpx;
		height: 24rpx;
		margin-left: 29rpx;
		display: flex;
		justify-content: space-between;
	}
	.column>view{
		width: 2rpx;
		height: 24rpx;
		background: #01c2c3;
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
		display: block;
		margin: 2rpx 6rpx 0;
	}
	
	.dynamic{
		width: 100%;
		height: 1000rpx;
		margin-top: 24rpx;
		overflow: auto;
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
		width: 14rpx;
		height: 8rpx;
		margin-left: 5rpx;
		background-color: #999999;
		background: url(../../static/ic_arraw_down@2x.png) no-repeat;
	}
	.list{
		width: 100%;
	}
	.item{
		width: 100%;
		display: flex;
	}
	.item .avatar{
		width: 74rpx;
		height: 74rpx;
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
		height: 192rpx;
		margin: 16rpx 0 26rpx;
		background: #3366FF;
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
		width: 60rpx;
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
		width: 104rpx;
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
		width: 64rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 32rpx;
	}
</style>
