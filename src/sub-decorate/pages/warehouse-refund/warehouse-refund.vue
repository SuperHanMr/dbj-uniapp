<template>
	<view class="refund">
		<warehouse-item minInput="0.01" :showSubtitle="false" :showBtns="false" :item="data" :isEdit="type!=0"
			@numChange="onNumChange"></warehouse-item>
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
						<input style="color: #FF3347;width: 200rpx;text-align: end;" type="number" placeholder="请输入金额"
							v-model="num" />
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
	} from "../../../api/decorate.js";
	import {
		refundReason
	} from "../../../api/order.js";
	export default {
		data() {
			return {
				reason: "",
				num: "",
				remark: "",
				type: 0,
				projectId: "",
				data: {},
				refundReasonList: [], //退款原因
				reasonList: [],
				reasonValue: "",
				reasonName: "",
				refundList: [],
				refundType: 0,
				id: '',
			};
		},
		onShow() {

		},
		onLoad(e) {
			this.data = getApp().globalData.naviData;
			let title;
			this.type = e.type;
			if (e.type == 0) {
				this.refundType = e.refundType;
				console.log(this.refundType);
				title = "仅退款(已收货)";
			} else {
				title = "仅退款(退库存)";
			}
			this.projectId = e.projectId;
			uni.setNavigationBarTitle({
				title: title,
			});
			this.id = e.id
			let totalBack = 0;

			this.data.stockAppVOS.forEach(e => {
				totalBack += e.price * e.number
			})
			console.log(totalBack)
			this.num = totalBack.toFixed(2);


			this.getRefundReasonList();
		},
		methods: {
			onNumChange(e) {
				let item = {};
				item.returnNumber = e.num;

				this.refundList.push(item);
				let total = e.num * e.item.price
				this.num = total.toFixed(2);
				console.log(e);
			},
			getRefundReasonList() {
				refundReason({
					codeKey: "refund_reason",
				}).then((list) => {
					this.refundReasonList = list;
					this.reasonList = list.map((item) => {
						return item.itermName;
					});
				});
			},
			submitRefund() {
				console.log(this.data);
				let params = {}
				params.id = this.id
				params.returnMoney = this.num * 100
				params.refundAmount = this.num * 100
				params.remark = this.remark
				params.reasonId = this.reasonValue;
				params.reason = this.reasonName
				console.log(params)
				if (this.type == 1) {
					console.log(this.refundList);
					goodsBack(params)
				} else {
					params.type = this.refundType;
					if (params.type == 2) {
						params.goodsId = this.data.stockAppVOS[0].goodsId
					}
					goodsRefund(params).then(e => {
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						uni.navigateBack({
							delta: 2
						})
					})
				}
			},
			selectRes() {
				uni.showActionSheet({
					itemList: this.reasonList,
					success: (res) => {
						this.reasonName = this.reasonList[res.tapIndex];
						this.reasonValue = this.refundReasonList.filter((item) => {
							return item.itermName == this.reasonList[res.tapIndex];
						})[0].id;
					},
					fail: (res) => {
						console.log(res.errMsg);
					},
				});
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
