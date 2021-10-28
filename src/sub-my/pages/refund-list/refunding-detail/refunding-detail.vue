<template>
	<view class="container">
		<!-- 退款详情 -->
		<custom-navbar :opacity="scrollTop / 100" :title="headerTitle">
			<template v-slot:back>
				<i
					class="icon-ic_cancel_white back-icon"
					:style="{ color: (scrollTop / 100 > 1) ? 'black' : 'white' }"
					@click="toBack	"
				></i>
			</template>
		</custom-navbar>

		<view class="order-container" :style="{paddingBottom: containerPadding Bottom}">
			<view
				style="position: relative;"
				:style="{backgroundImag e:`	url( ${bgImg })`,backgrou ndS	ize : '100% 100 %'}"
			>
				<view class="bgcStyle" :style="{backgroundImage:`url(${bgI mg})`,backgroundSize: '100% 100%'}" />
				<view :style="{height:	navB arHeig ht}"></view>
				<view class="order-status">
					<view class="status">
						<image src="../../../static/ic_status_inprogress.svg" mode />
						<text>退款中</text>
					</view>
				</view>
			</view>

			<view class="refund-product-info">
				<order-item
					v-for="i tem	 in refun dI n f o.detailA p pVOS"
					:key="ite m.id"
					:dataList="ite	m"
					:refundType="tru	e"
					@handleDetail="produ	ctDetail(ite	m)"
				/>
			</view>

			<order-refund-info :refundInfo="refund	Info"></order-refund-info>
		</view>
		<view class="cancel-refund-pay" :style="{pad	din gBottom:syste mBott om,height:systemHeight} ">
			<view class="button" @click=" cancelToPay()">取消退款</view>
		</view>

		<!-- 取消退款的弹框 -->
		<uni-popup ref="cancelRefund" type="dialog">
			<uni-popup-dialog
				mode="base"
				title="确定要取消本次退款申请？"
				:before-close="t rue"
				@close="cancelToPayClose"
				@confirm="confir mCanc elToPay"
			/>
		</uni-popup>
	</view>
</template>

<script>
iport {  ge	efundDetail,ancelRefund,confirmReceiptOrder } fom "../../	/../api/order.j	;
export defaut {
  data() {
    return {
     order I d: "",
			 r efundInfo:{},

			systemBottom: ",
			containerBott	:"",
			cont		erPaddingBot	m:""				navBarH		ht:"",
						llTop: 0,
			headerTitle:"",
			bgImg:'https://ali-image.dabanjia.com/static/mp/dabanjia/images/			rate/order_bg_orang			g'
    };
  },

	mo			d(e) {
		cons			nuButtonInfo = uni			MenuButtonBoundin			entRect();
			is.contai			ottom = menuButton			.bottom
		this.			emBottom  = menu		ton	fo.b	tom + 24 + "rpx";
		this.co		inerPaddingBottom = menuButtonInfo.bot	m + 	0 + "rpx";
				sole.log(this.systemBottom);
	},
	onPageScrol		crollTop)				this.scrollTop = scrollTop.scrollTop
	},
  onLoad(		{
		this.order		=Number(e.orderId);
		this.refundDetail()
		this.headerTitle = 		详情"
		const systemInfo = uni.getSystemInfoSyn		;
		//状态栏高度
		this.tophight = systemInfo.statusBarH		ht + "px";
		// 获取胶囊按			
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		this.navBar			ht =
			menuButtonInfo.to						(men		ttonInfo.top - sys			nfo.statusBarHei			 +
			menuButtonInfo.he		t +			" px "; 
		uni.setNa vig			nBarColor({
 			frontCo lor: '#ffff ff',
			b ac kgr				olor:'#23d5c 6 ',
			anima			: {
			dura		n: 400,
				timingFunc: 'ea			'
			}
		})
	},

  methods: {
		to		k()				u	.navigateBac		
				delta:1
				
		},
		formatTime(msTim							let time = msTime /10						let hour = Math .floor					/60 /60) %24;
			if(!hour						h			= 0
			
					 minute = Math.			r(time /60) %60;
			if(!minute){
				minute =0
			}			let		cond = Math.f			(time) %60;
				turn [hour,minute,second]
		},

		refundDetai			
			getRefundDe			({ id: this.orderId }).then(e=>{
			co				.log("打印请求			据="			e")
				this.refun				 = e
			})
		},
		// 跳转到商品详情页面
		productDetail(item){
			uni.navigateTo({
				url:`../../../../sub-classify/pa			goods-		ail/		ds-detail?goodId=${i			relationId}`
							},

		//
		 can				Pay() {
 					his.$refs.cancelRe					pen();
 				
    canc					yClose() {
      t					efs.canc				und.close					  },
    confirmCa					Pay(valu				      // 					的接口、
			cancel					({id:thi				erId }).th					{
				co			e.l			)
				// 成功就关		
					 跳转到退款关闭页面  退款取消页面				this.$refs.can			efund.close();
						.redirectTo({
					url:`..				y-order/order-fai led/order					d?type=refund&id=${t						erId}&status=4&f							ogress`
									})
    },



   							Receipt() {
      this						conf					eipt.open();
    },

    c						eceiptClose() {
      th					fs.				rmR			pt.cl		();
		 },
    receiptCo			m(value) {
     				用申请退			
      console.l				击了确认按钮11");
			confirmReceiptOrder				66,goodIsd:""}).th				>{
				if(res.code ==1){
					// 成					
					c					.log("成功就关闭弹框")
					this.					confirmReceipt						);
				}
			})
    },


		//进行中页面的方法

		// 取消订单
		handleCancelOrder(){
			this.$refs.canc				er.open();
		},
		cancelOrder					){
			th					fs.cancleOrder.close();
		}					ncleConfirm(){						sole.log("取消订单按钮成功！")
			// 调用取消订单的接口
			// 成功后关闭弹框并跳转到订单取消页面
			this.$refs.cancleOrder.				();
		},
	},
};
																																																																																																			</script>

