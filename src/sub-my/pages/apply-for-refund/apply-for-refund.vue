<template>
	<view>

		<view>
			<view class="container">
				<view v-if="refundType==2" class="server-order-tip">
					<view class="icon-icon_order_tips" style="font-size: 28rpx;margin-right: 12rpx;">
					</view>
					<view v-if="refundInfo.isWorker">
						若您想对服务的内容做调整，您可以联系管家发起变更申请，一旦发起退款且通过后，该服务会记为结束
					</view>
					<view v-else>
						若您想对服务的内容做调整，您可以联系客服，一旦发起退款且通过后，该服务会记为结束
					</view>
				</view>
				<view class="product-container">
					<view v-if="type == 'whole' && refundId ">
						<view v-for="(item1,index1) in refundInfo.details" :key="index1">
							<view v-if="item1.isOriginalOrder" class="header-title">
								<text class="title"> 原始订单</text>
								<text class="tip">(该订单为购买该服务的首笔订单)</text>
							</view>
							<view v-if="!item1.isOriginalOrder&&refundInfo.details.length>1" class="header-title">
								<text class="title"> 补单</text>
								<text class="tip">(该订单为购买该服务除首笔订单外的后续补单)</text>
							</view>
						<view v-for="(item1Item,index1Item) in item1.detailAppVOS" :key="item1Item.id">

							<order-item v-if="item1Item.type !==5" :refundType="true" :orderType="refundType"
								:dataList="item1Item" :showIcon="true"></order-item>
							<store-calue-card-item v-else :refundType="true" :dataInfo="item1Item" />
							</view>
						</view>
					</view>
					<view v-if="type == 'whole' && !refundId ">

						<view v-for="(item2,index2) in refundInfo.detailAppVOS" :key="index2">
							<view v-if="item2.isOriginalOrder" class="header-title">
								<text class="title"> 原始订单</text>
								<text class="tip">(该订单为购买该服务的首笔订单)</text>
							</view>
							<view v-if="!item2.isOriginalOrder&&refundInfo.detailAppVOS.length>1" class="header-title">
								<text class="title"> 补单</text>
								<text class="tip">(该订单为购买该服务除首笔订单外的后续补单)</text>
							</view>
							<view v-for="(item2Item,item2index2) in item2.detailAppVOS" :key="item2Item.id">
								<order-item v-if="item2Item.type !== 5" :refundType="true" :orderType="refundType"
									:dataList="item2Item" :orderStatus="2" :showIcon="true"></order-item>
								<store-calue-card-item v-else :refundType="true" :dataInfo="item2Item">
								</store-calue-card-item>
							</view>
						</view>
					</view>


					<view v-if="type=='partical' && refundId ">
						<view v-for="item3 in refundInfo" :key="item3.id">
							<order-item :refundType="true" :orderType="refundType" :showIcon="true" :dataList="item3">
							</order-item>
						</view>
					</view>

					<view v-if="type == 'partical' && !refundId ">
						<view v-for="item4 in refundInfo.detailAppVOS" :key="item4.id">
							<view v-if="item4.isOriginalOrder" class="header-title">
								<text class="title"> 原始订单</text>
								<text class="tip">(该订单为购买该服务的首笔订单)</text>
							</view>
							<view v-if="!item4.isOriginalOrder&&refundInfo.detailAppVOS.length>1" class="header-title">
								<text class="title"> 补单</text>
								<text class="tip">(该订单为购买该服务除首笔订单外的后续补单)</text>
							</view>
							<view v-for="item4Item in item4.detailAppVOS" :key="item4Item.id">
								<order-item :refundType="true" :orderType="refundType" :dataList="item4Item"
									:showIcon="true">
								</order-item>
							</view>
						</view>
					</view>

					<!-- 运费和搬运费 -->
					<view class="price-container" v-if="refundInfo.freight || refundInfo.handlingFees">
						<view class="price-item" v-if="refundInfo.freight">
							<view class="header" style="margin-bottom: 16rpx;">
								<text style="margin-right: 8rpx;">运费</text>
								<image class="icon" src="../../../static/price_icon.svg" mode=""
									@click="readExpenses(1)">
								</image>
							</view>
							<text>
								<text style="font-size: 24rpx;">￥</text>
								<text style="font-size: 28rpx;"
									class="price-font">{{handlePrice(refundInfo.freight)[0]}}.{{handlePrice(refundInfo.freight)[1]}}</text>
							</text>
						</view>
						<view class="price-item" v-if="refundInfo.handlingFees">
							<view class="header">

								<text style="margin-right: 8rpx;">搬运费</text>
								<image class="icon" src="../../../static/price_icon.svg" @click="readExpenses(2)"
									mode="">
								</image>
							</view>
							<text>
								<text style="font-size: 24rpx;">￥</text>
								<text style="font-size: 28rpx;"
									class="price-font">{{handlePrice(refundInfo.handlingFees)[0]}}.{{handlePrice(refundInfo.handlingFees)[1]}}</text>
							</text>
						</view>
					</view>
				</view>
				<view class="refund-container">
					<!-- 退款原因 -->
					<view class="refund-reason">
						<view class="left">
							<view class="icon">*</view>
							<text style="color: #666666;">退款原因</text>
						</view>
						<view class="reason">
							<text style="color: #bbbbbb;" v-if="!reasonName" @click="openPopup()">请选择</text>
							<text v-else style="margin-right: 16rpx;color: #333333;"
								@click="openPopup()">{{reasonName}}</text>
							<image src="../../static/ic_arraw_down.svg" mode="" @click="openPopup()" />
						</view>
					</view>

					<view class="line" />
					<!-- 材料服务 退款金额 -->
					<view class="refund-price" v-if="!refundInfo.editabled">
						<view class="edit-price">
							<view class="left">
								<view class="icon">*</view>
								<text style="color:#666666;">退款金额</text>
							</view>
							<view class="right1">
								<text v-if="refundInfo.actualIncomeAmount"
									class="price-font">￥{{handlePrice(refundInfo.actualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.actualIncomeAmount)[1]}}</text>
								<text v-else
									class="price-font">￥{{handlePrice(refundInfo.totalActualIncomeAmount)[0] || 0}}.{{handlePrice(refundInfo.totalActualIncomeAmount)[1]}}</text>
							</view>
						</view>
						<view class="tip-text" v-if="refundType == 1">
							商品未发货，商家同意后将会全额退还。
						</view>
						<view class="tip-text" v-if="refundType == 2">
							服务未开始，商家同意后将会全额退还。
						</view>
					</view>

					<!-- 储值卡退款 -->
					<view class="refund-price" v-else>
						<view :class="{'edit-price': showEditInput, 'show-price': !showEditInput }">
							<view class="left" style="flex: 1;">
								<view class="icon">*</view>
								<text style="color:#666666;">退款金额</text>
							</view>
							<view style="flex:1"></view>
							<view class="right1" v-if="showEditInput">
								<view class="eidt-style">
									<text>￥</text>
									<input type="digit" v-model="inputValue" class="input-style" :focus="isFocus"
										maxlength="10" @focus="onKeyFocus" @blur="onKeyBlur"
										:style="{width:inputWidth,'maxWidth':'294rpx !important'}" />
								</view>
							</view>
							<view class="right2" v-else>
								<text
									style="color:#FF3347;font-size: 40rpx;">￥{{inputValue==0?"0.00":inputValue}}</text>
								<image src="../../static/ic_mine_edit_gray@2x.png" mode=""
									@click="showEditInput=true" />
							</view>
						</view>
						<view class="tip-text" v-if="refundInfo.cardUseIdentification">
							储值卡已使用过，具体退款金额以您与商家沟通协商的结果为准
						</view>
						<view class="tip-text" v-else>
							储值卡未使用，商家同意后将会全额退还
						</view>
					</view>
				</view>

				<view class="remark-container">
					<view class="header">
						<text>备注说明</text>

					</view>
					<view class="body">
						<textarea v-model="remarks" placeholder="补充描述信息,有助于商家更好的处理售后问题"
							placeholder-style="color:#AAAAAA;font-size:28rpx;padding-top:12rpx;" maxlength="500"
							class="remark" @input="onTextAreaInput" />
						<text class="fontNum"
							style="color: #999999;font-size: 26rpx;">{{textAreaLength>500?500:textAreaLength}}/500</text>
					</view>
				</view>
				<view class="proposal">建议与商家沟通后再发起退款</view>
				<view class="sumbit-button" :style="{paddingBottom:systemBottom}">
					<view class="buttons1" v-if="!reasonName">
						提交申请
					</view>
					<view v-else class="buttons" @click="submitApply">
						提交申请
					</view>
				</view>
			</view>
		</view>
		<expenses-toast ref='expensesToast' :expensesType="expensesType"></expenses-toast>
	</view>

