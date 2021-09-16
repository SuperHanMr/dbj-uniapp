<template>
	<view>
		<button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
		<button type="default" @click="toPay">去支付</button>
	</view>
</template>

<script>
	import {
		getOpenId,
		payEntryFee
	} from "../../../api/other.js"
	export default {
		data() {
			return {
				openId: '',
				phoneInfo:{}
			}
		},
		onLoad() {
			let vm = this
			wx.login({
				success: (res) => {
					if (res.code) {
						//微信登录成功 已拿到code
						// ...doSomething
						console.log(res);
						vm.getOpen(res.code)

					} else {
						console.log("登录失败！" + res.errMsg);
					}
				},
			});
		},
		methods: {
			getOpen(code) {
				getOpenId({
					code
				}).then(e => {
					this.openId = e.openid
					console.log(this.openId);
				})
			},
			decryptPhoneNumber(e) {
				console.log(e);
				this.phoneInfo=e.detail;
			},
			toPay() {
				let params = {
					payType:1,
					amount:1,
					openid:this.openId,
					encryptedData:this.phoneInfo.encryptedData,
					iv:this.phoneInfo.iv,
					entry:{
						name:'996icu'
					}
				}
				payEntryFee(params).then(e=>{
					const payInfo = e.wechatPayJsapi;
					uni.requestPayment({
					  provider: "wxpay",
					  ...payInfo,
					  success(res) {},
					  fail(e) {
					    console.log(e);
					  },
					});
				})

			}
		}
	}
</script>

<style>

</style>
