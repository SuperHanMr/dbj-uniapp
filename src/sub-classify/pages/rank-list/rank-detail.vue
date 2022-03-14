<template>
	<view class="container">
		<custom-navbar
		  :opacity="scrollTop/100"
		  title="品牌详情"
		  bgcolor="#FFF"
		>
		  <template v-slot:back>
		    <view @click="toBack">
		      <i
		        class="icon-ic_cancel_white header-back"
		        style="color:'black'"
		      >
		      </i>
		    </view>
		  </template>
		</custom-navbar>
		<view class="baseInfo-contaienr">
			<view class="bgImg"></view>
			
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
			toBack(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
		.container{
			height: 100%;
		}
		.baseInfo-contaienr{
			padding: 0;
		}
		
</style>