</template>

<script>
	import {
		getRefundInfo,
		refundReason,
		wholeOrderApplyForRefund,
		particalOrderApplyForRefund,
		getRefundInformation,
	} from "@/api/order.js";
	export default {
		data() {
			return {
				query: {
					remarks: "",
					status: "",
				},
				remarks: "",
				status: "",
				showEditInput: false,
				inputValue: 0,
				inputWidth: "",
				textAreaLength: 0,
				isFocus: false,
				type: "", //partical部分退款  whole整个退款
				refundInfo: {},

				refundReasonList: [], //退款原因
				errorTitle:"",//报错提示
				reasonList: [],

				reasonValue: "",
				reasonName: "",

				returnMoney: "", //向后台传递的退款金额
				refundAmount: "",
				maxRefundAmount: "", //后台返回的最大退款金额
				refundId: "",
				orderDetailId: "",

				systemBottom: "",

				expensesType: "",
				orderDetailsId: "",
				applyMode: "",
				freight: "",
				handlingFees: "",
				refundType: "", //1:材料 2:订单 5:储值卡
				isServerOrder: true,
			};
		},
		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.containerBottom = menuButtonInfo.bottom;
			this.systemBottom = menuButtonInfo.bottom + "rpx";
			this.systemHeight = menuButtonInfo.bottom + this.num + "rpx";
			console.log(this.systemBottom);
		},

		onLoad(e) {
			if (e.isServerOrder) {
				this.isServerOrder = true;
				uni.setNavigationBarTitle({
					title: "退款服务",
				});
			}
			this.type = e.type;
			this.orderDetailsId = e.orderDetailsId; //此参数 提交申请的时候使用
			if (this.type) {
				this.query.orderId = Number(e.orderId);
				this.query.status = Number(e.status); //订单状态 1进行中 2已完成
				this.status = this.query.status;
				this.applyMode = Number(e.applyMode); //	申请方式 1单商品 2整单退
				console.log("this.type=", this.type);
				if (this.type == "partical") {
					let params = {
						orderId: this.query.orderId,
						status: this.query.status,
						applyMode: this.applyMode,
						orderDetailsId: this.orderDetailsId,
					};
					getRefundInformation(params).then((res) => {
						this.refundInfo = res;
						this.refundType = this.refundInfo.type;
						this.showToast()
						console.log("this.refundInfo=", this.refundInfo);
						this.refundInfo.actualIncomeAmount = this.refundInfo.maxRefundAmount;
						this.returnMoney = this.refundInfo.maxRefundAmount;
					});
				} else {
					let params = {
						orderId: this.query.orderId,
						status: this.query.status,
						applyMode: this.applyMode,
					};
					getRefundInformation(params).then((res) => {
						this.refundInfo = res;
						this.refundType = this.refundInfo.type;
						console.log("this.refundInfo=", this.refundInfo);
						this.refundInfo.actualIncomeAmount = this.refundInfo.maxRefundAmount;
						this.returnMoney = this.refundInfo.maxRefundAmount;

						if (this.refundType == 5) {
							this.inputValue = this.refundInfo.maxRefundAmount;
							this.refundAmount = this.refundInfo.refundAmount;
							this.maxRefundAmount = this.refundInfo.maxRefundAmount;
						}
						this.freight = this.refundInfo.freight ?
							this.refundInfo.freight :
							"0";
						this.handlingFees = this.refundInfo.handlingFees ?
							this.refundInfo.freight :
							"0";
					});
				}
			} else {
				this.refundId = e.refundId;
				console.log("this.refundId=", this.refundId);
				this.getReapplyRefundInfo();
			}
			// 退款原因
			this.getRefundReasonList();
		},

		watch: {
			showEditInput(newVal, oldVal) {
				if (newVal) {
					this.onKeyFocus();
				}
			},
			inputValue(newVal, oldVal) {
				this.reqInputWidth(newVal);
				console.log("newVal=====", newVal, String(newVal).length);
				console.log("this.refundAmount===", this.refundAmount);
				console.log("this.maxRefundAmount===", this.maxRefundAmount);
				if (newVal > this.maxRefundAmount) {
					uni.showToast({
						title: "退款金额大于储值卡余额，请修改",
						icon: "none",
						duration: 1000,
					});
					this.returnMoney = Number(newVal);
					return this.returnMoney;
					// return Number(this.refundAmount).toFixed(2)
				} else {
					this.returnMoney = Number(newVal);
					return newVal;
				}
			},

			textAreaLength(newVal, oldVal) {},
		},
		computed: {
			reqInputWidth(value) {
				return (value) => {
					console.log("value==", typeof value, value == "", value == 0);
					if (value == "") {
						this.inputWidth = "12rpx";
					} else if (value === 0) {
						this.inputWidth = "22rpx";
					} else if (value === "0.") {
						this.inputWidth = "44rpx";
					} else {
						console.log("width====", String(value).length * 22);
						this.inputWidth = String(value).length * 22 + "rpx";
					}
				};
			},
		},
		methods: {
			// 重新获取退款订单详情
			getReapplyRefundInfo() {
				getRefundInfo({
					id: this.refundId,
				}).then((data) => {
					console.log("重新获取的订单信息=", data);
					this.type = data.applyMode == 1 ? "partical" : "whole";
					console.log("this.type=", this.type);
					this.refundType = data.type;
					this.showToast()
					// this.refundType = 5
					this.remarks = data.remark;
					this.textAreaLength = this.remark ? this.remark.length : "0";
					this.reasonValue = data.reasonId;
					this.reasonName = data.reason;
					console.log("this.refundType===", this.refundType);
					if (this.refundType == 5 || this.refundType == 2) {
						this.maxRefundAmount = data.maxRefundAmount;
						this.refundAmount = data.refundAmount;
						this.returnMoney = data.refundAmount;
						this.inputValue = data.refundAmount;
					} else {
						this.returnMoney = data.maxRefundAmount;
						this.freight = this.refundInfo.freight ?
							this.refundInfo.freight :
							"0";
						this.handlingFees = this.refundInfo.handlingFees ?
							this.refundInfo.freight :
							"0";
					}
					if (this.type == "partical") {
						this.refundInfo = data.detailAppVOS;
						this.orderDetailId = data.detailAppVOS[0].orderDetailId;
						console.log("this.refundInfo=", this.refundInfo);
					} else {
						this.refundInfo.cardUseIdentification = data.cardUseIdentification; //储值卡文案显示问题
						console.log("!!!$$$$$$$$$$$$$$@@@@@@@@@@@@@@", this.refundInfo);
						this.refundInfo.details = data.detailAppVOS;
						console.log("this.refundInfo.details = ", this.refundInfo.details);
					}
					this.refundInfo.isWorker = data.isWorker
					this.refundInfo.editabled = data.editabled
					// this.refundInfo.editabled = true
					this.refundInfo.totalActualIncomeAmount = data.maxRefundAmount;
					this.query.orderId = data.orderId;
					this.query.status = data.progressed;
					this.refundInfo.freight = data.freight;
					this.refundInfo.handlingFees = data.handlingFees;
				});
			},

			// 获取退款原因列表
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
			readExpenses(num) {
				this.expensesType = num;
				this.$refs.expensesToast.showPupop();
			},
			submitApply() {

				if (this.refundType == 2) {
					let content
					if(this.refundInfo.isWorker){
						content = "发起退款且通过后，该服务会记为结束状态，且服务者不会再提供服务，若您想对工艺项进行调整可以联系管家"
					}else{
						content = "发起退款且通过后，该服务会记为结束状态，且服务者不会再提供服务，若您想对服务内容进行调整可以联系客服"
					}
					uni.showModal({
						title: "是否确认退款",
						content: content,
						success: (res) => {
							if (res.confirm) {
								this.submitApplication();
							} else if (res.cancel) {}
						},
					});
					return;
				} else {
					this.submitApplication();
				}
			},
			submitApplication() {
				// 提交申请后该订单会进入到退款页面，状态显示退款中；并直接跳转到该订单退款详情页
				if (this.refundType == 5 || this.refundType == 2 ) {
					if (this.returnMoney > this.maxRefundAmount) {
						uni.showToast({
							title: "退款金额大于储值卡余额，请修改",
							icon: "none",
							duration: 1000,
						});
						return;
					}
					if (!/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(this.inputValue)) {
						uni.showToast({
							title: "您输入的金额错误，请重新输入",
							icon: "none",
							duration: 2000,
						});
						return;
					}
				}
				console.log("申请退款");
				if (this.type == "whole") {
					wholeOrderApplyForRefund({
						orderId: this.query.orderId, //订单明Id字段
						returnMoney: Number(this.returnMoney.toFixed(2).replace(".", "")), //申请退货钱数(分)
						reason: this.reasonName, //退款原因
						reasonId: this.reasonValue, //退款原因id
						remark: this.remarks, //备注
						freight: this.freight,
						handlingFees: this.handlingFees,
						status: this.query.status, //订单状态1进行中 2已完成
					}).then((data) => {
						console.log("data=", data, "data.id=", data.id);
						uni.redirectTo({
							url: `../refund-list/refunding-detail/refunding-detail?id=${data.id}`,
						});
					});
				} else {
					particalOrderApplyForRefund({
						orderDetailsId: this.orderDetailsId ?
							this.orderDetailsId : this.orderDetailId, //订单明Id字段
						returnMoney: Number(this.returnMoney.toFixed(2).replace(".", "")), //申请退货钱数(分)
						reason: this.reasonName, //退款原因
						reasonId: this.reasonValue, //退款原因id
						remark: this.remarks, //备注
						freight: this.freight,
						handlingFees: this.handlingFees,
						status: this.query.status, //订单状态1进行中 2已完成
					}).then((data) => {
						console.log("打印返回的数据=", data, "退款单id（data.id）=", data.id);
						uni.redirectTo({
							url: `../refund-list/refunding-detail/refunding-detail?id=${data.id}`,
						});
					});
				}
			},

			showToast(){
				switch(this.refundType){
					case 2:
						this.errorTitle = "退款金额大于最大退款金额，请修改"
						break
					case 5:
						this.errorTitle = "退款金额大于储值卡余额，请修改"
				}
			},

			onKeyFocus() {
				this.isFocus = true;
				if (!this.inputValue) {
					this.inputValue = "";
				}
			},
			onKeyBlur() {
				console.log("失去焦点！！！！！")
				// 缺少输入退款金额值的判断及弹框提示数据
				if (this.inputValue == "") {
					this.inputValue = this.refundAmount;
				}
				this.showEditInput = false;

					if (!/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(this.inputValue)) {
					uni.showToast({
						title: "您输入的金额错误，请重新输入",
						icon: "none",
						duration: 2000,
					});
					// this.inputValue =  Number(this.inputValue).toFixed(2)
				} else {
					this.inputValue = Number(this.inputValue).toFixed(2);
				}
				this.inputValue = Number(this.inputValue).toFixed(2);
				if (this.inputValue > this.maxRefundAmount) {
					uni.showToast({
						title: this.errorTitle,
						icon: "none",
						duration: 1000,
					});
					return;
				}

			},
			onTextAreaInput(event) {
				this.textAreaLength = event.target.value.length;
			},

			// 请选择原因
			openPopup() {
				uni.showActionSheet({
					itemList: this.reasonList,
					success: (res) => {
						this.reasonName = this.reasonList[res.tapIndex];
						this.reasonValue = this.refundReasonList.filter((item) => {
							return item.itermName == this.reasonList[res.tapIndex];
						})[0].itermValue;
						console.log("this.reasonValue=", this.reasonValue);
					},
					fail: (res) => {
						console.log(res.errMsg);
					},
				});
			},

			handlePrice(price) {
				if (!price) return ["0", "00"];
				let list = String(price).split(".");
				if (list.length == 1) {
					return [list[0], "00"];
				} else {
					return [list[0], list[1]];
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header-title {
		margin-bottom: 32rpx;
		.title {
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;
		}

		.tip {
			color: #999999;
			font-weight: 400;
			font-size: 24rpx;
		}
	}

	.server-order-tip {
		background-color: #fef7f8;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 24rpx;
		height: 98rpx;
		font-weight: 400;
		color: #ff3347;
		line-height: 34rpx;
		font-size: 24rpx;
	}

	.container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: #f2f3f3;
		padding-bottom: 400rpx;

		.product-container {
			margin-top: 16rpx;
			padding: 32rpx;
			background: #ffffff;
			border-radius: 24rpx;

			.deposit {
				display: flex;
				justify-content: flex-end;
				margin: 24rpx 0 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				font-size: 22rpx;

				.item {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;
					width: 302rpx;
					color: #999999;
				}
			}

			.price-container {
				.price-item {
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					color: #808080;
					font-size: 24rpx;

					.header {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;

						.icon {
							width: 24rpx;
							height: 24rpx;
							// border-radius: 50%;
							line-height: 24rpx;
							text-align: center;
							// color: #999999;
							// border: 2rpx solid #999999;
						}
					}
				}
			}
		}

		.refund-container {
			margin-top: 16rpx;
			width: 100%;
			background-color: #ffffff;
			border-radius: 16rpx;

			.refund-reason {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: space-between;
				background-color: #ffffff;
				border-radius: 32rpx 32rpx 0 0;
				padding: 24rpx 16rpx 40rpx 32rpx;
				height: 120rpx;
				font-size: 28rpx;
				box-sizing: border-box;

				.left {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;

					.icon {
						color: #ff3b30;
						width: 24rpx;
						height: 28rpx;
					}
				}

				.reason {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					color: #666666;

					image {
						width: 64rpx;
						height: 64rpx;
						object-fit: cover;
						margin-left: 16rpx;
						margin-bottom: 8rpx;
					}
				}
			}

			.line {
				height: 0.5px;
				margin-left: 56rpx;
				background: #f2f3f3;
			}

			.refund-price {
				background-color: #ffffff;
				border-radius: 0 0 24rpx 24rpx;

				.show-price {
					padding: 28rpx 16rpx 6rpx 32rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						font-size: 28rpx;

						.icon {
							color: #ff3b30;
							width: 24rpx;
							height: 28rpx;
						}
					}

					.right2 {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						color: #666666;

						image {
							width: 64rpx;
							height: 64rpx;
							object-fit: cover;
							margin-left: 16rpx;
						}
					}
				}

				.edit-price {
					padding: 40rpx 32rpx 16rpx;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						flex-flow: row nowrap;
						align-items: center;
						font-size: 28rpx;

						.icon {
							color: #ff3b30;
							width: 24rpx;
							height: 28rpx;
						}
					}

					.right1 {
						color: #ff3347;
						font-size: 40rpx;
						line-height: 40rpx;

						.eidt-style {
							display: flex;
							flex-flow: row nowrap;
							align-items: center;
							color: #ff3347;

							.input-style {
								// background-color: #f3f3f3;
								max-width: 440rpx;
								color: #ff3347;
								font-size: 38rpx;
								margin-right: 80rpx;
							}
						}
					}
				}

				.tip-text {
					padding: 0 32rpx 40rpx 56rpx;
					color: #aaaaaa;
					font-size: 24rpx;
					line-height: 38rpx;
					border-radius: 0 0 24rpx 24rpx;
				}
			}
		}

		.remark-container {
			margin-top: 16rpx;
			background-color: #ffffff;
			padding: 40rpx 32rpx;
			border-radius: 16rpx;

			.header {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 24rpx;
				font-size: 28rpx;
				color: #666666;
			}

			.body {
				position: relative;

				.remark {
					background-color: #fafbfc;
					width: 686rpx;
					height: 388rpx;
					box-sizing: border-box;
					border-radius: 16rpx;
					padding: 24rpx 24rpx 56rpx;
					border: 0.5px solid #eeeeee;
				}

				.fontNum {
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;
				}
			}
		}

		.proposal {
			padding: 24rpx 32rpx;
			color: #808080;
			font-size: 24rpx;
			line-height: 34rpx;
		}

		.sumbit-button {
			z-index: 999;
			position: fixed;
			bottom: 0;
			width: 686rpx;
			background-color: #ffffff;
			padding: 24rpx 34rpx;

			.buttons {
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 12rpx;
				font-weight: bold;
				background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
				font-size: 32rpx;
				color: #ffffff;
			}

			.buttons1 {
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				font-weight: bold;
				border-radius: 12rpx;
				background: linear-gradient(99deg, #00ccbe 0%, #00c2bf 100%);
				opacity: 0.5;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
</style>
