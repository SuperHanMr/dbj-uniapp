<template>
	<view class="business-category">
		<view class="head">
			<view class="close" @click="closePopup">
				取消
			</view>
			<view class="info">
				请选择经营品类
			</view>
			<view class="confirm" @click="selectBusiness">
				确定
			</view>
		</view>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="first-category">
					<view class="tab" v-for="(item, index) in categroyTreeList" :class="firstActive == index ? 'active-tab' : ''"
						@click="firstTabClick(index)">
						<view class="text">
							{{item.label}}
						</view>
						<view class="active-line" v-if="firstActive == index">
				
						</view>
					</view>
				
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" >
				<view class="second-category">
					<view class="tab" v-for="(item, index) in categroyTreeList[firstActive].children" @click="secondTabClick(index)">
						<view class="text" :class="secondActive == index ? 'active-text' : ''">
							{{item.label}}
							<view class="number" v-if="showCheckedNumber(item)">
								{{showCheckedNumber(item)}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="three-category-box" >
				<view class="three-category">
					<view class="tab" v-for="(item, index) in categroyTreeList[firstActive].children[secondActive].children"
						@click="threeTabClick(item)">
						<view class="no-select" v-if="!isChecked(item)">
							
						</view>
						<view class="select" v-if="isChecked(item)">
							
						</view>
						<!-- <image class='select' src="../../../static/shopping-cart/checked@2x.png" v-if="threeActive == index" mode=""></image> -->
						<view class="text">
							{{item.label}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['categroyTreeList'],
		data() {
			return {
				list: [{
						text: "油漆涂料",
						list: [{
								text: '基础涂料',
								list: [{
										text: "基础涂料12"
									},
									{
										text: "基础涂料13"
									},
									{
										text: "基础涂料14"
									},
									{
										text: "基础涂料15"
									}, 
									{
										text: "基础涂料16"
									},
									{
										text: "基础涂料17"
									}
								]
							},
							{
								text: '基础涂料1',
								list: [{
										text: "基础涂料22"
									},
									{
										text: "基础涂料23"
									},
									{
										text: "基础涂料24"
									},
									{
										text: "基础涂料25"
									}, 
									{
										text: "基础涂料26"
									},
									{
										text: "基础涂料27"
									}
								]
							},
							{
								text: '基础涂料2'
							},
							{
								text: '基础涂料3'
							}
						]
					},
					{
						text: "油漆涂料1",
						list: [{
								text: '基础涂料11'
							},
							{
								text: '基础涂料22'
							},
							{
								text: '基础涂料33'
							},
							{
								text: '基础涂料44'
							}
						]
					},
					{
						text: "油漆涂料2"
					},
					{
						text: "油漆涂料3"
					},
					{
						text: "油漆涂料4"
					},
					{
						text: "油漆涂料5"
					},
					{
						text: "油漆涂料6"
					},
					{
						text: "油漆涂料7"
					}
				],
				firstActive: 0,
				secondActive: 0,
				threeActive: -1,
				threeActiveList:[],
				numberList:[]
			}
		},
		mounted() {
			console.log(">>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<")
			console.log(this.props, ">>>>>>>>>>>>>>")
		},
		methods: {
			firstTabClick(index) {
				this.firstActive = index;
				this.secondActive = 0;
				this.threeActive = -1;
			},
			secondTabClick(index) {
				this.secondActive = index;
				this.threeActive = -1;
			},
			threeTabClick(item,index) {
				this.threeActive = index;
				let param = {};
				param.oneLevelCategoryId = this.$props.categroyTreeList[this.firstActive].id;
				param.twoLevelCategoryId = this.$props.categroyTreeList[this.firstActive].children[this.secondActive].id;
				param.threeLevelCategoryId = item.id;
				param.label = item.label;
				const checkedIndex = this.threeActiveList.findIndex((items, index) => {
					return items.threeLevelCategoryId == item.id
				})
				const checkedNumber = this.numberList.findIndex((items, index) => {
					return items.id == item.parent.id;
				})
				if (checkedNumber == -1) {
					this.numberList.push({id: item.parent.id, num: 1});
				} else {
					if (checkedIndex == -1) {
						this.numberList[checkedNumber].num += 1;
					} else {
						this.numberList[checkedNumber].num -= 1;
					}
				}
				if (checkedIndex == -1) {
					this.threeActiveList.push(param);
				} else {
					this.threeActiveList.splice(checkedIndex, 1);
				}
				console.log(this.threeActiveList, ">>>>>>>>>>>>>>>>>>>>>>")
			},
			isChecked(item){
				const checkedIndex = this.threeActiveList.findIndex((items, index) => {return items.threeLevelCategoryId == item.id})
				if (checkedIndex == -1) {
					return false;
				} else {
					return true;
				}
			},
			modifyNumberList(item){
				const checkedNumber = this.numberList.findIndex((items, index) => {
					return items.id == item.twoLevelCategoryId;
				})
				if (checkedNumber != -1) {
					this.numberList[checkedNumber].num -= 1;
				}
			},
			showCheckedNumber(item){
				const checkedNumber = this.numberList.findIndex((items, index) => {return items.id == item.id});
				if (checkedNumber != -1) {
					return this.numberList[checkedNumber].num ? this.numberList[checkedNumber].num : false;
				} else {
					return false
				}
			},
			closePopup() {
				this.$emit("closeBusinessPopup");
			},
			selectBusiness(){
				console.log('点击了确认', this.threeActiveList);
				this.$emit("confirmBusiness", this.threeActiveList);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.business-category {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		border-radius: 32rpx 32rpx 0px 0px;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx;
			background: #F9FAFB;

			.close {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #989898;
			}

			.info {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #111111;
			}

			.confirm {
				font-size: 16px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #34C4C4;
			}
		}

		.container {
			display: flex;
			height: 1000rpx;
			.first-category {
				.tab {
					width: 200rpx;
					overflow-x: hidden;
					padding: 32rpx 0;
					background: #F7F7F7;
					border-radius: 0px 8px 0px 0px;
					position: relative;

					.text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						text-align: center;
						margin-left: 10rpx;
					}
					
					.active-line {
						position: absolute;
						left: 0;
						top: 28rpx;
						width: 3px;
						height: 44rpx;
						background: linear-gradient(180deg, #00CDEC 0%, #00ED7D 100%);
						border-radius: 0px 100px 100px 0px;
					}
				}

				.active-tab {
					background: #FFFFFF;

					.text {
						color: #333333;
						font-weight: bold;
					}
				}
			}

			.second-category {
				.tab {
					width: 200rpx;
					padding: 32rpx 0;
					background: #FFFFFF;
					overflow: auto;
					position: relative;
					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						overflow-x: hidden;
						flex-wrap: nowrap;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						.number{
							width: 32rpx;
							height: 32rpx;
							background: rgba(255, 51, 71, 1);
							border: 1px solid #FFFFFF;
							border-radius: 50%;
							position: absolute;
							right: 16rpx;
							top: 16rpx;
							font-size: 22rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
						}
					}
					.active-text {
						font-weight: bold;
						color: #333333;
					}
				}
			}
			
			.three-category{
				.tab{
					width: 100%;
					padding: 32rpx 0;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-right: 24rpx;
					}
					.text{
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						flex: 1;
					}
					.select{
						width: 32rpx;
						height: 32rpx;
						margin-right: 24rpx;
						border-radius: 50%;
						border: 1px solid red;
					}
					.no-select{
						width: 32rpx;
						height: 32rpx;
						margin-right: 24rpx;
						border-radius: 50%;
						border: 1px solid #A8A8A8;
					}
				}
			}
		}
	}
</style>
