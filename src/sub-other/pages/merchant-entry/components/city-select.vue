<template>
	<entry-indexed :options="cityArr" :showSelect="true" @click="bindClick"></entry-indexed>
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
		}
	}
</script>

<style>
</style>
