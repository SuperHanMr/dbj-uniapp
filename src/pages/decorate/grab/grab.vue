<template>
	<view class="grab">
		<view class="grab-header">
			<image class="grab-header-image"></image>
			<view class="grab-header-name">
				<view class="grab-header-name-top">
					<text class="name">姓名</text>
					<text class="icon">量房</text>
				</view>
				<view class="grab-header-name-bottom">
					<button class="btn">发消息</button>
				</view>
			</view>
			<button type="default" @click="toReplace">申请更换</button>
		</view>
		<view class="grab-content">
			<text>徽章</text>
			<view class="badge"></view>
		</view>
		<view class="grab-bottom">
			<button class="submit" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:123
			};
		},
		methods:{
			toReplace(){
				uni.navigateTo({
					url:"/pages/decorate/replace-worker/replace-worker?id="+this.id
				})
			},
			submit(){
				uni.switchTab({
					url:'/pages/decorate/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
