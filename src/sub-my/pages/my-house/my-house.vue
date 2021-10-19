/**
* @author liuyubo
* @desc:选中房屋的id会作为houseListChooseId字段放在storage里面，使用者获取后需要清空该字段。
* 从我的里面进来没有选中功能
**/

<template>
	<view class="my-house" v-if="isLoading">
		<view class="box" :style="{marginBottom:systemHeight}" v-if="listData.length>0">
			<view class="touch-item"  v-for="(item,index) in listData"
				:class="item.isTouchMove == true?'touch-move-active':''" :key='item.id' @touchstart="touchstart"
				@touchmove="touchmove" :data-index='index'>
				<view class="list-count">
					<view class="list-item" @click="toChoose(item)">
						<view class="item-message">
						<!-- 	<image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/choose.svg"
								 class="choose-icon edit-icon"></image> -->
              <i class='icon-ic_wodejia_danxuanzhong_csn choose-icon edit-icon' v-if="item.id==chooseId"></i>
							<view class="message-right">
								<view class="item">
									<text class="defalut" v-if="item.defaultEstate">默认</text>
									<text class="province">{{item.locationName}}</text>
								</view>
								<text class="address">{{item.housingEstate+item.address}}</text>
								<view class="item">
									<text class="name">{{item.contactName}}</text>
									<text class="phone">{{item.contactPhone}}</text>
								</view>
							</view>
						</view>
						<view v-if="isEdit" class="edit" @click.stop="edit(item)">
              <i class="icon-xiaochengxu_fangwuguanli_bianji edit-icon"></i>
							<!-- <image src="../../../static/images/edit.svg" class="edit-icon"></image> -->
						</view>
					</view>
					<view class="dle-btn centerboth" @click.stop="delThis(item,index)">
						<view class="del-icon centerboth">
							<text class="defalut-text">设为默认</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom" :style="{paddingBottom:systemBottom,height:systemHeight}">
				<view class="add-btn" @click="toAddHouse">
					新建房屋地址
				</view>
			</view>
		</view>
    <view class="no-house" :style="{marginBottom:systemHeight}"  v-else >
      <image src="http://dbj.dragonn.top/static/mp/dabanjia/images/decorate/empty.png"></image>
      <text>暂无收货地址</text>
      <view class="no-add-btn" @click="toAddHouse">
        添加地址
      </view>
    </view>
	</view>
</template>
<script>
	import {
		queryEstates,
		setDefault
	} from "../../../api/decorate.js";
	export default {

		data() {
			return {
				startX: 0, //开始坐标
				startY: 0,
				listData: [],
				systemBottom: '',
				systemHeight: '',
				chooseId: '',
				delta: 1,
				fromHome: false,
				isEdit: true,
        isLoading:false
			};
		},
		onShow() {
			this.getHouseList()
		},

		onLoad(e) {
			if (e && e.id) {
				this.chooseId = e.id;
			}
			if (e && e.fromHome) {
				this.fromHome = true
			}
			if (e && e.isEdit==0) {
				this.isEdit = false
			}
			this.delta = e.delta || 1
			this.isMy = e.isMy || false

			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.systemBottom = 20 + 'rpx';
			this.systemHeight = 20 + 136 + 'rpx'
		},
		methods: {
			delThis: function(item, index) {
				setDefault(item.id).then(res => {
					this.getHouseList()
				})
			},
			touchstart: function(e) {
				var that = this;
				var listData = that.listData;
				//开始触摸时 重置所有删除
				listData.forEach(function(v, i) {
					0
					if (v.isTouchMove) //只操作为true的
						v.isTouchMove = false;
				});
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
				// this.$emit('touchEv',listData);
			},
			//滑动事件处理
			touchmove: function(e) {
				var that = this;
				var listData = that.listData;
				var index = e.currentTarget.dataset.index, //当前索引
					startX = that.startX, //开始X坐标 
					startY = that.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				listData.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过30度角 return
					if (Math.abs(angle) > 30) return;
					//如果已经是默认则不滑动
					if (v.defaultEstate) return
					if (i == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
						// console.log(that.listData)
					}
				})
				//更新数据

			},
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			},
			getHouseList() {
        this.isLoading = false
				queryEstates({
					isNeedRelative: false,
				}).then(res => {
          this.isLoading = true
					this.listData = res|| []
					this.listData.forEach(function(v, i) {
						v.isTouchMove = false
					})
				})
			},
			edit(item) {
				uni.navigateTo({
					url: '/sub-decorate/pages/add-house/add-house?id=' + item.id
				})
			},
			toAddHouse() {
				uni.navigateTo({
					url: '/sub-decorate/pages/add-house/add-house?delta=' + this.delta
				})
			},
			toChoose(item) {
				// console.log(this.isMy)
				if (this.isMy) return
				this.chooseId = item.id
				this.currentId = item.id
				if (this.fromHome) {
					uni.$emit('selectedHouse', item);
				}

				uni.setStorageSync(
					'houseListChooseId',
					this.chooseId,
				);
				uni.navigateBack({

				})
			},
		},
		onUnload() {
			// if (this.isMy) return
			//    uni.setStorageSync(
			//    	'houseListChooseId',
			//    	this.chooseId,
			//    );


			// uni.getStorageSync({
			//     key: 'houseListChooseId',
			//     success: function (res) {
			//         console.log(res.data);
			//     }
			// });
			// EventChannel.emit('getHouse',123)
			// uni.navigateBack()
			// wx.reLaunch({
			//       url: '../logs/logs'
			//     })
		}
	}
