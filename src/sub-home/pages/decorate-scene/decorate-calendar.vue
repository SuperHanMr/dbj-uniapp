<template>
	<view class="calendarWrap">
		<custom-calendar
		  :insert="true"
		  :lunar="false" 
		  :start-date="'2019-3-2'"
		  :end-date="'2019-5-20'"
			:selected="selectedList"
			:showMonth="false"
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

<style scoped>
	.calendarWrap{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #fff;
	}
</style>
