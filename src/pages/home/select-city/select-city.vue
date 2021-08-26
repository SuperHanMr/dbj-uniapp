<template>
	<view>
		<city-select @cityClick="cityClick"  :currentCity="currentCity" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity"
			:obtainCitys="obtainCitys" :isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formatName: 'title',
				//当前城市
				activeCity: null,
				currentCity:{},
				//显示的城市数据
				obtainCitys: [
				]
			}
		},
		onLoad(e) {
			if(e&&e.title){

				this.currentCity={
					id:e.id,
					title:e.title
				}
				console.log('~~~~~~~~~~')
				console.log(this.currentCity)
			}
			let activeCity=getApp().globalData.city
			if(activeCity){
				this.activeCity= {id:1,title:activeCity} ;
			}
			
		},
		methods: {
			cityClick(e) {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];
				prevPage.setData({
					city: e
				});
				uni.navigateBack({

				});

			}
		}
	}
</script>

<style>

</style>
