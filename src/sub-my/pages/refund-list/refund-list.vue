<template>
	<view class="container">
		<view class="order-container" v-for="(item,index) in dataList" :key="index" >
		  <view class="header">
		    <view class="store-name">
		      <text>{{item.storeName}}</text>
		      <image
		        src="../../../static/order/ic_more@2x.png"
		        mode=""
		      ></image>
		    </view>
		    <view class="order-status">
					<text> {{item.type==0?"仅退款(未发货)":item.type==1 ? "仅退款(退库存)":item.type==2 ? "仅退款(已收货)":item.type==3?"服务退款":""}}</text>
				
		    </view>
		  </view>
			
			<view class="body" @click="goToDetail(item)">
				<view class="body-main" v-for="(item2,index2) in item.detailAppVOS" :key="index2">
					<view class="pic">
						<image :src="item2.imgUrl" mode="	scaleToFill"></image>
					</view>
					<view class="basic-info">
						<view class="name-attr">
							<view class="text">
								<text class="icon">{{item2.type ==1 ?"物品" :"服务"}}</text>
								<text class="name">{{item2.fullName}}</text>					
							</view>
							<view class="attr">
								<text>{{item2.scaleProperties}}</text>
								<!-- <text style="margin-right: 24rpx;">白色</text>
								<text>2.0m/{{item2.unit}}</text> -->
							</view>
							<view class="refund-price">
								<text style="margin-right:8rpx ;">退款金额</text>
								<text class="product-price">
									<text style="font-size:22rpx;">￥</text>
									<text>{{handlePrice(item.refundAmount)[0]}}.</text>
									<text style="font-size:22rpx;">{{handlePrice(item.refundAmount)[1]}}</text>
								</text>
							</view>
						</view>
						<!-- <view class="common-price">
							<view style="color: #999999;">共1件</view>
						</view>	 -->
					</view>
				</view>		
			</view>
			
			<view class="refund-status" :class="{refundInProgress:item.status == 0 || item.status == 1 ,'refund-success':item.status == 2,'refund-close':item.status == 3 || item.status == 4}">
				<text v-if="item.status == 0 || item.status == 1" style="margin-right: 16rpx;">退款中</text>
				<text v-if="item.status == 2" style="margin-right: 16rpx;">退款成功</text>
				<text v-if="item.status == 0 || item.status == 1 || item.status == 2">
					<text style="font-size:26rpx;">￥</text>
					<text style="font-size:40rpx;">{{handlePrice(item.refundAmount)[0]}}.</text>
					<text style="font-size:26rpx;">{{handlePrice(item.refundAmount)[1]}}</text>
				</text>
				<text v-if="item.status == 3 || item.status == 4" style="margin-right: 16rpx;">退款关闭</text>
				<text v-if="item.status == 3 || item.status == 4" style="color: #333333; font-weight: 1000">退款已关闭</text>
			</view>
		  
			<view class="footer">
					<view class="button-container">
						<button
							v-if="item.type == 0"
								type="default"
								size="mini"
								@click="open(item)"
							>取消申请</button>
							<button
								type="default"
								size="mini"
								style="margin-left: 24rpx;"
								@click="goToDetail(item)"
							>查看详情</button>
						</view>
		  </view>
		</view>
		
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog
					mode="base"
					message="成功消息"
					title="确定要取消本次退款申请？"
					:before-close="true" 
					@close="close" 
					@confirm="confirm">
				</uni-popup-dialog>
		</uni-popup>
	
		
		
		
	</view>
</template>

<script>
	import {getRefundList,cancelRefund} from "@/api/order.js"
	export default {
		data() {
			return {
				query:{
					// lastId:-1,
					rows:15,
				},
				dataList:[],
				itemId:"",
			}
		},
		onShow() {
		  this.getList();
		},
		
		methods: {
			handlePrice(price){
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
			orderStatus(){
				console.log("打印数据")
			},
			goToDetail(data){
				console.log("去详情页面","data",data.status)
				if(data.status == 0 || data.status == 1 ){
					uni.navigateTo({
						url:`../my-order/order-in-progress/order-in-progress?type=refund&orderNo=${data.id}`
					})
				}else if(data.statis == 2){
					uni.navigateTo({
						url:`../my-order/order-success/order-success?type=refund$id=${data.id}`
					})
				}else{
					uni.navigateTo({
						url:`../my-order/order-failed/order-failed?type=refund&id=${data.id}&status=${data.status}`
					})
				}
			},
			getList(){
				console.log("获取退款列表数据")
				let params=this.query
				getRefundList(params).then(data=>{
					this.dataList=data;
					console.log(data,"Data")
				})
			},
			
			
			open(data) {
				this.refundItem  =data
				this.itemId = data.id 
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},				
			confirm(value) {
				// 调用申请退款的接口
				// 成功就关闭弹框
				cancelRefund({id:this.itemId}).then(e=>{
					if(e.code==1){
					this.$refs.popup.close()
					uni.showToast({
					    title: '申请退款成功',
					    duration: 2000
					});
					setTimeout(()=>{
					  this.goToDetail(this.refundItem)
					}, 1000);
					
					}
				})
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: skyblue;
		.order-container{
			background-color: #FFFFFF;
		}
	}

	.header {
		height: 96rpx;
		margin-top: 16rpx;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			text {
				font-weight: 1000;
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
			padding-bottom:32rpx;
			flex-flow: row nowrap;
			.pic{
				margin-right: 16rpx;
				image{
					width: 136rpx;
					height: 136rpx;
					background-color: skyblue;
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
							border: 2rpx solid #35c4c4;
							color: #35c4c4;
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
					.refund-price{
						color: #999999;
						line-height: 26rpx;
						font-size: 22rpx;
						margin-top: 16rpx ;
						.product-price {
							color: #333333;
							height: 32rpx;
							font-size: 32rpx;
							margin-bottom: 8rpx;
						}
					}
				}
			}
		}
	}
	
	.refundInProgress{
		background: #FCF9F5;
		border: 2rpx solid #F5D9BC;
		color: #FC8B19;
		padding:16rpx 32rpx ;
		line-height: 32rpx;
	}
	.refund-success{
		background: #F5FCF9;
		border: 2rpx solid #BCF5D9;
		color: #0EC270;
		padding:16rpx 32rpx ;
		line-height: 32rpx;
	}
	.refund-close{
		background: #F7F7F7;
		color: #808080;
		padding: 20rpx 24rpx;
		line-height: 40rpx;
	}
	
	.refund-status{
		width: 686rpx;
		height: 80rpx;
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
		padding: 24rpx 32rpx;
		// text-align: right;
		background-color: #ffffff;
		
		.button-container{
			display: flex;
			flex-flow: row nowrap;
			justify-content:  flex-end;
			z-index: 99;
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

	button{
		display: none;
	}
	button::after {
	  border: none;
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
