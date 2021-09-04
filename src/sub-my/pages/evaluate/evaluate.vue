<template>
	<view class="evaluate-container">
		<view class="evaluate-item">
			
			<view class="header">
			  <view class="store-name">
			    <text>不知道叫什么名字的店铺nizhidaomahahahahahahaha</text>
			  </view>
			  <view class="order-status">
					待评价
			  </view>
				<!-- <view class="order-status">
					已评价
				</view> -->
			</view>
			<view class="body">
				<order-item></order-item>
			</view>
			<view class="line" />
			
			<view class="footer">
				<view class="button-container">
					<button
						type="default"
						size="mini"
						@click="immediateEvalute()"
					>立即评价</button>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			immediateEvalute(){
				console.log("立即评价");
				uni.navigateTo({
					url:"immediate-evaluate/immediate-evaluate",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-container{
		width: 100%;
		height: 100%;
		background-color: skyblue;
		overflow-y: auto;
		.evaluate-item{
			background-color: #FFFFFF;
		}
	}
	.header {
		height: 96rpx;
		margin-top: 16rpx;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			text {
				font-weight: 1000;
				max-width: 476rpx;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.order-status {
			color: #808080;
			font-size: 24rpx;
			line-height: 32rpx;
			// font-weight: 800;
		}
	}
	
	.body{
		padding: 32rpx 32rpx 0;
	}
	
	.line {
		width: 100%;
		height: 1rpx;
		background-color: #f2f2f2;
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content:  flex-end;
		padding: 24rpx 32rpx;
		// text-align: right;
		background-color: #ffffff;
		
		.button-container{
			display: flex;
			flex-flow: row nowrap;
			justify-content:  flex-end;
				button{
					width: 140rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 24rpx;
					display: block;
					border-radius: 32rpx;
					// border: 2rpx solid #CCCCCC;
					color: #FFFFFF;
					padding: 0;
					background: linear-gradient(135deg, #36D9CD 0%, #28C6C6 100%);   
				}
		}
	}
	button{
		display: none;
	}
	button::after {
	  border: none;
	}
</style>
