<!--
 * @Author: wangbinyan
 * @Date: 2021-08-25 10:25:49
 * @LastEditTime: 2021-08-28 11:35:33
 * @LastEditors: wangbinyan
 * @Description: In User Settings Edit
 * @FilePath: \dbj-uniapp\src\pages\decorate\have-house-no-service\have-house-no-service.vue
-->
<template>
	<view class="have-house-no-service">
		<view class="title" @click="switchVisible">
			<text>我的家</text>
			<image class="ic-triangle" src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle.svg"></image>
		</view>
		<!-- 切换房屋弹窗 -->
		<uni-popup ref="sw">
			<house-switch :datalist="myHouseList" :current="current" @goAddHouse="addHouse" @checkHouse="checkHouse"></house-switch>
		</uni-popup>
		
		<view class="uni-padding-wrap">
			<view class="uni-title">{{ currentHouse.locationName }}{{currentHouse.housingEstate}}</view>
		</view>
		<view class="design-wrap">
			<view class="design" @click="goDesignPicture">
				<text>设计图</text>
				<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_triangle_999.svg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { HouseSwitch } from "../../../components/house-switch/house-switch.vue"
	import {
		queryEstates,
	} from "../../../api/decorate.js"
	export default {
		components: { HouseSwitch },
		data() {
			return {
				currentHouse: {},
				myHouseList: [],
				current: null
			}
		},
		mounted() {
			this.getMyHouseList();
		},
		computed: {},
		methods: {
			addHouse() {
				uni.navigateTo({
					url: "/pages/decorate/add-house/add-house"
				})
			},
			checkHouse(item) {
				this.current = item.id
				this.currentHouse = item
				this.$refs.sw.close()
			},
			getMyHouseList() {
				queryEstates({
					isNeedRelative: true
				}).then(data => {
					let i = 1;
					let names = ["设计阶段", "未开工", "已竣工"]
					for(let item of data) {
						item.statusName = names[i - 1]
						item.status = i++
					}
					data[1].ext = "第二次装修"
					data[2].friend = true
					data[2].ext = "首次装修"
					this.myHouseList = data
					const arr = data.filter(t => t.defaultEstate)
					// let temp = null;
					// if(arr.length > 0) {
					// 	temp = arr[0]
					// } else {
					// 	data[0].defaultEstate = true
					// 	temp = data[0]
					// }
					// this.currentHouse = temp
					// this.current = temp.id
					this.currentHouse = arr[0]
					this.current = arr[0].id
					console.log(this.current, this.currentHouse)
				})
			},
			bindChange(e) {
				console.log(e)
			},
			switchVisible() {
				this.$refs.sw.open('top')
			},
			goDesignPicture(){
				uni.navigateTo({
					url:"/pages/decorate/design-picture/design-picture"
				})
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	
	
	
</style>
