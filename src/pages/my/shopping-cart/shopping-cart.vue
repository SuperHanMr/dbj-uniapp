<template>
	<view class="cartContainer">
		<view class="noGoods" v-if="!shopList.length">
			<image src="../../../static/shopping-cart/blank_ic@2x.png" class="noGoodsImg"></image>
			<view class="noGoodsText">
				购物车空空如也，快去逛逛吧～
			</view>
			<button type="primary" class="goShopping">
				<text class="text">去逛逛</text>
			</button>
		</view>
		<view class="shoppingCart" v-else>
			<uni-popup
			    ref="popup"
			    type="dialog"
			  >
			    <uni-popup-dialog
			      mode="input"
			      title="编辑数量"
			      :duration="2000" :before-close="true" 
			      placeholder="可输入至小数点后两位"
						@close="closeDialog"
			      @confirm="defineCount"
			    />
			</uni-popup>
			<view class="header">
				<view class="left"></view>
				<view class="manage" @click="isManage=!isManage">{{isManage?"管理":"完成"}}</view>
			</view>
			<view class="shopItem" v-for="(shopItem,shopIndex) in shopList" :key="shopItem.storeId">
				<view class="shopInfo">
					<view class="check" v-if="!shopItem.shopChecked" @click="checkShop(shopItem.storeId)"></view>
					<image class="checked" src="../../../static/shopping-cart/checked@2x.png" @click="checkShop(shopItem.storeId)" v-else></image>
					<view class="goShop">
						<text class="shopName">{{shopItem.storeName}}</text>
						<image src="../../../static/shopping-cart/goShop_ic@2x.png" class="shopIcon"></text>
					</view>
				</view>	
				<view class="freeMail">	
					<view class="text">还差元可获得一次免运费权益</view>
					<view class="toShop">
						<text>去凑单</text>
						<image class="icon" src="../../../static/shopping-cart/toPostFree@2x.png"></image>
					</view>
				</view>
				<uni-swipe-action>
				  <uni-swipe-action-item
				    v-for="(goodsItem,goodsIndex) in shopItem.skuList"
				    :key="goodsItem.skuId"
				    :right-options="options"
				    @click="deleteGoods(goodsItem.skuId,goodsItem.buyCount)"
				  >
						<view class="goodsItem"  >
							<view class="check" v-if="!goodsItem.goodsChecked" @click="checkGoods(shopItem.storeId,goodsItem.skuId)"></view>
							<image class="checked" src="../../../static/shopping-cart/checked@2x.png" @click="checkGoods(shopItem.storeId,goodsItem.skuId)" v-else></image>
							<image :src="goodsItem.image" class="goodsItemImg"></image>
							<view class="goodsInfo">
								<view class="goodsDesc">
									<text class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</text>
									{{goodsItem.spuName}}
								</view>
								<view class="goodsSpec" @click="openSpec">
									{{goodsItem.skuName}}
									<image src="../../../static/shopping-cart/selectOptions@2x.png" class="selectOptions"></image>
								</view>
								
								<view class="foot">
									<view class="goodsPrice">¥{{goodsItem.price}}/{{goodsItem.unitName}}</view>
									<view class="countCtrl">
										<image v-if="!goodsItem.isMiniOrder" class="dec" src="../../../static/shopping-cart/details_pop_@2x.png" @click="changeCount(false,shopIndex, goodsIndex)"></image>
										<image v-else class="dec" src="../../../static/shopping-cart/details_pop_subtract_disabled@2x.png" @click="changeCount(false,shopIndex, goodsIndex)"></image>
										<view class="count" @click="openCount(shopIndex, goodsIndex)"> {{goodsItem.buyCount}} </view>
											
										<image src="../../../static/shopping-cart/details_pop_add_normal@2x.png" class="inc" @click="changeCount(true, shopIndex,goodsIndex)"></image>          
									</view>
								</view>
							</view>
						</view>	
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view class="mask" v-if="showMask">
				<view class="popupClass">
					<view class="header">
						<text class="tit">所选商品为不同类型商品，请分开结算</text>
						<image @click="goBackCart" src="../../../static/shopping-cart/ic_closed_black@2x.png" class="closedIcon"></image>
					</view>
					<view class="line"></view>
					<view class="service">
						<view class="top">
							<view class="left">
								<view class="title">服务类商品</view>
								<view class="count">件</view>
							</view>
							<view class="check" v-if=""></view>
							<image class="checked" v-else src="../../../static/shopping-cart/checked@2x.png"></image>
						</view>
						<!-- <view class="goods" v-for="">
							<image :src="" mode=""></image>
							<view class="goodsName"></view>
							<view class="check" v-if=""></view>
							<image class="checked" v-else src="../../../static/shopping-cart/checked@2x.png"></image>
						</view> -->
					</view>
					<view class="entity">
						<view class="left">
							<view class="title">实物类商品</view>
							<view class="count">件</view>
						</view>
						<!-- <view class="check" v-if=""></view>
						<image class="checked" v-else src="../../../static/shopping-cart/checked@2x.png"></image> -->
					</view>
					<view class="footer">去结算</view>
				</view>
			</view>	
				
				<select-sku></select-sku>
				<view class="disabledSku" v-if="disabledSkuList.length">
					<view class="top">
						<view class="title">已失效商品</view>
						<view class="clear" @click="clearDisaledSku">清空失效商品</view>
					</view>
					<view class="disabldSkuItem" v-for="disabldSkuItem in disabledSkuList" :key="disabldSkuItem.skuId">
						<image :src="disabldSkuItem.image" class="disabldSkuImg"></image>
						<view class="disabledSkuInfo">
							<view class="disabledSkuDesc">
								<span class="disabledSkuType">服务</span>
								{{disabldSkuItem.spuName}}
							</view>
							<view class="disabledSkuSpec">{{disabldSkuItem.skuName}}</view>
							<view class="text">该商品已经失效</view>
						</view>
					</view>
				</view>
				<view class="bottom"></view>
				<view class="shopCheck" v-if="isManage">
					<view class="left">
						<view class="check" @click="checkedAll" v-if="!isCheckedAll"></view>
						<image src="../../../static/shopping-cart/checked@2x.png" class="check" @click="checkedAll" v-else></image>
						<view class="text">全选</view>
					</view>
					<view class="right">
						<view class="text">合计：</view>
						<view class="totalPrice">¥{{totalPrice}}</view>
						<view class="preOrder" @click="pay">结算({{totalCout}})</view>
					</view>
				</view>  							
				<view class="shopCheck" v-else>
					<view class="left">
						<view class="check" @click="checkedAll" v-if="!isCheckedAll"></view>
						<image src="../../../static/shopping-cart/checked@2x.png" class="check" @click="checkedAll" v-else></image>
						<view class="text">全选</view>
					</view>
					<view class="right">
						<view class="collect" @click="toCollect">移入收藏</view>
						<view class="deleteChecked">删除</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getShoppingCartProductInfo,deleteProduct} from "../../../api/user.js"
	import SelectSku from "../../../components/select-sku/select-sku"
	export default {
		components:{
			SelectSku,
		},
		data(){
			return {
				options: [
				  {
				    text: "删除",
				    style: {
				      backgroundColor: "#dd524d",
				    },
				  },
				],
				userId:0,
				shopList:[],
				disabledSkuList:[],
				showPecification:false,
				isManage:true,
				isCheckedAll:false,
				currentShopIndex:0,
				currentGoodsIndex:0,
				showMask:false,
				
			}
		},
		onLoad: ()=> {
			console.log("跳转了")
		},
		mounted(){
			this.userId = uni.getStorageSync("userId")
			this.requestPage()
		},
		computed:{
			totalCout(){
				let count = 0
				this.shopList.forEach(item=>{
					item.skuList.forEach(ele=>{
						if(ele.goodsChecked){
							count+=(+ele.buyCount)
						}
					})
				})
				return count
			},
			totalPrice(){
				let sum = 0
				this.shopList.forEach(item=>{
					item.skuList.forEach(ele=>{
						if(ele.goodsChecked){
							sum+=(+ele.buyCount*ele.price)
						}
					})
				})
				return sum
			}
		},
		methods:{
			requestPage(){
				getShoppingCartProductInfo(123).then(data => {
						let {storeList,disabledSkuList} = data
						storeList.map(item => {
							item.shopChecked = false
							item.skuList.map(ele => {
								ele.goodsChecked = false
								ele.isMiniOrder = (+ele.buyCount <= +ele.minimumOrderQuantity) ? true:false
									
								return ele
							})
							return item
						})
						
						this.shopList = storeList || []
						this.disabledSkuList = disabledSkuList || []
				})
			},
			openCount(shopIndex, goodsIndex){
				this.$refs.popup.open()
				this.currentShopIndex = shopIndex 
				this.currentGoodsIndex = goodsIndex 
			},
			closeDialog() {
				this.$refs.popup.close()
			},
			goBackCart(){
				this.showMask = false
			},
			defineCount(val) {
				let count = +this.shopList[this.currentShopIndex].skuList[this.currentGoodsIndex].buyCount
				let step = +this.shopList[this.currentShopIndex].skuList[this.currentGoodsIndex].stepLength || 1
				let miniOrder = +this.shopList[this.currentShopIndex].skuList[this.currentGoodsIndex].minimumOrderQuantity || 1
				this.shopList[this.currentShopIndex].skuList[this.currentGoodsIndex].buyCount = val
				if(+val < miniOrder) {
					setTimeout(() => {
					  uni.showToast({
					  	title:`商品数量不得低于${miniOrder}件`,
							icon:"none",
							duration:3000
					  })
					}, 100);
				}else if(+val % step !== 0) {
					setTimeout(() => {
					  uni.showToast({
					  	title:`当前最小单位为${step}，输入的数量需为${step}的倍数`,
							icon:"none",
							duration:3000
					  })
					}, 100);
				}else if(+val >= 99999.99) {
					setTimeout(() => {
						uni.showToast({
							title:"商品数量超出范围",
							icon:"none",
							duration:3000
						});
					}, 100)
				}else{
					this.$refs.popup.close()
				}
				console.log(val,step,miniOrder,'//');
			},
			toCollect(){
				if(!this.totalCout){
					uni.showToast({
						title:"您还没有选择任何商品哦",
						icon:"none"
					})
				}else{
					//选中的商品会从购物车中消失
					this.shopList.forEach(item => {
						item.skuList.filter(ele => {
							return ele.goodsChecked
						})
					})
					uni.showToast({
						title:"该商品已移入收藏夹，可去收藏夹查看",
						icon:"none"
					})
				}
				
			},
			deleteChecked(){
				if(!this.totalCout){
					uni.showToast({
						title:"您还没有选择任何商品哦",
						icon:"none"
					})
				}else{
					uni.showModal({
						title: "确定要删除所选商品吗？",
						cancelColor:"#333333",
						confirmColor:"#ff3347",
						success:res => {
						    if (res.confirm) {
									let skuList = []
									this.shopList.forEach(item => {
										item.skuList.forEach(ele => {
											if(ele.goodsChecked){
												skuList.push(ele)
											}
										})
									})
									let params = {
										userId:this.userId,
										skuList:skuList
									}
									deleteProduct(params).then(data => {
										if(data){
											this.requestPage()
										}
									})
						    } else if (res.cancel) {
									return
						    }
						}
					})
				}
				
			},
			pay(){
				this.showMask = true
				if(!this.totalCout){
					uni.showToast({
						title:"您还没有选择任何商品哦",
						icon:"none"
					})
				}
				// else if(){
				// 	//当用户在购物车内选择了不同类型的商品时，点击结算无法进入到确认订单页面，会弹出左图所示弹窗
				// }
				else{
					//跳转至结算页面
				}
			},
			changeCount(isAdd, shopIndex,goodsIndex){
				let count = +this.shopList[shopIndex].skuList[goodsIndex].buyCount
				let step = +this.shopList[shopIndex].skuList[goodsIndex].stepLength
				let miniOrder = +this.shopList[shopIndex].skuList[goodsIndex].minimumOrderQuantity
				if(isAdd){ // 累加
					count += step
					this.shopList[shopIndex].skuList[goodsIndex].buyCount = count.toFixed(2).toString()
				}else { // 累减
					if(count > miniOrder){
						count -= step
						this.shopList[shopIndex].skuList[goodsIndex].buyCount = count.toFixed(2).toString()
					}else { // 数量为最小步长
						this.shopList[shopIndex].skuList[goodsIndex].isMiniOrder = true
						uni.showToast({
							title:"商品数量不能再减少了",
							icon:"none"
						})
					}
				}
			},	
			checkedAll(){
				this.isCheckedAll = !this.isCheckedAll
				this.shopList.map(item=>{
					item.shopChecked = this.isCheckedAll
					item.skuList.map(ele=>{
						ele.goodsChecked = this.isCheckedAll
						return ele
					})
					return item
				})
			},
			checkShop(id){
				this.shopList.map(item=>{
					if(item.storeId === id){
						item.shopChecked = !item.shopChecked
						item.skuList.map(ele=>{
							ele.goodsChecked = item.shopChecked
							return ele
						})
					}
					return item
				})
				if(this.shopList.every(ele=>ele.shopChecked)){
					this.isCheckedAll = true
				}else{
					this.isCheckedAll = false
				}
			},
			checkGoods(storeId,skuId){
				this.shopList.map(item=>{
					if(item.storeId === storeId){
						item.skuList.map(ele=>{
							if(ele.skuId === skuId){
								ele.goodsChecked = !ele.goodsChecked
							}
							return ele
						})
						if(item.skuList.every(ele=>ele.goodsChecked)){
							item.shopChecked = true
						}else{
							item.shopChecked = false
						}
					}
					return item
				})
				if(this.shopList.every(ele=>ele.shopChecked)){
					this.isCheckedAll = true
				}else{
					this.isCheckedAll = false
				}
			},
		
			deleteGoods(skuId,buyCount){
				let params = {
					userId: this.userId,
					skuList:[{
						skuId:skuId,
						buyCount:buyCount
					}]
				}
				deleteProduct(params).then(data => {
					if(data){
						this.requestPage()
					}
				})
			}, 
			clearDisaledSku(){
				uni.showModal({
				  title: "确定要清空失效商品吗？",
				  content: "清空后会移除全部已失效商品",
				  cancelColor:"#333333",
				  confirmColor:"#ff3347",
				  success:res => {
				      if (res.confirm) {
				  			this.disabledSkuList = []	
				  			//接口
				      } else if (res.cancel) {
				  			return
				      }
				  }  
				});
			},
			openSpec(){
				this.showPecification = true
				console.log(this.$refs.popup)
				this.$refs.popup.open('top')
			},
		
		}
	}
