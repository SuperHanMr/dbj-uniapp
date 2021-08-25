<template>
	<view class="cartContainer">
		<view class="noGoods" v-if="!shopList.length&&!disabledSkuList.length">
			<image src="../../../static/shopping-cart/blank_ic@3x.png" class="noGoodsImg"></image>
			<view class="noGoodsText">
				购物车空空如也，快去逛逛吧～
			</view>
			<button type="primary" class="goShopping">
				<text class="text">去逛逛</text>
			</button>
		</view>
		<view class="shoppingCart" v-else>
			<view class="shopItem" v-for="(shopItem,index) in shopList" :key="shopItem.storeId">
				<view class="shopInfo">
					<view class="check"></view>
					<view class="goShop">
						<text class="shopName">{{shopItem.storeName}}</text>
						<image src="../../../static/shopping-cart/goShop_ic@2x.png" class="shopIcon"></text>
					</view>
				</view>	
				<view class="goodsItem" v-for="(goodsItem,index) in shopItem.skuList" :key="goodsItem.skuId">
					<view class="check"></view>
					<image :src="goodsItem.image" class="goodsItemImg"></image>
					<view class="goodsInfo">
						<view class="goodsDesc">
							<span>服务</span>
							<span class="goodsCate">{{goodsItem.spuName}}</span>
						</view>
						<view class="goodsSpec">
							{{goodsItem.skuName}}
						</view>
						<view class="foot">
							<view class="goodsPrice">{{goodsItem.price}}</view>
							<view class="countCtrl">
							  <text class="del" @click="changeCount(false, index)"> - </text>
							  <text class="count"> {{goodsItem.buyCount}} </text>
							  <text class="add" @click="changeCount(true, index)"> + </text>          
							</view>
						</view>
					</view>
				</view>	
				</view>
				<view class="disabledSku" v-if="disabledSkuList.length">
					<view class="top">
						<view class="title">已失效商品</view>
						<view class="clear">清空失效商品</view>
					</view>
					<view class="disabldSkuItem" v-for="disabldSkuItem in disabledSkuList" :key="disabldSkuItem.skuId">
						<image :src="disabldSkuItem.image" class="disabldSkuImg"></image>
						<view class="sku">
							<view class="skuTitle">{{disabldSkuItem.skuName}}</view>
							<view class="spec"></view>
							<view class="text">该商品已经失效</view>
						</view>
					</view>
				</view>
				<view class="cartFooter">
					<text></text> 
					<text class="allSelected">全选{{totalCount}}</text>
					<view class="right">
						<text class="totalPrice">合计：¥{{totalPrice}}</text>
						<button type="primary" class="preOrder">
							结算
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getShoppingCartProductInfo} from "../../../api/user.js"
	export default {
		data(){
			return {
				shopList:[],
				disabledSkuList:[],
				totalCount:0,
				totalPrice:0
			}
		},
		onLoad: ()=> {
			console.log("跳转了")
			
		},
		mounted(){
			this.requestPage()
		},
		methods:{
			requestPage(){
				// let userId = 123
				// getShoppingCartProductInfo(userId).then(res=>{
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
                        "stepLength": null,
                        "buyCount": "3.1",
                        "productType": 2
                    },
                    {
                        "skuId": 1624,
                        "storeId": 1,
                        "spuName": "爆爆爆",
                        "skuName": "橙色 | 299",
                        "image": "https://ali-image-test.dabanjia.com//image/20210306/1615000401478_3393%244%E6%AF%943.jpg",
                        "price": null,
                        "unitName": "套",
                        "minimumOrderQuantity": null,
                        "stepLength": null,
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
                        "price": null,
                        "unitName": "套",
                        "minimumOrderQuantity": "1",
                        "stepLength": null,
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
                        "stepLength": null,
                        "buyCount": "11",
                        "productType": 2
                    },
                    {
                        "skuId": 1570,
                        "storeId": 2,
                        "spuName": "设计师的测试商品1",
                        "skuName": "双空间",
                        "image": "https://ali-image-test.dabanjia.com/image/20210811/16/1628671199526_5719%249cfb968c817c2d1cc6afdb9ed7516c68.jpg",
                        "price": null,
                        "unitName": "套",
                        "minimumOrderQuantity": "1",
                        "stepLength": null,
                        "buyCount": "1",
                        "productType": 2
                    },
                    {
                        "skuId": 1555,
                        "storeId": 2,
                        "spuName": "设计类商品测试",
                        "skuName": "甄选 | 搭配师",
                        "image": "https://ali-image.dabanjia.com//image/20210312/161552364613400.png",
                        "price": null,
                        "unitName": "平米",
                        "minimumOrderQuantity": "3",
                        "stepLength": null,
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
                "price": null,
                "unitName": "平米",
                "minimumOrderQuantity": null,
                "stepLength": null,
                "buyCount": "4",
                "productType": 2
            },
            {
                "skuId": 1452,
                "storeId": 4,
                "spuName": "完美单身全案设计服务",
                "skuName": "大师全案",
                "image": "https://ali-image-test.dabanjia.com//image/20210314/1615676007347_1525%24%E6%87%92%E7%8E%8B%E5%A4%B4%E5%9B%BE%E6%89%93%E6%89%AE%E5%AE%B6app%E5%B9%B3%E5%8F%B0.jpg",
                "price": null,
                "unitName": "平米",
                "minimumOrderQuantity": null,
                "stepLength": null,
                "buyCount": "14",
                "productType": 2
            }
        ]
    }
}

					let {code,data,message} = res
					if(code === 1&&data){
						let {storeList,disabledSkuList} = data
						this.shopList = storeList || []
						this.disabledSkuList = disabledSkuList || []
					}else{
						this.$message.error(message|| "获取购物车商品失败")
					}
				// })
			},
			changeCount(isAdd, index){
				// if(isAdd){ // 累加
				// 			state.cartList[index].count += 1
				// 		}else { // 累减
				// 			if(state.cartList[index].count > 1){
				// 				state.cartList[index].count -= 1
				// 			}else { // 数量 == 1， 直接删除当前的商品
				// 				state.cartList.splice(index, 1)
				// 			}
				// 		}
			}
		}
	}
</script>

<style scoped>
	.cartContainer{
		width: 100%;
		height: 100%;
		background: #f5f6f7;
		position: relative;
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
		background-color: pink;
	}
	.shopItem{
		margin: 12px 11px 12px 11px;
		background: #FFFFFF;
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
	}
	.goodsItem .check{
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #ffffff;
		border: 1px solid #e5e5e5;
	}
	.goodsItem .goodsItemImg{
		width: 96px;
		height: 96px;
		display: block;
	}
	.goodsItem .goodsInfo{
		height: 40px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
	}
	.goodsItem .goodsSpec{
		width: 85px;
		height: 19px;
		background: #fafafa;
		border: 1px solid #f0f0f0;
		border-radius: 2px;
	}
	.disabledSku{
		
	}
	
</style>
