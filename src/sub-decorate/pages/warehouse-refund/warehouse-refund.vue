<template>
	<view class="refund">
		<view class="goods">
			<uni-number-box class="num-input" @change="sss"></uni-number-box>
		</view>
		<refund-item></refund-item>
		<view class="textarea">

			<textarea v-model="reason" placeholder="退款原因" />
		</view>
		建议与商家沟通后再发起退款
		<button type="default">提交</button> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason: '',
				systemBottom: ""
			}
		},
		onLoad(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			uni.setNavigationBarTitle({
				title: '退款'
			});
		},
		methods: {

		},
	}
</script>
<style>
	.refund>>>.uni-numbox {

		width: 150rpx;
	}
</style>

<style lang="scss" scoped>
	.textarea {
		background-color: #FFF;
		padding: 32rpx;
	}

	.num-input {
		width: 100rpx;
		height: 20rpx;
	}
</style>
