<template>
	<view class="design-list">
		<service-content-card class="card-item" v-for="(item, index) in dataList" :key="item.id" :insideArea="insideArea" :content="item">
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
	} from "../../components/dbj-radio/dbj-radio.vue"
	import {
		ServiceContentCard
	} from "../../components/service-content-card/service-content-card.vue"
	export default {
		components: {
			DbjRadio,
			ServiceContentCard
		},
		data() {
			return {
				dataList: [],
				checkedId: "",
        title: null,
        categoryTypeId: null,
        serviceType: null,
        insideArea: null
			}
		},
		onLoad(option) {
      const {
        insideArea, id, categoryTypeId, name, serviceType
      } = option
			this.checkedId = id + ""
			this.title = name
			this.categoryTypeId = categoryTypeId
      this.serviceType = serviceType
			this.insideArea = insideArea
		},
		onShow() {
      uni.setNavigationBarTitle({
        title: this.title
      })
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
        uni.$emit('selectedServer', {
          serviceType: this.serviceType,
          values: tmp
        });
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
