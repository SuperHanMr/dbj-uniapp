<template>
	<view class="real-case">
		1111
		<DesignCase />
		<Decorate />
	</view>
</template>

<script>
	import DesignCase from './component/design-case.vue';
	import Decorate from './component/decorate.vue';
	export default {
		components: {
			DesignCase,
			Decorate
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.real-case{
	height: 100%;
	background-color: #FFFFFF;
}
</style>
