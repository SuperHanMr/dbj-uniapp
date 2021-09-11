<template>
	<view class="no-house-decorate">
		<view class="content">
			<view class="addhouse-decs" v-if="!currentHouse && !currentHouse.id">
				<button class="addhouse" @click="goAddHouse">
					<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/ic_add_house_info.svg"></image>
					<text>添加房屋信息</text>
				</button>
				<view class="decs"><text>打扮家按房子面积计算价格</text></view>
			</view>
			<my-current-house v-else :houseData="currentHouse" @changCurrentHouse="changCurrentHouse">
			</my-current-house>
			<service-card :setting="checkHouse" class="service-card" @selectAnother="selectAnother('checkHouse')">
				<template slot="check">
					<check-box :checked="checkHouse.checked" @change="(value)=> {change(checkHouse.cardtype, value)}">
					</check-box>
				</template>
			</service-card>
		</view>
		<payment class="payment" @gotopay="gotopay" :pieces="pieces" :countPrice="countPrice"
			:isAllChecked="isAllChecked"></payment>
	</view>
</template>

<script>
	import ServiceCard from "../../components/service-card/service-card.vue";
	import Payment from "../../components/payment/payment.vue";
	import CheckBox from "../../components/check-box/check-box.vue";
	import DbjRadio from "../../components/dbj-radio/dbj-radio.vue";
	import {
		queryEstates,
		getProductsSkusPage,
    getServiceSku
	} from "../../../api/decorate.js"
  import { createOrder } from "../../../api/order-center.js"
	export default {
		components: {
			ServiceCard,
			Payment,
			CheckBox,
			DbjRadio
		},
		data() {
			return {
				dataList: [],
				checkHouse: {
					title: "验房服务",
					cardtype: "checkHouse",
					checked: true
				},
				currentHouse: {},
			}
		},
		computed: {
			isAllChecked() {
				return this.checkHouse.checked
			},
			pieces() {
				let num = this.checkHouse.checked + 0;
				return num
			},
			countPrice() {
				let qian = 0.00
				if (this.checkHouse.checked) {
					qian += Number(this.checkHouse.price) * 88
				}
				return qian + "0.00"
			}
		},
		onShow() {
			this.getMyHouseList();
			// this.getProductsSkusPage();
		},
		methods: {
      getServiceSku() {
        console.log(getApp().globalData)
        getServiceSku({
          codeKey: "inspection_default_service",
          province_id: 1,
          city_id: 1,
          area_id: 1,
          serveTypes: [2]
        }).then(data => {
          const {
            noHouseCheckId
          } = getApp().globalData
          if (!noHouseCheckId) {
            let checkHouseData = data.filter(t => t.serviceType === 1)
            if(checkHouseData && checkHouseData.length > 0) {
              this.checkHouse = {
                ...designData[0],
                title: "验房服务",
                cardtype: "checkHouse",
                checked: true,
                insideArea: this.currentHouse.insideArea
              }
            }
          }
        })
      },
			getProductsSkusPage() {
				getProductsSkusPage({
					categoryTypeId: [4, 5, 6]
				}).then(data => {
					this.dataList = data.list
					this.checkHouse = {
						...data.list[3],
						title: "验房服务",
						cardtype: "checkHouse",
						checked: true
					}
				})
			},
			selectAnother(pp) {
				if (pp === "checkHouse") {
					uni.navigateTo({
						url: '/sub-decorate/pages/design-service-list/design-service-list?id=4'
					})
				}
			},
			changCurrentHouse() {
				uni.redirectTo({
					url: "/sub-my/pages/my-house/my-house"
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
          this.getServiceSku()
				})
			},
			gotopay() {
				// TODO去结算页面
				if (this.currentHouse && this.currentHouse.id) {
					// uni.redirectTo({
					// 	url: ""
					// })
          
				} else {
					uni.showToast({
						title: "请您先添加房屋信息",
						icon: "none",
						duration: 3000
					})
				}
			},
      createOrder(obj) {
        createOrder(obj).then(data => {
          
        })
      },
			change(id, value) {
				if (id === "checkHouse") {
					this.checkHouse.checked = value;
				}
			},
			goAddHouse() {
				uni.navigateTo({
					url: "/sub-decorate/pages/add-house/add-house"
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
		align-items: felx-start;
		box-sizing: border-box;
		height: 100%;
		// font-size: 20rpx;
	}

	.content {
		height: calc(100% - 250rpx);
	}

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

	.radio-wrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx 0;

		.radio-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 0 10rpx;
			font-size: 24rpx;

			text {
				text-indent: 10rpx;
			}
		}
	}
</style>
<style>
	.uni-popup__info {
		font-size: 28rpx !important;
	}
</style>
