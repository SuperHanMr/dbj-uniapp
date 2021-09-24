<template>
	<view>
		<uni-popup
		  ref="popup"
		  type="dialog"
		>
		  <uni-popup-dialog
		    mode="base"
		    :title="title"
		    :before-close="true"
		    @close="close"
		    @confirm="confirm"
		  />
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		name:"popup-dialog",
		props:{
			title:{
				type:String
			
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
				open(){
					this.$refs.popup.open()
				},
				close(){
					this.$refs.popup.close()
				},
				confirm(){
					
					this.$refs.popup.close()
					this.$emit('confirm')
				}
			
		}
	}
</script>

<style lang="scss" scoped>

::v-deep .uni-popup-dialog {
  width: 560rpx !important;
  border-radius: 24rpx !important;
  background-color: #fff !important;
}
::v-deep .uni-dialog-title-text {
  color: #111111 !important;
  font-size: 32rpx !important;
  font-weight: 550 !important;
}
::v-deep .uni-dialog-title {
  padding: 48rpx 0 !important;
}
::v-deep .uni-dialog-content {
  display: none !important;
}
::v-deep .uni-dialog-button-group {
  border-top: 2rpx solid #f5f5f5;
}
::v-deep .uni-dialog-button {
  height: 82rpx !important;
}
::v-deep .uni-button-color {
  color: #ff3347 !important;
  font-size: 30rpx !important;
  font-weight: 500;
}
::v-deep .uni-dialog-button-text {
  font-size: 30rpx !important;
}
</style>
