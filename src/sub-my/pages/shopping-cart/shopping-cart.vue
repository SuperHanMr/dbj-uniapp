<template>
	<view class="cartContainer" :class="{'bg':showNoGoods}">
		<view class="noGoods" v-if="showNoGoods">
			<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/blank_ic%402x.png"
				class="noGoodsImg"></image>
			<view class="noGoodsText">
				购物车空空如也，快去逛逛吧～
			</view>
			<view class="goShopping" @click="toShoppingMall">去逛逛</view>
		</view>
		<view class="shoppingCart" v-else>
			<view class="header" v-if="shopList.length">
				<view class="left"></view>
				<view class="manage" @click="isManage=!isManage">{{isManage?"管理":"完成"}}</view>
			</view>
			<view class="shopItem" v-for="(shopItem,shopIndex) in shopList" :key="shopItem.storeId">
				<!-- 店铺 -->
				<view class="shopInfo">
					<view style="width: 36rpx;height: 36rpx;">
						<view class="check" v-if="!shopItem.shopChecked" @click="checkShop(shopItem.storeId)"></view>
						<image class="checked" v-else @click="checkShop(shopItem.storeId)"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png"></image>
					</view>
					<view class="goShop" @click="toShopHome(shopItem.storeId)">
						<text class="shopName">{{shopItem.storeName}}</text>
						<image class="shopIcon"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_jumpToShop%402x.png">
							</text>
					</view>
				</view>
				<view class="freeMail">
					<view class="text" v-if="isDefault" :key="index">每满{{shopItem.freeShippingThreshold===0?'0.00'
						:(shopItem.freeShippingThreshold/100).toFixed(2)}}元可获得一次免运费权益</view>
					<view class="text" v-else>
						还差{{shopItem.freeShippingThreshold===0?'0.00':shopItem.freePrice}}元可获得一次免运费权益</view>
					<view class="toShop" @click="toShopHome(shopItem.storeId)">
						<text>去凑单</text>
						<image class="icon"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/toPostFree%402x.png">
						</image>
					</view>
				</view>
				<!-- 商品 -->
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(goodsItem,goodsIndex) in shopItem.skuList" :key="goodsItem.skuId"
						:right-options="options" @click="deleteGoods(goodsItem.skuId,goodsItem.buyCount)">
						<view class="goodsItem">
							<view style="width: 36rpx;height: 36rpx;">
								<view class="check" v-if="!goodsItem.goodsChecked"
									@click="checkGoods(shopItem.storeId,goodsItem.skuId)"></view>
								<image class="checked" v-else @click="checkGoods(shopItem.storeId,goodsItem.skuId)"
									src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png">
								</image>
							</view>
							<image :src="goodsItem.image+'?x-oss-process=image/resize,m_mfit,w_96,h_96'"
								@click="toGoodsDetail(goodsItem.skuId)" class="goodsItemImg"></image>
							<view class="goodsInfo">
								<view>
									<view class="goodsDesc" @click="toGoodsDetail(goodsItem.skuId)">
										<text class="goodsType">{{goodsItem.productType=== 1?"物品":"服务"}}</text>
										{{goodsItem.spuName}}
									</view>
									<view class="goodsSpec" @click="openSpec(goodsItem.skuId,goodsItem.goodsChecked)">
										<view class="text">{{goodsItem.skuName}}</view>
										<image
											src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/selectOptions%402x.png"
											class="selectOptions"></image>
									</view>
								</view>
								<!-- 商品单价和数量 -->
								<view class="foot">
									<view class="goodsPrice price-font">
										<text>¥</text>
										<text class="int">{{(goodsItem.price/100).toFixed(2).split('.')[0]}}</text>
										<text>.{{(goodsItem.price/100).toFixed(2).split('.')[1]}}/{{goodsItem.unitName}}</text>
									</view>
									<view class="countCtrl">
										<image v-if="!goodsItem.isMiniOrder" class="dec"
											@click="changeCount(false,shopIndex, goodsIndex)"
											src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/details_pop_%402x.png">
										</image>
										<image v-else class="dec" @click="changeCount(false,shopIndex, goodsIndex)"
											src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/details_pop_subtract_disabled%402x.png">
										</image>
										<view class="count" :class="{'max': (+goodsItem.buyCount).toFixed(2).length > 5}"
											@click="openCount(shopIndex, goodsIndex,goodsItem.minimumOrderQuantity,goodsItem.stepLength,goodsItem.buyCount)">
											{{(+goodsItem.buyCount).toFixed(2)}}
										</view>

										<image class="inc" @click="changeCount(true, shopIndex,goodsIndex)"
											src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/details_pop_add_normal%402x.png">
										</image>
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view class="mask" v-if="showInput">
				<view class="popupNum">
					<view class="header">
						<view class="title">编辑数量</view>
						<view class="text">当前最小单位为{{step}}，输入的数量需为{{step}}的倍数</view>
					</view>
					<input class="uni-input" type="digit" v-model="buyNum" focus :cursor-spacing="102" />
					<view class="button">
						<view class="cancel" @click="closeDialog">取消</view>
						<!-- <view class="line"></view> -->
						<view class="confirm" @click="defineCount">完成</view>
					</view>
				</view>
			</view>
			<view class="mask" v-if="showClass">
				<view class="popupClass">
					<view class="header">
						<text class="tit">所选商品为不同类型商品，请分开结算</text>
						<image class="closedIcon" @click="goBackCart"
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_closed_black%402x.png">
						</image>
					</view>
					<view class="line"></view>
					<view class="service" :class="{'activeBorder':serviceChecked}">
						<view class="popupTop" :class="{'activeBg':serviceChecked}">
							<view class="left">
								<view class="popupTitle" :class="{'activeColor':serviceChecked}">服务商品</view>
								<view class="popupCount" :class="{'activeColor':serviceChecked}">{{serviceList.length}}件
								</view>
							</view>
							<view class="check" v-if="!serviceChecked" @click="checkSame(true)"></view>
							<image class="checked" v-else @click="checkSame(true)"
								src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png">
							</image>
						</view>
						<view class="goods" v-for="item in serviceListShow" :key="item.skuId">
							<image :src="item.image" class="img"></image>
							<view class="goodsName">{{item.spuName}}</view>
						</view>
					</view>
					<view class="entity" :class="{'activeBorder':entityChecked}">
						<view class="popupTop" :class="{'activeBg':entityChecked}">
							<view class="left">
								<view class="popupTitle" :class="{'activeColor':entityChecked}">实物商品</view>
								<view class="popupCount" :class="{'activeColor':entityChecked}">{{entityList.length}}件
								</view>
							</view>
							<view class="check" v-if="!entityChecked" @click="checkSame(false)"></view>
							<image class="checked" v-else @click="checkSame(false)"
								src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png">
							</image>
						</view>
						<view class="goods" v-for="item in entityListShow" :key="item.skuId">
							<image :src="item.image" class="img"></image>
							<view class="goodsName">{{item.spuName}}</view>
						</view>
					</view>
					<view class="footer" @click="paySame">去结算</view>
				</view>
			</view>
			<echone-sku :show="popupShow" :theme-color="themeColor" :combinations="combinations"
				:specifications="specifications" :specifications-props="specificationsProps"
				:combinations-props="combinationsProps" :default-select-index="selectedIndex" :spuName="spuName"
				:productType="productType" :defaultSpec="defaultSpec" :defaultSpecIds="defaultSpecIds"
				@close="popupShow=false" @confirm="handleConfirm"></echone-sku>
			<!-- <view class="mask" v-if="skuShow"> -->
			<custom-sku :show="skuShow" :combinations="combinations" :skuNames="skuNames" :selectedIndex="selectedIndex"
				:productType="productType" :defaultSku="defaultSku" :defaultSpu="defaultSpu" @close="skuShow=false"
				@confirm="handleConfirm"></custom-sku>
			<!-- </view> -->

			<view class="disabledSku" v-if="disabledSkuList.length">
				<view class="top">
					<view class="title">已失效商品</view>
					<view class="clear" @click="clearDisaledSku">清空失效商品</view>
				</view>
				<view class="disabldSkuItem" @click="toGoodsDetail(disabldSkuItem.skuId,true)"
					v-for="disabldSkuItem in disabledSkuList" :key="disabldSkuItem.skuId">
					<image :src="disabldSkuItem.image+'?x-oss-process=image/resize,m_mfit,w_96,h_96'"
						class="disabldSkuImg"></image>
					<view class="disabledSkuInfo">
						<view class="disabledSkuDesc">
							<span class="disabledSkuType">{{disabldSkuItem.productType===1?'物品':'服务'}}</span>
							{{disabldSkuItem.spuName}}
						</view>
						<view class="disabledSkuSpec">{{disabldSkuItem.skuName}}</view>
						<view class="text">该商品已经失效</view>
					</view>
				</view>
			</view>
			<view class="bottom"></view>
			<!-- 底部区域 -->
			<view v-if="shopList.length">
				<view class="allCheck" v-if="isManage">
					<view class="left" @click="checkAll">
						<view class="check" v-if="!isCheckedAll"></view>
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png"
							class="check" v-else></image>
						<view class="text">全选</view>
					</view>
					<view class="right">
						<view class="text">合计：</view>
						<view class="totalPrice price-font">
							<text>¥</text>
							<text class="int">{{totalPrice.toFixed(2).split('.')[0]}}</text>
							<text>.{{totalPrice.toFixed(2).split('.')[1]}}</text>
						</view>
						<view class="preOrder" @click="pay">结算({{totalCout}})</view>
					</view>
				</view>
				<view class="allCheck" v-else>
					<view class="left" @click="checkAll">
						<view class="check" v-if="!isCheckedAll"></view>
						<image src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/checked%402x.png"
							class="check" v-else></image>
						<view class="text">全选</view>
					</view>
					<view class="right">
						<view class="collect" @click="toCollect">移入收藏</view>
						<view class="delete" @click="deleteChecked">删除</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		clearDisabled,
		getShoppingCartInfo,
		deleteProduct,
		setBuyCount,
		getGoodsSpec,
		setGoodsSku,
		createcollection,
	} from "../../../api/user.js";
	import echoneSku from "../../components/echone-sku/echone-sku.vue";
	import customSku from "../../components/echone-sku/custom-sku.vue";
	export default {
		components: {
			echoneSku,
			customSku,
		},
		data() {
			return {
				popupShow: false,
				themeColor: "#1ac792",
				specifications: [],
				combinations: [],
				combinationsProps: {},
				specificationsProps: {},
				productType: 1,
				spuName: "",
				selectedIndex: 0,
				defaultSpecIds: "",
				defaultSpec: [],
				skuShow: false,
				skuNames: [],
				defaultSku: {},
				defaultSpu: {},
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#FF3347",
					},
				}, ],
				userId: 0,
				shopList: [],
				disabledSkuList: [],
				showPecification: false,
				isManage: true,
				isCheckedAll: false,
				currentShopIndex: 0,
				currentGoodsIndex: 0,
				showInput: false,
				showClass: false,
				serviceChecked: false,
				entityChecked: true,
				serviceList: [],
				entityList: [],
				serviceListShow: [],
				entityListShow: [],
				showNoGoods: false,
				isDefault: true,
				step: 0, //步长
				miniOrder: 0,
				buyNum: "", //输入框的值,
				checkedSkuList: [],
				defaultHouseInfo: "", // 房屋信息
			};
		},
		onLoad() {
			uni.$on("submitOrder", () => {
				this.requestPage();
			});
		},
		onShow() {
			this.defaultHouseInfo = getApp().globalData.currentHouse;
			console.log(this.defaultHouseInfo);
		},
		mounted() {
			this.userId = uni.getStorageSync("userId");
			this.requestPage(true);
		},
		computed: {
			totalCout() {
				let count = 0;
				this.shopList.forEach((item) => {
					item.skuList.forEach((ele) => {
						if (ele.goodsChecked) {
							count += 1;
						}
					});
				});
				return count;
			},
			totalPrice() {
				let sum = 0;
				this.shopList.forEach((item) => {
					item.skuList.forEach((ele) => {
						if (ele.goodsChecked) {
							sum += parseInt(+ele.buyCount * ele.price);
						}
					});
				});
				return sum / 100;
			},
		},
		methods: {
			freeShippings() {
				this.shopList.map((item) => {
					let sum = 0;
					item.skuList.forEach((ele) => {
						if (ele.goodsChecked) {
							sum += +ele.buyCount * (ele.price / 100);
						}
					});
					if (sum < item.freeShippingThreshold / 100) {
						this.$set(
							item,
							"freePrice",
							(item.freeShippingThreshold / 100 - sum).toFixed(2)
						);
					} else if (sum > item.freeShippingThreshold / 100) {
						let temp = Math.ceil(sum / (item.freeShippingThreshold / 100));
						this.$set(
							item,
							"freePrice",
							((item.freeShippingThreshold / 100) * temp - sum).toFixed(2)
						);
					} else if (sum === item.freeShippingThreshold / 100) {
						this.$set(
							item,
							"freePrice",
							(item.freeShippingThreshold / 100).toFixed(2)
						);
					}
					if (item.freePrice === "0.00") {
						this.$set(
							item,
							"freePrice",
							(item.freeShippingThreshold / 100).toFixed(2)
						);
					}
					return item;
				});
			},
			handleConfirm(preId, curId, storeId) {
				// console.log(preId,curId)
				let goodsChecked = false;
				this.shopList.forEach((item) => {
					if (item.storeId === storeId) {
						item.skuList.forEach((ele) => {
							if (ele.skuId === preId) {
								goodsChecked = ele.goodsChecked;
							}
						});
					}
				});
				let params = {
					userId: this.userId,
					beforeSkuId: preId,
					nowSkuId: curId,
				};
				setGoodsSku(params).then((data) => {
					this.getPage(curId, goodsChecked);
				});
			},
			getPage(targetId, goodsChecked) {
				getShoppingCartInfo().then((data) => {
					let {
						storeList,
						disabledSkuList
					} = data;
					if (!storeList.length && !disabledSkuList.length) {
						this.showNoGoods = true;
					}
					if (storeList.length) {
						storeList.map((item) => {
							item.skuList.map((ele) => {
								ele.isMiniOrder = +ele.buyCount <= +ele.minimumOrderQuantity ?
									true : false;

								let index = this.checkedSkuList.findIndex(
									(i) => i.skuId === ele.skuId
								);
								if (index !== -1) {
									ele.goodsChecked = true;
								} else {
									ele.goodsChecked = false;
								}
								if (ele.skuId === targetId) {
									ele.goodsChecked = goodsChecked;
								}
								return ele;
							});
							if (item.skuList.every((ele) => ele.goodsChecked)) {
								item.shopChecked = true;
							} else {
								item.shopChecked = false;
							}
							return item;
						});
					}
					this.shopList = storeList;
					this.disabledSkuList = disabledSkuList;
					this.freeShippings();
				});
			},
			openSpec(skuId, goodsChecked) {
				getGoodsSpec(skuId, this.defaultHouseInfo.areaId).then((data) => {
					if (data.skuInputType === 1) {
						this.popupShow = true;
						this.specifications = data.properties;
						this.defaultSpec = data.defaultProperties;
						this.spuName = data.defaultSpu.spuName;
						this.combinationsProps = {
							id: "id",
							valueIds: "propValueIds",
							image: "imageUrl",
							price: "price",
							unit: "unitName",
						};
						this.specificationsProps = {
							id: "id",
							list: "values",
							name: "name",
						};
						let Ids = [];
						data.defaultProperties.forEach((item) => {
							Ids.push(item.value.id);
						});
						this.defaultSpecIds = Ids.sort().toString();
						data.skuAndProperties.map((item) => {
							item.valueIds = item.propValueIds.split(",");
							return item;
						});
						this.selectedIndex = data.skuAndProperties.findIndex(
							(item) => item.valueIds.sort().toString() === this.defaultSpecIds
						);
					} else if (data.skuInputType === 2) {
						this.skuShow = true;
						this.skuNames = data.skuNames;
						this.defaultSku = data.defaultSkuName;
						this.defaultSpu = data.defaultSpu;
						this.selectedIndex = data.skuAndProperties.findIndex(
							(item) => item.id === this.defaultSku.id
						);
					}

					this.combinations = data.skuAndProperties;
					this.productType = data.productType;

					console.log(this.selectedIndex);
				});
			},
			toShoppingMall() {
				uni.switchTab({
					url: "/pages/classify/index/index",
				});
			},
			toShopHome(storeId) {
				let areaId = getApp().globalData.currentProject.areaId;
				uni.navigateTo({
					url: `/sub-classify/pages/shops/shops?storeId=${storeId}&areaId=${areaId}&from=shopCart`,
				});
			},
			toGoodsDetail(skuId, isDisabled) {
				uni.navigateTo({
					url: isDisabled ?
						`/sub-classify/pages/goods-detail/goods-detail?goodId=${skuId}&isDisabled=1&from=shopCart` :
						`/sub-classify/pages/goods-detail/goods-detail?goodId=${skuId}&isDisabled=0&from=shopCart`,
				});
			},
			requestPage(isFirst) {
				getShoppingCartInfo().then((data) => {
					let {
						storeList,
						disabledSkuList
					} = data;
					if (!storeList.length && !disabledSkuList.length) {
						this.showNoGoods = true;
					}
					if (storeList.length) {
						storeList.map((item) => {
							item.shopChecked = false;
							item.skuList.map((ele) => {
								ele.goodsChecked = false;
								ele.isMiniOrder = +ele.buyCount <= +ele.minimumOrderQuantity ?
									true : false;
								return ele;
							});

							return item;
						});
					}
					this.shopList = storeList;
					this.disabledSkuList = disabledSkuList;
					if (!isFirst) {
						this.freeShippings();
					}
				});
			},
			openCount(shopIndex, goodsIndex, miniOrder, step, buyNum) {
				this.showInput = true;
				this.miniOrder = miniOrder;
				this.step = step;
				this.buyNum = (+buyNum).toFixed(2);
				this.currentShopIndex = shopIndex;
				this.currentGoodsIndex = goodsIndex;
			},
			closeDialog() {
				this.showInput = false;
			},
			goBackCart() {
				this.showClass = false;
			},
			defineCount() {
				let val = this.buyNum;
				let target =
					this.shopList[this.currentShopIndex].skuList[this.currentGoodsIndex];
				let miniOrder = +target.minimumOrderQuantity;
				let step = +target.stepLength;
				if (+val < miniOrder) {
					setTimeout(() => {
						uni.showToast({
							title: `商品数量不得低于${miniOrder}件`,
							icon: "none",
							duration: 2000,
						});
					}, 100);
					return;
				} else if ((+val*100) % (step*100) !== 0) {
					setTimeout(() => {
						uni.showToast({
							title: `当前最小单位为${step}，输入的数量需为${step}的倍数`,
							icon: "none",
							duration: 2000,
						});
					}, 100);
					return;
				} else if (+val > 9999.99) {
					setTimeout(() => {
						uni.showToast({
							title: "商品数量超出范围",
							icon: "none",
							duration: 2000,
						});
					}, 100);
					return;
				}
				let buyCount = +val;
				let params = {
					userId: this.userId,
					skuList: [{
						skuId: target.skuId,
						buyCount: buyCount,
					}, ],
				};
				setBuyCount(params).then((data) => {
					this.showInput = false;
					this.getPage(target.skuId, target.goodsChecked);
				});

				// console.log(val,step,miniOrder);
			},
			toCollect() {
				if (!this.totalCout) {
					uni.showToast({
						title: "您还没有选择任何商品哦",
						icon: "none",
					});
				} else {
					let deviceId = 0;
					uni.getSystemInfo({
						success: (res) => {
							deviceId = res.deviceId;
						},
					});
					let skuList = [];
					let list = [];
					this.shopList.forEach((item) => {
						item.skuList.forEach((ele) => {
							if (ele.goodsChecked) {
								skuList.push({
									skuId: ele.skuId,
									buyCount: ele.buyCount,
								});
								list.push({
									equipmentId: deviceId,
									authorId: ele.storeId,
									relationId: ele.skuId,
									subBizType: ele.productType,
								});
							}
						});
					});
					let params = {
						userId: this.userId,
						skuList: skuList,
					};
					//选中的商品会从购物车中消失，移入收藏夹
					deleteProduct(params).then((data) => {
						this.requestPage();
					});
					let arg = {
						// userId: this.userId,
						routeId: 5002,
						list: list,
					};
					createcollection(arg).then((data) => {
						if (data) {
							uni.showToast({
								title: "该商品已移入收藏夹，可去收藏夹查看",
								icon: "none",
							});
						}
					});
				}
			},
			deleteChecked() {
				if (!this.totalCout) {
					uni.showToast({
						title: "您还没有选择任何商品哦",
						icon: "none",
					});
				} else {
					uni.showModal({
						title: "确定要删除所选商品吗？",
						cancelColor: "#333333",
						confirmColor: "#ff3347",
						success: (res) => {
							if (res.confirm) {
								let skuList = [];
								this.shopList.forEach((item) => {
									item.skuList.forEach((ele) => {
										if (ele.goodsChecked) {
											skuList.push({
												skuId: ele.skuId,
												buyCount: ele.buyCount,
											});
										}
									});
								});
								let params = {
									userId: this.userId,
									skuList: skuList,
								};
								deleteProduct(params).then((data) => {
									this.requestPage();
								});
							} else if (res.cancel) {
								return;
							}
						},
					});
				}
			},
			checkSame(isService) {
				if (isService) {
					this.serviceChecked = !this.serviceChecked;
					this.entityChecked = !this.serviceChecked;
				} else {
					this.entityChecked = !this.entityChecked;
					this.serviceChecked = !this.entityChecked;
				}
			},

			paySame() {
				if (this.serviceChecked || this.entityChecked) {
					let checkedList = this.serviceChecked ?
						this.serviceList :
						this.entityList;
					uni.navigateTo({
						url: "/sub-classify/pages/pay-order/index",
						success: (res) => {
							res.eventChannel.emit("acceptDataFromOpenerPage", {
								skuInfos: checkedList,
								originFrom: "shopCart",
							});
						},
					});
				} else {
					uni.showToast({
						title: "您还没有选择任何商品哦",
						icon: "none",
					});
				}
			},
			pay() {
				let checkedList = [];
				let isChooseDiff = () => {
					let flag = false;
					// 第一个勾选的商品
					let target = {};
					this.shopList.forEach((item) => {
						target = item.skuList.find((ele) => ele.goodsChecked);
					});
					//清空上一次勾选的商品
					this.serviceList = [];
					this.entityList = [];
					this.shopList.forEach((item) => {
						item.skuList.forEach((ele) => {
							if (ele.goodsChecked) {
								//判断用户是否选择了不同类型的商品
								if (target && ele.productType !== target.productType) {
									flag = true;
								}
								//结算页面展示店铺名
								if (ele.storeId === item.storeId) {
									ele.storeName = item.storeName;
								}
								checkedList.push({
									skuId: ele.skuId,
									storeId: ele.storeId,
									buyCount: ele.buyCount,
									unit: ele.unitName,
									level: 0,
								});
								//根据productType商品类型划分为服务类和实物类
								if (ele.productType === 2) {
									this.serviceList.push({
										skuId: ele.skuId,
										storeId: ele.storeId,
										buyCount: ele.buyCount,
										unit: ele.unitName,
										level: 0,
										image: ele.image,
										spuName: ele.spuName,
									});
								} else {
									this.entityList.push({
										skuId: ele.skuId,
										storeId: ele.storeId,
										buyCount: ele.buyCount,
										unit: ele.unitName,
										level: 0,
										image: ele.image,
										spuName: ele.spuName,
									});
								}
							}
						});
					});
					this.serviceListShow =
						this.serviceList.length >= 2 ?
						this.serviceList.slice(0, 2) :
						this.serviceList.slice(0);
					this.entityListShow =
						this.entityList.length >= 2 ?
						this.entityList.slice(0, 2) :
						this.entityList.slice(0);
					console.log(this.serviceListShow, this.entityListShow);
					return flag;
				};

				if (!this.totalCout) {
					uni.showToast({
						title: "您还没有选择任何商品哦",
						icon: "none",
					});
				} else if (isChooseDiff()) {
					this.showClass = true;
				} else {
					uni.navigateTo({
						url: "/sub-classify/pages/pay-order/index",
						success: (res) => {
							res.eventChannel.emit("acceptDataFromOpenerPage", {
								skuInfos: checkedList,
								originFrom: "shopCart",
							});
						},
					});
				}
			},
			changeCount(isAdd, shopIndex, goodsIndex) {
				let target = this.shopList[shopIndex].skuList[goodsIndex];
				let count = +target.buyCount;
				let step = +target.stepLength;
				let miniOrder = +target.minimumOrderQuantity;
				if (isAdd) {
					// 累加
					count += step;
					if (count > 9999.99) {
						uni.showToast({
							title: "已达到商品数量添加上限",
							icon: "none",
							duration: 3000,
						});
						return;
					}
					if (count > miniOrder) {
						target.isMiniOrder = false;
					}
				} else {
					// 累减
					if (count <= miniOrder) {
						target.isMiniOrder = true;
						uni.showToast({
							title: "商品数量不能再减少了",
							icon: "none",
							duration: 3000,
						});
						return;
					}
					count -= step;
				}
				target.buyCount = count.toFixed(2).toString();
				this.freeShippings();
				let params = {
					userId: this.userId,
					skuList: [{
						skuId: target.skuId,
						buyCount: target.buyCount,
					}, ],
				};
				setBuyCount(params).then(() => {});
			},
			checkAll() {
				//原逻辑
				this.isCheckedAll = !this.isCheckedAll;
				this.shopList.map((item) => {
					item.shopChecked = this.isCheckedAll;
					item.skuList.map((ele) => {
						ele.goodsChecked = this.isCheckedAll;
						return ele;
					});
					return item;
				});
				if (this.isCheckedAll) {
					this.isDefault = false;
				}

				this.freeShippings();
				//
				this.shopList.forEach((item) => {
					item.skuList.forEach((ele) => {
						if (this.isCheckedAll) {
							this.checkedSkuList.push({
								storeId: ele.storeId,
								skuId: ele.skuId,
							});
						}
					});
				});
				if (!this.isCheckedAll) {
					this.checkedSkuList = [];
				}
				// console.log(this.checkedSkuList)
			},
			checkShop(id) {
				//原逻辑
				this.shopList.map((item) => {
					if (item.storeId === id) {
						item.shopChecked = !item.shopChecked;
						item.skuList.map((ele) => {
							ele.goodsChecked = item.shopChecked;
							return ele;
						});
						if (item.shopChecked) {
							this.isDefault = false;
						}
					}
					return item;
				});
				if (this.shopList.every((ele) => ele.shopChecked)) {
					this.isCheckedAll = true;
				} else {
					this.isCheckedAll = false;
				}

				this.freeShippings();
				//
				this.shopList.forEach((item) => {
					if (item.storeId === id) {
						item.skuList.forEach((ele) => {
							if (ele.goodsChecked) {
								this.checkedSkuList.push({
									storeId: ele.storeId,
									skuId: ele.skuId,
								});
							} else {
								let index = this.checkedSkuList.findIndex(
									(i) => i.skuId === ele.skuId
								);
								if (index !== -1) {
									this.checkedSkuList.splice(index, 1);
								}
							}
						});
					}
				});
				// console.log(this.checkedSkuList)
			},
			checkGoods(storeId, skuId) {
				//原逻辑
				this.shopList.map((item) => {
					if (item.storeId === storeId) {
						item.skuList.map((ele) => {
							if (ele.skuId === skuId) {
								ele.goodsChecked = !ele.goodsChecked;
							}
							if (ele.goodsChecked) {
								this.isDefault = false;
							}
							return ele;
						});
						if (item.skuList.every((ele) => ele.goodsChecked)) {
							item.shopChecked = true;
						} else {
							item.shopChecked = false;
						}
					}
					return item;
				});
				if (this.shopList.every((ele) => ele.shopChecked)) {
					this.isCheckedAll = true;
				} else {
					this.isCheckedAll = false;
				}

				this.freeShippings();
				//
				this.shopList.forEach((item) => {
					if (item.storeId === storeId) {
						item.skuList.forEach((ele) => {
							if (ele.skuId === skuId) {
								if (ele.goodsChecked) {
									this.checkedSkuList.push({
										storeId: ele.storeId,
										skuId: ele.skuId,
									});
								} else {
									let index = this.checkedSkuList.findIndex(
										(i) => i.skuId === skuId
									);
									if (index !== -1) {
										this.checkedSkuList.splice(index, 1);
									}
								}
							}
						});
					}
				});
				// console.log(this.checkedSkuList)
			},

			deleteGoods(skuId, buyCount) {
				let params = {
					userId: this.userId,
					skuList: [{
						skuId: skuId,
						buyCount: buyCount,
					}, ],
				};
				deleteProduct(params).then((data) => {
					this.requestPage();
				});
			},
			clearDisaledSku() {
				uni.showModal({
					title: "确定要清空失效商品吗？",
					content: "清空后会移除全部已失效商品",
					cancelColor: "#333333",
					confirmColor: "#ff3347",
					success: (res) => {
						if (res.confirm) {
							let params = {
								userId: this.userId,
							};
							clearDisabled(params).then((data) => {
								this.requestPage();
							});
						} else if (res.cancel) {
							return;
						}
					},
				});
			},
		},
	};
