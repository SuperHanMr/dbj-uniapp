<template>
	<view class="img-list">
		<view class="list-box1" v-if="imgList.length === 1">
			<image src="" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			imgList: {
				type: Array,
				default: []
			}
		},
		data(){
			return {}
		}
	}
</script>

<style lang="scss" scoped>
</style>
