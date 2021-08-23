<template>
	<view class="">
		我的
		<uni-badge text="1"></uni-badge>
		<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
	</view>
	
	
</template>

<script>
	import {uniBadge} from '@dcloudio/uni-ui'
	export default {
	    components: {uniBadge}
	}
</script>

<style>
</style>
