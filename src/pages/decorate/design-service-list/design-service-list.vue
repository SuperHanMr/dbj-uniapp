<template>
	<view class="design-list">
		<service-content-card class="card-item" v-for="(item, index) in dataList" :key="item.id" :content="item">
			<template slot="radio">
				<dbj-radio class="card-radio" :value="item.id + ''" :checked="checkedId === item.id + ''"
					@change="radioChange"></dbj-radio>
			</template>
		</service-content-card>
	</view>
</template>

<script>
	import {
		getProductsSkusPage
	} from "../../../api/decorate.js"
	import {
		DbjRadio
	} from "../../../components/dbj-radio/dbj-radio.vue"
	import {
		ServiceContentCard
	} from "../../../components/service-content-card/service-content-card.vue"
	export default {
		components: {
			DbjRadio,
			ServiceContentCard
		},
		data() {
			return {
				dataList: [],
				checkedId: "",
				categoryTypeId: null
			}
		},
		onLoad(option) {
			this.categoryTypeId = option.id
			console.log(this.categoryTypeId)
		},
		onShow() {
			this.getProductsSkusPage();
		},
		methods: {
			getProductsSkusPage() {
				getProductsSkusPage({
					categoryTypeId: [Number(this.categoryTypeId)]
				}).then(data => {
					this.dataList = data.list
				})
			},
			radioChange(obj) {
				this.checkedId = obj.value
				if (this.categoryTypeId == 6) {
					getApp().globalData.noHouseDesignId = obj.value
				} else if (this.categoryTypeId == 5){
					getApp().globalData.noHouseActuaryId = obj.value
				} else if (this.categoryTypeId == 4) {
					getApp().globalData.noHouseCheckId = obj.value
				}
				setTimeout(() => {
					console.log(getApp().globalData)
				}, 0)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.design-list {
		display: flex;
		flex-direction: column;
	}

	.card-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
</style>
