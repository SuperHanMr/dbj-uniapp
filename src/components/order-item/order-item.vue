<template>
	<view  class="container">
		
		<view
			class="body-main" 
			:style="{paddingBottom:paddingBottom +'rpx'}" 
			@click="handleDetail()" >
			<!-- 标签 -->
			<view class="pic" >
				<!-- 当该商品处于待发货标签时，则对应退款、退款关闭、退款失败状态 -->
				<view class="icon-status1" v-if="orderStatus == 2 && (dataList.shipmentStatus == 0 || dataList.refundStatus == 2 || dataList.refundStatus == 3)">
					待发货
				</view> 
				<!-- 当该商品正在退款中显示退款中标签，则对应取消退款状态 -->
				<view class="icon-status1" v-if="orderStatus==2 && dataList.refundBillStatus == 1">
					退款中
				</view>
				<!--  当该商品处于已退款状态时，则对应退款成功状态 -->
				<view class="icon-status2" v-if="orderStatus==2 && dataList.refundBillStatus == 2" >
					已退款
				</view>
				<image :src="dataList.imgUrl" mode=""></image>
			</view>
			<view class="basic-info">
				<view class="name-attr">
					<view class="text">
						<text class="icon">{{dataList.type == 2?'服务':'物品'}}</text>
						<text class="name">{{dataList.fullName}}</text>					
					</view>
					<view class="attr">
						<text style="margin-right: 24rpx;">{{dataList.salesProperties}}</text>
						<text >{{handlePrice(dataList.price)[0]}}.{{handlePrice(dataList.price)[1]}} {{ dataList.unit ? `/${dataList.unit}` :''}}</text>
					</view>						
				</view>
				
				<view class="common-price">
					<!-- 商品价格 -->
					<view class="product-price" v-if="showPrice">
						<text style="font-size:22rpx;">￥</text>
						<text>{{handlePrice(dataList.price)[0]}}.</text>
						<text style="font-size:22rpx;">{{handlePrice(dataList.price)[1]}}</text>
					</view>
					<!-- 实付 -->
					<view class="product-price" v-else>
						<text>
							<text style="margin-right: 8rpx;font-size: 22rpx;">实付</text>
							<text style="font-size:22rpx;">￥</text>
							<text>{{handlePrice(dataList.discountPrice)[0]}}.</text>
							<text style="font-size:22rpx;">{{handlePrice(dataList.discountPrice)[1]}}</text>
						</text>
					</view>
					<!-- 商品价格 -->
					<view  class="product-price" style="color: #999999;" v-if="showOriginPrice" >
							<text style="font-size:22rpx;">￥</text>
							<text>{{handlePrice(dataList.price)[0]}}.</text>
							<text style="font-size:22rpx;">{{handlePrice(dataList.price)[1]}}</text>
					</view> 
					
					<view style="color: #999999;" v-if="refundType">共{{dataList.refundNumber || 1}}{{dataList.unit || '件'}}</view>
					<view style="color: #999999;" v-else >共{{dataList.number || 1}}{{dataList.unit || '件'}}</view>
				</view>	
			</view>
		</view>
		
		<view class="warehouse-container" v-if="dataList.type == 1 && orderStatus==2 && dataList.stockType && dataList.stockType == 1">
			<view class="left">
				<text class="text1">我的仓库</text>
				<text class="text2">{{dataList.stockNumber || 0}}</text>
			</view>
			<view class="line"/>
			<view class="right">
				<view class="item">
					<text class="text1">运送中</text>
					<text class="text2">{{dataList.frozenNumber || 0}}</text>
				</view>
				<view class="item">
					<text class="text1">已收货</text>
					<text class="text2">{{dataList.receiveNumber || 0}}</text>
				</view>
				<view class="item"> 
					<text class="text1">已退</text>
					<text class="text2">{{dataList.returnNumber || 0}}</text>
				</view>
			</view>
		</view>
		
		<view  class="apply-refund-container" v-if="dataList.showRefundBtn && orderStatus == 3">
			<view class="button" @click.stop="particalRefund">
				申请退款
			</view>
		</view>
		
		<view  class="apply-refund-container" v-if="dataList.showRefundBtn && orderStatus == 2">
			<view class="button" @click.stop="particalRefund">
				申请退款
			</view>
		</view>

		<view class="apply-refund-container" :style="{paddingTop:0}"  v-if="!dataList.showRefundBtn && orderStatus==2 && dataList.refundStatus > 0">
			<view class="button" v-if="dataList.refundStatus == 4"  @click.stop="refundCancel">
				取消退款
			</view>
			
			<view class="button"  v-if="dataList.refundStatus ==1"  @click.stop="refundSuccess">
				退款成功
			</view>
			
			<view class="button" v-if="dataList.refundStatus ==2" @click.stop="refundFailed">
				退款失败
			</view>
			
			<view class="button" v-if="dataList.refundStatus ==3" @click.stop="refundClose">
				退款关闭
			</view>
			
		</view>
		
		
		
		<view class="discount-container3" v-if="orderStatus==1 && dataList.type == 2 && dataList.deposit">
			<view class="right">
				<view class="item">
					<text>押金</text>
					<text>￥{{handlePrice(dataList.deposit)[0]}}.{{handlePrice(dataList.deposit)[1]}}</text>
				</view>
			</view>
		</view>
		
		
	
		
	</view>
	