</script>

<style scoped>
	.cartContainer{
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #f5f6f7;
		position: relative;
	}
	.cartContainer >>> .uni-dialog-title-text.uni-popup__info{
		color: #333;
	}
	.cartContainer >>> .uni-dialog-input{
		background: #f5f5f5;
	}
	.cartContainer >>> .uni-dialog-button-text{
		color: #666666;
	}
	.cartContainer >>> .uni-dialog-button-text.uni-button-color{
		color: #35c4c4;
	}
	.header{
		width: 100%;
		height: 80rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header .left{
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
	.noGoods{
		width: 400rpx;
		position: absolute;
		left: 196rpx;
		right: 0;
		top: 300rpx;
		bottom: 0;
	}
	.noGoods .noGoodsImg{
		width: 248rpx;
		height: 248rpx;
		display: block;
		margin-left: 70rpx;
		margin-bottom: 20rpx;
	}
	.noGoods .noGoodsText{
		width: 364rpx;
		height: 26rpx;
		line-height: 26rpx;
		margin-left: 10rpx;
		font-size: 26rpx;
		text-align: center;
		color: #999999;
	}
	.noGoods .goShopping{
		width: 248rpx;
		height: 88rpx;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin-top: 48rpx;
	}
	.noGoods .goShopping .text{
		width: 96rpx;
		height: 32rpx;
		font-size: 32rpx;
		text-align: center;
		color: #ffffff;
		line-height: 32rpx;
	}
	.shoppingCart{
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
	.popupClass{
		width: 100%;
		height: 1046rpx;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
	.popupClass .header{
		display: flex;
		height: 104rpx;
		border-radius: 32rpx;
	}
	.popupClass .header .tit{
		width: 544rpx;
		height: 40rpx;
		padding: 32rpx 4rpx 32rpx 102rpx;
		font-size: 32rpx;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 40rpx;
	}
	.popupClass .header .closedIcon{
		width: 80rpx;
		height: 80rpx;
		display: block;
	}
	.popupClass .line{
		height: 2rpx;
		background: #f2f2f2;
	}
	.popupClass .service{
		width: 686rpx;
		height: 296rpx;
		margin: 32rpx;
		border: 2rpx solid #00bfb6;
		border-radius: 16rpx;
	}
	.popupClass .entity{
		width: 686rpx;
		height: 296rpx;
		margin: 0 32rpx 68rpx 32rpx;
		border: 2rpx solid #eeeeee;
		border-radius: 16rpx;
	}
	.popupClass .top{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.popupClass .left{
		margin-left: 32rpx;
	}
	.popupClass .left .title{
		width: fit-content;
		height: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #00bfb6;
		line-height: 44rpx;
		margin-top: 14rpx;
	}
	.popupClass .entity .left .title{
		color: #333333;
	}
	.popupClass .left .count{
		width: 42rpx;
		height: 36rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #00bfb6;
		line-height: 36rpx;
	}
	.popupClass .entity .left .count{
		color: #666666;
	}
	.popupClass .check{
		width: 36rpx;
		height: 36rpx;
		border: 2rpx solid #e5e5e5;
		border-radius: 50%;
		margin-right: 32rpx;
		margin-top: 32rpx;
	}
	.popupClass .checked{
		width: 36rpx;
		height: 36rpx;
		display: block;
		margin-right: 32rpx;
		margin-top: 32rpx;
	}
	.popupClass .footer{
		width: 686rpx;
		height: 88rpx;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		border-radius: 12rpx;
		margin-left: 32rpx;
		font-size: 32rpx;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
	}
	.shopItem{
		margin: 24rpx 22rpx 0rpx 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.shopInfo{
		height: 106rpx;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}
	.shopInfo .check{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 2rpx solid #e5e5e5;
	}
	.shopInfo .checked{
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.shopInfo .goShop{
		height: 100%;
		display: flex;
		align-items: center;
	}
	.shopInfo .shopName{
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		margin-left:24rpx;
		margin-right: 12rpx;
	}
	.shopInfo .shopIcon{
		width: 30rpx;
		height: 30rpx;
		display: block;
	}
	.freeMail{
		width: 604rpx;
		height: 60rpx;
		margin-left: 76rpx;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fafafa;
		border-radius: 6rpx;
	}
	.freeMail .text{
		width: 392rpx;
		height: 34rpx;
		margin-left: 24rpx;
		font-size: 24rpx;
		color: #333333;
		line-height: 34rpx;
	}
	.freeMail .toShop{
		width: 102rpx;
		height: 34rpx;
		font-size: 24rpx;
		color: #fe9000;
		line-height: 34rpx;
		display: flex;
	}
	.freeMail .toShop .icon{
		width: 30rpx;
		height: 30rpx;
		display: block;
	}
	//商品
	.shopItem .goodsItem{
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-bottom: 24rpx;
	}
	.goodsItem .check{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 1rpx solid #e5e5e5;
	}
	.goodsItem .checked{
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.goodsItem .goodsItemImg{
		width: 192rpx;
		height: 192rpx;
		display: block;
		margin-left: 12rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}
	.goodsItem .goodsInfo{
		height: 100%;
		margin-right: 20rpx;
	}
	.goodsInfo .goodsDesc{
		width: 380rpx;
		height: 80rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		text-overflow: ellipsis;
	}
	.goodsInfo .goodsDesc .goodsType{
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
	.goodsInfo .goodsSpec{
		width: fit-content;
		height: 38rpx;
		text-overflow: ellipsis;
		padding: 4rpx;
		margin: 12rpx 0 12rpx 0;
		background: #fafafa;
		border:1rpx solid #f0f0f0;
		border-radius: 4rpx;
		font-size: 22rpx;
		color: #999999;
		display: flex;
	}
	.goodsInfo .goodsSpec .selectOptions{
		width: 28rpx;
		height: 28rpx;
		display: block;
	}
	.goodsInfo .foot{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.goodsInfo .foot .goodsPrice{
		width: fit-content;
		height: 36rpx;
		color: #ff3347;
		font-size: 24rpx;
		line-height: 36rpx;
	}
	.goodsInfo .foot .countCtrl{
		display: flex;
	}
	.goodsInfo .foot .countCtrl .dec{
		width: 48rpx;
		height: 48rpx;
		display: block;
	} 
	.goodsInfo .foot .countCtrl .count{
		width: 92rpx;
		height: 48rpx;
		background: #f2f2f2;
		font-size: 24rpx;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 48rpx;
	}
	.goodsInfo .foot .countCtrl .inc{
		width: 48rpx;
		height: 48rpx;
		display: block;
	} 
	//已失效商品
	.disabledSku{
		margin: 24rpx 22rpx 48rpx 24rpx;
		padding: 24rpx 28rpx 32rpx 24rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}
	.disabledSku .top{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.disabledSku .top .title{
		width: 140rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.disabledSku .top .clear{
		width: 168rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #35c4c4;
		line-height: 40rpx;
	}
	.disabledSku .disabldSkuItem{
		width: 100%;
		height: 192rpx;
		display: flex;
		margin-top: 32rpx;
	}
	.disabldSkuItem .disabldSkuImg{
		width: 192rpx;
		height: 192rpx;
		background: rgba(0,0,0,0.30);
		display: block;
		margin-right: 24rpx;
		border-radius: 8rpx;
	}
	.disabldSkuItem .disabledSkuInfo{
		height: 100%;
	}
	.disabledSkuInfo .disabledSkuDesc{
		width: 436rpx;
		height: 80rpx;
		font-size: 28rpx;
		color: #cdcdcd;
		line-height: 40rpx;
		text-overflow: ellipsis;
	}
	.disabledSkuInfo .disabledSkuDesc .disabledSkuType{
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
		text-align:center;
	}
	.disabledSkuInfo .disabledSkuSpec{
		width: fit-content;
		height: 38rpx;
		padding: 4rpx;
		margin: 12rpx 0 12rpx 0;
		background: #fafafa;
		border: 1rpx solid #f0f0f0;
		border-radius: 4rpx;
		font-size: 22rpx;		
		text-overflow: ellipsis;
		color: #cdcdcd;
	}
	.disabledSkuInfo .text{
		width: 380rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.bottom{
		width: 100%;
		height: 152rpx;
	}
	.shopCheck{
		width: 100%;
		height: 104rpx;
	  background: #fff;
	  padding-bottom: 68rpx;
	  display: flex;
		justify-content: space-between;
	  align-items: center;
	  position: fixed;
	  bottom: 0rpx; 
	  left: 0rpx;
	}
	.shopCheck .left{
		display: flex;
	}
	.shopCheck .check{
		width: 36rpx;
		height: 36rpx;
		margin-left: 32rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #ffffff;
		border: 2rpx solid #e5e5e5;
	}
	.shopCheck .text{
	  width: 56rpx;
	  height: 40rpx;
	  color: #333;
		font-size: 28rpx;
	  line-height: 40rpx;
	}
	.shopCheck .right {
	  display: flex;
		justify-content: flex-end;
	  align-items: center;
	}
	.right .text{
	  width: 84rpx;
	  height: 28rpx;
	  line-height: 28rpx;
	  font-size: 28rpx;
	  color: #333;
	}
	.totalPrice{
	  width: 114rpx;
	  height: 36rpx;
	  font-size: 24rpx;
	  color: #ff3347;
	}
	
	.preOrder{
	  width: 248rpx;
	  height: 88rpx;
	  text-align: center;
		line-height: 88rpx;
	  margin-right: 32rpx;
	  border-radius: 12rpx;
		font-size: 32rpx;
	  color: #fff;
	  background: linear-gradient(135deg,#53d5cc, #4fc9c9);
	}    
	.collect{
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
	.delete{
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
