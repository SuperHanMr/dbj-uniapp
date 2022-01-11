<template>
	<view class="fill">
		<view class="tab-container">
			<view class="top-tab">
				<view v-for="(itemTab,index) in tabList" :key="index" class="item"
					:class="{selected:index==currentIndex}"
					@click="currentIndex=index"
				>
					<view class="tab-text">
						{{itemTab.title}}
					</view>

				<view class="bottom-icon"
				 :style="{backgroundImage:`url(${bgcIcon})`,backgroundSize: '100% 100%'}"
				/>
				</view>
			</view>
			<view class="edit-btn" v-if="currentList.length >= 1">
				<text v-if="showMgrBtn" @click="handleMgr">管理</text>
				<text v-else @click="handleDone">完成</text>
			</view>
		</view>

		<!-- <view class="line" /> -->

		<swiper class="swiper" :current="currentIndex" :duration="200"	@change="swiperChange"	:style="{backgroundColor:listLength > 0 ?'none':'#ffffff'}">
			<!-- 商品 -->
			<swiper-item :class="{emptyContainer:productList.length < 1 ? true : false}">
				<scroll-view
					v-if="productList.length > 0"
					class="scroll-view"
					scroll-y="true"
					refresher-background="#FFF"
					refresher-enabled="true"
					:refresher-triggered="triggered"
					@refresherrefresh="onRefresh"
					@scrolltolower="onLoadMore"
				>
					<view :style="{paddingBottom:systemBottom +'rpx'}">
							<!-- :key="itemTab.fallKey" -->
						<waterfall
							:key="'product'"
							:list="productList"
							@selectedItem="onSelectedItem"
							:allCheck="allCheck"
							:showCheckIcon="!showMgrBtn"
							:isAllCheck="isAllCheck"
							:isActive="isActive"></waterfall>
					</view>
				</scroll-view>
				<view v-else class="empty-body">
					<image src="../../../static/img_attention_empty.svg" mode=""></image>
					<text>暂无相关内容～</text>
				</view>
			</swiper-item>
			<!-- 案例 -->
			<swiper-item :class="{emptyContainer:caseList.length < 1 ? true : false}">
				<scroll-view
					v-if="caseList.length >0"
					class="scroll-view"
					scroll-y="true"
					refresher-background="#FFF"
					refresher-enabled="true"
					:refresher-triggered="triggered"
					@refresherrefresh="onRefresh"
					@scrolltolower="onLoadMore"
				>
					<view :style="{paddingBottom:systemBottom +'rpx'}">
							<!-- :key="itemTab.fallKey" -->
						<waterfall
						  :key="'case'"
							:list="caseList"
							@selectedItem="onSelectedItem"
							:allCheck="allCheck"
							:showCheckIcon="!showMgrBtn"
							:isAllCheck='isAllCheck'
							:isActive="isActive"></waterfall>
					</view>
				</scroll-view>
				<view v-else class="empty-body">
					<image src="../../../static/img_attention_empty.svg" mode=""></image>
					<text>暂无相关内容～</text>
				</view>
			</swiper-item>
		</swiper>

		<!-- 底部按钮 -->
		<view class="footer" v-if=" currentList.length >= 1 && showCalCelBtn" :style="{paddingBottom:systemBottom + 24 + 'rpx'}">
			<view class="left" @click="handleAllCheck">
				<image v-if="allCheck"  src="../../../static/all_Check.svg"  mode="" />
				<image v-else src="../../../static/all_Uncheck.svg" mode="" />
				<text>全选</text>
			</view>
			<view class="button" @click="handleCancel">
				取消收藏
			</view>
		</view>

		<!-- 取消收藏弹框 -->
		<popup-dialog
			ref="popup"
			:title="title"
			@close="closePopDialog"
			@confirm="confirmCancelCollection"
		/>

	</view>
</template>

