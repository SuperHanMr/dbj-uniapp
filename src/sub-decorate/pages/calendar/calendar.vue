<template>
	<view>
		 <uni-calendar 
		    :insert="true"
		    :lunar="true" 
		    :start-date="'2019-3-2'"
		    :end-date="'2019-5-20'"
			:selected="selectedList"
		    @change="change"
		     />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedList:[{date: '2021-08-20', info: '签到'}]
			};
		},
		methods:{
			change(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">

</style>
