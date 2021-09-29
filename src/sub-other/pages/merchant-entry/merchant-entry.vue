<template>
	<view class="merchant-entry">
		<view class="head">
			<view class="info">
				填写入驻信息
			</view>
			<view class="info">
				已有{{dayNumber * 5 + 350}}家企业
			</view>
			<view class="info">
				入驻开店
			</view>
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
					<input type="text" :value="companyValue" placeholder="请输入30个字以内" @input="companyHandler($event)" />
					<image src="../../../static/merchant-entry/live_input_clear.png" mode=""
						@click="deleteCompanyName()" v-if="companyValue != ''"></image>
				</view>
				<view class="service-city">
					<view class="label">
						服务城市
					</view>
					<view class="value" v-if="seriverCity.length > 0" v-for="(item, index) in cityList">
						<view class="text">
							{{item.name}}
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
		<view class="bottom-fiexd">

		</view>
		<view class="bottom">
			<button type="default" class="get-phone" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber"
				v-if="showBottomButtom()"></button>
			<!-- <image class="image-bottom" src="../../static/merchant-entry/merchant-entry-success.biaoqian.png" mode=""> -->
			</image>
			<view class="pay-money" :class="showBottomButtom() ? '' : 'pay-money-no'">
				<!-- <view class="money">
					<text class="icon">￥</text>
					<text class="year-money">3000/年</text>
					<text class="pay">立即支付</text>
				</view>
				<view class="text">
					低至8.33元/天，近半年最低价
				</view> -->
				<view class="submit-text" @click="submitHandler">
					提交入驻申请
				</view>
			</view>
			<view class="argument">
				<view class="img-box" @click="argumentFileHandler">
					<image v-if="argumentFile" src="../../static/merchant-entry/merchant-entry-select.png" mode="">
					</image>
					<view v-if="!argumentFile" class="circle">
					</view>

				</view>
				<view class="box">
					<text>我已完成阅读并同意</text>
					<a href="" @click="toArguments($event)">《打扮家商家入驻协议》</a>
				</view>
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
		<!-- <uni-popup ref="popupCiry" type="bottom">
			<view class="city-select-box">
				<city-select />
			</view>
		</uni-popup> -->
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
				<business-category ref='businessCategoryRef' @closeBusinessPopup='closeBusinessPopup'
					@confirmBusiness='confirmBusiness' :categroyTreeList='categroyTreeList' />
			</view>
		</uni-popup>
		<!-- <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
		<!-- <button type="default" @click="toPay">去支付</button> -->
	</view>
</template>