<script>
	import {
		getGoodsList,
		getRealCaseList,
		batchCancellation
	} from "../../../../api/order.js"
	export default {
		data() {
			return {
				tabList: [
					{
						title: "商品",
						scrollKey: 's1',
						fallKey: 'f1'
					},
					{
						title: "案例",
						scrollKey: 's2',
						fallKey: 'f2'
					},
				],
				triggered: false, //控制刷新显示字段

				currentIndex: 0,

				productList: [], //商品列表
				productListLength:'',
				caseList: [], //案例列表
				checkedItemIds:[],//选中的要取消收藏的item的id
				listLength:"",//返回数据的个数
				equipmentId:"",
				page: [1, 1],
				totalPage: [1, 1],

				loading: false,
				showMgrBtn: true,
				showCalCelBtn:false,
				allCheck:false,
				isAllCheck:false,
				isActive:false,
				title: "",
				height:"",
				systemBottom: "",
				firstEntry: false,
				bgcIcon:"../../../static/selectIcon.svg",
			};
		},

		mounted(e) {
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = menuButtonInfo.bottom;
		},
		onLoad(e) {
			this.firstEntry =e.firstEntry;
			uni.getSystemInfo({
				success:res => {
					this.equipmentId = res.deviceId
				}
			})
			if(this.currentIndex ==0){
				this.productList =[]
				this.page[0]=1
				this.getProductList()
			}else{
				this.caseList =[]
				this.page[1]=1
				this.getCaseList()
				console.log("onLoad")
			}
		},
		onShow() {
			if (this.firstEntry) return;
			if(this.currentIndex ==0){
				this.productList =[]
				this.page[0]=1
				this.getProductList()
			}else{
				this.caseList =[]
				this.page[1]=1
				this.getCaseList()
				console.log("onShow")
			}
		},

		watch:{
			allCheck(){}
		},

		computed: {
			// 通过判断currentIndex 返回不同的数组
			currentList() {
				if (this.currentIndex == 0) {
					this.listLength = this.productList.length
					return this.productList;
				} else {
					this.listLength = this.caseList.length
					return this.caseList;
				}
			},
		},
		methods: {
			swiperChange(e) {
				let index = e.target.current || e.detail.current;
				this.currentIndex = index;
				this.showMgrBtn = true
				this.showCalCelBtn =false
				this.allCheck=false
				//index对应的list数据是否为空 为空的话请求数据 有数据的话就不请求了
				switch(this.currentIndex){
					case 0:
						if (this.productList.length < 1) this.getProductList()
						break
					case 1:
						if (this.caseList.length < 1) this.getCaseList();
						console.log("swiperChange")
						break
				}
			},

			// 获取商品列表
			getProductList() {
				this.loading = true;
				let params={
					page:this.page[0]
				}
				getGoodsList(params).then(data=>{
					this.productList = this.productList.concat(data);
					this.productList = this.handleList(this.productList,false,"product")
					this.productListLength= this.productList.length
					console.log("this.productList=",this.productList,"this.productList.length=",this.productList.length)
					this.loading = false;
					this.firstEntry = false;
				})
			},
			// 获取案例列表
			getCaseList() {
				this.loading = true;
				getRealCaseList({
					page:this.page[1]
				}).then(data => {
					this.caseList = this.caseList.concat(data.list)
					this.caseList = this.handleList(this.caseList,false,"case")
					this.page[1] = data.page
					this.totalPage[1]= data.totalPage
					// console.log("this.caseList=", this.caseList)
					this.loading = false;
					this.firstEntry = false;
				})
			},
			//管理
			handleMgr() {
				this.showMgrBtn = !this.showMgrBtn
				this.showCalCelBtn = true
			},

			//完成
			handleDone() {
				this.showMgrBtn = !this.showMgrBtn
				this.showCalCelBtn = false
				this.allCheck = false
				if(this.currentIndex== 0 ){
					this.productList = this.handleList(this.productList,false)
					this.checkedItemIds =[]
					// console.log("点击完成后的列表=", this.productList)
				}else{
					this.caseList = this.handleList(this.caseList,false)
					this.checkedItemIds =[]
					// console.log("点击完成后的列表=", this.caseList)
				}
			},

			// 点击单个item的操作获取选中的数据
			onSelectedItem(data) {
				if(this.showMgrBtn){
					if(this.currentIndex ==0){
						uni.navigateTo({
							url: `/sub-classify/pages/goods-detail/goods-detail?goodId=${data.id}`
						 })
					}else{
						uni.getSystemInfo({
							success:(res)=>{
								this.height = res.windowHeight
							}
						})
						// const token = uni.getStorageSync("scn")
						const token = getApp().globalData.token
						console.log("token=",token)
						const url = this.ENV.VUE_APP_BASE_H5 +`/app-pages/case-detail/case-detail.html?id=${data.id}&height=${this.height}#${token}`
						uni.navigateTo({
							url:`../../../../pages/common/webview/webview?url=`+ encodeURIComponent(url),
						})
					}
				}else{
					this.checkedItemIds = data.filter(item => item.isChecked == true).map((item2) => {
						return {relationId:item2.id,authorId:item2.authorId,subBizType:item2.subBizType}
					})
					// console.log("this.checkedItemIds=",this.checkedItemIds)
					this.currentIndex == 0
						? this.productList = data
						: this.caseList = data
					// console.log("单选操作下的this.productList=",this.productList.map(item=>item.isChecked))
					// console.log("单选操作下的this.caseList=",this.caseList.map(item=>item.isChecked))

					if(this.checkedItemIds.length == this.listLength){
						this.allCheck = true;
						this.isAllCheck = true;
						this.isActive = false
					}
					else{
						this.isActive = true
						this.allCheck = false
						// this.isAllCheck=false;
					}
				}
			},

			// 全选
			handleAllCheck(){
				this.allCheck=!this.allCheck
				switch(this.currentIndex){
					case 0:
						this.allCheckFunction(this.productList)
						break;
					case 1:
						this.allCheckFunction(this.caseList)
						break;
				}
			},
			allCheckFunction(list){
				this.isActive = false
				if(this.allCheck){
					this.currentIndex==0
						? this.productList = this.handleList(list,true)
						: this.caseList = this.handleList(list,true)
					this.checkedItemIds = list.map(item=>{
						return {relationId:item.id,authorId:item.authorId,subBizType:item.subBizType}
					})
				}else{
					this.currentIndex==0
						? this.productList = this.handleList(list,false)
						: this.caseList = this.handleList(list,false)
					this.checkedItemIds =[]
					this.isAllCheck=false;
					console.log("this.checkedItemIds=",this.checkedItemIds)
				}
			},
			handleList(list,isChecked,type){
				return list.map(item=>{
					item.isChecked = isChecked
					if(type){
						item.icon =type
					}
					return item
				})
			},

			// 点击取消收藏按钮
			handleCancel() {
				this.currentIndex == 0
				? this.title = "确定要将选中商品取消收藏吗?"
				: this.title = "确定要将选中案例取消收藏吗?"
				this.$refs.popup.open()
			},
			closePopDialog(){
				this.$refs.popup.close()
			},
			confirmCancelCollection() {
				let params={
					list:this.checkedItemIds,
					equipmentId:this.equipmentId,
				}
				if(this.currentIndex == 0){
					params.routeId = 5002
				}else{
					params.routeId = 5001
				}
				console.log("取消收藏接口的params=",params)
				batchCancellation(params).then(data=>{
					this.$refs.popup.close()
					this.showMgrBtn = true
					this.showCalCelBtn = false
					this.allCheck = false
					if(this.currentIndex == 0){
						this.page[0]=1
						this.productList=[]
						this.getProductList()
					}else{
						this.page[1]=1
						this.caseList =[]
						this.getCaseList()
					}
					uni.showToast({
						title:"取消收藏成功！",
						icon:"none",
						duration: 1000
					});
				}).catch(()=>{})
			},


			onLoadMore() {
				// if (this.loading || this.page >= this.totalPage) {
				//   return;
				// }
				// this.page++;
				if (this.loading) return;
				if(this.currentIndex==0){
					// if(this.loading || this.productListLength !== 10) return
					if(this.loading || this.page[0] >=this.totalPage[0]) return
					this.page[0]++
					this.getProductList()
				}else{
					if(this.loading || this.page[1] >=this.totalPage[1])return
					this.page[1]++
					this.getCaseList()
					console.log("onLoadMore")
				}
			},
			onRefresh(e) {
				if (this.loading) return;
				this.triggered = true;
				if(this.currentIndex == 0){
					this.page[0]=1
					this.productList=[]
					this.getProductList()
				}else{
					this.page[1]=1
					this.caseList =[]
					this.getCaseList()
					console.log("onRefresh")
				}
				this.triggered = false;

				// setTimeout(() => {
				// }, 1000);
			},
		},
	};
