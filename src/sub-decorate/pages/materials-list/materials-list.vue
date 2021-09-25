<template>
	<view class="design-list">
		<material-content-card class="card-item" v-for="(item, index) in dataList" :key="item.id" :content="item">
			<template slot="radio">
				<dbj-radio class="card-radio" :value="item.id + ''" :checked="checkedId === item.id + ''"
					@change="radioChange"></dbj-radio>
			</template>
		</material-content-card>
	</view>
</template>

<script>
	import {
		getProductsSkusPage
	} from "../../../api/decorate.js"
	import DbjRadio from "../../components/dbj-radio/dbj-radio.vue"
	import MaterialContentCard from "../../components/material-content-card/material-content-card.vue"
	export default {
		components: {
			DbjRadio,
			MaterialContentCard
		},
		data() {
			return {
				dataList: [],
				checkedId: "",
        categoryTypeId: null
			}
		},
		onLoad(option) {
      const {
        id, categoryTypeId
      } = option
			this.checkedId = id + ""
			this.categoryTypeId = categoryTypeId
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
        let tmp = this.dataList.filter(t => t.id == Number(obj.value))[0]
        uni.$emit('selectedMaterial', {...tmp});
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
