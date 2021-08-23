<template>
	<view class="content">
		装修
		<decorate-notice v-if="noticeActive" @closeNotice='closeNotice' class="decorate-notice"></decorate-notice> 
		<drag-button-follow :style.sync="style" @btnClick='noticeActive=true' :follow='`left,right`' className="drag-button" class="drag-button">
			<view>
				<text>消息</text>
				<text style="color: red;">2</text>
			</view>
		</drag-button-follow>
	</view> 
	  
</template>
 
<script>
	export default { 
	    data(){
	        return {
	            style: '',
				noticeActive:false
	        }
	    },
		methods:{
			closeNotice(){
				
				this.noticeActive = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.drag-button{
	    background: #FFFFFF;
	    border: 0.5px solid #EEEEEE;
	    box-shadow: 0 5rpx 10rpx 0 rgba(0,0,0,0.08);
	    width: 100rpx;
	    height: 100rpx;
	    font-size: 24rpx;
	    color: #000000;
	    position: absolute;
	    right: 0rpx;
	    bottom: 188rpx;
	    border-radius: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}

</style>
