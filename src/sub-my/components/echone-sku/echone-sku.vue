<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<view class="sku-box">
				<view class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]+'?x-oss-process=image/resize,m_mfit,w_96,h_96'"></image>

					<view class="sku-goods-info">
						<view class="goodsDesc">
							<text class="goodsType">{{productType===1?"物品":"服务"}}</text>
							{{spuName}}
						</view>
						<view class="money">
							<text class="symbol fs-26">￥</text>
							<!-- <text class="amount fs-38">{{(selectSkuInfo[cbPrice])/100}}</text> -->
							<text class="amount fs-38"> {{ handlePrice(selectSkuInfo.price/100)[0]}}.</text>
							<text class="amount fs-28"> {{ handlePrice(selectSkuInfo.price/100)[1]}}</text>
							<text class="amount fs-28">/{{ selectSkuInfo[cbUnit]}}</text>
						</view>
						<!-- <view class="fs-24">
							已选："{{selectSkuInfo[cbValue]}}"
						</view> -->
					</view>
					<image class="close" @click="closeSkuBox"
						src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/my/ic_closed_black%402x.png"></image>
				</view>
				<scroll-view class="sku-list" scroll-y="true">
					<view class="sku-item container" v-for="(sku,speIdx) in mySpecifications" :key="sku[speId]">
						<view class="sku-name">{{sku[speName]}}</view>
						<view class="sku-content">
							<view
								class="sku-content-item"
								v-for="(item,index) in sku[speList]"
								:key="item.id"
								:style="{
									borderColor: item.checked? '#333333': '#E8E8E8',
									fontWeight:item.checked?'500':'normal'
								}"
								@click="selectSkuCli(sku.id,speIdx,item.id,index)"
							>{{item.value}}
								<image  v-if="item.checked" src="../../static/productAttributeSelected.svg" mode=""></image>
							</view>
						</view>
					</view>
					<view class="bottom-space"></view>
				</scroll-view>

				<view class="confirm-btn container" @click="handleConfirm">确认</view>
			</view>
	</popup-bottom>
</template>

