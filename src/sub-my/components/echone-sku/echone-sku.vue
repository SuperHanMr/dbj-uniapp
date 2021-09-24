<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<view class="sku-box">
				<view class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]"></image>
					
					<view class="sku-goods-info">
						<view class="goodsDesc">
							<text class="goodsType">{{productType===1?"服务":"物品"}}</text>
							{{spuName}}
						</view>
						<view class="money">
							<text class="symbol fs-26">￥</text>
							<text class="amount fs-38">{{selectSkuInfo[cbPrice]}}/{{selectSkuInfo[cbUnit]}}</text>
						</view>
						<!-- <view class="fs-24">
							已选："{{selectSkuInfo[cbValue]}}"
						</view> -->
					</view>
					<image class="close" src="../../../static/shopping-cart/ic_closed_black@2x.png" @click="closeSkuBox"></image>
				</view>
				<scroll-view class="sku-list" scroll-y="true">
					<view class="sku-item container" v-for="(sku,speIdx) in mySpecifications" :key="sku[speId]">
						<view class="sku-name">{{sku[speName]}}</view>
						<view class="sku-content">
							<text 
								class="sku-content-item" 
								v-for="(item,index) in sku[speList]"
								:key="item.id" 
								:style="{
									borderColor: index===sku.sidx? '#35c4c4': '#fff',
									color:index===sku.sidx?'#34c4c4':'#333333',
									backgroundColor: index===sku.sidx?'#e8fafa':'#f5f5f5' 
								}" 
								@click="selectSkuCli(speIdx,item.id,index)"
							>{{item.value}}</text>
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
			}
		},
		data() {
			return {
				selectedIndex: 0,
				mySpecifications: [],
				selectSkuInfo: {},
				skuId:0
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
		mounted() {
			console.log(this.defaultSelectIndex)
			if(this.specifications.length) {
				this.initSkuData()
			}
		},
		methods: {
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				this.skuId = this.selectSkuInfo.id
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.mySpecifications.forEach((item,index) => {
					//当前规格组合值
					const selects = this.selectSkuInfo[this.cbValue].split(',')
					const Ids = item[this.speList].map(ele => {
						return ele.id.toString()
					})
					console.log(selects)
					
					const sIndex = Ids.indexOf(selects[index])
					if(sIndex === -1) {
						uni.showToast({
							title:"默认规格值不存在",
							icon:"none"
						})
						return
					}
					//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
					this.$set(item,'sidx',sIndex)
				})
			},
			selectSkuCli(speIdx,id,index) {
				this.mySpecifications[speIdx].sidx = index
				let arr = []
				this.mySpecifications.forEach(item => {
					let Ids = []
					item.values.forEach(ele => {
						Ids.push( ele.id )
					})
					arr.push(Ids)
				})
				console.log(arr)
				let results = [];
				let temp = [];
				let doExchange = (arr, index) => {
				  for (var i = 0; i<arr[index].length; i++) {
				    temp[index] = arr[index][i];
				    if (index != arr.length - 1) {
				      doExchange(arr, index + 1)
				    } else {
				      results.push(temp.join(','))
				    }  
				  }  
				}
				doExchange(arr, 0);
				console.log( this.mySpecifications,id,index);
				//找到用户选择的valueIds
				const selectInfo = results.find(item => item.indexOf(id))
				console.log(selectInfo)
				this.selectedIndex = this.combinations.findIndex(item => item[this.cbValue] === selectInfo)
				this.selectSkuInfo = this.combinations[this.selectedIndex]
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				this.$emit('confirm',this.skuId, this.selectSkuInfo.id)
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
			max-height: 600rpx;
			.bottom-space{
				height: 400rpx;
			}
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
