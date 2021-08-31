<template>
	<view class="no-house-decorate">
		<view class="content">
			<view class="addhouse-decs" v-if="!currentHouse && !currentHouse.id">
				<button class="addhouse" @click="goAddHouse">
					<image src="../../../static/images/ic_add_house_info.svg"></image>
					<text>添加房屋信息</text>
				</button>
				<view class="decs"><text>打扮家按房子面积计算价格</text></view>
			</view>
			<my-current-house v-else :houseData="currentHouse" @changCurrentHouse="changCurrentHouse">
			</my-current-house>
			<service-card :setting="design" class="service-card" @selectAnother="selectAnother('design')">
				<template slot="check">
					<check-box :checked="design.checked" @change="(value)=> {change(design.cardtype, value)}">
					</check-box>
				</template>
			</service-card>
			<service-card :setting="actuary" class="service-card" @selectAnother="selectAnother('actuary')">
				<template slot="check">
					<check-box :checked="actuary.checked" @change="(value)=> {change(actuary.cardtype, value)}">
					</check-box>
				</template>
			</service-card>
		</view>
		<payment class="payment" @gotopay="gotopay" :isAllChecked="isAllChecked"></payment>
	</view>
</template>

<script>
	import ServiceCard from "../../../components/service-card/service-card.vue";
	import Payment from "../../../components/payment/payment.vue";
	import CheckBox from "../../../components/check-box/check-box.vue";
	import {
		queryEstates,
		getProductsSkusPage
	} from "../../../api/decorate.js"
	export default {
		components: {
			ServiceCard,
			Payment,
			CheckBox
		},
		data() {
			return {
				dataList: [],
				design: {
					// index: 1,
					// id: "design",
					// title: "设计服务",
					// fullName: "28.8全放个性化设计(适用全房设计…",
					// area: "100.00",
					// price: "199.00",
					// imageUrl: "https://img2.baidu.com/it/u=110114637,4171866431&fm=26&fmt=auto&gp=0.jpg",
					// checked: false
				},
				actuary: {
					// isLast: true,
					// index: 2,
					// id: "actuary",
					// title: "精算服务",
					// fullName: "28.8全放个性化设计(适用全房设计…",
					// area: "120.00",
					// price: "299.00",
					// imageUrl: "https://img2.baidu.com/it/u=110114637,4171866431&fm=26&fmt=auto&gp=0.jpg",
					// checked: true
				},
				currentHouse: {}
			}
		},
		computed: {
			isAllChecked() {
				return this.design.checked && this.actuary.checked
			}
		},
		onShow() {
			this.getMyHouseList();
			this.getProductsSkusPage();
		},
		methods: {
			getProductsSkusPage() {
				getProductsSkusPage({
					categoryTypeId: [5, 6]
				}).then(data => {
					this.dataList = data.list
					// const { noHouseActuaryId, noHouseDesignId } = getApp.globalData
					// if( noHouseActuaryId ) {

					// } else {

					// }
					// data.list.forEach((item, idx) => {
					// 	if() {
					// 		this.actuary = {
					// 			...item,
					// 			cardtype: "actuary",
					// 			checked: true
					// 		}
					// 	}
					// })
					this.actuary = {
						...data.list[0],
					  title: "精算服务",
						cardtype: "actuary",
						checked: true
					}
					this.design = {
						...data.list[1],
					  title: "设计服务",
						cardtype: "design",
						checked: true
					}
				})
			},
			selectAnother(pp) {
				if (pp === "design") {
					uni.navigateTo({
						url: '/pages/decorate/design-service-list/design-service-list?id=6'
					})
				}
				if (pp === "actuary") {
					uni.navigateTo({
						url: '/pages/decorate/design-service-list/design-service-list?id=5'
					})
				}
			},
			changCurrentHouse() {
				uni.redirectTo({
					url: "/pages/my/my-house/my-house"
				})
			},
			getMyHouseList() {
				queryEstates({
					isNeedRelative: true
				}).then(data => {
					let flt = data.filter(t => t.defaultEstate);
					if (flt && flt.length > 0) {
						this.currentHouse = flt[0]
					} else {
						this.currentHouse = {}
					}
				})
			},
			gotopay() {
				// TODO去结算页面
				if (this.currentHouse && this.currentHouse.id) {
					uni.redirectTo({
						url: ""
					})
				} else {
					uni.showToast({
						title: "请您先添加房屋信息",
						icon: "none",
						duration: 3000
					})
				}
			},
			change(id, value) {
				if (id === "design") {
					this.design.checked = value;
				} else if (id === "actuary") {
					this.actuary.checked = value;
				}
			},
			goAddHouse() {
				uni.navigateTo({
					url: "/pages/decorate/add-house/add-house"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-house-decorate {
		background-color: #f2f5f8;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.content {}

	.payment {
		padding: 24px 32rpx 92rpx;
	}

	.addhouse-decs {
		padding-bottom: 54rpx;
	}

	.addhouse {
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		width: 278rpx;
		height: 88rpx;
		opacity: 1;
		background: #333333;
		border-radius: 48rpx;
		margin-top: 40rpx;

		image {
			width: 18rpx;
			height: 18rpx;
			opacity: 1;
			margin-right: 12rpx;
		}

		text {
			height: 40rpx;
			opacity: 1;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #fff;
			line-height: 40rpx;
		}
	}

	.decs {
		text-align: center;
		margin-top: 24rpx;

		text {
			height: 36rpx;
			opacity: 1;
			font-size: 26rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #666666;
			line-height: 36rpx;
			letter-spacing: 2rpx;
		}
	}
</style>