</template>

<script>
	
	export default {
		name:"order-item",
		props:{
			paddingBottom:{
				type: Number,
				default:32,
			},
			iconStatus:{
				type:Number,
				default:0,
			},
			dataList:{
				type:Object,
				default:{},
			},
			orderStatus:{//1 待付款 2 进行中 3 已完成
				type:Number,
			},
			showPrice:{
				type:Boolean,
				default:false
			},
			showOriginPrice:{
				type:Boolean,
				default:false
			},
			refundType:{
				type:Boolean,
				default:false,
			},
		},
		data() {
			return {

			};
		},
		mounted() {
			if( (this.dataList.stockType && this.dataList.stockType == 1 && this.dataList.type == 1&& this.orderStatus==2) || (this. dataList.showRefundBtn && this. orderStatus==2)){
				this.paddingBottom=0
			}
		},
		
		methods:{
			handleDetail(){
				this.$emit('handleDetail')
			},
			
			handlePrice(price){
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
			
			particalRefund(){
				this.$emit('toApplayForRefund')
			},
			
			refundCancel(){
				this.$emit('refundCancel')
			},
			refundSuccess(){
				this.$emit('refundSuccess')
			},
			refundFailed(){
				this.$emit('refundFailed')
			},
			refundClose(){
				this.$emit('refundClose')
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.body-main {
		box-sizing: border-box;
		display: flex;
		flex: 1;
		padding-bottom:32rpx;
		flex-flow: row nowrap;
		.pic{
			margin-right: 32rpx;
			position: relative;
			.icon-status1,.icon-status2{
				position: absolute;
				width: 84rpx;
				height: 32rpx;
				line-height: 32rpx;
				background: #F4F5F6 linear-gradient(314deg, #FFBF38 0%, #FFA94F 100%);
				border-radius: 8rpx 0 16rpx 0;
				font-size: 20rpx;
				text-align: center;
				color: #FFFFFF;
				letter-spacing: 1rpx;
			}
			.icon-status2{
				background: #F4F5F6 linear-gradient(135deg, #20D4B9 0%, #29D6E0 100%);
			}
			image{
				width: 136rpx;
				height: 136rpx;
				border-radius: 8rpx;
			}
		}
		.basic-info{
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.name-attr{
				margin-right: 24rpx ;
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
					max-width: 349rpx;
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
			}
			.common-price{
				display: flex;
				flex: 1;
				flex-flow: column nowrap;
				align-items: flex-end;
				font-size: 22rpx;
					line-height: 40rpx;
				.product-price {
					height: 32rpx;
					font-size: 32rpx;
					margin-bottom: 12rpx;
				}
				
			}
		}
	}
	
	.warehouse-container {
	  margin: 24rpx 0 40rpx 0;
		padding:12rpx 0 14rpx 0;
		height: 98rpx;
		box-sizing: border-box;
		background: #FAFCFC;
		border-radius: 16rpx;
		border: 2rpx solid #E4F0F0;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.left{
			width: 174rpx;
			box-sizing: border-box;
		}
		.line{
			width: 2rpx;
			height: 36rpx;
			background: #E4EDED;
		}
		.right{
			width: 510rpx;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.item{
				width: 170rpx;
				box-sizing: border-box;
			}
		}
		.left,.right .item{
			display: flex;
			flex-flow: column nowrap; 
			align-items: center;
			justify-content: space-around;
			.text1{
				color: #808080;
				font-size: 22rpx;
				margin-bottom: 14rpx;
			}
			.text2{
				color: #333333;
				font-size: 28rpx;
				font-weight: 500;
			}
		}
	}
	
	.apply-refund-container {
	  padding: 24rpx 0 32rpx 0;
	  display: flex;
	  justify-content: flex-end;
	  .button {
	    width: 160rpx;
	    height: 56rpx;
	    line-height: 52rpx;
	    text-align: center;
	    box-sizing: border-box;
	    background: #ffffff;
	    border-radius: 16rpx;
	    border: 2rpx solid #eaeaea;
	    font-size: 24rpx;
	    font-weight: 400;
	    color: #111111;
	  }
	}
	
	.discount-container3 {
		padding-bottom: 24rpx;
		display: flex;
		flex-flow: row nowrap;
		flex: 1;
		align-items: flex-start;
		justify-content: flex-end;
		font-size: 22rpx;
		color: #999999;
		.right {
			.item {
				width: 302rpx;
				height: 32rpx;
				line-height: 32rpx;
				display: flex;
				flex: 1;
				flex-flow: row nowrap;
				justify-content: space-between;
				margin-bottom: 8rpx;
			}
		}
	}
	

</style>
