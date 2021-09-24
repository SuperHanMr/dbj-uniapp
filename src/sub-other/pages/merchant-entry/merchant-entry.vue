<template>
	<view class="merchant-entry">
		<view class="head">
			123123
		</view>
		<view class="container">
			<view class="info">
				<view class="title">
					商家信息
				</view>
				<view class="company-name">
					<view class="label">
						公司名称
					</view>
					<input type="text" value="" placeholder="请输入30个字以内" />
				</view>
				<view class="service-city">
					<view class="label">
						服务城市
					</view>
					<view class="value" v-if="seriverCity.length > 0" v-for="(item, index) in seriverCity">
						<view class="text">
							{{item.text}}
						</view>
						<image src="../../../static/merchant-entry/live_input_clear.png" mode=""
							@click="deleteCity(index)"></image>
					</view>
					<view class="add-service-city" @click="openSelectCity">
						<view class="icon">
							+
						</view>
						<view class="text">
							添加服务城市
						</view>
					</view>
				</view>
				<view class="business-category">
					<view class="label">
						经营品类
					</view>
					<view class="value" v-if="businessCategoryList.length > 0"
						v-for="(item, index) in businessCategoryList">
						<view class="text">
							{{item.label}}
						</view>
						<image src="../../../static/merchant-entry/live_input_clear.png" mode=""
							@click="deleteBusinessCategory(index)"></image>
					</view>
					<view class="add-service-city" @click="openBusinessCategory">
						<view class="icon">
							+
						</view>
						<view class="text">
							添加经营品类
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="pay-money">
				<view class="money">
					<text class="icon">￥</text>
					<text class="year-money">3000/年</text>
					<text class="pay">立即支付</text>
				</view>
				<view class="text">
					低至8.33元/天，近半年最低价
				</view>
			</view>
			<view class="argument">
				<text>支付即视为同意</text>
				<a href="">《打扮家商家入驻协议》</a>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="select-city-popup">
				<view class="head">
					<view class="text">
						请选择服务城市
					</view>
					<image src="../../../static/merchant-entry/live_input_clear.png" mode="" @click="closePopup">
					</image>
				</view>
				<view class="select">
					<view class="all-city" @click="selectCity(1)">
						全国范围
					</view>
					<view class="search-city" @click="selectCity(2)">
						按城市筛选
					</view>
				</view>
				<view class="line-bottom">
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupCiry" type="bottom">
			<view class="city-select-box">
				<city-select />
			</view>
		</uni-popup>
		<uni-popup ref="deletePopup" type="center">
			<view class="delete-popup">
				<view class="info">
					是否确认删除?
				</view>
				<view class="button-box">
					<view class="no-confirm" @click="noDelete">
						我再想想
					</view>
					<view class="confirm" @click="confirmDelete">
						确定删除
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupBusiness" type="bottom">
			<view class="business-category-box">
				<business-category ref='businessCategoryRef' @closeBusinessPopup='closeBusinessPopup' @confirmBusiness='confirmBusiness' :categroyTreeList='categroyTreeList' />
			</view>
		</uni-popup>
		<button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
		<button type="default" @click="toPay">去支付</button>
	</view>
</template>

<script>
	import {
		getOpenId,
		payEntryFee,
		getCategroyTree
	} from "../../../api/other.js";
	import CitySelect from "./components/city-select.vue";
	import BusinessCategory from "./components/business-category.vue";
	export default {
		data() {
			return {
				openId: "",
				phoneInfo: {},
				seriverCity: [{
						text: '北京',
						type: -1
					},
					{
						text: '北京'
					}
				],
				businessCategoryList: [],
				categroyTreeList: [],
				deleteStatus: {}
			};
		},
		components: {
			CitySelect,
			BusinessCategory
		},
		onLoad() {
			let vm = this;
			wx.login({
				success: (res) => {
					if (res.code) {
						//微信登录成功 已拿到code
						// ...doSomething
						console.log(res);
						vm.getOpen(res.code);
					} else {
						console.log("登录失败！" + res.errMsg);
					}
				},
			});
		},
		mounted() {
			getCategroyTree().then((res) => {
				this.categroyTreeList = res
			})
		},
		methods: {
			getOpen(code) {
				getOpenId({
					code,
				}).then((e) => {
					this.openId = e.openid;
					console.log(this.openId);
				});
			},
			decryptPhoneNumber(e) {
				console.log(e);
				this.phoneInfo = e.detail;
			},
			toPay() {
				let params = {
					payType: 1,
					amount: 1,
					openid: this.openId,
					encryptedData: this.phoneInfo.encryptedData,
					iv: this.phoneInfo.iv,
					entry: {
						name: "996icu",
					},
				};
				payEntryFee(params).then((e) => {
					const payInfo = e.wechatPayJsapi;
					uni.requestPayment({
						provider: "wxpay",
						...payInfo,
						success(res) {},
						fail(e) {
							console.log(e);
						},
					});
				});
			},
			// 删除城市
			deleteCity(index) {
				this.seriverCity.splice(index, 1);
			},
			// 删除经营品类
			deleteBusinessCategory(index) {
				this.$refs.deletePopup.open('center')
				this.deleteStatus = {
					isBusinessCategory: true,
					index: index
				}
				// this.$refs.businessCategoryRef.showCheckedNumber(this.businessCategoryList[index]);
				// this.businessCategoryList.splice(index, 1);
			},
			noDelete(){
				this.$refs.deletePopup.close('center')
			},
			confirmDelete(){
				if (this.deleteStatus.isBusinessCategory) {
					this.$refs.businessCategoryRef.showCheckedNumber(this.businessCategoryList[this.deleteStatus.index]);
					this.businessCategoryList.splice(this.deleteStatus.index, 1);
				} else {
					this.seriverCity.splice(this.deleteStatus.index, 1);
				}
				this.$refs.deletePopup.close('center')
			},
			// 打开城市选择
			openSelectCity() {
				this.$refs.popup.open('bottom')
			},
			closePopup() {
				this.$refs.popup.close('bottom')
			},
			// 打开经营品类选择
			openBusinessCategory() {
				this.$refs.popupBusiness.open('bottom')
			},
			selectCity(isAll) {
				this.$refs.popup.close('bottom')
				if (isAll == 2) {
					this.$refs.popupCiry.open('bottom')
				} else {
					this.seriverCity = [{
						text: '全国范围',
						type: -1
					}, ];
				}
			},
			// 关闭经营品类
			closeBusinessPopup(){
				this.$refs.popupBusiness.close('bottom')
			},
			// 确认选择品类
			confirmBusiness(list){
				console.log(list, '>>>>>>>>>');
				this.businessCategoryList = list;
				this.$refs.popupBusiness.close('bottom')
			}
		},
	};
