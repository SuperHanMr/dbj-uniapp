<template>
	<view class="refund">
		<warehouse-item :showBtns="false" :item="data" :isEdit="true" @numChange="onNumChange"></warehouse-item>
		<view class="back">
			<view class="back-res">
				<view class="back-res-row">
					<view class="res-pre">
						*退款原因
					</view>
					<view style="flex:1">
					</view>
					<view class="" @click="selectRes">
						{{reasonName!=''?reasonName:'请选择原因'}}
					</view>
					<view class="">
						<!-- //todo down -->

					</view>
				</view>
			</view>

			<view class="back-res">
				<view class="back-res-row">
					<view class="res-pre">
						*退款金额
					</view>
					<view style="flex:1">
					</view>
					<view class="">
						<input style="color: #FF3347;font-size: 38rpx;width: 200rpx;text-align: end;" type="number"
							placeholder="请输入金额" :value="num" />
					</view>
				</view>
			</view>
		</view>

		<view class="textarea">
			<view class="flex-row-between">
				<view class="text-area-title">
					备注说明

				</view>
				<view class="text-area-count">
					{{remark.length}}/200
				</view>
			</view>

			<textarea v-model="remark" maxlength="200" style="font-size: 28rpx" placeholder="可以填写一些与客服沟通过的备注信息" />
		</view>
		<view class="remark-tip">
			建议与商家沟通后再发起退款
		</view>
		<view style="height: 300rpx;">

		</view>
		<bottom-btn btnContent="提交申请" @submit="submitRefund"></bottom-btn>

	</view>
</template>

<script>
	import {
		goodsBack,
		goodsRefund
	} from "../../../api/decorate.js"
	import {
		refundReason
	} from '../../../api/order.js'
	export default {
		data() {
			return {
				reason: "",
				num: "",
				remark: "",
				type: 0,
				projectId: '',
				data: {},
				refundReasonList: [], //退款原因
				reasonList: [],
				reasonValue: "",
				reasonName: "",
			};
		},
		onShow() {
			this.data = getApp().globalData.naviData;
			console.log(this.data)
		},
		onLoad(e) {
			let title;
			this.type = e.type;
			if (e.type == 0) {
				title = '仅退款(已收货)'
			} else {
				title = '仅退款(退库存)'
			}
			this.projectId = e.projectId;
			uni.setNavigationBarTitle({
				title: title,
			});

			this.getRefundReasonList()
		},
		methods: {
			onNumChange(e) {
				console.log(e);
			},
			getRefundReasonList() {
				refundReason({
					codeKey: "refund_reason"
				}).then(list => {
					this.refundReasonList = list
					this.reasonList = list.map(item => {
						return item.itermName
					})
				})
			},
			submitRefund() {
				let params = {}
				params.refundAmount = this.num * 100
				params.remark = this.remark
				if (this.type == 1) {
					goodsBack()
				} else {
					goodsRefund()
				}
			},
			selectRes() {
				uni.showActionSheet({
					itemList: this.reasonList,
					success: (res) => {
						this.reasonName = this.reasonList[res.tapIndex]
						this.reasonValue = this.refundReasonList.filter(item => {
							return item.itermName == this.reasonList[res.tapIndex]
						})[0].itermValue
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				})
			},
		},
	};
</script>


<style lang="scss" scoped>
	.textarea {
		background-color: #fff;
		padding: 32rpx;
		margin-top: 16rpx;

		.flex-row-between {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 36rpx;
			margin-bottom: 13rpx;

			.text-area-title {
				color: #666666;
				font-size: 28rpx;
			}

			.text-area-count {
				color: #666666;
				font-size: 26rpx;
			}
		}
	}

	.remark-tip {
		color: #808080;
		font-size: 24rpx;
		margin: 16rpx 32rpx;
	}

	.back {
		background-color: #fff;
		padding: 0 32rpx;
	}

	.back-res {
		padding: 32rpx 0;
		font-size: 28rpx;
		border-bottom: 1rpx solid #f4f4f4;

		&-row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}

	.res-pre {
		color: #666666;
	}
</style>
