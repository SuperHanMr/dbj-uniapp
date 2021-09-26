<template>
	<view class="city-select">
		<entry-indexed :options="cityArr" :showSelect="true" @click="bindClick"></entry-indexed>
	</view>
</template>

<script>
	import {cityList} from "./cityList.js";
	import entryIndexed from "./entry-indexed.vue"
	export default {
		data(){
			return {
				cityArr: cityList()
			}
		},
		components:{
			entryIndexed
		},
		methods:{
			bindClick(param){
				this.$emit('click', {
					select: param.select
				})
			}
		}
	}
</script>

<style>
	.city-select{
		position: relative;
		width: 100%;
		height: 1300rpx;
		background: #FFFFFF;
	}
</style>
