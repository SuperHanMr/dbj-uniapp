<template>
	<view class="bottom-btn" :style="{paddingBottom:systemBottom,backgroundColor:bgcolor}">
		<button v-if="showDefaultBtn" class="add-btn" @click="submit">{{btnContent}}</button>
		<slot  ></slot>
	</view>
</template>

<script>
	export default {
		name: "bottom-btn",
		props: {
			btnContent:{
				type:String,
				default:'提交'
			},
			bgcolor: {
        type:String,
        default:"#fff"
      },
			showDefaultBtn: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				systemBottom: "",
				systemHeight: "",
			};
		},
		mounted(e) {
			this.systemBottom =  20 + "rpx";
		},
		methods: {
			submit() {
				this.$emit("submit");
			},
		},
	};
</script>

<style lang="scss">
	.bottom-btn {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 136rpx; 
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.add-btn {
			// margin-top: 20rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #53d5cc, #4fc9c9);
			border-radius: 12rpx;
			width: 686rpx;
			line-height: 88rpx;
			text-align: center;
			color: #ffffff;
			font-size: 32rpx;
		}
	}
</style>