</script>

<style lang="scss" scoped>
	view,
	textarea,
	input,
	text,
	button {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: "微软雅黑";
	}

	.my-house {
		height: 100%;
    background-color: #fff;
		// display: flex;
		// flex-direction: column;
	}

	.uni-checkbox-input {
		border-radius: 50% !important;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background: #f5f5f5;
		overflow: hidden;
	}

	.centerboth {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		justify-content: center;
		-webkit-justify-content: center;
	}

	.clearfix:after {
		content: "";
		display: block;
		visibility: hidden;
		height: 0;
		clear: both;
	}

	.clearfix {
		zoom: 1;
	}

	image {
		padding: 0;
		margin: 0;
	}

	.box {
		width: 100%;
		background-color: #242424;
		overflow: hidden;
		margin-bottom: 200rpx;
	}

	.list-count {
		width: 100%;
		// height: 206rpx;
		position: relative;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(70px);
		transform: translateX(70px);
		margin-left: -70px;
		background: #fff;

	}

	.list-box .count {
		font-size: 32rpx;
	}

	.dle-btn {
		position: absolute;
		background-color: #242424;
		right: -140rpx;
		top: 0;
		width: 140rpx;
		height: 100%;
		text-align: center;
		background: none;
		color: #3F68B2;
		font-size: 26rpx;
		z-index: 99;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(80px);
		transform: translateX(80px);
		border-radius: 10rpx;
	}

	.list-item {
		/* background-color: #111; */
		height: 100%;
		margin: 0 24rpx 0 32rpx;
		padding: 32rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #F5F5F5;
    .item-message{
      display: flex;
      align-items: center;
    }
		.item {
			margin-bottom: 6rpx;
			height: 43rpx;
			line-height: 42rpx;

			.defalut {
				display: inline-block;
				width: 60rpx;
				height: 32rpx;
				color: #fff;
				background: linear-gradient(135deg, #36d9cd, #28c6c6);
				border-radius: 4rpx;
				font-size: 20rpx;
				margin-right: 8rpx;
				line-height: 32rpx;
				text-align: center;
				// vertical-align: middle;
			}

			.province {
				display: inline-block;
				color: #999999;
				font-size: 26rpx;
				line-height: 42rpx;
			}

			.name,
			.phone {
				color: #999;
				display: inline-block;
				margin-right: 16rpx;
				font-size: 24rpx;
			}
		}

		.choose-icon {
			display: inline-block;
			vertical-align: middle;
			margin-right: 24rpx;
		}
    .icon-xiaochengxu_fangwuguanli_bianji{
      font-size: 26rpx;
    }

		.edit-icon {
			width: 36rpx;
			height: 36rpx;
      line-height: 36rpx;
      color: #CCCCCC;
		}

		.address {
			color: #111;
			font-size: 28rpx;
			font-weight: 500;
		}

	}

	.message-right {
		display: inline-block;
		vertical-align: middle;
		// margin-left: 24rpx;
	}

	.defalut-text {
		color: #fff;
		width: 50%;
	}

	.dle-btn .iconfont {
		font-size: 40rpx;

	}

	.touch-move-active .list-count,
	.touch-move-active .dle-btn {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	.touch-move-active .dleBtn {
		right: -140rpx;
	}

	.dle-btn image {
		width: 51rpx;
		height: 55rpx;
	}

	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 136rpx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.add-btn {
			// margin-top: 20rpx;
			height: 88rpx;
			background: linear-gradient(135deg, #53d5cc, #4fc9c9);
			border-radius: 12rpx;
			width: 686rpx;
			line-height: 88rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 32rpx;
		}
	}
  .no-house{
    width: 248rpx;
    margin: 0 auto;
    padding-top: 260rpx;
    // display: flex;
    image{
      width: 248rpx;
      height: 248rpx;
      margin-bottom: 22rpx;
    }
    text{
      display: block;
      width: 100%;
      font-size: 26rpx;
      color: #999;
      text-align: center;
    }
    .no-add-btn{
      width: 248rpx;
      height: 88rpx;
      background: linear-gradient(135deg,#53d5cc, #4fc9c9);
      border-radius: 12rpx;
      line-height: 88rpx;
      text-align: center;
      margin-top: 76rpx;
      color: #fff;
      font-size: 32rpx;
    }
  }
</style>