<style lang="scss" scoped>
.bgcStyle {
	width: 100%;
	height: 32rpx;
	position: absolute;
	bottom: -32rpx;
	z-index: -1;
}
.back-icon {
	color: white;
	font-size: 40rpx;
	padding: 20rpx;
}
.header {
	margin-bottom: 32rpx;
	box-sizing: border-box;
	display: flex;
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

.tips {
	background: #f7f7f7;
	border-radius: 16rpx;
	color: #999999;
	font-size: 22rpx;
	padding: 16rpx 24rpx;
	box-sizing: border-box;
}

.discount-container1 {
	margin-bottom: 24rpx;
	display: flex;
	flex-flow: row nowrap;
	flex: 1;
	align-items: flex-start;
	justify-content: flex-end;
	font-size: 22rpx;
	color: #999999;
	.left,
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
		.item:nth-last-child(1) {
			margin-bottom: 0;
		}
	}
	.line {
		width: 2rpx;
		height: 40rpx;
		background: #ebebeb;
		margin: 16rpx 40rpx;
	}
}

.discount-container2 {
	margin-bottom: 24rpx;
	display: flex;
	flex-flow: row nowrap;
	flex: 1;
	align-items: flex-start;
	justify-content: flex-end;
	font-size: 22rpx;
	color: #999999;
	.left,
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
		.item:nth-last-child(1) {
			margin-bottom: 0;
		}
	}
	.line {
		width: 2rpx;
		height: 80rpx;
		background: #ebebeb;
		margin: 16rpx 40rpx;
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

.container {
	.order-container {
		width: 100%;
		height: 100%;
		overflow: auto;
		.order-status {
			width: 100%;
			height: 140rpx;
			color: #ffffff;
			background-size: 100% 172rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			position: relative;
			.backgroundStyle {
				position: absolute;
				z-index: -1;
				width: 100%;
				height: 172rpx;
				background-color: #ffb245;
			}
			.status {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-bottom: 8rpx;
				image {
					width: 64rpx;
					height: 64rpx;
					object-fit: cover;
					margin-right: 12rpx;
				}
				text {
					font-size: 48rpx;
					font-weight: 500;
					color: #ffffff;
				}
			}

			.time {
				color: #ffffff;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-weight: 400;
				display: flex;
				align-items: center;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
			}
		}

		.refund-product-info {
			padding: 32rpx 32rpx 0 32rpx;
			background-color: #ffffff;
			margin-bottom: 16rpx;
			border-radius: 24rpx;
		}
		.delete-button {
			margin: 60rpx 0;
			background: #fefffe;
			padding: 24rpx 32rpx;
			.delete {
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				color: #ffffff;
				font-size: 32rpx;
				font-weight: 500;
				background: linear-gradient(135deg, #53d5cc 0%, #4fc9c9 100%);
				border-radius: 12rpx;
			}
		}

		.order-header {
			margin-bottom: 16rpx;
			padding: 32rpx;
			background: #ffffff;
			border-radius: 20rpx;
			color: #333333;
			box-sizing: border-box;
			display: flex;
			flex: 1;
			flex-flow: row nowrap;
			image {
				width: 32rpx;
				height: 32rpx;
				object-fit: cover;
				margin: 8rpx 16rpx 0 0;
			}
			.cancel-text {
				color: #333333;
				font-size: 30rpx;
				line-height: 46rpx;
				word-wrap: break-word;
				word-break: break-all;
			}
		}

		.body1 {
			padding: 32rpx 32rpx 0;
			background: #ffffff;
			border-radius: 24rpx;
			margin-bottom: 16rpx;
		}
		.singleStore {
			.productInfo {
				padding: 32rpx 32rpx 0;
				background: #ffffff;
				border-radius: 24rpx 24rpx 0 0;
			}
		}
		.body2 {
			padding: 32rpx 32rpx 0;
			background: #ffffff;
			border-radius: 24rpx 24rpx 0 0;
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
					border-radius: 24rpx;
					border: 2rpx solid #eaeaea;
					font-size: 24rpx;
					font-weight: 400;
					color: #111111;
				}
			}

			.warehouse-container {
				margin: 24rpx 0 40rpx 0;
				padding: 12rpx 0 14rpx 0;
				height: 98rpx;
				box-sizing: border-box;
				background: #fafcfc;
				border-radius: 16rpx;
				border: 2rpx solid #e4f0f0;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.left {
					width: 174rpx;
					box-sizing: border-box;
				}
				.line {
					width: 2rpx;
					height: 36rpx;
					background: #e4eded;
				}
				.right {
					width: 510rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					.item {
						width: 170rpx;
						box-sizing: border-box;
					}
				}
				.left,
				.right .item {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					justify-content: space-around;
					.text1 {
						color: #808080;
						font-size: 22rpx;
						margin-bottom: 14rpx;
					}
					.text2 {
						color: #333333;
						font-size: 28rpx;
						font-weight: 500;
					}
				}
			}

			.shop-item {
				margin-bottom: 32rpx;

				.split-line {
					height: 1rpx;
					background-color: #ebebeb;
				}
			}
			.shop-item:nth-last-child(1) {
				margin-bottom: 0;
			}
		}

		.payment-method {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;
			background-color: #ffffff;
			height: 112rpx;
			color: #333333;
			font-size: 30rpx;
			font-weight: 500;
			padding: 32rpx;
			margin-bottom: 16rpx;
			border-radius: 24rpx;
			box-sizing: border-box;
			.method {
				display: flex;
				align-items: center;
				image {
					width: 32rpx;
					height: 32rpx;
					object-fit: cover;
					margin-right: 16rpx;
				}
				text {
					font-size: 28rpx;
				}
			}
		}

		.contact-service {
			margin-top: 16rpx;
			background-color: #ffffff;
			padding: 38rpx 32rpx;
			border-radius: 24rpx;
			font-size: 26rpx;
			height: 112rpx;
			text-align: center;
			box-sizing: border-box;
		}
	}
}

