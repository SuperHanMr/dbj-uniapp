<template>
	<view class="wrapper_layout">
		<view class="topBar_height" :style="topbarStyle">
			<custom-navbar  title="收银台"
			bgcolor="#F2EBE5"
			opacity="99"
		>
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: 'black'}" @click="toBack"></i>
			</template>
		</custom-navbar>
		</view>
		<view class="wrapper">
			<view class="wrapper_scroll">
				<view class="header_count_title">
					<text>订单已提交成功，需支付金额</text>
				</view>
				<view class="header_count">
				<text class="count_unit">￥</text>
				<text class="count_num">{{amount}}</text>
			</view>
			<view class="red-header">

			</view>
			<view class="content_message">
				<view class="content_header">
					<view class="title">
						<text>线下汇款信息</text>
					</view>
					<view class="button" @click="handleCopy">
						<text>一键复制</text>
					</view>
				</view>

				<view class="content_wrapper">
					<view class="content_row">
						<view class="content_label">户名</view>
						<view class="content_text">{{info.CompanyPay_AccountName}}</view>
					</view>
					<view class="content_row">
						<view class="content_label">银行账号</view>
						<view class="content_text">{{info.CompanyPay_BankAccount}}</view>
					</view>
					<view class="content_row">
						<view class="content_label">开户行</view>
						<view class="content_text">{{info.CompanyPay_BankAddress}}</view>
					</view>
					<view class="content_row">
						<view class="content_label">银行联行号</view>
						<view class="content_text">{{info.CompanyPay_BankNumber}}</view>
					</view>
					<view class="content_row">
						<view class="content_label">汇款识别码</view>
						<view class="content_text">{{remittanceCode}}</view>
					</view>
				</view>
				<view class="content_tips_wrapper">
					<view class="content_tips" v-html="info.CompanyPay_Attention">
						<!-- 线下汇款，请务必填写【汇款识别码】。务必将【汇款识别码】填写至汇款单“用途”，“附言”等栏。-->
					</view>
				</view>


				<view class="split_wrapper">
				</view>

				<view class="tip_wrapper">
					<view class="tip_title">注意事项</view>
					<view class="tip_item" style="white-space: break-spaces;" v-html="info.CompanyPay_Description"></view>
					<!-- <view class="tip_item">1. 一个汇款识别码对应一个订单，请勿多转账、少转账和分次转账，否则影响订单对账进度。</view>
					<view class="tip_item">2. 汇款后超出1个工作日仍为“待付款”状态，请提供订单号及汇款单（汇款单包含收付款户名、收付款账号、付款金额、付款日期等），联系在线客服。</view>
					<view class="tip_item">3. 汇款后款项仅用于汇款公司使用。</view> -->
				</view>
			</view>
			<view class="process_wrapper">
				<view class="process_header">
					<text>公司转账流程</text>
				</view>
				<view class="process_list">
					<view class="process_item successed">
						<view class="process_circle">1</view>
						<view class="process_name">提交公司订单</view>
					</view>
					<view class="process_item successed">
						<view class="process_circle">2</view>
						<view class="process_name">银行公司转账</view>
					</view>
					<view class="process_item">
						<view class="process_circle">3</view>
						<view class="process_name">转账成功</view>
					</view>
				</view>

			</view>




			</view>
		</view>


	</view>
</template>

<script>
import {getCommonConfigs} from '@/api/classify.js';

