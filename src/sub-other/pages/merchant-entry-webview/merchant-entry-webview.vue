<template>
		<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(props) {
			this.url = props.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
