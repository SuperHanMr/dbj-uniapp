<template>
	<view class="container">
		<view class="store-container">
			<view class="storeItem" v-for="storeItem in storeList" :key="storeItem.id">
				<image class="storeImg" @click="gotoStoreDetail(storeItem)" :src="storeItem.store.avatar" />
				<view class="baseInfo-container">
					<view class="header">
						<image v-if="storeItem.store.type == 2" class="icon" src="../../static/image/ziyingIcon.png" />
						<image v-if="storeItem.store.type == 1" class="icon" src="../../static/image/zhuanyingIcon.png" />
						<view class="title" @click="gotoStoreDetail(storeItem)">
							<text>{{storeItem.store.name}}</text>
							<text v-if="storeItem.store.address">{{`(${storeItem.store.address})`}}</text>
						</view>
					</view>
					<view class="label-container" v-if="storeItem.store.tags && storeItem.store.tags.length">
						<view class="labelItem">家具</view>
						<view class="labelItem">全屋定制</view>
						<view class="labelItem">软装</view>
						<view class="labelItem">家具</view>
					</view>
					<view class="product-container">
						<view 
							class="productItem" 
							v-for="productItem in storeItem.store.materialSpu" 
							:key="productItem.spuId"
							@click="gotoProductDetail(productItem)"
						>
							<image class="productImg" :src="productItem.spuImage" />
							<view class="productName">简约柜子绿色...</view>
							<view class="price">
								<text style="font-size: 22rpx;">￥</text>
								<text style="font-size: 28rpx;font-weight: 500;"> {{handlePrice(productItem.skuPrice/100)[0]}}.{{handlePrice(productItem.skuPrice/100)[0] }}</text>
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
				areaId:"",
				storeList:[],
			}
		},
		onLoad() {
		},
		onShow() {
			this.reqStoreList()
			const currentHouse = getApp().globalData.currentHouse;
			// console.log("currentHouse=", currentHouse);
			this.areaId = currentHouse.areaId;
		},
		methods: {
			reqStoreList(){
				this.onLoading = true
				let params ={
					areaId:this.areaId
				}
				// getStoreList(params).then(res=>{
				// 	console.log("res==",res)
				// 	this.storeList = res.data.page
				// 	this.onLoading =false
				// })
				let res=
					{
						"code":1,
						"message":"Success",
						"data":{
							"total":19,
							"spendTime":1,
							"start":1,
							"end":10,
							"pageIndex":1,
							"totalPage":2,
							"totalRows":19,
							"rows":10,
							"page":[
								{
									"id":2501,
									"v":1,
									"i":1,
									"title":"打扮家自营旗舰店",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":25,
										"supplierId":82,
										"cityId":-1,
										"name":"打扮家自营旗舰店",
										"type":2,
										"deliveryFee":123.45,
										"freeDeliveryMoney":50000.0,
										"status":1,
										"address":"北京市石景山区点石商务公园8号楼6、8、9层",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211012/15/1634024606721_625$打扮家店铺头像.png",
										"introduction":"打扮家, 背靠国美控股, 为解决家装行业和市场的痛点。 在国美大家装战略的指导下, 打扮家以创新科技（BIM、 VR、AI等）打造行业新基建12大平台, 致力于建立行业 更高标准、价值透明化、共创共享的经营新模式, 为全行业的产业伙伴能够更规范、更公平、更可持续的发展而创造新的价值。打扮家以科技赋能为手段、全面激活 泛产业链的潜力, 让用户的家装更称心、更省心、更放心、 更省钱、真快乐。",
										"longitude":"116.305096",
										"latitude":"39.917149",
										"tags":[],
										"createTime":"2021-10-12T07:43:35.000+00:00",
										"updateTime":"2022-03-16T13:47:25.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[{"skuId":196400,
											"spuId":63821,
											"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220223/14/1645597247504_62137351.jpg",
											"skuPrice":8000,
											"unitId":6,
											"unitName":"平米",
											},{"skuId":196934,
											"spuId":63897,
											"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220301/17/1646127175419_7306831.jpg",
											"skuPrice":14000,
											"unitId":6,
											"unitName":"平米",
											},{
												"skuId":197129,
												"spuId":64022,
												"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220307/18/1646648363435_27199874.jpg",
												"skuPrice":10099,"unitId":21,"unitName":"台",
											},],
										},
								},
								{
									"id":16301,
									"v":1,
									"i":2,
									"title":"cj-服务店铺new",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":163,
										"supplierId":272,
										"cityId":-1,
										"name":"cj-服务店铺new",
										"type":2,
										"deliveryFee":5.0,
										"freeDeliveryMoney":1000.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211215/15/1639553190679_24497002.jpeg",
										"introduction":"一家服务类型的店铺",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-12-15T07:26:38.000+00:00",
										"updateTime":"2022-03-15T01:57:34.000+00:00",
										"containAllAreas":false,"serviceType":1,
										"materialSpu":[
											{"skuId":196065,"spuId":63670,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220124/16/1643013566549_59193419.jpeg","skuPrice":2000,"unitId":5,"unitName":"包"},
											{"skuId":196078,"spuId":63673,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220124/17/1643016733391_77903828.jpg","skuPrice":2000,"unitId":1,"unitName":"个"},
										],
									},
								},
								{
									"id":201,
									"v":1,
									"i":3,
									"title":"cj-材料店铺_全国店铺",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":2,
										"supplierId":1,
										"cityId":-1,
										"name":"cj-材料店铺_全国店铺",
										"type":2,
										"deliveryFee":5.0,
										"freeDeliveryMoney":20000.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211011/20/1633957078525_8533$13.jpg",
										"introduction":"阿萨德阿萨德阿萨德阿萨德阿萨德",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-10-11T12:58:01.000+00:00",
										"updateTime":"2022-03-11T10:04:54.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":124813,"spuId":45819,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211027/21/1635343030271_77875447","skuPrice":10000,"unitId":6,"unitName":"平米"},
											{"skuId":196370,"spuId":63811,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220122/14/1642831421469_45385557.png","skuPrice":2000,"unitId":6,"unitName":"平米"},
											{"skuId":26553,"spuId":10035,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211015/17/1634290469227_6357$jpeg图片.jpeg","skuPrice":1,"unitId":3,"unitName":"箱"},
										],
									},
								},
								{
									"id":18301,
									"v":1,
									"i":4,
									"title":"全国店全国店全国店全国店全国店全国店全国",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":183,
										"supplierId":282,
										"cityId":-1,
										"name":"全国店全国店全国店全国店全国店全国店全国",
										"type":2,
										"deliveryFee":12.0,
										"freeDeliveryMoney":100000.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220223/14/1645597966655_97620906.jpg","introduction":"猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的猜测是的","longitude":"","latitude":"",
										"tags":[],
										"createTime":"2022-02-23T06:32:53.000+00:00",
										"updateTime":"2022-03-10T08:33:23.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":196825,"spuId":63874,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220223/14/1645599417472_51821675.jpg","skuPrice":12200,"unitId":6,"unitName":"平米"},
											{"skuId":196843,"spuId":63876,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220124/15/1643011254322_41514682.jpg","skuPrice":300,"unitId":9,"unitName":"片"},
											{"skuId":196411,"spuId":63825,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220126/11/1643166818996_67519204.jpg","skuPrice":4500,"unitId":1,"unitName":"个"},
										],
									},
								},
								{
									"id":701,
									"v":1,
									"i":5,
									"title":"好全国店",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":7,
										"supplierId":12,
										"cityId":-1,
										"name":"好全国店",
										"type":2,
										"deliveryFee":10.0,
										"freeDeliveryMoney":1000.0,
										"status":1,"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211011/21/1633958429089_9434$4比3.jpg","introduction":"这是一个非常好的店铺",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-10-11T13:20:38.000+00:00",
										"updateTime":"2022-03-04T07:53:35.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":70157,"spuId":23892,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211025/10/1635128897727_2521551","skuPrice":10000,"unitId":5,"unitName":"包"},
											{"skuId":70158,"spuId":23893,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211025/10/1635128972476_74566315","skuPrice":100,"unitId":5,"unitName":"包"},
											{"skuId":70159,"spuId":23894,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211025/10/1635129029490_67279745","skuPrice":88800,"unitId":11,"unitName":"根"},
										],
									},
								},
								{
									"id":901,
									"v":1,
									"i":6,
									"title":"杨锐-全国店铺",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":9,
										"supplierId":13,
										"cityId":-1,
										"name":"杨锐-全国店铺",
										"type":2,
										"deliveryFee":1.0,
										"freeDeliveryMoney":1.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211011/21/1633959814343_6546$超越.jpg",
										"introduction":"欢迎来到我的店铺",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-10-11T13:43:40.000+00:00",
										"updateTime":"2022-03-03T02:54:19.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":63720,"spuId":22798,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211013/12/1634098372917_6183$超越2.jpg","skuPrice":400000,"unitId":4,"unitName":"件"},
											{"skuId":63679,"spuId":22791,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211012/16/1634028780867_3842$超越.jpg","skuPrice":333,"unitId":14,"unitName":"桶"},
											{"skuId":62299,"spuId":142,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211012/12/1634013046293_1120$超越3.jpg","skuPrice":198,"unitId":6,"unitName":"平米"},
										],
									},
								},
								{
									"id":18101,
									"v":1,
									"i":7,
									"title":"小米服务全国店",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":181,
										"supplierId":289,
										"cityId":-1,
										"name":"小米服务全国店",
										"type":2,
										"deliveryFee":0.0,
										"freeDeliveryMoney":0.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220215/10/1644894483892_77964957.jpeg",
										"introduction":"小米服务全国店",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2022-02-15T03:08:13.000+00:00",
										"updateTime":"2022-03-01T12:54:29.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":196540,"spuId":63838,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220223/14/1645597798718_44148806.jpg","skuPrice":100,"unitId":5,"unitName":"包"},
											{"skuId":196543,"spuId":63839,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220223/14/1645598279152_54777483.jpeg","skuPrice":200,"unitId":141,"unitName":"立方米"},
											{"skuId":196916,"spuId":63919,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20220301/20/1646139007898_47968377.png","skuPrice":10000,"unitId":1,"unitName":"个"},
										],
									},
								},
								{
									"id":16501,
									"v":1,
									"i":8,
									"title":"11",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":165,
										"supplierId":275,
										"cityId":-1,
										"name":"11",
										"type":2,
										"deliveryFee":1.0,
										"freeDeliveryMoney":1.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211222/17/1640166575465_82986098.jpg","introduction":"12321","longitude":"","latitude":"","tags":[],"createTime":"2021-12-22T09:49:36.000+00:00","updateTime":"2021-12-22T09:50:35.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":195587,"spuId":63499,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211222/17/1640166318422_62133294.png","skuPrice":100,"unitId":38,"unitName":"侧"},
										],
									},
								},
								{
									"id":3601,
									"v":1,
									"i":9,
									"title":"全国店铺",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":36,
										"supplierId":3,
										"cityId":-1,
										"name":"全国店铺",
										"type":2,
										"deliveryFee":1.0,
										"freeDeliveryMoney":1.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211013/11/1634096317548_7953$QQ浏览器截图20211013113440.png",
										"introduction":"1",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-10-13T03:38:40.000+00:00",
										"updateTime":"2021-12-15T03:31:15.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":166011,"spuId":56367,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211118/12/1637209821654_85703651.jpg","skuPrice":1100,"unitId":15,"unitName":"米"},
											{"skuId":194786,"spuId":63269,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211215/10/1639536166205_50617206.png","skuPrice":100000,"unitId":1,"unitName":"个"},
										],
									},
								},
								{
									"id":12501,
									"v":1,
									"i":10,
									"title":"材料卖全国",
									"available":true,
									"errorSize":0,
									"type":"store",
									"store":{
										"id":125,
										"supplierId":196,
										"cityId":-1,
										"name":"材料卖全国",
										"type":2,
										"deliveryFee":0.1,
										"freeDeliveryMoney":100.0,
										"status":1,
										"address":"",
										"avatar":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211029/16/1635494898979_63412885",
										"introduction":"我卖全国材料，快来买",
										"longitude":"",
										"latitude":"",
										"tags":[],
										"createTime":"2021-10-29T08:08:29.000+00:00",
										"updateTime":"2021-10-29T08:49:56.000+00:00",
										"containAllAreas":false,
										"serviceType":1,
										"materialSpu":[
											{"skuId":126622,"spuId":46651,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211029/16/1635495417055_41821876","skuPrice":10011,"unitId":4,"unitName":"件"},
											{"skuId":126626,"spuId":46654,"spuImage":"https://dbj-test.oss-cn-beijing.aliyuncs.com/res/20211029/16/1635497346268_46370680.jpeg","skuPrice":11100,"unitId":4,"unitName":"件"},
										],
									},
								},
							],
							"requestId":"d2ce4913594548228c81470c09879d2f",
							},
						"traceId":null,
					}
				this.storeList = res.data.page
				console.log("this.storeList===",this.storeList)
			},
			//去店铺详情页面
			gotoStoreDetail(item){
				console.log("去店铺详情页面",item)
				
				uni.navigateTo({
					url:`../shops/shops?storeId=${item.storeId}&areaId=${this.areaId}`
				})
			},
			// 去商品详情页面
			gotoProductDetail(item){
				console.log("去商品详情页面")
				uni.navigateTo({
					url:`../goods-detail/goods-detail?goodId=${item.spuId}`
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