export default {
	data() {
		return {
			amount: 0,
			remittanceCode: '',
			headerHeight: 0,
			info: {
				CompanyPay_AccountName: '',
				CompanyPay_Attention: '',
				CompanyPay_BankAccount: '',
				CompanyPay_BankAddress: '',
				CompanyPay_BankNumber: '',
				CompanyPay_Description: '',
			},
		}
	},
	onLoad(props) {
		if (props.amount) {
			this.amount = props.amount;
		}

		if (props.remittanceCode) {
			this.remittanceCode = props.remittanceCode;
		}
	},
	computed: {
		topbarStyle() {
			return `
				height: 88rpx;
				padding-top: ${this.headerHeight}px;
			`

		}
	},
	created() {
		const systemInfo = uni.getSystemInfoSync();
		this.headerHeight =  systemInfo.statusBarHeight;

		this.getInfo();
	},
	methods: {
		getInfo() {
			getCommonConfigs().then(res => {
				this.info = res;
			}).catch(e => {
				uni.showToast({
						title: "系统异常，请稍后重试",
						icon: "none",
						duration: 1000,
				})
			})
		},
		toBack() {
			uni.redirectTo({
				url: "../../../sub-my/pages/my-order/my-order?firstEntry=true&index=1"
			})
		},
		handleCopy() {
			let info = this.info;
			uni.setClipboardData({
				data: `户名： ${info.CompanyPay_AccountName} \n银行账号： ${info.CompanyPay_BankAccount} \n开户行： ${info.CompanyPay_BankAddress} \n银行联行号： ${info.CompanyPay_BankNumber} \n汇款识别码： ${this.remittanceCode}`,
				success() {
					uni.showToast({
						title: "复制成功",
						icon: "none",
						duration: 1000,
					});
				},
				fail() {
					uni.showToast({
						title: "复制失败",
						icon: "none",
						duration: 1000,
					});
				}
			})
		}
	}
}
</script>
<style scoped lang="scss">
.wrapper_layout{
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.wrapper{
	flex: 1;
	overflow: hidden;
	height: 100%;
	background: linear-gradient(173.71deg, #F2EBE5 0%, #DBCFC8 99.87%);


	.wrapper_scroll{
		height: 100%;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 0 32rpx 250rpx 32rpx;
	}
}

.back-icon{
	z-index: 10;
}

.header_count_title{
	padding-top: 80rpx;
	color: #333;
	font-size: 30rpx;
	line-height: 42rpx;
	height: 42rpx;
	text-align: center;
}
.header_count{
	text-align: center;
	margin-top: 24rpx;
}
.count_unit{
	font-size: 30rpx;
	color: #333;
}
.count_num{
	font-size: 60rpx;
	color: #333;
	font-family: PriceFont;
}
.red-header{
	background: #F83112;
	height: 20rpx;
	border-radius: 10rpx;
	margin-top: 80rpx;
}
.content_message{
	position: relative;
	top: -10rpx;
	.content_header{
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 112rpx;
		padding: 0 40rpx;
		position: relative;
		&:after{
			content: '';
			position: absolute;
			height: 1rpx;
			background: #ebebeb;
			left: 40rpx;
			right: 40rpx;
			bottom: 1rpx;

		}
		.title{
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
		}
		.button{
			height: 48rpx;
			border: 1rpx solid #ccc;
			border-radius: 8rpx;
			box-sizing: border-box;
			padding: 0 12rpx;
			line-height: 46rpx;
			font-size: 28rpx;
		}
	}

	.content_wrapper{
		padding: 0 40rpx;
		background: #fff;
		padding-top: 13rpx;
		.content_row{
			display: flex;
			flex-direction: row;
			padding: 16rpx 0;
			.content_label{
				font-size: 26rpx;
				color: #999;
				line-height: 48rpx;
				width: 180rpx;
			}
			.content_text{
				flex: 1;
				overflow: hidden;
				font-size: 30rpx;
				line-height: 48rpx;
				font-size: #333;
			}
		}
	}

	.content_tips_wrapper{
		background: #fff;
		padding-top: 12rpx;
		padding-bottom: 34rpx;
		.content_tips{
			background: #f9f9f9;
			margin: 0rpx 40rpx 0 40rpx;
			font-size: 26rpx;
			color: #999;
			padding: 16rpx 24rpx;
			line-height: 44rpx;
		}
	}

	.tip_wrapper{
		background: #fff;
		 padding: 24rpx 40rpx 60rpx 40rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		.tip_title{
			color: #BFBFBF;
			font-size: 24rpx;
			line-height: 34rpx;
			height: 34rpx;
		}
		.tip_item{
			margin-top: 16rpx;
			color: #BFBFBF;
			font-size: 24rpx;
			line-height: 40rpx;
		}
	}



}

.process_wrapper{
		margin-top: 24rpx;
		border-radius: 20rpx;
		background: #fff;
		padding: 0 40rpx 40rpx 40rpx;
		.process_header{
			border-bottom: 1rpx solid #f0f0f0;
			font-size: 32rpx;
			color: #333;
			font-weight: 500;
			line-height: 108rpx;
			height: 108rpx;
		}
		.process_list{
			display: flex;
			flex-direction: row;

			.process_item{
				flex: 1;
				overflow:hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 41rpx;
				position: relative;
				.process_circle{
					background: #fff;
					position: relative;
					z-index: 5;
					border-radius: 50%;
					border: 2rpx solid #e3e3e3;
					color: #e3e3e3;
					font-weight: 500;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 60rpx;
					width: 60rpx;
					box-sizing: border-box;
				}

				&.successed .process_circle{
					border: 2rpx solid #333;
					color: #333;
				}


				.process_name{
					color: #999;
					font-size: 24rpx;
					line-height: 34rpx;
					line-height: 34rpx;
					margin-top: 12rpx;
				}

				&.successed .process_name{
					color: #333;
				}

				&.successed:not(:last-child) {
					&:after{
						content: '';
						border-top: 1rpx dashed #333;
						position: absolute;
						right: 0;
						width: 50%;
						top: 70rpx;
					}
				}

				&:not(:last-child) {
					&:after{
						content: '';
						border-top: 1rpx dashed #e3e3e3;
						position: absolute;
						right: 0;
						width: 50%;
						top: 70rpx;
					}
				}

				&.successed:not(:first-child) {
					&:before{
						content: '';
						border-top: 1rpx dashed #333;
						position: absolute;
						left: 5rpx;
						width: 50%;
						top: 70rpx;
					}
				}
				&:not(:first-child) {
					&:before{
						content: '';
						border-top: 1rpx dashed #e3e3e3;
						position: absolute;
						left: 5rpx;
						width: 50%;
						top: 70rpx;
					}
				}
			}
		}
	}
	.split_wrapper{
		height: 28rpx;
		background: url(../../static/image/split_line.png) no-repeat;
		background-size: 100% 100%;
	}
</style>