<template>
	<view class="container">
		<!-- <view @click="gotoBrandlist">
			品牌馆
		</view> -->
		<view class="store-container">
			<view class="storeItem" v-for="storeItem in storeList" :key="storeItem.id">
				<image class="storeImg" @click="gotoStoreDetail(storeItem)" :src="storeItem.store.avatar" />
				<view class="baseInfo-container">
					<view class="header"
					 :style="{marginTop:!(storeItem.store.tags && storeItem.store.tags.length)?'24rpx':'0',
					 marginBottom:!(storeItem.store.tags && storeItem.store.tags.length)?'32rpx':'12rpx'}"
					>
						<image 
							v-if="storeItem.store.type == 2" 
							@click="gotoStoreDetail(storeItem)" 
							class="icon" 
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/ziyingIcon.png" 
						/>
						<image 
							v-if="storeItem.store.type == 1" 
							@click="gotoStoreDetail(storeItem)" 
							class="icon" 
							src="https://ali-image.dabanjia.com/static/mp/dabanjia/images/theme-red/classify/zhuanyingIcon.png" 
						/>
						<view class="title" @click="gotoStoreDetail(storeItem)">
							<text>{{storeItem.store.name}}</text>
							<!-- <text v-if="storeItem.store.address">{{`(${storeItem.store.address})`}}</text> -->
						</view>
					</view>
					<view class="label-container" v-if="storeItem.store.tags && storeItem.store.tags.length">
						<view class="labelItem" v-for="(tagItem,index) in storeItem.store.tags" :key="index">
							{{tagItem}}
						</view>
					</view>
					<view class="product-container">
						<view 
							class="productItem" 
							v-for="productItem in storeItem.store.materialSpu" 
							:key="productItem.spuId"
							@click="gotoProductDetail(productItem)"
						>
							<image class="productImg" :src="productItem.spuImage" />
							<view class="productName">{{productItem.spuName}}</view>
							<view class="price">
								<text style="font-size: 22rpx;">￥</text>
								<text style="font-size: 28rpx;font-weight: 500;"> {{handlePrice(productItem.skuPrice/100)[0]}}.{{handlePrice(productItem.skuPrice/100)[1]}}</text>
								<text style="font-size: 20rpx;">/{{productItem.unitName}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getStoreList} from "@/api/classify.js"
	export default {
		data() {
			return {
				trigger:false,
				onLoading:false,
				query:{
					page:1,
					rows:15,
					areaId:0,
					totalPage:1,
				},
				storeList:[],
				dataListLength:0,
				userInfo: {},
				userId: "",
			}
		},
		onLoad() {
			const currentHouse = getApp().globalData.currentHouse;
			this.query.areaId = currentHouse.areaId;
			console.log("currentHouse!!!!!==",currentHouse)
			console.log("areaId!!!!!==",currentHouse.areaId)
			this.userId = getApp().globalData.token;
			this.reqStoreList()
		},
		onShow() {
		},
		//页面上拉触底事件的处理函数
		onReachBottom(e) {
			console.log("底部")// 滚动到页面执行该方法
			if(this.query.page>this.query.totalPage  ||  this.dataListLength == 0) return 
			this.reqStoreList();

		},
		methods: {
			gotoBrandlist(){
					uni.navigateTo({
						url:"../brand-list/brand-detail"
					})
			},
			reqStoreList(){
				this.onLoading = true
				let params ={
					pageIndex:this.query.page,
					pageSize:this.query.rows,
					areaId:this.query.areaId,
				}
				console.log("araaaaaaaaaa==",params)
				getStoreList(params).then(res=>{
					console.log("res==",res)
					this.query.totalPage = res.totalPage;
					this.query.page++;
					this.dataListLength = res.page.length;
					this.storeList = this.storeList.concat(res.page);
					this.onLoading =false;
				})
				console.log("this.storeList===",this.storeList)
			},
			//去店铺详情页面  如果没有登陆的话先登陆然后再进入店铺详情页面
			gotoStoreDetail(item){
				console.log("去店铺详情页面",item)
				console.log("item.storeId==",item.store.id)
				console.log("houseId==",this.query.houseId)
				if(!this.userId){
					uni.navigateTo({
						url:"../../../pages/login/login"
					})
				}else{
					if(this.query.houseId){
						uni.navigateTo({
							url:`../shops/shops?storeId=${item.store.id}&houseId=${this.query.houseId}`
						})
					}else{
						uni.navigateTo({
							url:`../shops/shops?storeId=${item.store.id}`
						})
					}
				}
				
			},
			// 去商品详情页面
			gotoProductDetail(item){
				console.log("去商品详情页面",item)
				uni.navigateTo({
					url:`../goods-detail/goods-detail?goodId=${item.skuId}`
				})
			},
			handlePrice(price){
				if(!price) return ['0','00']
				let list=String(price).split(".")
				if(list.length==1){
					return [list[0],"00"]
				}else{
					return[list[0],list[1]]
				}
			},
		}
	}
</script>

<style lang="scss" scoped>

	.container{
		background: #F5F5F5;
		.store-container{
			height: 100%;
			overflow: scroll;

		}
	}
	.storeItem{
		margin-top: 16rpx;
		// height: 448rpx;
		background: #ffffff;
		border-radius: 24rpx;
		display: flex;
		justify-content: flex-start;
		padding: 24rpx 0 32rpx 24rpx;
		.storeImg{
			width: 108rpx;
			height: 108rpx;
			border: 1rpx solid #F2F2F2;
			box-sizing: border-box;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.baseInfo-container{
			.header,.label-container,.product-container{
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
			}

			.header{
				margin-bottom: 12rpx;
				.icon{
					width: 50rpx;
					height: 28rpx;
					border-radius: 4rpx;
					margin-right: 10rpx;
				}
				.title{
					max-width: 506rpx;
					height: 44rpx;
					line-height: 44rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text{
						color: #333333;
						font-size: 32rpx;
						font-weight: bold;
						letter-spacing: 1rpx;
					}
				}
			}

			.label-container{
				margin-bottom: 28rpx;
				flex-flow: row wrap;
				height: 36rpx;
				max-width: 544rpx;
				overflow: hidden;
				.labelItem{
					padding: 0 12rpx;
					height: 36rpx;
					line-height: 36rpx;
					color: #586E85;
					font-size: 22rpx;
					background: #F2F4F7;
					border-radius: 6rpx;
					margin-right: 16rpx;
				}
			}

			.product-container{
				overflow: hidden;
				.productItem{
					display: flex;
					flex-flow: column nowrap;
					margin-right: 16rpx;
					.productImg{
						width: 178rpx;
						height: 178rpx;
						border-radius: 16rpx;
						margin-bottom: 16rpx;
					}
					.productName{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 24rpx;
						letter-spacing: 1rpx;
						max-width: 166rpx;
						color: #333333;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-bottom: 4rpx;
					}

					.price{
						text{
							color: #333333;
						}
					}
				}
			}
		}
	}

</style>