// 底部 取消支付按钮样式 确认收货 及申请退款按钮
.cancel-refund-pay,
.applyforRefund-confirmReceipt,
.waitPayBottom {
	position: fixed;
	bottom: 0;
	background-color: #ffffff;
	width: 686rpx;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}
.cancel-refund-pay {
	justify-content: space-between;
	padding: 24rpx 32rpx;
	font-size: 26rpx;
	.button {
		height: 88rpx;
		background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
		border-radius: 12rpx;
		width: 686rpx;
		line-height: 88rpx;
		text-align: center;
		color: #ffffff;
		font-size: 32rpx;
	}
}
.applyforRefund-confirmReceipt {
	padding: 12rpx 32rpx;
	justify-content: flex-end;
	.confirmReceipt {
		width: 248rpx;
		height: 88rpx;
		line-height: 88rpx;
		box-sizing: border-box;
		background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
		border-radius: 12rpx;
		font-size: 32rpx;
		text-align: center;
		font-weight: 400;
		color: #ffffff;
	}
	.applyforRefund {
		margin: 18rpx 0;
		box-sizing: border-box;
		width: 160rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		background: #ffffff;
		border-radius: 16rpx;
		color: #111111;
		font-size: 24rpx;
		border: 2rpx solid #eaeaea;
	}
}

.waitPayBottom {
	padding: 12rpx 32rpx;
	justify-content: space-between;
	.gotoPay {
		width: 248rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		text-align: center;
		color: #ffffff;
		background: linear-gradient(135deg, #36d9cd 0%, #28c6c6 100%);
		border-radius: 12rpx;
	}
}

//头部倒计时样式
::v-deep .uni-countdown__number {
	width: 36rpx !important;
	height: 36rpx !important;
}
::v-deep .uni-countdown__splitor.data-v-02c75d70 {
	line-height: 36rpx !important;
	color: #ffffff !important;
}

// 弹框样式
::v-deep .uni-popup-dialog {
	width: 560rpx !important;
	border-radius: 24rpx !important;
	background-color: #fff !important;
}
::v-deep .uni-dialog-title-text {
	color: #111111 !important;
	font-size: 32rpx !important;
	font-weight: 550 !important;
}
::v-deep .uni-dialog-title {
	padding: 48rpx 0 !important;
}
::v-deep .uni-dialog-content {
	display: none !important;
}
::v-deep .uni-dialog-button-group {
	border-top: 2rpx solid #f5f5f5;
}
::v-deep .uni-dialog-button {
	height: 82rpx !important;
}
::v-deep .uni-button-color {
	color: #ff3347 !important;
	font-size: 30rpx !important;
	font-weight: 500;
}
::v-deep .uni-dialog-button-text {
	font-size: 30rpx !important;
}
</style>

