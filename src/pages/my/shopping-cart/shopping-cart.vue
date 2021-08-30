<template>
	<view class="cartContainer">
		<view class="header">
			<view class="left"></view>
			<view class="manage" @click="isManage=!isManage">{{isManage?"管理":"完成"}}</view>
		</view>
		
		<view class="noGoods" v-if="!shopList.length&&!disabledSkuList.length">
			<image src="../../../static/shopping-cart/blank_ic@2x.png" class="noGoodsImg"></image>
			<view class="noGoodsText">
				购物车空空如也，快去逛逛吧～
			</view>
			<button type="primary" class="goShopping">
				<text class="text">去逛逛</text>
			</button>
		</view>
		<view class="shoppingCart" v-else>
			<view class="shopItem" v-for="(shopItem,shopIndex) in shopList" :key="shopItem.storeId">
				<view class="shopInfo">
					<view class="check" v-if="!shopItem.shopChecked" @click="checkShop(shopItem.storeId)"></view>
					<image class="checked" src="../../../static/shopping-cart/checked@2x.png" @click="checkShop(shopItem.storeId)" v-else></image>
					<view class="goShop">
						<text class="shopName">{{shopItem.storeName}}</text>
						<image src="../../../static/shopping-cart/goShop_ic@2x.png" class="shopIcon"></text>
					</view>
				</view>	
				<uni-swipe-action>
				  <uni-swipe-action-item
				    v-for="(goodsItem,goodsIndex) in shopItem.skuList"
				    :key="goodsItem.skuId"
				    :right-options="options"
				    @click="bindClick(shopIndex,goodsIndex)"
				  >
				<view class="goodsItem"  >
					<view class="check" v-if="!goodsItem.goodsChecked" @click="checkGoods(shopItem.storeId,goodsItem.skuId)"></view>
					<image class="checked" src="../../../static/shopping-cart/checked@2x.png" @click="checkGoods(shopItem.storeId,goodsItem.skuId)" v-else></image>
					<image :src="goodsItem.image" class="goodsItemImg"></image>
					<view class="goodsInfo">
						<view class="goodsDesc">
							<span class="goodsType">{{goodsItem.productType=== 1?"服务":"物品"}}</span>
							{{goodsItem.spuName}}
						</view>
						<view class="goodsSpec" @click="open">
							{{goodsItem.skuName}}
							<image src="../../../static/shopping-cart/selectOptions@2x.png" class="selectOptions"></image>
						</view>
						
						<view class="foot">
							<view class="goodsPrice">¥{{goodsItem.price}}/{{goodsItem.unitName}}</view>
							<view class="countCtrl">
								<image v-if="!isMiniOrder" src="../../../static/shopping-cart/details_pop_@2x.png" class="dec" @click="changeCount(false,shopIndex, goodsIndex)"></image>
							  <button v-else class="btn" @click="changeCount(false,shopIndex, goodsIndex)"></button>
							  <view class="count" @click="defineCount"> {{goodsItem.buyCount}} </view>
							  <image src="../../../static/shopping-cart/details_pop_add_normal@2x.png" class="inc" @click="changeCount(true, shopIndex,goodsIndex)"></image>          
							</view>
						</view>
					</view>
				</view>	
				</uni-swipe-action-item>
				</uni-swipe-action>
				</view>
				<popup-input v-if="showDefineCount"></popup-input>
				<uni-popup ref="popup" type="bottom"></uni-popup>
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
							<view class="spec">{{disabldSkuItem.skuName}}</view>
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
						<view class="preOrder">结算({{totalCout}})</view>
					</view>
				</view>  							
				<view class="shopCheck" v-else>
					<view class="left">
						<view class="check" @click="checkedAll" v-if="!isCheckedAll"></view>
						<image src="../../../static/shopping-cart/checked@2x.png" class="check" @click="checkedAll" v-else></image>
						<view class="text">全选</view>
					</view>
					<view class="right">
						<view class="collect">移入收藏</view>
						<view class="delete">删除</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getShoppingCartProductInfo} from "../../../api/user.js"
	import SelectSku from "../../../components/select-sku/select-sku"
	import PopupInput from "../../../components/popup-input/popup-input"
	export default {
		components:{
			SelectSku,
			PopupInput
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
				shopList:[],
				disabledSkuList:[],
				totalCout:0,
				totalPrice:0,
				showPecification:false,
				isManage:true,
				isCheckedAll:false,
				showDefineCount:false
			}
		},
		onLoad: ()=> {
			console.log("跳转了")
			
		},
		mounted(){
			this.requestPage()
		},
		watch:{},
		methods:{
			requestPage(){
				let res = {
					"code": 1,
					"message": "Success",
					"data": {
							"storeList": [
									{
											"storeId": 1,
											"storeName": "测试店铺1",
											"skuList": [
													{
															"skuId": 1642,
															"storeId": 1,
															"spuName": "testcj测试设计类商品1",
															"skuName": "橙色 | 大师 | 大师全案",
															"image": "https://ali-image-test.dabanjia.com/image/20210816/11/1629087052820_2600%241626858792066_0436s4.png",
															"price": 1,
															"unitName": "套",
															"minimumOrderQuantity": "2",
															"stepLength": "1",
															"buyCount": "1.1",
															"productType": 2
													},
													{
															"skuId": 1633,
															"storeId": 1,
															"spuName": "纯设计 全案设计服务 平层设计",
															"skuName": "尊享全案",
															"image": "https://ali-image.dabanjia.com/image/20210427/18/1619518964857_2021%24%E5%85%A8%E6%A1%88%E8%AE%BE%E8%AE%A1app%E5%A4%B4%E5%9B%BE.jpg",
															"price": 1,
															"unitName": "平米",
															"minimumOrderQuantity": "70",
															"stepLength": 1,
															"buyCount": "3.1",
															"productType": 2
													},
													{
															"skuId": 1624,
															"storeId": 1,
															"spuName": "爆爆爆",
															"skuName": "橙色 | 299",
															"image": "https://ali-image-test.dabanjia.com//image/20210306/1615000401478_3393%244%E6%AF%943.jpg",
															"price":2,
															"unitName": "套",
															"minimumOrderQuantity": 1,
															"stepLength": 1,
															"buyCount": "1",
															"productType": 2
													}
											]
									},
									{
											"storeId": 2,
											"storeName": "测试店铺2",
											"skuList": [
													{
															"skuId": 1616,
															"storeId": 2,
															"spuName": "设计师的测试商品1",
															"skuName": "单空间",
															"image": "https://ali-image-test.dabanjia.com/image/20210811/16/1628671199526_5719%249cfb968c817c2d1cc6afdb9ed7516c68.jpg",
															"price": 1,
															"unitName": "套",
															"minimumOrderQuantity": "1",
															"stepLength": 1,
															"buyCount": "2",
															"productType": 2
													},
													{
															"skuId": 1597,
															"storeId": 2,
															"spuName": "纯设计 全案设计服务 平层设计",
															"skuName": "大师全案",
															"image": "https://ali-image.dabanjia.com/image/20210427/18/1619518964857_2021%24%E5%85%A8%E6%A1%88%E8%AE%BE%E8%AE%A1app%E5%A4%B4%E5%9B%BE.jpg",
															"price": 1,
															"unitName": "平米",
															"minimumOrderQuantity": "50",
															"stepLength": 1,
															"buyCount": "11",
															"productType": 2
													},
													{
															"skuId": 1570,
															"storeId": 2,
															"spuName": "设计师的测试商品1",
															"skuName": "双空间",
															"image": "https://ali-image-test.dabanjia.com/image/20210811/16/1628671199526_5719%249cfb968c817c2d1cc6afdb9ed7516c68.jpg",
															"price": 1,
															"unitName": "套",
															"minimumOrderQuantity": "1",
															"stepLength": 1,
															"buyCount": "1",
															"productType": 2
													},
													{
															"skuId": 1555,
															"storeId": 2,
															"spuName": "设计类商品测试",
															"skuName": "甄选 | 搭配师",
															"image": "https://ali-image.dabanjia.com//image/20210312/161552364613400.png",
															"price": 3,
															"unitName": "平米",
															"minimumOrderQuantity": "3",
															"stepLength": 1,
															"buyCount": "4",
															"productType": 2
													}
											]
									}
							],
							"disabledSkuList": [
									{
											"skuId": 1240,
											"storeId": 3,
											"spuName": "最最最最牛的设计",
											"skuName": "尊享 | 大师全案",
											"image": "https://ali-image-test.dabanjia.com/image/20210722/11/1626925656305_9648%2457c7ec49ccd6b4f6b5ae9a17bcb5ae80.jpg",
											"price": 2,
											"unitName": "平米",
											"minimumOrderQuantity": 1,
											"stepLength": 1,
											"buyCount": "4",
											"productType": 2
									},
									{
											"skuId": 1452,
											"storeId": 4,
											"spuName": "完美单身全案设计服务",
											"skuName": "大师全案",
											"image": "https://ali-image-test.dabanjia.com//image/20210314/1615676007347_1525%24%E6%87%92%E7%8E%8B%E5%A4%B4%E5%9B%BE%E6%89%93%E6%89%AE%E5%AE%B6app%E5%B9%B3%E5%8F%B0.jpg",
											"price": 5,
											"unitName": "平米",
											"minimumOrderQuantity": 1,
											"stepLength": 1,
											"buyCount": "14",
											"productType": 2
									}
							]
					}
				}
				// let userId = uni.getStorageSync("userId")
				// getShoppingCartProductInfo(123).then(res=>{
					let {code,data,message} = res
					if(code === 1&&data){
						let {storeList,disabledSkuList} = data
						storeList.map(item=>{
							item.shopChecked = false
							item.skuList.map(ele=>{
								ele.goodsChecked = false
								ele.isMiniOrder = (+ele.buyCount <= +ele.minimumOrderQuantity) ?true:false
									
								return ele
							})
							return item
						})
						this.shopList = storeList || []
						this.disabledSkuList = disabledSkuList || []
					}
				// 	else{
				// 		this.$message.error(message|| "获取购物车商品失败")
				// 	}
				// })
			},
			defineCount(){
				this.showDefineCount = true
			},
			calcTotalPrice(){
				this.shopList.forEach(item=>{
					item.skuList.forEach(ele=>{
						if(ele.goodsChecked){
							this.totalPrice+=(+ele.buyCount*ele.price)
						}
					})
				})
				return this.totalPrice
			},
			calcTotalCout(){
				this.shopList.forEach(item=>{
					item.skuList.forEach(ele=>{
						if(ele.goodsChecked){
							this.totalCout+=(+ele.buyCount)
						}
					})
				})
				return this.totalCout
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
				this.calcTotalCout()
				this.calcTotalPrice()
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
				this.calcTotalCout()
				this.calcTotalPrice()
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
				this.calcTotalCout()
				this.calcTotalPrice()
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
				this.calcTotalCout()
				this.calcTotalPrice()
				if(this.shopList.every(ele=>ele.shopChecked)){
					this.isCheckedAll = true
				}else{
					this.isCheckedAll = false
				}
			},
		
			bindClick(shopIndex,goodsIndex){
				this.shopList[shopIndex].skuList.splice(goodsIndex, 1)//直接删除当前的商品
			}, 
			clearDisaledSku(){
				uni.showModal({
				    content: "确定要清空失效商品吗？",
						cancelColor:"#333333",
						confirmColor:"#ff3347",
				    success:res => {
				        if (res.confirm) {
									this.disabledSkuList = []	
				        } else if (res.cancel) {
										return
				        }
				    }
				});
			},
			open(){
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
	.header{
		width: 100%;
		height: 40px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header .left{
		width: 62px;
		height: 20px;
		margin-left: 20px;
		font-size: 14px;
		text-align: center;
		color: #666666;
		line-height: 20px;
	}
	.header .manage {
		width: 28px;
		height: 20px;
		margin-right: 20px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
	}
	.noGoods{
		width: 200px;
		position: absolute;
		left: 97px;
		right: 0;
		top: 150px;
		bottom: 0;
	}
	.noGoods .noGoodsImg{
		width: 124px;
		height: 124px;
		display: block;
		margin-left: 35px;
		margin-bottom: 10px;
	}
	.noGoods .noGoodsText{
		width: 182px;
		height: 13px;
		line-height: 13px;
		margin-left: 5px;
		font-size: 13px;
		text-align: center;
		color: #999999;
	}
	.noGoods .goShopping{
		width: 124px;
		height: 44px;
		background: linear-gradient(135deg,#53d5cc, #4fc9c9);
		border-radius: 6px;
		margin-top: 24px;
	}
	.noGoods .goShopping .text{
		width: 48px;
		height: 16px;
		font-size: 16px;
		text-align: center;
		color: #ffffff;
		line-height: 16px;
	}
	.shoppingCart{
		width: 100%;
	}
	.shopItem{
		margin: 12px 11px 0px 11px;
		background: #FFFFFF;
		border-radius: 8px;
	}
	.shopInfo{
		height: 53px;
		margin-left: 10px;
		display: flex;
		align-items: center;
	}
	.shopInfo .check{
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #ffffff;
		border: 1px solid #e5e5e5;
	}
	.shopInfo .checked{
		width: 18px;
		height: 18px;
		display: block;
	}
	.shopInfo .goShop{
		height: 100%;
		display: flex;
		align-items: center;
	}
	.shopInfo .shopName{
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		font-weight: 500;
		color: #333333;
		margin-left:10px;
		margin-right: 10px;
	}
	.shopInfo .shopIcon{
		width: 15px;
		height: 15px;
		display: block;
	}
	//商品
	.shopItem .goodsItem{
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 12px;
		padding-bottom: 12px;
	}
	.goodsItem .check{
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #ffffff;
		border: 1px solid #e5e5e5;
	}
	.goodsItem .checked{
		width: 18px;
		height: 18px;
		display: block;
	}
	.goodsItem .goodsItemImg{
		width: 96px;
		height: 96px;
		display: block;
		margin-left: 5px;
		margin-right: 10px;
		border-radius: 4px;
	}
	.goodsItem .goodsInfo{
		height: 100%;
		margin-right: 10px;
	}
	.goodsInfo .goodsDesc{
		width: 190px;
		height: 40px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
		text-overflow: ellipsis;
	}
	.goodsInfo .goodsDesc .goodsType{
		width: 30px;
		height: 15px;
		padding: 1px 5px 1px 5px;
		margin-right: 2px;
		border: 1px solid #35c4c4;
		border-radius: 2px;
		font-size: 10px;
		font-weight: 500;
		color: #35c4c4;
		line-height: 14px;
		text-align:center;
	}
	.goodsInfo .goodsSpec{
		width: 70%;
		height: 19px;
		text-overflow: ellipsis;
		margin-top: 8px;
		margin-bottom: 8px;
		background: #fafafa;
		border: 1px solid #f0f0f0;
		border-radius: 2px;
		font-size: 11px;
		color: #999999;
		display: flex;
	}
	.goodsInfo .goodsSpec .selectOptions{
		width: 14px;
		height: 14px;
		display: block;
	}
	.goodsInfo .foot{
		display: flex;
		justify-content: space-between;
	}
	.goodsInfo .foot .goodsPrice{
		width: 76px;
		height: 18px;
		color: #ff3347;
		line-height: 28px;
	}
	.goodsInfo .foot .countCtrl{
		display: flex;
	}
	.goodsInfo .foot .countCtrl .dec{
		width: 24px;
		height: 24px;
		display: block;
	} 
	.goodsInfo .foot .countCtrl .btn{
		width: 24px;
		height: 24px;
	}
	.goodsInfo .foot .countCtrl .count{
		width: 46px;
		height: 24px;
		background: #f2f2f2;
		font-size: 12px;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 24px;
	}
	.goodsInfo .foot .countCtrl .inc{
		width: 24px;
		height: 24px;
		display: block;
	} 
	//已失效
	.disabledSku{
		margin: 12px 12px 26px 12px;
		padding: 12px 10px 12px 10px;
		background: #ffffff;
		border-radius: 8px;
	}
	.disabledSku .top{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.disabledSku .top .title{
		width: 70px;
		height: 20px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
	}
	.disabledSku .top .clear{
		width: 84px;
		height: 20px;
		margin-right: 10px;
		font-size: 14px;
		color: #35c4c4;
		line-height: 20px;
	}
	.disabledSku .disabldSkuItem{
		width: 100%;
		height: 96px;
		display: flex;
		margin-top: 16px;
	}
	.disabldSkuItem .disabldSkuImg{
		width: 96px;
		height: 96px;
		background: rgba(0,0,0,0.30);
		display: block;
		margin-right: 10px;
		border-radius: 4px;
	}
	.disabldSkuItem .disabledSkuInfo{
		height: 100%;
		margin-right: 10px;
	}
	.disabledSkuInfo .disabledSkuDesc{
		width: 218px;
		height: 40px;
		font-size: 14px;
		color: #cdcdcd;
		line-height: 20px;
		text-overflow: ellipsis;
	}
	.disabledSkuInfo .disabledSkuDesc .disabledSkuType{
		width: 30px;
		height: 15px;
		padding: 1px 5px 1px 5px;
		margin-right: 2px;
		border: 1px solid #cdcdcd;
		border-radius: 2px;
		font-size: 10px;
		font-weight: 500;
		color: #cdcdcd;
		line-height: 14px;
		text-align:center;
	}
	.disabledSkuInfo .spec{
		width: 100px;
		height: 19px;
		margin-top: 8px;
		margin-bottom: 8px;
		background: #fafafa;
		border: 1px solid #f0f0f0;
		border-radius: 2px;
		font-size: 11px;
		color: #999999;
	}
	.disabledSkuInfo .text{
		width: 190px;
		height: 20px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
	}
	.bottom{
		width: 100%;
		height: 76px;
	}
	.shopCheck{
		width:100%;
		height: 52px;
	  background: #fff;
	  padding-bottom: 32px;
	  display: flex;
		justify-content: space-between;
	  align-items: center;
	  position: fixed;
	  bottom: 0px; 
	  left: 0px;
	}
	.shopCheck .left{
		display: flex;
	}
	.shopCheck .check{
		width: 18px;
		height: 18px;
		margin-left: 14px;
		margin-right: 10px;
		border-radius: 50%;
		background: #ffffff;
		border: 1px solid #e5e5e5;
	}
	.shopCheck .text{
	  width: 29px;
	  height: 20px;
	  color: #333;
		font-size: 14px;
	  line-height: 20px;
	}
	.shopCheck .right {
	  display: flex;
		justify-content: flex-end;
	  align-items: center;
	}
	.right .text{
	  width: 42px;
	  height: 14px;
	  line-height: 14px;
	  font-size: 14px;
	  color: #333;
	}
	.totalPrice{
	  width: 57px;
	  height: 18px;
	  font-size: 12px;
	  color: #ff3347;
	}
	
	.preOrder{
	  width: 124px;
	  height: 44px;
	  text-align: center;
		line-height: 44px;
	  margin-right: 10px;
	  border-radius: 6px;
		font-size: 16px;
	  color: #fff;
	  background: linear-gradient(135deg,#53d5cc, #4fc9c9);;
	}    
	.collect{
		width: 84px;
		height: 32px;
		line-height: 32px;
		font-size: 13px;
		text-align: center;
		color: #fe9000;
		background: #ffffff;
		border: 1px solid #fe9000;
		border-radius: 6px;
	}
	.delete{
		width: 58px;
		height: 32px;
		margin: 0 16px 0 16px;
		line-height: 32px;
		font-size: 13px;
		text-align: center;
		color: #ff3347;
		background: #ffffff;
		border: 1px solid #ff3347;
		border-radius: 6px;
	}
</style>
