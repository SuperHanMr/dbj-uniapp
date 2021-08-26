<template>
	<view class="content">
    <view @click="addHouse">123</view>
		<decorate-notice v-if="noticeActive" @closeNotice='closeNotice' class="decorate-notice"></decorate-notice>
		<drag-button-follow :style.sync="style" @btnClick='noticeActive=true' :follow='`left,right`'
			className="drag-button" class="drag-button">
			<view>
				<text>消息</text>
				<text style="color: red;">2</text>
			</view>
		</drag-button-follow>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				style: '',
				noticeActive: false,
			}
		},
		methods: {
			closeNotice() {
				this.noticeActive = false
			},
      addHouse(){
        uni.navigateTo({
          url:"/pages/decorate/add-house/add-house"
        })
      }
		}
	}
</script>

<style lang="scss" scoped>

  
  .navi-header-state {
  	display: flex;
  	flex-direction: row;
  	width: 100%;
  	background-color: red;
  }
  
  .nav-bar {
  	height: var(--status-bar-height);
  	width: 100%;
  }
  
  .arrow-b {
  	width: 32rpx;
  	height: 32rpx;
  	margin-left: 1%;
  	margin-top: 2.5%;
  }
  
  .pop-up-ext {
  	position: fixed;
  	width: 100%;
  	// height: auto;
  }
  
  .pop-up-bu {
  	position: fixed;
    height: auto;
  	bottom: 0;
  	top: 0;
  	left: 0;
  	right: 0;
  	// background-color: rgba(0, 0, 0, 0.4);
  	// transition-duration: 0.3s;
  	// transition: 300ms ease 0ms;
  	// transform: translateY(102rpx);
  	// transition-property: transform, opacity;
  	// transform-origin: 50% 50%;
  	// opacity: 1;
  }
  
  .pop-up-content {
  	box-sizing: border-box;
  	width: 100%;
  	padding-bottom: 88rpx;
  	padding-left: 44rpx;
  	padding-right: 44rpx;
  	background-color: #fff;
  	// height: 100%;
  }
	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.drag-button {
		background: #FFFFFF;
		border: 0.5px solid #EEEEEE;
		box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
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