</script>

<style scoped>
	.cartContainer {
		width: 100%;
		height: fit-content;
		background: #f5f6f7;
		position: relative;
	}

	.cartContainer.bg {
		background: #fff;
	}

	.cartContainer>>>.uni-dialog-title-text.uni-popup__info {
		color: #333;
	}

	.cartContainer>>>.uni-dialog-input {
		background: #f5f5f5;
	}

	.cartContainer>>>.uni-dialog-button-text {
		color: #666666;
	}

	.cartContainer>>>.uni-dialog-button-text.uni-button-color {
		color: #35c4c4;
	}

	.header {
		width: 100%;
		height: 80rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header .left {
		width: 62rpx;
		height: 20rpx;
		margin-left: 20rpx;
		font-size: 14rpx;
		text-align: center;
		color: #666666;
		line-height: 20rpx;
	}

	.header .manage {
		width: 56rpx;
		height: 40rpx;
		margin-right: 40rpx;
		font-size: 28rpx;
		color: #333333;
		text-align: center;
		line-height: 40rpx;
	}

	.noGoods {
		width: 400rpx;
		margin-left: 196rpx;
		padding-top: 284rpx;
		padding-bottom: 705rpx;
	}

	.noGoods .noGoodsImg {
		width: 248rpx;
		height: 248rpx;
		display: block;
		margin-left: 58rpx;
		margin-bottom: 20rpx;
	}

	.noGoods .noGoodsText {
		width: 364rpx;
		height: 26rpx;
		line-height: 26rpx;
		margin-left: 10rpx;
		font-size: 26rpx;
		text-align: center;
		color: #999999;
	}

	.noGoods .goShopping {
		width: 248rpx;
		height: 88rpx;
		background: linear-gradient(135deg, #53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin-top: 75rpx;
		margin-left: 56rpx;
		font-size: 32rpx;
		text-align: center;
		color: #ffffff;
		line-height: 88rpx;
	}

	.shoppingCart {
		width: 100%;
	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
	}

	.popupNum {
		width: 100%;
		height: 338rpx;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}

	.popupNum .header {
		height: 44rpx;
		margin: 32rpx 0;
		display: flex;
		/* align-items: center; */
	}

	.popupNum .header .title {
		width: 128rpx;
		height: 44rpx;
		margin: 0 24rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}

	.popupNum .header .text {
		width: 460rpx;
		height: 34rpx;
		margin: 6rpx 110rpx 4rpx 0;
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}

	.popupNum input {
		width: 704rpx;
		height: 96rpx;
		margin: 0 23rpx 32rpx;
		background: #f5f5f5;
		border: 1rpx solid #e2e2e2;
		border-radius: 16rpx;
		font-size: 40rpx;
		font-weight: 500;
		text-align: center;
		color: #111111;
	}

	.popupNum .button {
		width: 100%;
		height: 102rpx;
		display: flex;
		border-top: 2rpx solid #e5e5e5;
	}

	.popupNum .button view {
		width: 60rpx;
		height: 102rpx;
		font-size: 30rpx;
		padding: 0 157rpx;
		line-height: 102rpx;
	}

	.popupNum .button .cancel {
		border-right: 2rpx solid #e5e5e5;
		color: #666666;
	}

	.popupNum .button .confirm {
		color: #00bfb6;
		font-weight: 500;
	}

	.popupNum .button .line {
		width: 2rpx;
		height: 102rpx;
		background: #e5e5e5;
	}

	.popupClass {
		width: 100%;
		height: 1046rpx;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}

	.popupClass .header {
		display: flex;
		height: 104rpx;
		border-radius: 32rpx;
	}

	.popupClass .header .tit {
		width: 544rpx;
		height: 40rpx;
		padding: 32rpx 4rpx 32rpx 102rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 40rpx;
	}

	.popupClass .header .closedIcon {
		width: 80rpx;
		height: 80rpx;
		display: block;
	}

	.popupClass .line {
		height: 2rpx;
		background: #f2f2f2;
	}

	.service {
		width: 686rpx;
		height: 296rpx;
		margin: 32rpx;
		border: 2rpx solid #eeeeee;
		border-radius: 16rpx;
	}

	.entity {
		width: 686rpx;
		height: 296rpx;
		margin: 0 32rpx 68rpx 32rpx;
		border: 2rpx solid #eeeeee;
		border-radius: 16rpx;
	}

	.popupTop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 110rpx;
		background: #f7f7f7;
		border-radius: 16rpx 16rpx 0 0;
	}

	.popupClass .left {
		margin-left: 32rpx;
	}

	.popupTitle {
		width: fit-content;
		height: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
		margin-top: 14rpx;
	}

	.popupCount {
		width: 42rpx;
		height: 36rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
		line-height: 36rpx;
	}

	.popupClass .check {
		width: 36rpx;
		height: 36rpx;
		border: 2rpx solid #e5e5e5;
		border-radius: 50%;
		margin-right: 32rpx;
		margin-top: 32rpx;
	}

	.popupClass .checked {
		width: 36rpx;
		height: 36rpx;
		display: block;
		margin-right: 32rpx;
		margin-top: 32rpx;
	}

	.activeBorder {
		border-color: #00bfb6;
	}

	.activeBg {
		background: #e7fffe;
	}

	.activeColor {
		color: #00bfb6;
	}

	.popupClass .goods {
		width: 676rpx;
		height: 92rpx;
		overflow: scroll;
		display: flex;
		align-items: center;
	}

	.popupClass .goods .img {
		width: 64rpx;
		height: 64rpx;
		margin-left: 32rpx;
		margin-right: 12rpx;
		display: block;
		border-radius: 8rpx;
	}

	.popupClass .goods .goodsName {
		width: 494rpx;
		height: 36rpx;
		font-size: 26rpx;
		text-align: left;
		text-overflow: ellipsis;
		color: #999999;
		line-height: 36rpx;
	}

	.popupClass .footer {
		width: 686rpx;
		height: 88rpx;
		background: linear-gradient(135deg, #53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
	}

	.shopItem {
		margin: 24rpx 22rpx 0rpx 24rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.shopInfo {
		height: 94rpx;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}

	.shopInfo .check {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 2rpx solid #cbcccc;
	}

	.shopInfo .checked {
		width: 36rpx;
		height: 36rpx;
		display: block;
	}

	.shopInfo .goShop {
		height: 94rpx;
		display: flex;
		align-items: center;
	}

	.shopInfo .shopName {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		margin-left: 16rpx;
		margin-right: 12rpx;
	}

	.shopInfo .shopIcon {
		width: 30rpx;
		height: 30rpx;
		display: block;
	}

	.freeMail {
		width: 603rpx;
		height: 60rpx;
		margin-left: 76rpx;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fafafa;
		border-radius: 6rpx;
	}

	.freeMail .text {
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 34rpx;
		margin-left: 24rpx;
		font-size: 24rpx;
		color: #333333;
		line-height: 34rpx;
	}

	.freeMail .toShop {
		width: 102rpx;
		height: 34rpx;
		margin-right: 4rpx;
		font-size: 24rpx;
		color: #fe9000;
		line-height: 34rpx;
		display: flex;
		align-items: center;
	}

	.freeMail .toShop .icon {
		width: 30rpx;
		height: 30rpx;
		display: block;
	}

	/* 商品 */
	.shopItem .goodsItem {
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-bottom: 24rpx;
	}

	.goodsItem .check {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 2rpx solid #cbcccc;
	}

	.goodsItem .checked {
		width: 36rpx;
		height: 36rpx;
		display: block;
	}

	.goodsItem .goodsItemImg {
		width: 192rpx;
		height: 192rpx;
		display: block;
		margin-left: 16rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}

	.goodsItem .goodsInfo {
		height: 192rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goodsInfo .goodsDesc {
		max-width: 380rpx;
		max-height: 80rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.goodsInfo .goodsDesc .goodsType {
		width: 60rpx;
		height: 30rpx;
		padding: 0 10rpx;
		margin-right: 4rpx;
		border: 1rpx solid #35c4c4;
		border-radius: 4rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #35c4c4;
		line-height: 30rpx;
		text-align: center;
	}

	.goodsInfo .goodsSpec {
		width: 388rpx;
		height: 38rpx;
		margin-top: 8rpx;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 4rpx;
		align-items: center;
		display: flex;
	}

	.goodsInfo .goodsSpec .text {
		max-width: 330rpx;
		margin: 6rpx 12rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 22rpx;
		color: #999999;
	}

	.goodsInfo .goodsSpec .selectOptions {
		width: 28rpx;
		height: 28rpx;
		margin-right: 8rpx;
		display: block;
	}

	.goodsInfo .foot {
		width: 388rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.goodsInfo .foot .goodsPrice {
		width: 206rpx;
		height: 36rpx;
		color: #ff3347;
		font-size: 24rpx;
		line-height: 36rpx;
	}

	.goodsInfo .foot .goodsPrice .int {
		font-size: 36rpx;
	}

	.goodsInfo .foot .countCtrl {
		display: flex;
	}

	.goodsInfo .foot .countCtrl .dec {
		width: 48rpx;
		height: 48rpx;
		display: block;
	}

	.goodsInfo .foot .countCtrl .count {
		width: 76rpx;
		height: 48rpx;
		margin: 0 4rpx;
		background: #f2f2f2;
		font-size: 24rpx;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 48rpx;
	}
	.goodsInfo .foot .countCtrl .count.max{
		padding-right: 5rpx;
		display: flex;
		justify-content: flex-end;
		overflow: hidden;
	}

	.goodsInfo .foot .countCtrl .inc {
		width: 48rpx;
		height: 48rpx;
		display: block;
	}

	/* 已失效商品 */
	.disabledSku {
		margin: 24rpx 22rpx 48rpx 24rpx;
		padding: 24rpx 28rpx 32rpx 24rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}

	.disabledSku .top {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.disabledSku .top .title {
		width: 140rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}

	.disabledSku .top .clear {
		width: 168rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #35c4c4;
		line-height: 40rpx;
	}

	.disabledSku .disabldSkuItem {
		width: 100%;
		height: 192rpx;
		display: flex;
		margin-top: 32rpx;
	}

	.disabldSkuItem .disabldSkuImg {
		width: 192rpx;
		height: 192rpx;
		background: rgba(0, 0, 0, 0.3);
		display: block;
		margin-right: 24rpx;
		border-radius: 8rpx;
	}

	.disabldSkuItem .disabledSkuInfo {
		height: 100%;
	}

	.disabledSkuInfo .disabledSkuDesc {
		max-width: 436rpx;
		max-height: 80rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 28rpx;
		color: #cdcdcd;
		line-height: 40rpx;
	}

	.disabledSkuInfo .disabledSkuDesc .disabledSkuType {
		width: 60rpx;
		height: 30rpx;
		padding: 2rpx 10rpx 2rpx 10rpx;
		margin-right: 4rpx;
		border: 1rpx solid #cdcdcd;
		border-radius: 4rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #cdcdcd;
		line-height: 28rpx;
		text-align: center;
	}

	.disabledSkuInfo .disabledSkuSpec {
		max-width: 436rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		height: 38rpx;
		padding: 4rpx;
		margin: 12rpx 0 12rpx 0;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 4rpx;
		font-size: 22rpx;
		color: #cdcdcd;
	}

	.disabledSkuInfo .text {
		width: 380rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}

	.bottom {
		width: 100%;
		height: 214rpx;
	}

	.allCheck {
		width: 100%;
		height: 120rpx;
		background: #fff;
		border-top: 1rpx solid #f4f4f4;
		padding-bottom: 68rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
	}

	.allCheck .left {
		display: flex;
	}

	.allCheck .check {
		width: 36rpx;
		height: 36rpx;
		margin-left: 32rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 2rpx solid #e5e5e5;
	}

	.allCheck .text {
		width: 56rpx;
		height: 40rpx;
		color: #333;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.allCheck .right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.right .text {
		width: 84rpx;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 28rpx;
		color: #333;
	}

	.totalPrice {
		max-width: 198rpx;
		height: 36rpx;
		margin-bottom: -2rpx;
		margin-right: 16rpx;
		font-size: 24rpx;
		color: #ff3347;
	}

	.totalPrice .int {
		font-size: 36rpx;
	}

	.preOrder {
		width: 248rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		margin-right: 32rpx;
		border-radius: 12rpx;
		font-size: 32rpx;
		color: #fff;
		background: linear-gradient(135deg, #53d5cc, #4fc9c9);
	}

	.collect {
		width: 168rpx;
		height: 64rpx;
		line-height: 64rpx;
		font-size: 26rpx;
		text-align: center;
		color: #fe9000;
		background: #ffffff;
		border: 2rpx solid #fe9000;
		border-radius: 12rpx;
	}

	.delete {
		width: 116rpx;
		height: 64rpx;
		margin: 0 32rpx 0 32rpx;
		line-height: 64rpx;
		font-size: 26rpx;
		text-align: center;
		color: #ff3347;
		background: #ffffff;
		border: 2rpx solid #ff3347;
		border-radius: 12rpx;
	}
</style>
