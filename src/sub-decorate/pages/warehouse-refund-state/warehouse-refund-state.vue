<template>
	<view>
		<custom-navbar :opacity="scrollTop/100" :title="headerTitle">
			<template v-slot:back>
				<i class="icon-ic_cancel_white back-icon" :style="{color: (scrollTop/100>1)?'black':'white'}"
					@click="back"></i>
			</template>
		</custom-navbar>
		<view>

			<view class="basic-info" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}">
				<view :style="{height:navBarHeight}">
				</view>
				<view class="info">
					<view class="header1">{{headerTitle}}</view>
				</view>
				<view class="header2">
					{{detail.refundTime | formatDate}}
				</view>
				<view class="placehold">
				</view>
			</view>
			<view v-if="![0, 1].includes(detail.status)" class="header-content">
				<view v-if="tips" class="icon">
					<i class="icon-icon_order_tips"></i>
				</view>
				<view class="alert" :style="{color:detail.status==5?'#FF3347':'#333333'}" style="flex:1">
					{{tips}}
				</view>
			</view>
		</view>
		<warehouse-item :showTitle="false" :showPayPrice="true" :showPrePrice="false"  :item="detail" :key="item.id" @detail="toDetail"
			@refund="toRefund">
		</warehouse-item>
		<view class="info-content">
			<view class="title">
				退款信息
			</view>
			<view class="row">
				<view class="heaer">
					退款原因：
				</view>
				<view class="text">
					{{detail.reason}}
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					退款类型：
				</view>
				<view class="text">
					{{refuntType(detail.type)}}

				</view>

			</view>

			<view class="row">
				<view class="heaer">
					退款金额：

				</view>
				<view class="text">
					￥{{detail.refundAmount}}
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					申请时间：
				</view>
				<view class="text">
					{{detail.createTime | formatDate}}
				</view>
			</view>

			<view class="row">
				<view class="heaer">
					退款编号：

				</view>
				<view class="text">
					{{detail.refundNo}}
					<text class="tip" @click="copy(detail.refundNo)">
						复制</text>
				</view>
			</view>


			<view class="row">
				<view class="heaer">
					备注信息：
				</view>
				<view class="text">
					{{detail.remark}}
				</view>
			</view>
		</view>
		<view v-if="[4,5].includes(detail.status)&&ownered" class="other-btn" @click="toMessage">联系客服
		</view>
		<view v-if="[4,5].includes(detail.status)&&ownered" class="other-btn" @click="reApply">重新申请
		</view>

		<view style="height: 200rpx;">

		</view>
		<view v-if="(detail.status==1||detail.status==0) &&ownered" class="bottom-btn">
			<view class="btn" @click="cancelRefund">
				取消退款
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../../utils/common.js'
	import {
		refundDetail,
		cancelRefund
	} from "../../../api/order.js"
	import{judgeOwner}from "../../../api/decorate.js"
	export default {
		filters: {
			formatDate
		},
		data() {
			return {
				bgImg: 'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png',
				navBarHeight: '',
				currentList: [1],
				detail: {},
				headerTitle: '',
				headerTime: '',
				tips: '',
				id: '',
				stockStatus: '',
				scrollTop: 0,
				ownered:false
			}
		},
		onPageScroll(scrollTop) {
			this.scrollTop = scrollTop.scrollTop
		},
		onLoad(e) {
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log('**********', this.backHeight);
			// 导航栏高度 = 状态栏到胶囊的间距（ 胶囊距上距离 - 状态栏高度 ）*2  +  胶囊高度
			this.navBarHeight =
				(menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.top +
				menuButtonInfo.height +
				"px";
			if (e && e.id) {
				this.id = e.id
				this.getDetail(e.id);
			}
			if(e&&e.projectId){
				judgeOwner({projectId:e.projectId}).then(e=>{
					this.ownered=e.ownered
				})
			}
	
			if (e && e.stockStatus) {
				this.stockStatus = e.stockStatus
			}
		},
		methods: {
			copy(data) {
				uni.setClipboardData({
					data: data.toString(),
					success: function() {
						console.log('success');
					}
				});
			},
			toMessage() {
				this.$store.dispatch("openCustomerConversation");
			},
			reApply() {
				//TODO 重新申请
				getApp().globalData.naviData = this.detail;
				let type = 0;
				if (this.detail.isReturnInventory) {
					type = 1
				}
				uni.navigateTo({
					url: `../warehouse-refund/warehouse-refund?refundType=${this.detail.type}&id=${this.detail.id}&type=${type}`
				})

			},
			refuntType(type) {
				let res = '';
				switch (type) {
					case 0:
						res = '仅退款（未发货）'
						break;
					case 1:
						res = '仅退款（退库存）'
						break;
					case 2:
						res = '仅退款（已收货）'
						break;
					case 3:
						res = '服务退款'
						break;
					default:
						break;
				}
				return res;
			},
			cancelRefund() {
				let vm = this
				uni.showModal({
					content: '确定要取消本次退款申请？',
					success: function(res) {
						if (res.confirm) {
							cancelRefund({
								id: vm.id
							}).then(e => {
								uni.navigateBack({})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getDetail(id) {
				refundDetail({
					id
				}).then(e => {
					console.log(e)
					e.stockStatus = this.stockStatus
					e.detailAppVOS.map(e=>{
						e.discountPrice=e.discountPrice*100
					})
					this.detail = e;
					if ([0, 1].includes(e.status)) {
						//退款中
						this.headerTitle = '退款中'
						this.bgImg =
							'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_orange.png'
					} else if (e.status == 2) {
						//退款完成
						this.headerTitle = '退款成功'
						this.bgImg =
							'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png'
					} else if ([3, 4, 5].includes(e.status)) {
						//退款完成
						if (e.status == 3) {
							this.headerTitle = '退款失败'
							this.tips = '商家拒绝了您的申请,如有问题未解决,您可重新申请'
						}
						if (e.status == 4) {
							this.headerTitle = '退款关闭'
							this.tips = '您已取消了本次退款，如有问题未解决，您可以重新申请'
						}
						if (e.status == 5) {
							this.headerTitle = '退款失败'
							this.tips = '您的退款账户存在异常，您可联系客服或重新发起申请'
						}
						this.bgImg =
							'https://ali-image.dabanjia.com/static/mp/dabanjia/images/decorate/order_bg_green.png'
					}
				})
			},
			back() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip {
		width: 60rpx;
		height: 30rpx;
		margin-left: 8rpx;
		line-height: 30rpx;
		border-radius: 4rpx;
		color: #35c4c4;
		font-size: 20rpx;
		text-align: center;
		display: inline-block;
		border: 1rpx solid #35c4c4;
		vertical-align: 13%;
	}

	.other-btn {
		width: 100%;
		height: 112rpx;
		line-height: 112rpx;
		text-align: center;
		color: #333333;
		font-size: 26rpx;
		font-weight: 500;
		margin-top: 16rpx;
		background-color: #FFF;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 136rpx;
		opacity: 1;
		background: #fefffe;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			opacity: 1;
			background: linear-gradient(135deg, #36d9cd, #28c6c6);
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: 500;

		}
	}

	.placehold {
		margin-top: 20rpx;
		height: 20rpx;
		width: 100%;
		background-color: #FFF;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}

	.info-content {
		margin-top: 16rpx;
		background-color: #FFF;
		border-radius: 24rpx;
		padding: 32rpx;

		.header {
			color: #333333;
			font-weight: 500;
			font-size: 30rpx;
			margin-bottom: 16rpx;
		}

		.row {
			display: flex;
			flex-direction: row;
			margin-top: 16rpx;
			align-items: flex-start;

			.heaer {
				font-size: 28rpx;
				color: #999999;
			}

			.text {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
			}
		}
	}

	.header-content {
		background: #ffffff;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		display: flex;
		font-size: 30rpx;
		color: #333333;
		padding: 0 32rpx 32rpx 32rpx;
		margin-bottom: 16rpx;

		.icon {
			margin-top: 6rpx;
			line-height: 32rpx;
			margin-right: 16rpx;
			font-weight: 20rpx;
		}

		.alert {

			line-height: 46rpx;
			font-size: 30rpx;
			font-weight: 400;
			text-align: left;
			color: #333333;
		}
	}

	.back-icon {
		color: white;
		font-size: 40rpx;
		padding: 20rpx;
	}

	.basic-info {
		// height: 296rpx;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		position: relative;

		image {
			margin-top: 200rpx;
			width: 184rpx;
			height: 184rpx;
			object-fit: cover;
			margin-bottom: 16rpx;
		}

		.info {
			display: flex;
			justify-content: center;
			align-items: center;

			.header1 {
				height: 48rpx;
				line-height: 48rpx;
				font-size: 48rpx;
				font-weight: 500;
				color: #ffffff;
				margin-bottom: 12rpx;
			}

		}

		.header2 {
			font-size: 26rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #ffffff;
			text-align: center;
		}
	}
</style>