</script>

<style lang="scss">
	.fill {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
	}

	.tab-container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 32rpx;
		background-color: #fff;

		.top-tab {
			height: 80rpx;
			display: flex;
			flex-direction: row;

			.item {
				flex: 1;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 80rpx;
				color: #999999;
				font-size: 30rpx;
				position: relative;

				.tab-text {
					width: 60rrpx;
					height: 42rpx;
					line-height: 42rpx;
					text-align: center;
					margin-right: 72rpx;
				}
			}

			.selected {
				color: #111111;
				font-weight: 500;

				.bottom-icon {
					position: absolute;
					width: 32rpx;
					height: 4rpx;
					background: linear-gradient(129deg, #00cdec 0%, #00ed7d 100%);
					border-radius: 200rpx 200rpx 0px 0px;
					bottom: 0;
					left: 30rpx;
					margin-left: -16rpx;
				}
			}
		}

		.edit-btn {
			font-size: 28rpx;
			color: #333333;
		}
	}


	.swiper {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		height: 100%;
		overflow: auto;
	}


	.line {
		width: 100%;
		height: 2rpx;
		background: #f4f4f4;
	}
	.emptyContainer {

		.empty-body {
			padding: 350rpx 175rpx 0 175rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: space-around;

			image {
				width: 400rpx;
				height: 400rpx;
				object-fit: cover;
				// margin-bottom: 22rpx;
			}

			text {
				font-size: 26rpx;
				font-weight: 400;
				text-align: center;
				color: #CBCCCC;
			}
		}
	}
	.scroll-view {
		flex: 1;
		height: 100%;
	}

	.footer {
		height: 88rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 32rpx;

		.left {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.checkStyle{
				width: 36rpx;
				height: 36rpx;
				box-sizing: border-box;
				border: 4rpx solid #cccccc;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			image {
				width: 48rpx;
				height: 48rpx;
				object-fit: cover;
				margin-right: 8rpx;
			}

			text {
				height: 40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #111111;
			}
		}

		.button {
			width: 326rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: linear-gradient(117.02deg, #FA3B34 24.56%, #FF6A33 92.21%);
			border-radius: 12rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	::v-deep .uni-popup-dialog {
		width: 560rpx !important;
		border-radius: 24rpx !important;
		background-color: #fff !important;
	}

	::v-deep .uni-dialog-title-text {
		color: #111111 !important;
		font-size: 32rpx !important;
		font-weight: 550 !important;
	}

	::v-deep .uni-dialog-title {
		padding: 48rpx 0 !important;
	}

	::v-deep .uni-dialog-content {
		display: none !important;
	}

	::v-deep .uni-dialog-button-group {
		border-top: 2rpx solid #f5f5f5;
	}

	::v-deep .uni-dialog-button {
		height: 82rpx !important;
	}

	::v-deep .uni-button-color {
		color: #ff3347 !important;
		font-size: 30rpx !important;
		font-weight: 500;
	}

	::v-deep .uni-dialog-button-text {
		font-size: 30rpx !important;
	}
</style>
