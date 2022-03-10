<template>
	<view class="container">
		<view class="peer-evaluate-page">
			<view class="evaluate-head-bac">
				<view class="evaluate-head">共获得{{showCommentCount}}次同行的评价</view>
			</view>
			<view class="evaluate-list">
				<view class="evaluate-item"
				v-for="(item,index) in commentsList"
				:key="index"
				:style="{borderBottom:index==commentsList.length-1?'1rpx solid #F4F4F4;':''}"
				>

					<view class="evaluate-person-info">
						<image :src="item.avatar"  @click="gotoPersonalPage(item.userId)"/>
						<view class="right">
							<text class="name">{{item.userName}}</text>
							<view class="design-tag-info">
								<text class="design-leve">{{item.roleName}}</text>
								<view class="design-tag" v-if="item.valueRank>=1" 
									:style="{backgroundImage:`url(${handleLabelImg(item.appChartRelations[0]).bgImg})`}"
								>
									<view class="topNum top-font"
										:style="{color:`#${item.appChartRelations[0].fontColor}`,background:handleLabelImg(item.appChartRelations[0]).bgcolor}"
									>TOP.{{item.appChartRelations[0].realNumber}}</view>
									<view class="tagText"
										:style="{color:`#${item.appChartRelations[0].fontColor}`}"
									>{{item.appChartRelations[0].abbreviation}}</view >
								</view>
							</view>
						</view>
					</view>
					<view class="evaluate-tag" v-if="item.commentTags.length">
						<view v-for="tageItem in item.commentTags" :key="tageItem" @click="gotoDesignerRankListPage">{{tageItem}}</view>
					</view>
					<view class="evaluate-content">
						<text>{{item.content}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import {getPeerCommentsList} from "../../../api/decorate.js"
	export default {
		data() {
			return {
				personId: 0,
				showCommentCount:"",
				peerCommentsList:[],
				commentsList:[],
				pageInfo: {
					page: 1,
					totalPage: 0,
					totalRow: 0,
				},
				totalNum: 0,
				loading:false,
				labelList:[
					{
						bgcolor:"linear-gradient(180deg, #EAE3D1 0%, #DED5BF 100%)",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank1.png",
					},
					{
						bgcolor:"linear-gradient(180deg, #FAD7CD 0%, #E8C2B5 100%)",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank2.png",
					},
					{
						bgcolor:"linear-gradient(180deg, #B9E6F3 0%, #9FD3E3 100%)",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank3.png",
					},
					{
						bgcolor:"linear-gradient(180deg, #FFEBCC 0%, #FFE5B7 100%)",
						bgImg:"https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/home/labelRank999.png",
					}
				],
			}
		},
		onLoad(e) {
			this.personId = e.id
		},
		onShow() {
			this.getComments()
		},


		onReachBottom() {
			if (this.pageInfo.totalPage > this.pageInfo.page) {
				this.pageInfo.page++
				this.getComments()
			}
		},

		methods: {
			getComments() {
				let params = {
					userId: this.personId,
					showFlag:true,
					page: this.pageInfo.page,
					rows: 10,
				}
				this.loading = true
				getPeerCommentsList(params).then(res => {
					console.log("res=====",res)
					this.loading = false
					this.pageInfo.totalPage = res.totalPage
					this.pageInfo.page++
					this.peerCommentsList = res.list
					this.peerCommentsList  = this.peerCommentsList.map(item=>{
						item.commentTags = item.commentTags.split(",")
						return item
					})
					if(this.peerCommentsList.length){
						this.commentsList  =this.commentsList.concat(this.peerCommentsList)
						console.log("commentsList===",this.commentsList)
					}

					this.showCommentCount = res.aggregations.showCommentCount
				})
			},
		//页面上拉触底事件的处理函数
			onReachBottom(e) {
				console.log("底部")// 滚动到页面执行该方法
				console.log("this.pageInfo.page====",this.pageInfo.page)
				console.log("this.pageInfo.totalPage",this.pageInfo.totalPage)
				if( this.loading || this.pageInfo.page > this.pageInfo.totalPage) return
				this.getComments()
			},

			gotoPersonalPage(id){
				console.log("去设计师主页")
				uni.navigateTo({
					url:`./person-page?personId=${id}`
				})
			},
			gotoDesignerRankListPage(){
				console.log("去设计师榜单页面")
				uni.navigateTo({
					url:"../../../sub-home/pages/find-design/designer-rank-list"
				})
			},
			//处理标签图片展示问题
			handleLabelImg(rankItem){
				switch(rankItem.styleCode){
					case 1:
						return this.labelList[0];
					case 2:
						return  this.labelList[1];
					case 3:
						return  this.labelList[2];
					case 9999:
						return  this.labelList[3];
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #FFFFFF;
		height: 100%;
	}
	.peer-evaluate-page {
		background-color: #fff;
		padding: 32rpx 32rpx 40rpx;

		.evaluate-head-bac {
			position: fixed;
			top: 0;
			width: calc(100% - 64rpx);
			background-color: #FFFFFF;
			padding: 32rpx 0;

			.evaluate-head {
				padding-left: 32rpx;
				height: 88rpx;
				line-height: 88rpx;
				color: #222222;
				font-size: 32rpx;
				font-weight: bold;
				box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, 0.05);
				border-radius: 12rpx;
				border: 1rpx solid #E5E5E5;
				background-color: #fff;
				letter-spacing: 2rpx;
			}
		}

		.evaluate-list {
			padding-top: 112rpx;
			background-color: #FFFFFF;
			.evaluate-item {
				margin-top: 24rpx;
				padding-bottom: 32rpx;
				border-bottom: 1rpx solid #F4F4F4;

				.evaluate-person-info {
					display: flex;
					align-items: center;
					height: 84rpx;

					image {
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}

					.right {
						display: flex;
						flex-direction: column;
						margin-left: 24rpx;

						.name {
							font-family: PingFang SC;
							font-style: normal;
							font-weight: normal;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #666666;
						}
						.design-tag-info {
							margin-top: 6rpx;
							display: flex;
							.design-leve {
								height: 30rpx;
								line-height: 30rpx;
								box-sizing: border-box;
								font-size: 20rpx;
								color: #4FBEED;
								background: rgba(79, 190, 237, 0.06);
								border-radius: 4rpx;
								padding: 0 8rpx 2rpx;
							}
						}
					}
				}
				.evaluate-tag {
					margin-top: 26rpx;
					display: flex;
					align-items: center;
					flex-flow: row wrap;
					flex: 1;
					view {
						height: 34rpx;
						line-height: 33rpx;
						padding: 0 12rpx;
						background: #F3F3F3;
						border-radius: 6rpx;
						border: 0.6rpx solid #CCCCCC;
						font-family: PingFang SC;
						font-style: normal;
						font-weight: normal;
						font-size: 22rpx;
						color: #333333;
						margin:0 12rpx 12rpx 0 ;
					}
				}
				.evaluate-content {
					margin-top: 4rpx;
					font-family: PingFang SC;
					font-size: 28rpx;
					line-height: 44rpx;
					letter-spacing: 0.2rpx;
					color: #333333;
				}
			}
		}
		.design-tag {
			margin-left: 12rpx;
			display: flex;
			align-items: center;
			flex-flow: row nowrap;
			background-size: 182rpx 30rpx;
			background-position: right center;
			.topNum {
			 padding: 0 16rpx 0 10rpx;
			 height: 30rpx;
			 line-height: 30rpx;
			 text-align: center;
			 font-weight: 500;
			 font-size: 20rpx;
			 border-radius: 4rpx 0 14rpx 4rpx;
			}
			.tagText {
			 width: 98rpx;
			 height: 30rpx;
			 line-height: 30rpx;
			 text-align: center;
			 font-weight: 500;
			 font-size: 20rpx;
			}
		}
	}
</style>
