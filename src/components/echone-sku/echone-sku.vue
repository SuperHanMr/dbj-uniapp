<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<view class="sku-box">
				<view class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]"></image>
					
					<view class="sku-goods-info">
						<view class="goodsDesc">
							<text class="goodsType">服务</text>
							{{selectSkuInfo[cbStock]}}
						</view>
						<view class="money">
							<text class="symbol fs-26">￥</text>
							<text class="amount fs-38">{{selectSkuInfo[cbPrice] | toFixed2}}/</text>
						</view>
						<!-- <view class="stock fs-24">
							库存{{selectSkuInfo[cbStock]}}件
						</view>
						<view class="fs-24">
							已选："{{selectSkuInfo[cbValue]}}"
						</view> -->
					</view>
				</view>
				<scroll-view class="sku-list" scroll-y="true">
					<view class="sku-item container" v-for="(sku,sIndex) in mySpecifications" :key="sku[speId]">
						<view class="sku-name">{{sku[speName]}}</view>
						<view class="sku-content">
							<text 
								class="sku-content-item" 
								v-for="(item,index) in sku[speList]"
								:key="index" 
								:style="{
									borderColor: index===sku.sidx? '#35c4c4': '#fff',
									color:index===sku.sidx?'#34c4c4':'#333333',
									backgroundColor: index===sku.sidx?'#e8fafa':'#f5f5f5' 
								}" 
								@click="selectSku(sIndex,index)"
							>{{item}}</text>
						</view>
					</view>
				</scroll-view>

				<view class="confirm-btn container" :class="{disabled:selectSkuInfo[cbStock]==0}" @click="handleConfirm">{{selectSkuInfo[cbStock]>0?'确认':'缺货中'}}</view>
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
			combinationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						value: 'value',
						image: 'image',
						price: 'price',
						stock: 'stock'
					}
				}
			},
			specificationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						list: 'list',
						name: 'name'
					}
				}
			},
		},
		data() {
			return {
				buyCount: 1,
				selectedIndex: 0,
				mySpecifications: [],
				selectSkuInfo: {},
			}
		},
		watch:{
			specifications(val){
				this.initSkuData()
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
				return this.combinationsProps.value
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbStock() {
				return this.combinationsProps.stock
			}
		},
		created() {
			if(this.specifications.length) {
				this.initSkuData()
			}
		},
		methods: {
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.mySpecifications.forEach((item,idx) => {
					//当前规格组合值
					const selects = this.combinations[this.selectedIndex][this.cbValue].split(',')
					//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
					const sIndex = item[this.speList].indexOf(selects[idx])
					if(sIndex === -1) {
						uni.showToast({
							title:"默认规格值不存在"
						})
						return
					}
					this.$set(item,'sidx',sIndex)
				})
			},
			selectSku(sIndex,index) {
				this.mySpecifications[sIndex].sidx = index
				const selectInfo = this.mySpecifications.reduce((prev,cur) => {
					if(prev) {
						return prev+','+cur[this.speList][cur.sidx]
					}else {
						return cur[this.speList][cur.sidx]
					}
				},'')
				this.selectedIndex = this.combinations.findIndex(item => item[this.cbValue] === selectInfo)
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				if(this.selectSkuInfo[this.cbStock] === 0) {
					this.buyCount = 0
				}
				if(this.selectSkuInfo[this.cbStock] !== 0 && this.buyCount*1 === 0) {
					this.buyCount = 1
				}
			},
			handleBuyCount(type) {
				if(type === 'minus') {
					if(this.buyCount <= 1) return
					this.buyCount = this.buyCount*1 - 1
				}
				if(type === 'add') {
					if(this.buyCount >= this.selectSkuInfo[this.cbStock]) return
					this.buyCount = this.buyCount*1 + 1
				}
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				const result = this.selectSkuInfo
				result.count = this.buyCount*1
				this.$emit('confirm', result)
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
					width: 60rpx;
					height: 30rpx;
					padding: 2rpx 10rpx 2rpx 10rpx;
					margin-right: 4rpx;
					border: 2rpx solid #35c4c4;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-weight: 500;
					color: #35c4c4;
					line-height: 28rpx;
					text-align:center;
				}
				
			}
			.money {
				font-size: 28rpx;
				color:#FF3347;
				border: none;
				padding-bottom: 0;
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-list {
			max-height: 500rpx;
		}
		.sku-item {
			padding: 8rpx 0;
			.sku-name {
				color: #333333;
				font-size: 28rpx;
				margin-bottom:12rpx;
			}
			.sku-content {
				padding: 20rpx 0;
				flex-wrap: wrap;
				@extend .flex-center;
				.sku-content-item {
					padding: 16rpx 32rpx 16rpx 32rpx;
					border-radius: 8rpx;
					margin-right: 12rpx;
					border: 2rpx solid transparent;
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
			background: linear-gradient(135deg,#53d5cc, #4fc9c9);
			font-size: 32rpx;
			margin-top: 14rpx;
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>