</script>

<style lang="scss" scoped>
	.merchant-entry {
		width: 100%;
		height: 100%;

	}

	.merchant-entry>.head {
		width: 100%;
		height: 312rpx;
		background-image: url(../../../static/merchant-entry/icon1.jpg);
	}

	.container {
		padding: 24rpx;

		.info {
			padding-bottom: 1rpx;
			background-repeat: no-repeat;
			background-image: url(../../../static/merchant-entry/merchant-entry-container.png);
			background-size: 100% 100%;

			.title {
				padding: 40rpx 0 40rpx 24rpx;
				font-size: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.company-name,
			.service-city,
			.business-category {
				padding: 0 32rpx;

				.label {
					padding-bottom: 32rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #333333;
				}
			}

			.company-name {
				input {
					background: #FBFCFC;
					border-radius: 6px;
					border: 1px solid #CBCCCC;
					margin-bottom: 48rpx;
					padding: 24rpx 0 24rpx 24rpx;
				}
			}

			.service-city,
			.business-category {
				.value {
					display: flex;
					align-items: center;
					background: #FAFAFA;
					border-radius: 6px;
					margin-bottom: 24rpx;

					.text {
						flex: 1;
						padding: 24rpx 0 24rpx 24rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #111111;
					}

					image {
						margin: 12rpx 8rpx 12rpx 0;
						width: 64rpx;
						height: 64rpx;
					}
				}

				.add-service-city {
					border-radius: 16rpx;
					border: 1px solid #CBCCCC;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 24rpx 0;
					margin-bottom: 48rpx;

					.icon {
						font-size: 40rpx;
						color: #00C4B3;
						margin-right: 16rpx;
					}

					.text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #00C4B3;
					}
				}
			}
		}
	}

	.bottom {
		padding: 24rpx 34rpx 16rpx 30rpx;
		background: #FEFFFE;

		.pay-money {
			background: linear-gradient(135deg, #00CCBE 0%, #00C2BF 100%);
			border-radius: 6px;
			height: 88rpx;
			text-align: center;

			.money {
				font-weight: bold;
				color: #FFFFFF;

				.icon {
					font-size: 22rpx;
					font-family: PingFangSC-Medium, PingFang SC;
				}

				.year-money {
					font-size: 38rpx;
					font-family: Unnamed-Regular, Unnamed;
				}

				.pay {
					margin-left: 12rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
				}
			}

			.text {
				font-size: 10px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.argument {
			margin-top: 16rpx;
			font-size: 11px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				color: #999999;
			}
		}
	}

	.select-city-popup {
		background: #FFFFFF;
		border-radius: 32rpx 32rpx 0px 0px;
		padding-bottom: 64rpx;

		.head {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 32rpx 0;
			border-bottom: 1px solid #F2F3F3;
			position: relative;

			.text {
				text-align: center;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			image {
				position: absolute;
				right: 32rpx;
				top: 20rpx;
				width: 64rpx;
				height: 64rpx;
			}
		}

		.select {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #111111;

			.all-city,
			.search-city {
				text-align: center;
				padding: 28rpx 0;
			}

			.active-city {
				color: #35C4C4;
			}
		}

		.line-bottom {
			height: 16rpx;
			background: #F5F6F6;
		}
	}

	.city-select-box {
		width: 100%;
		height: 1200rpx;
	}
	.business-category-box{
		width: 100%;
		height: 1200rpx;
	}
	.delete-popup{
		background: #FFFFFF;
		border-radius: 16rpx;
		width: 526rpx;
		.info{
			padding: 48rpx 0;
			text-align: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #333333;
			border-bottom: 1px solid #F5F5F5;
		}
		.button-box{
			display: flex;
			padding: 24rpx 0;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			.no-confirm{
				flex: 1;
				text-align: center;
			}
			.confirm{
				flex: 1;
				font-weight: 500;
				color: #35C4C4;
				text-align: center;
			}
		}
	}
</style>
