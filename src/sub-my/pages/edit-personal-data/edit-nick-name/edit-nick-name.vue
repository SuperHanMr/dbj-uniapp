<template>
	<view class="container">
		<view class="nick-name-input">
			<input 
				:value="nickName" 
				class="input-style"  
				@input="onInput"
				placeholder-style="font-size: 28rpx;padding-top:6rpx;"
				placeholder="请输入昵称"
			 />
		
			<image 
				class="icon" 
				src="../../../static/mine_input_clear@2x.png"
				mode=""
				@click="clearInfo"
			 />
				
		</view>
		<view class="remarks">
			*限1-12个中文、英文或数字
		</view>
		
		
		<view class="footer" :style="{bottom:systemBottom}">
			<view class="button">
				保存
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:"",
				
				
				tabbar: true,
				windowHeight: '',
				
				systemBottom: "",
				systemHeight: "",
				containerBottom: "",
				
			}
		},
		mounted(e) {
		  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		  this.systemBottom = menuButtonInfo.bottom + "rpx";
		  console.log(this.systemBottom);
		},
		
		onLoad(e) {
			this.nickName  = e.nickName
			console.log("this.nickName=",this.nickName)
		},
			
		methods: {
			clearInfo(){
				this.nickName = ""
			},
			
			onInput(e){
				this.nickName=e.detail.value
				console.log("this.nickName=",this.nickName)
			}
		},
	}
</script>

<style lang="scss" scoped>
.container{
	.nick-name-input{
		margin: 24rpx  32rpx 16rpx;
		width: 686rpx;
		height: 96rpx;
		background: #ffffff;
		border-radius: 16rpx;
		position: relative;
		.input-style{
			width: 686rpx;
			height: 96rpx;
			line-height: 96rpx;
			box-sizing: border-box;
			padding: 32rpx;
			font-size: 28rpx;
			color:red;
			caret-color: #35C4C4;
		}
		.icon{
			position: absolute;
			width: 48rpx;
			height: 48rpx;
			z-index: 999;
			border-radius: 50%;
			top: 28rpx;
			right:16rpx;
		}
	}
	.remarks{
		margin: 0 32rpx;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #999999;
	}
}
.footer{
	position: fixed;
	padding: 24rpx 32rpx;
	bottom: 0;
	background-color: #FFFFFF;
	.button{
		width: 686rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 32rpx;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		border-radius: 16rpx;
		color: #FFFFFF;
		
		
		
	}
}


</style>