<script>
	import {
		getOpenId,
		payEntryFee,
		getCategroyTree,
		supplierEntry
	} from "../../../api/other.js";
	import CitySelect from "./components/city-select.vue";
	import BusinessCategory from "./components/business-category.vue";
	import {
		mapState,
		mapGetters
	} from "vuex";
	import dayjs from "dayjs";
	export default {
		data() {
			return {
				openId: "",
				companyValue: '',
				dayNumber: 0,
				phoneInfo: {},
				seriverCity: [{
						text: '北京',
						type: -1
					},
					{
						text: '北京'
					}
				],
				argumentFile: true,
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
		computed: {
			...mapState({
				cityList: (state) => state.merchantEntry.cityList,
			}),
		},
		mounted() {
			getCategroyTree().then((res) => {
				this.categroyTreeList = res
			})
			let time = Date.parse(new Date());
			let lasttime = Date.parse("2021-09-23");
			let day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
			this.dayNumber = day;
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
				if (e.detail.cloudID) {
					this.toPay();
				}
			},
			toPay() {
				// uni.navigateTo({
				// 	url:'../merchant-entry-success/merchant-entry-success'
				// })
				const ids = [];
				// const businessList = JSON.parse(JSON.stringify(this.businessCategoryList));
				// businessList.forEach((item) => {
				// 	item.threeLevelCategoryId = item.threeLevelCategoryId.split('c')[1];
				// })
				// if (businessList.id.join("c")[1] == 'c') {
				// 	businessList.id = 
				// }
				this.cityList.forEach((item) => {
					ids.push(item.id);
				})
				let params = {
					// payType: 1,
					// amount: 1,
					openid: this.openId,
					encryptedData: this.phoneInfo.encryptedData,
					iv: this.phoneInfo.iv,
					entry: {
						name: this.companyValue,
						// phone: '',
						cityIds: ids,
						scopes: this.businessCategoryList
					},
				};
				
				supplierEntry(params).then((res) => {
					console.log(res, '>>>>>>>')
					uni.navigateTo({
						url: '../merchant-entry-success/merchant-entry-success'
					})
				}).catch((res) => {
					// error.response.data.message
					console.log(res,);
					// uni.showToast({
					// 	title: "1",
					// 	icon: 'none'
					// })
				})
				// payEntryFee(params).then((e) => {
				// 	const payInfo = e.wechatPayJsapi;
				// 	uni.requestPayment({
				// 		provider: "wxpay",
				// 		...payInfo,
				// 		success(res) {
				// 			if (res.errMsg == 'requestPayment:ok') {
				// 				uni.navigateTo({
				// 					url: '../merchant-entry-success/merchant-entry-success'
				// 				})
				// 			}
				// 		},
				// 		fail(e) {
				// 			console.log(e);
				// 			uni.navigateTo({
				// 				url: '../merchant-entry-failed/merchant-entry-failed'
				// 			})
				// 		},
				// 	});
				// });
			},
			showBottomButtom() {
				if (this.cityList.length > 0 && this.businessCategoryList.length > 0 && this.companyValue != '' && this
					.argumentFile) {
					return true;
				} else {
					return false;
				}
			},
			// 删除公司名称
			deleteCompanyName() {
				this.companyValue = '';
			},
			// 删除城市
			deleteCity(index) {
				this.$refs.deletePopup.open('center')
				this.deleteStatus = {
					isBusinessCategory: false,
					index: index
				}
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
			noDelete() {
				this.$refs.deletePopup.close('center')
			},
			confirmDelete() {
				if (this.deleteStatus.isBusinessCategory) {
					this.$refs.businessCategoryRef.modifyNumberList(this.businessCategoryList[this.deleteStatus.index])
					this.businessCategoryList.splice(this.deleteStatus.index, 1);
				} else {
					const cityList = JSON.parse(JSON.stringify(this.cityList));
					cityList.splice(this.deleteStatus.index, 1);
					this.$store.dispatch('deleteCity', {
						cityList: cityList
					})
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
					// this.$refs.popupCiry.open('bottom')
					if (this.cityList.length == 1) {
						if (this.cityList[0].id == -1) {
							this.$store.dispatch('setCityList', {
								cityList: []
							})
						}
					}
					uni.navigateTo({
						url: '../city-select-entry/city-select-entry'
					})
				} else {
					this.$store.dispatch('setCityList', {
						cityList: [{
							name: '全国范围',
							id: -1
						}]
					})
				}
			},
			// 关闭经营品类
			closeBusinessPopup() {
				this.$refs.popupBusiness.close('bottom')
			},
			// 确认选择品类
			confirmBusiness(list) {
				this.businessCategoryList = list;
				this.$refs.popupBusiness.close('bottom')
			},
			// 公司名称
			companyHandler(e) {
				this.companyValue = e.detail.value;
			},
			toArguments(e) {
				e.preventDefault();
				uni.navigateTo({
					url: '../merchant-entry-webview/merchant-entry-webview?url=https://ali-res.dabanjia.com/res/20210929/17/163290903769698.pdf'
				})
				// uni.downloadFile({
				// 	url: 'https://ali-res-test.dabanjia.com/res/20210928/21/1632834978647_0398%24%E8%A3%85%E4%BF%AE%E5%B9%B3%E5%8F%B02.0%E6%8E%92%E6%9C%9F%E8%AE%A1%E5%88%921.pdf', //仅为示例，并非真实的资源  
				// 	success: (res) => {
				// 		if (res.statusCode === 200) {
				// 			console.log('下载成功');
				// uni.openDocument({
				// 	// filePath: res.tempFilePath,
				// 	filePath: 'https://ali-res.dabanjia.com/res/20210929/14/163289590753573.pdf',
				// 	fileType: 'pdf',
				// 	success: (res) => {
				// 		console.log(res, '>>>>>>>>>>>>>>')
				// 	},
				// 	fail: (res) => {
				// 		console.log(res, '>>>>>>>>>>>>')
				// 	}
				// })
				// 		}
				// 	}
				// })
			},
			argumentFileHandler() {
				console.log(123213)
				this.argumentFile = !this.argumentFile;
			},
			submitHandler() {
				console.log('submitHandler>>>>>>>>>>>')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.merchant-entry {
		width: 100%;
		height: 100%;

	}

	.merchant-entry>.head {
		width: 100%;
		height: 312rpx;
		background-image: url(../../../static/merchant-entry/merchant-entry-ic／bg.png);

		.info {
			font-size: 28rpx;
			font-family: HarmonyOS_Sans_Black;
			// color: #FFFFFF;
		}
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
				position: relative;

				input {
					background: #FBFCFC;
					border-radius: 6px;
					border: 1px solid #CBCCCC;
					margin-bottom: 48rpx;
					padding: 24rpx 0 24rpx 24rpx;
					caret-color: #35C4C4
				}

				image {
					width: 64rpx;
					height: 64rpx;
					position: absolute;
					right: 40rpx;
					top: 88rpx;
					z-index: 10;
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

	.bottom-fiexd {
		padding-bottom: 200rpx;
	}

	.bottom {
		width: 100%;

		background: #FEFFFE;
		position: fixed;
		bottom: 0;
		left: 0;

		.image-bottom {
			position: absolute;
			width: 164rpx;
			height: 62rpx;
			background: red;
			left: 200rpx;
			top: -30rpx;
		}

		.get-phone {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
		}

		.pay-money {
			margin: 24rpx 34rpx 16rpx 30rpx;
			background: linear-gradient(135deg, #00CCBE 0%, #00C2BF 100%);
			border-radius: 6px;
			height: 88rpx;
			text-align: center;

			.submit-text {
				width: 100%;
				padding: 24rpx 0;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}

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

		.pay-money-no {
			background: linear-gradient(135deg, #00CCBE 0%, #00C2BF 100%);
			opacity: .4;
		}

		.argument {
			margin: 16rpx 0 40rpx 0;
			font-size: 11px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			display: flex;
			justify-content: center;
			align-items: center;

			.img-box {
				margin-right: 4rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			image {
				display: block;
				width: 30rpx;
				height: 28rpx;
				background: red;
			}

			.circle {
				width: 30rpx;
				height: 26rpx;
				border-radius: 50%;
				border: 1px solid #A8A8A8;
			}

			.box {
				display: flex;
				justify-content: center;
				align-items: center;
			}

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

	.business-category-box {
		width: 100%;
		height: 1200rpx;
	}

	.delete-popup {
		background: #FFFFFF;
		border-radius: 16rpx;
		width: 526rpx;

		.info {
			padding: 48rpx 0;
			text-align: center;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #333333;
			border-bottom: 1px solid #F5F5F5;
		}

		.button-box {
			display: flex;
			padding: 24rpx 0;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;

			.no-confirm {
				flex: 1;
				text-align: center;
			}

			.confirm {
				flex: 1;
				font-weight: 500;
				color: #35C4C4;
				text-align: center;
			}
		}
	}
</style>