<script>
	import PopupBottom from './popup-bottom'
	export default {
		components:{
			PopupBottom
		},
		filters: {
			toFixed2: function (value) {
			  if(!value) return '0.00'
			  return Number(value).toFixed(2)
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			themeColor: {
				type: String,
				default: '#1ac792'
			},
			combinations: {
				type: Array,
				default(){
					return []
				}
			},
			specifications: {
				type: Array,
				default(){
					return []
				}
			},
			defaultSelectIndex: {
				type: Number,
				default: 0
			},
			spuName: {
				type: String,
			},
			productType: {
				type: Number,
				default: 1
			},
			combinationsProps: {
				type: Object,
			},
			specificationsProps: {
				type: Object,
			},
			defaultSpecIds: {
				type: String,
			},
			defaultSpec: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				selectedIndex: 0,
				mySpecifications: [],
				selectSkuInfo: {},
				skuId: 0,
				handleIds: []
			}
		},
		watch:{
			// defaultSpec(val){
			// 	this.initSkuData()
			// }
			show(val){
				if(val){
					this.initSkuData()
				}
			}
		},
		computed: {
			speId() {
				return this.specificationsProps.id
			},
			speList() {
				return this.specificationsProps.list
			},
			speName() {
				return this.specificationsProps.name
			},
			cbValue() {
				return this.combinationsProps.valueIds
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbUnit() {
				return this.combinationsProps.unit
			},
		},
		methods: {
			handlePrice(price){
				if(!price) return ['0','00']
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				console.log("this.selectSkuInfo==",this.selectSkuInfo)
				this.skuId = this.selectSkuInfo.id

				let defaultSpecIds = this.defaultSpecIds.split(',')
				let arr = []
				this.specifications.forEach(item => {
					let Ids = []
					item.values.map(ele => {
						Ids.push( ele.id )
						ele.checked = defaultSpecIds.indexOf(ele.id.toString())!==-1 ? true : false
						return ele
					})
					arr.push(Ids)
				})
				this.handleIds = arr.reduce((prev, cur) => {
					const temp = []
				  prev.forEach(val => {
				    cur.forEach(item => {
				      temp.push(`${val},${item}`)
				    })
				  })
				  return temp
				})
				this.handleIds = this.handleIds.map(item => {
					if(typeof item === 'string'){
						let arr = item.split(',').map(item => +item)
						arr.sort((a,b) => a-b)
						return arr.join(',')
					}else{
						return item.toString()
					}
				})

				let selectIds = this.selectSkuInfo.propValueIds
				console.log(this.handleIds,selectIds)
				if(this.handleIds.indexOf(selectIds) === -1) {
					uni.showToast({
						title:"默认规格值不存在",
						icon:"none"
					})
					return
				}
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
			},
			selectSkuCli(speId,speIdx,id,index) {
				this.mySpecifications[speIdx].values.map(item => {
					item.checked = (id === item.id)
					return item
				})
				//找到用户选择的valueIds
				let checkedIds = []
				checkedIds.push(id)
				this.defaultSpec.forEach(item => {
					if(item.id !== speId){
						checkedIds.push( item.value.id)
					}
				})
				let selectedIds = checkedIds.sort().toString()
				this.selectedIndex = this.combinations.findIndex(item => item.valueIds.sort().toString() === selectedIds)
				this.selectSkuInfo = this.combinations[this.selectedIndex]
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				if(this.selectedIndex === -1 || (this.selectedIndex !== -1 && !this.selectSkuInfo.enabled)){
					uni.showToast({
						title: "当前规格暂不可购买",
						icon: "none",
						duration: 2000
					})
					return
				}
				this.$emit('confirm',this.skuId, this.selectSkuInfo.id,this.selectSkuInfo.storeId)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-center {
		display: flex;
		align-items: center;
	}

	.flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$font-color-light: #999999;
	$page-bg-color-grey: #f5f5f5;

	.fs-24 {
		font-size: 24rpx;
	}

	.fs-26 {
		font-size: 26rpx;
	}

	.fs-38 {
		font-size: 38rpx;
	}

	.container {
		width: 690rpx;
		margin: 0 auto;
	}

	.sku-box {
		min-height: 500rpx;
		background-color: white;
		padding-bottom: 92rpx;
		font-size: 28rpx;
		border-radius: 32rpx;
		color: #333333;
		.sku-header {
			display: flex;
			padding: 40rpx 0 40rpx;
			.goods-img {
				width: 192rpx;
				height: 192rpx;
				border-radius: 16rpx;
				border: 1rpx solid  #f4f4f4;
			}
			.close{
				width: 80rpx;
				height: 80rpx;
				display: block;
				margin-top: -30rpx;
				margin-left: 32rpx;
			}
		}
		.sku-goods-info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			.goodsDesc{
				width: 380rpx;
				height: 80rpx;
				font-size: 28rpx;
				color: #333333;
				line-height: 40rpx;
				text-overflow: ellipsis;
				.goodsType{
					display: inline-block;
					width: 60rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					margin-right: 4rpx;
					border-radius: 4rpx;
					background: linear-gradient(90.48deg, #B4EEE1 0.28%, #EAFCD7 99.48%);
					font-size: 20rpx;
					font-weight: 600;
					color: #222222;
				}

			}
			.money {
				font-size: 28rpx;
				border: none;
				padding-bottom: 0;
				text{
					color:#333333;
				}
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-list {
			max-height: 600rpx;
			.bottom-space{
				height: 400rpx;
			}
		}
		.sku-item {
			padding: 8rpx 0;
			.sku-name {
				color: #333333;
				font-weight: 500;
				font-size: 28rpx;
				margin-bottom:12rpx;
			}
			.sku-content {
				padding: 20rpx 0;
				flex-wrap: wrap;
				@extend .flex-center;
				.sku-content-item {
					display: inline-block;
					color: #333333;
					background-color: #FFFFFF;
					padding: 16rpx 32rpx;
					border-radius: 8rpx;
					margin-right: 16rpx;
					margin-bottom: 32rpx;
					border: 2rpx solid transparent;
					position: relative;
					image{
						position: absolute;
						width:28rpx;
						height: 20rpx;
						right: -2rpx;
						bottom: -2rpx;
					}
				}
			}
			&.count {
				@extend .flex-center;
				justify-content: space-between;
				.count-box {
					@extend .flex-center;
					text,.count-content {
						@extend .flex-center-center;
						width: 70rpx;
						height: 70rpx;
						font-size: 32rpx;
						border: 2rpx solid $page-bg-color-grey;
					}
					.add,.minus {
						font-size: 44rpx;
					}
					.count-content {
						border-width: 2rpx 0;
						text-align: center;
					}
				}
			}
		}
		.confirm-btn {
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			border-radius: 12rpx;
			color: white;
			background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
			font-size: 32rpx;
			margin-top: 14rpx;
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>
