<template>
	<view>
		<view class="goods">
			<uni-number-box @change="sss"></uni-number-box>
		</view>
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

<style lang="scss" scoped>
	.textarea {
		background-color: #FFF;
		padding: 32rpx;


	}
</style>
