<template>
	<view class="container" :style="{paddingBottom:dataList.length > 0 ? systemBottom : 0,backgroundColor:dataList.length>0 ? '#ffffff':''}" >
		<view v-if="dataList.length>0 ">
			<view class="order-container" v-for="(item,index) in dataList" :key="index" >
				<!-- 服务和材料 -->
				<view class="header" >
					<view class="store-name" @click="gotoShop(item)">
						<text style="color: #333333;">{{item.ongoingServerName?item.ongoingServerName:item.storeName}}</text>
						<image v-if="item.type !== 5" src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/small_gotoShop.svg" mode="" />
					</view>
					<view class="order-status">
						<text>{{statusFunction(item)}}</text>
						<!-- <text> {{item.type==0?"仅退款(未发货)":item.type==1 ? "仅退款(退库存)":item.type==2 ? "仅退款(已收货)":item.type==3?"服务退款":item.type==5?"储值卡退款":""}}</text>				 -->
					</view>
				</view>
				<view class="body" @click="goToDetail(item)">
					<view class="body-main" v-for="(item2,index2) in item.detailAppVOS" :key="index2">
						<view class="pic">
							<image :src="`${item2.imgUrl}?x-oss-process=image/resize,m_mfit,w_68,h_68`" mode="	scaleToFill"></image>
						</view>
						<view class="basic-info">
							<view class="name-attr">
								<view class="text" v-if="item2.type !== 5">
									<text class="icon">{{item2.type ==1 ?"物品" :"服务"}}</text>
									<text class="name">{{item2.fullName}}</text>
								</view>
								<view class="text" v-else>
									<text class="name">{{item2.fullName}}</text>
								</view>
								<view class="attr">
									<text v-if="item2.type == 5">共1件</text>
									<text v-else>{{item2.scaleProperties}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="line"></view> -->
				</view>
				<view class="refund-price">
					<text style="margin-right:8rpx;">退款金额</text>
					<text class="product-price">
						<text style="font-size:22rpx;">￥</text>
						<text class="price-font">
							<text>{{handlePrice(item.refundAmount)[0]}}.</text>
							<text style="font-size:22rpx;">{{handlePrice(item.refundAmount)[1]}}</text>
						</text>
					</text>
				</view>


				<view class="refund-status refundInProgress" v-if="item.status == 0 || item.status == 1 ">
					<text style="margin-right: 16rpx;">退款中</text>
					<text>
						<text style="font-size:26rpx;">￥</text>
						<text class="price-font">
							<text style="font-size:40rpx;">{{handlePrice(item.refundAmount)[0]}}.</text>
							<text style="font-size:26rpx;">{{handlePrice(item.refundAmount)[1]}}</text>
						</text>
					</text>
				</view>

				<view class="refund-status refund-success" v-if="item.status == 2">
					<text  style="margin-right: 16rpx;">退款成功</text>
					<text>
						<text style="font-size:26rpx;">￥</text>
						<text class="price-font">
							<text style="font-size:40rpx;">{{handlePrice(item.refundAmount)[0]}}.</text>
							<text style="font-size:26rpx;">{{handlePrice(item.refundAmount)[1]}}</text>
						</text>
					</text>
				</view>

				<view class="refund-status refund-close" v-if="item.status == 3 || item.status == 4">
					<text style="margin-right: 16rpx;">退款关闭</text>
					<text  style="color: #333333; font-weight: 500">退款已关闭</text>
				</view>

				<view class="refund-status refund-fail" v-if="item.status == 5">
					<text style="margin-right: 16rpx;">退款失败</text>
					<text  style="font-weight: 500">退款账户异常</text>
				</view>

				<view class="footer">
					<view class="button-container">
						<view class="reapply" v-if="item.reapplyed" @click="reApply(item)">
							重新申请
						</view>
						<view v-if="item.cancelRefunded" class="cancel-apply"  @click="open(item)">
							取消申请
						</view>
						<view class="view-detail" style="margin-left: 24rpx;" @click="goToDetail(item)">
							查看详情
						</view>

						</view>
				</view>
			</view>
		</view>

		<view class="empty-container" v-if="dataList.length==0 && !loading">
			<view class="line" />
			<view class="show">
				<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/my/img_noOrder.svg" mode=""></image>
				<text>您还没有退款记录</text>
			</view>
		</view>

		<popup-dialog  ref="popup"  :title="title" @close="close" @confirm="confirm"></popup-dialog>
		<!-- <uni-popup ref="cannotRefund"  type="dialog">
			<uni-popup-dialog
				mode="base"
				:title="title"
				:before-close="true"
				@close="close"
				@confirm="confirm"
			></uni-popup-dialog>
		</uni-popup> -->
	</view>


</template>

<script>
	import {getRefundList,cancelRefund} from "@/api/order.js"
	export default {
		data() {
			return {
				query:{
					lastId:-1,
					rows:15,
				},
				loading:false,
				dataList:[],
				dataListLength:"",
				itemId:"",
				systemBottom:"",
				title:"确定要取消本次退款申请？",
				areaId:'',
			}
		},
		onLoad() {
			const currentHouse = getApp().globalData.currentHouse;
			this.areaId = currentHouse.areaId;
		},
		onShow() {
			this.query.lastId =-1
			this.dataList = []
		  this.getList();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.query.lastId =-1
			this.dataList = []
			this.getList();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 1000);
		},

	 //页面上拉触底事件的处理函数
		onReachBottom(e) {
			console.log("底部")// 滚动到页面执行该方法
			console.log("this.query.lastId",this.query.lastId,"this.dataListLength=",this.dataListLength)
			if(this.query.lastId > 0 && this.dataListLength == 0) return
			this.getList();

		},

		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom + "rpx";
		},
		methods: {
			getList(){
				console.log("获取退款列表数据")
				let params=this.query
				this.loading = true
				getRefundList(params).then(data=>{
					this.loading = false
					let refundList=data;
					this.dataListLength=refundList.length
					if(refundList.length >= 1){
						this.query.lastId = refundList[refundList.length-1].id
					}
					console.log("this.lastId=",this.query.lastId,)
					this.dataList =this.dataList.concat(refundList)
				})
			},
			statusFunction(item){
				switch(item.type){
					case 0:
						return "仅退款(未发货)"
					case 1:
						return "仅退款(退库存)"
					case 2:
						return "仅退款(已收货)"
					case 3:
						return "服务退款"
					case 5:
						return "储值卡退款"
					case 6:
						return "服务退款"
					default:
						return ""
				}
			},

			handlePrice(price){
				if(!price) return ['0','00']
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
			//去店铺
			gotoShop(item){
				console.log("去店铺",item.storeId,item.type,"this.areaId=",this.areaId)
				// type 5: 储值卡 没有页面跳转功能
				if(item.type == 5) return
				uni.navigateTo({
					url:`../../../sub-classify/pages/shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`
				})
			},

			goToDetail(data){
				console.log("去详情页面","data",data.status,data.type)
				// if(data.type == 5) return
				// data.id是退款单id
				if(data.status == 0 || data.status == 1 ){
					uni.navigateTo({
						url:`refunding-detail/refunding-detail?id=${data.id}`
					})
				}else if(data.status == 2){
					console.log("data.id==============",data.id)
					uni.navigateTo({
						url:`refunding-detail/refunding-detail?id=${data.id}`
						// url:`../my-order/order-success/order-success?type=refund&id=${data.id}`
					})
				}else{
					uni.navigateTo({
						url:`refunding-detail/refunding-detail?id=${data.id}`
						// url:`../my-order/order-failed/order-failed?type=refund&id=${data.id}&status=${data.status}&showReApply=true`
					})
				}
			},
			// 重新申请
			reApply(item){
				console.log("item.===",item)
			  if (item.isWarehoused) {
			    // 有仓库跳转到成龙的页面
			    getApp().globalData.naviData = item;
			    let type = 0;
			    if (item.isReturnInventory) {
			      type = 1;
			    }
			    uni.redirectTo({
			      url: `/sub-decorate/pages/warehouse-refund/warehouse-refund?refundType=${item.type}&id=${item.id}&type=${type}`,
			    });
			  } else {
			    wx.setStorageSync("wholeRefundOrderInfo", JSON.stringify(item));
			    uni.redirectTo({
			      url: `/sub-my/pages/apply-for-refund/apply-for-refund?refundId=${item.id}`,
			    });
			  }
			},

			open(data) {
				this.refundItem  =data
				this.itemId = data.id
				// this.refundItem.approvalCompleted  = true
				// approvalCompleted 是否审核完成 true不可退 false可退
				console.log("approvalCompleted===",this.refundItem.approvalCompleted)
				if(this.refundItem.approvalCompleted){
					this.title="退款审核已通过，不可取消"
					// this.$refs.cannotRefund.open()
				}else{
					this.title="确定要取消本次退款申请？"
				}
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm(value) {
				// 调用申请退款的接口
				// 成功就关闭弹框
				if(this.refundItem.approvalCompleted){
					this.title="退款审核已通过，不可取消"
					console.log("this.itemId=",this.itemId,"退款审核已通过,不可取消")
					this.$refs.popup.close()
				}else{
					this.title="确定要取消本次退款申请？"
					cancelRefund({id:this.itemId}).then(()=>{
						this.$refs.popup.close()
						this.dataList=[]
						this.query.lastId = -1
						this.getList()
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100%;
		.order-container{
			background-color: #FFFFFF;
			border-radius: 40rpx;
		}
	}

	.header {
		// height: 96rpx;
		margin-top: 16rpx;
		padding: 28rpx 32rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			text {
				font-weight: 500;
				max-width: 476rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			image {
				width: 34rpx;
				height: 34rpx;
				object-fit: cover;
			}
		}
		.order-status {
			color: #808080;
			font-size: 24rpx;
			line-height: 32rpx;
			// font-weight: 800;
		}
	}

	.body{
		padding: 32rpx 32rpx 0;
		background-color: #FFFFFF;
		.body-main {
			box-sizing: border-box;
			display: flex;
			flex: 1;
			padding-bottom:24rpx;
			flex-flow: row nowrap;
			.pic{
				margin-right: 16rpx;
				image{
					display: block;
					width: 136rpx;
					height: 136rpx;
					border-radius: 8rpx;
					box-sizing: border-box;
					border: 2rpx solid #F4F4F4;
				}
			}
			.basic-info{
				display: flex;
				flex: 1;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				.name-attr{
					// margin-right: 24rpx ;
					.text{
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-wrap: break-word;
						word-break: break-all;
						white-space: normal !important;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: 26rpx;
						line-height: 36 rpx;
						.icon{
							width: 60rpx;
							height: 30rpx;
							margin-right: 8rpx;
							line-height: 30rpx;
							border-radius: 4rpx;
							color: #212121;
							font-weight: 500;
							background: linear-gradient(90deg, #BDD9E5 0%, #CDEFCE 94.34%);
							font-size: 20rpx;
							text-align: center;
							display: inline-block;
						}
						.name{
							font-size: 26rpx;
							color: #333333;
							line-height: 32rpx;
						}
					}
					.attr{
						margin-top: 16rpx;
						font-size: 22rpx;
						color: #999999;
					}

				}
			}
		}
	}
	.refund-price{
		padding: 0 32rpx 26rpx;
		// height: 78rpx;
		box-sizing: border-box;
		text-align: right;
		color: #999999;
		line-height: 26rpx;
		font-size: 22rpx;
		.product-price {
			color: #333333;
			height: 32rpx;
			font-size: 32rpx;
			margin-bottom: 8rpx;
		}
	}
	//退款中
	.refundInProgress{
		background: #FCF9F5;
		border: 1rpx solid #F5D9BC;
		color: #FC8B19;
		padding:0 32rpx ;
		line-height: 32rpx;
	}
	// 退款成功
	.refund-success{
		background: #F5FCF9;
		border: 1rpx solid #BCF5D9;
		color: #0EC270;
		padding:0 32rpx ;
		line-height: 32rpx;
	}
	// 退款关闭
	.refund-close{
		background: #FAFBFC;
		color: #808080;
		border: 1rpx solid #EEEEEE;
		padding: 0 24rpx;
		line-height: 40rpx;
	}
	// 退款失败
	.refund-fail{
		background: #FEF7F8;
		color: #FF3347;
		border: 1rpx solid #FFD4D8;
		padding: 0 24rpx ;
		line-height: 40rpx;
	}

	.refund-status{
		width: 686rpx;
		height: 80rpx;
		line-height: 78rpx;
		box-sizing: border-box;
		margin: 0 32rpx;
		border-radius: 16rpx;
		.price{
			font-size: 32rpx;
		}
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content:  flex-end;
		padding:32rpx;
		border-radius: 40rpx;
		background-color: #ffffff;

		.button-container{
			display: flex;
			flex-flow: row nowrap;
			justify-content:  flex-end;
			z-index: 99;
			.reapply,.cancel-apply,.view-detail{
				width: 140rpx;
				height: 56rpx;
				text-align: center;
				line-height: 54rpx;
				box-sizing: border-box;
				border: 1rpx solid #CCCCCC;
				color: #111111;
				border-radius: 32rpx;
				font-size: 24rpx;
			}
			button{
				width: 140rpx;
				height: 56rpx;
				box-sizing: border-box;
				line-height: 52rpx;
				text-align: center;
				font-size: 24rpx;
				display: block;
				border-radius: 32rpx;
				border: 2rpx solid #CCCCCC;
				color: #111;
				padding: 0;
			}
		}
	}

	.empty-container{
		height: 100%;
		background-color: #FFFFFF;
		.line{
			height: 1rpx;
			background-color: #f4f4f4;
		}
		.show{
			padding-top: 50%;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			image{
				width: 248rpx;
				height: 248rpx;
				object-fit: cover;
				margin-bottom: 22rpx;
			}
			text{
				height:26rpx;
				line-height: 26rpx;
				font-size: 26rpx;
				color: #999999;
			}

		}
	}

	// 弹框样式
	::v-deep .uni-popup-dialog{
		width: 560rpx !important;
		border-radius: 24rpx !important;
		background-color: #fff !important;
	}
	::v-deep .uni-dialog-title-text{
	 color: #111111 !important;
	 font-size: 32rpx !important;
	 font-weight: 550 !important;
	}
	::v-deep .uni-dialog-title{
		padding: 48rpx 0 !important;

	}
	::v-deep .uni-dialog-content {
		display:  none !important;
	}
	::v-deep .uni-dialog-button-group{
		border-top:2rpx solid #F5F5F5;
	}
	::v-deep .uni-dialog-button{
		height: 82rpx !important;
	}
	::v-deep .uni-button-color{
		color:#FF3347  !important;
		font-size: 30rpx !important;
		font-weight: 500;
	}
	::v-deep .uni-dialog-button-text{
		font-size: 30rpx !important;
	}

</style>
