<template>
	<view class="content" :catchtouchmove="true" @click="handleLiveRoomClick">
		<custom-navbar opacity="1" :title="title" titleColor="#FFFFFF" bgcolor="none">
			<template v-slot:back>
				<view @click="toBack">
					<i class="icon-ic_cancel_white" style="color: white;">
					</i>
				</view>
			</template>
		</custom-navbar>
		<!-- 占位 -->
		<view :style="{height:navBarHeight}">
		</view>
		<!-- 占位 -->
		<view style="height: 10rpx;">
		</view>
		<view v-if="isLiveing">

			<view class="state-bar">
				<view v-for="(item,index) in roomInfo.interactionInfo" :key="item.id" class="user"
					@click="toPersonal(item,index)">
					<image class="img" :src="item.userAvatar">

					</image>
					<view class="name">
						{{item.userNickName}}
					</view>

				</view>
				<view class="flex1">

				</view>
				<view class="state-bar-text">
					{{roomInfo.hotCount||''}}
				</view>
			</view>
			<live-player class="player" :src="livePreview" autoplay @statechange="statechange" @error="error" />
			<view class="bottom-contain">
				<!-- 聊天 -->
				<scroll-view id="scrollview" :scroll-top="scrollTop" class="scorll-chat" scroll-y="true"
					:scroll-into-view="bottomId">
					<view class="chat-item-height">
						<view v-for="(item,index) in list" :key="item.ID">
							<view v-if="item.type=='TIMTextElem' || item.type=='TIMImageElem'" class="chat-item">

								<view class="avater">
									<image class="img" :src="item.avatar">
									</image>
								</view>

								<text class="name">{{item.nick}} :</text>
								<text v-if="item.type=='TIMTextElem'" class="text-info">{{item.payload.text}}</text>
								<image class="img" v-if="item.type=='TIMImageElem'"
									:src="item.payload.imageInfoArray[0].imageUrl" mode=""
									@click="previewImg(item.payload.imageInfoArray[0].imageUrl)"> </image>
							</view>

							<view v-if="item.type=='TIMGroupTipElem'&&item.payload.operationType==joinType"
								class="chat-item">
								<text class="name">{{item.nick}} </text>
								<text>进入直播间</text>
							</view>

							<view
								v-if="item.type=='TIMCustomElem'&&item.formatData&&item.formatData.type=='group_product'"
								class="chat-item" @click="toGoodsDetail(item.formatData.params)">
								<view class="avater">
									<image class="img" :src="item.avatar">
									</image>
								</view>
								<text class="name">{{item.nick}} </text>
								<view class="product">
									<view class="product-name">
										{{item.formatData.params.spuName}}
									</view>
									<view class="product-info">
										<image class="product-info-img" :src="item.formatData.params.imageUrl" mode="">
										</image>
										<view class="product-info-name">
											<view class="title">
												{{item.formatData.params.skuName}}
											</view>
											<view class="price-info">
												{{item.formatData.params.price/100}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 底部功能栏 -->
				<view class="bottom-send">
					<view class="input-text" @click.stop="handleShowSendBox">
						说点什么...
						<view class="iconfont icon-face" @click.stop="handleChooseImage"></view>
					</view>
					<view class="macphone" @click="showDownload=true">
						<image class="icon_macphone"
							src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_macphone.png" mode="">
						</image>
						连麦
					</view>
					<image class="bottom-icon"
						src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_shopping.png" mode=""
						@click="showDownload=true">
					</image>
					<view class="bottom-icon" @click="clickLike">
						<image class="img"
							src="http://dbj.dragonn.top/%20static/mp/dabanjia/images/home/lives_agree.png" mode="">
						</image>
						<view class="like-count">
							{{totoalLick}}
						</view>
					</view>
					<!-- 		<view class="chat-item" v-for="(item,index) in list" :key="index">
						{{item}}
					</view> -->
				</view>
				</scroll-view>
			</view>
		</view>
		<view v-else class="unlived">
			<image class="img" src="http://dbj.dragonn.top/static/mp/dabanjia/images/home/un-liveing.png" mode="">
			</image>
			<view class="tips">
				直播暂未开始，去首页逛逛吧～

			</view>
			<view class="border">

			</view>
			<view class="btn" @click="toBack">
				去逛逛

			</view>
		</view>
		<view v-if="!isLogin&&isLiveing" class="remark">
			<view class="flex1">

			</view>
			<view class="remark-btn" @click="toLogin">
				登录以使用完整功能
			</view>

		</view>

		<view v-if="showDownload" class="alert-app">
			<view class="content">
				<view class="img">
					<view class="close" @click="showDownload=false">

					</view>

				</view>
				<view class="text-content">
					<view class="text-title">
						请下载APP使用
					</view>
					<view class="text-tips text-top">
						咨询家装问题，去手机应用市场搜索
					</view>
					<view class="text-tips">
						【打扮家】APP与主播进行交流吧
					</view>
					<view class="text-btn" @click="showDownload=false">
						知道了

					</view>
				</view>

			</view>
		</view>


		<message-send-box :group-id="groupId" @add-message="handleAddMessage"></message-send-box>
	</view>
</template>

<script>
	import {
		getTim,
		getSafeTim,
		addListener,
		removeListener,
	} from "@/utils/tim.js";
	import upload from "../../../utils/upload.js";
	import TIM from "tim-wx-sdk";
	import MessageSendBox from "./message-send-box.vue";
	import {
		publicRoom,
		insertAndGetLikeNum
	} from '../../../api/home.js'
	export default {
		components: {
			MessageSendBox,
		},
		data() {
			return {
				livePreview: "",
				roomId: "",
				navBarHeight: "",
				tophight: "",
				list: [],
				scrollTop: 0,
				count: 0,
				isLogin: false,
				imReady: false,
				title: "",
				isLiveing: true,
				showDownload: false,
				scrollTop: 0,
				roomInfo: {},
				joinType: null,
				timer: null,
				userLikeTotal: 0,
				likeCount: 0
			};
		},
		computed: {
			groupId() {
				return "group" + this.roomId;
			},
			totoalLick() {
				return this.userLikeTotal + this.likeCount
			}
		},
		onLoad(e) {
			if (e && e.roomId) {
				this.roomId = e.roomId;
			}
			// this.getRoomInfo();
			const systemInfo = uni.getSystemInfoSync();
			//状态栏高度
			this.tophight = systemInfo.statusBarHeight + "px";
			// 获取胶囊按钮的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.navBarHeight =
				menuButtonInfo.top +
				(menuButtonInfo.top - systemInfo.statusBarHeight) +
				menuButtonInfo.height +
				"px";
		},

		onShow() {
			this.getRoomInfo();
			this.timer = setInterval(this.getRoomInfo, 2000);
			this.joinType = TIM.TYPES.GRP_TIP_MBR_JOIN;
			if (uni.getStorageSync("userId")) {
				this.isLogin = true;
				if (!this.imReady) {
					addListener("MESSAGE_RECEIVED", (e) => {
						this.messageRecived(e)
					});
					getSafeTim().then((tim) => {
						tim
							.joinGroup({
								groupID: "group" + this.roomId,
								type: TIM.TYPES.GRP_AVCHATROOM,
							})
							.then((imResponse) => {
								tim
									.getGroupProfile({
										groupID: "group" + this.roomId,
										groupCustomFieldFilter: ["extensionArr"],
									})
									.then((data) => {
										if (data.code == 0) {
											this.imReady = true;
											// extensionArr
											let groupCustomField = data.data.group.groupCustomField;
											let res = groupCustomField.filter((e) => {
												return e.key == "extensionArr";
											});
											let result = JSON.parse(res[0].value);
										}
									});
							});
					});
				}
			}
		},
		onUnload() {
			clearInterval(this.timer);
			removeListener("MESSAGE_RECEIVED", (e) => {
				this.messageRecived(e)
			});
		},
		methods: {
			toPersonal(item, index) {
				if (index == 0) {
					uni.navigateTo({
						url: `../../../sub-decorate/pages/person-page?personId=${item.userId}`
					})
				}
			},
			clickLike() {
				this.likeCount++;
			},
			toGoodsDetail(item) {
				uni.navigateTo({
					url: `../../../sub-classify/pages/goods-detail/goods-detail?goodId=${item.skuId}`
				})
			},
			previewImg(url) {
				uni.previewImage({
					urls: [url],
					current: 0
				});
			},
			getRoomInfo() {
				publicRoom(this.roomId).then(e => {
					if (!this.isLiveing) {
						this.isLiveing = false
					}
					if (e.status == 0) {
						this.isLiveing = false
						return
					} else {
						this.isLiveing = true
					}
					if (!this.livePreview) {

						this.livePreview = e.liveUrl;
					}
					if (!this.title) {
						this.title = e.title
					}
					this.roomInfo = e
					// if (this.isLogin) {
					console.log(this.isLogin)
					insertAndGetLikeNum({
						roomId: this.roomId,
						likeNum: this.likeCount,
						mediaType: 1
					}).then(e => {
						this.userLikeTotal = e.liveLikeTotal;
						this.likeCount = 0
					})
					// }
				}).catch(e => {
					this.isLiveing = false
				})

			},
			messageRecived(event) {
				let messageList = event.data || [];
				let systemMessageList = messageList.filter(
					(msg) => msg.to === ('group' + this.roomId)
				);
				if (systemMessageList.length) {
					systemMessageList.forEach(e => {
						if (e.type == 'TIMCustomElem' && e.payload && e.payload.data) {
							e.formatData = JSON.parse(e.payload.data);
						}
					})
					this.list = this.list.concat(systemMessageList);
					this.scrollToBottom();
					console.log(TIM.TYPES.GRP_TIP_MBR_JOIN)
					console.log(systemMessageList[0].payload.operationType)
					console.log(JSON.stringify(systemMessageList));
				}
			},
			toLogin() {
				uni.navigateTo({
					url: "../../../pages/login/login",
				});
			},
			toBack() {
				uni.navigateBack({});
			},
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll(".chat-item-height").boundingClientRect();
				// query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					if (res[0] && res[0][0].height) {
						this.scrollTop = res[0][0].height;
					}
				});
			},
			toBack() {
				uni.navigateBack({});
			},
			statechange(e) {
				console.log("live-player code:", e.detail.code);
			},
			error(e) {
				console.log("~~~~~~~~~");
				console.log(e);
			},
			handleShowSendBox() {
				uni.$emit("show-live-send-box");
			},
			handleLiveRoomClick() {
				uni.$emit("live-room-click");
			},
			handleAddMessage(message) {
				console.log("add sadfsadfsd", message);
				this.list.push(message);
			},
			handleChooseImage() {
				const self = this;
				uni.chooseImage({
					sourceType: ["album"],
					success(res) {
						const {
							tempFilePaths,
							tempFiles
						} = res;
						console.log("choose image1:", res);
						tempFiles.forEach(self.sendImageMessage);
					},
				});
			},
			sendImageMessage(tempFile) {
				let self = this;
				const {
					size: fileSize,
					path: filePath
				} = tempFile;
				uni.getImageInfo({
					src: filePath,
					complete(info) {
						const {
							width = 0, height = 0
						} = info;
						console.log("file path:", filePath, "file info:", info, 111111);
						let fileName = filePath.split("/").pop();
						let data = {
							type: "img_message",
							fileName: fileName,
							fileSize: fileSize,
							fileUrl: filePath,
							width: width,
							height: height,
						};
						const message = getTim().createCustomMessage({
							to: self.groupId,
							conversationType: TIM.TYPES.CONV_GROUP,
							payload: {
								data: JSON.stringify(data),
							},
						});
						self.handleAddMessage(message);
						upload({
							filePath: filePath,
							fileType: "image",
							success: (res) => {
								console.log("upload success", res);
								let url = res.url;
								let payload = message.payload;
								let data = payload.data;
								let extObj = JSON.parse(data);
								extObj.fileUrl = url;
								let newData = JSON.stringify(extObj);
								message.payload.data = newData;
								getTim()
									.sendMessage(message)
									.then((res) => {
										console.log("send Image success", res);
									});
							},
							fail: (res) => {
								console.log("upload fail", res);
							},
							progess: (res) => {
								console.log("upload progess:", res);
							},
						});
					},
				});
			},
		},
	};
</script>

<style lang="scss">
	.product {

		background-color: #FFF;
		border-radius: 12rpx;
		width: 444rpx;
		display: flex;
		flex-direction: column;
		padding: 12rpx;


		.product-name {

			font-size: 24rpx;
			color: black;
			margin-bottom: 12rpx;
		}

		.product-info {
			display: flex;

			.product-info-img {
				width: 100rpx;
				height: 100rpx;
			}

			.product-info-name {
				color: black;
				margin-left: 12rpx;

				.title {
					line-height: 30rpx;
					height: 30rpx;
					font-size: 24rpx;
				}

				.price-info {
					line-height: 30rpx;
					height: 30rpx;
					font-size: 24rpx;
				}
			}


		}
	}

	.alert-app {
		position: fixed;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.content {
			width: 640rpx;
			height: 716rpx;
			background-color: #fff;

			.img {
				width: 640rpx;
				height: 350rpx;
				background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/lives_download.png");
				background-size: contain;
				position: relative;

				.close {
					float: right;
					width: 64rpx;
					height: 64rpx;
					margin-right: 24rpx;
					margin-top: 24rpx;
					background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/ic_closed_black.png");
					background-size: contain;
				}
			}

			.text-content {
				background-color: #fff;
				width: 640rpx;
				height: 366rpx;
				border-bottom-right-radius: 24rpx;
				border-bottom-left-radius: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
					margin-top: 40rpx;
				}

				.text-tips {
					font-size: 28rpx;
					color: #999999;
					line-height: 42rpx;
				}

				.text-top {
					margin-top: 8rpx;
				}

				.text-btn {
					width: 266rpx;
					height: 88rpx;
					line-height: 88rpx;
					background: linear-gradient(135deg, #00bfaf, #00bfbc);
					border-radius: 12rpx;
					text-align: center;
					font-size: 28rpx;
					font-weight: 500;
					color: #ffffff;
					margin-top: 48rpx;
				}
			}
		}
	}

	.unlived {
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			margin-top: 116rpx;
			width: 280rpx;
			height: 120rpx;
		}

		.tips {
			margin-top: 36rpx;
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 44rpx;
		}

		.border {
			margin-top: 80rpx;
			width: 670rpx;
			height: 2rpx;
			background: rgba(255, 255, 255, 0.13);
		}

		.btn {
			margin-top: 80rpx;
			width: 550rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			border: 1rpx solid #ffffff;
			border-radius: 12rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
	}

	.remark {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		opacity: 0.94;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.49), #000000);
		justify-content: center;
		align-items: center;

		.flex1 {
			flex: 1;
		}

		.remark-btn {
			width: 396rpx;
			height: 88rpx;
			margin-bottom: 280rpx;
			line-height: 88rpx;
			text-align: center;
			background-color: #07bfb1;
			color: white;
			font-size: 28rpx;
		}
	}

	.bottom-contain {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		// background-color: white;

		.bottom-placeholder {
			height: 68rpx;
		}

		.bottom-send {
			height: 96rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 20rpx;

			.input-text {
				margin-left: 24rpx;
				width: 302rpx;
				height: 72rpx;
				opacity: 0.24;
				background: #fff;
				border-radius: 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 12px;

				.iconfont {
					font-size: 18px;
				}
			}

			.bottom-icon {
				width: 84rpx;
				height: 72rpx;
				margin-left: 16rpx;
				position: relative;

				.img {
					width: 84rpx;
					height: 72rpx;
				}

				.like-count {
					position: absolute;
					right: -22rpx;
					top: -14rpx;
					width: 44rpx;
					height: 28rpx;
					font-size: 22rpx;
					font-weight: 500;
					color: #ffffff;
					text-align: center;
					line-height: 28rpx;
					background: rgba(88, 90, 93, 0.35);
					border-radius: 10rpx 10rpx 10rpx 4rpx;
					backdrop-filter: blur(2rpx);
				}
			}

			.macphone {
				width: 124rpx;
				height: 72rpx;
				background: rgba($color: #000000, $alpha: 0.24);
				border-radius: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #ffffff;
				margin-left: 16rpx;
				padding: 2rpx 8rpx;

				.icon_macphone {
					width: 50rpx;
					height: 50rpx;
					margin-right: 8rpx;
				}
			}
		}

		.scorll-chat {
			max-height: 452rpx;

			.text-center {
				text-align: center;
				color: white;
			}

			.chat-item {
				margin-top: 16rpx;
				margin-left: 24rpx;
				max-width: 544rpx;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 14rpx;
				color: #fff;
				padding: 0 16rpx;
				line-height: 44rpx;
				color: #fff;
				font-size: 28rpx;
				padding: 12rpx;
				word-break: break-all;

				.img {
					display: inline-block;
					width: 200rpx;
					height: 200rpx;
				}

				.avater {
					display: inline-block;
					margin-right: 12rpx;
					line-height: 44rpx;

					.img {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						display: inline-block;
						vertical-align: middle;
					}
				}

				.avater:after {
					display: inline-block;
					vertical-align: middle;
					content: '';
					height: 100%;
				}

				.name {
					color: rgba(255, 255, 255, 0.5);
					line-height: 44rpx;
					margin-right: 12rpx;
				}

				.text-info {
					font-size: 28rpx;
					font-weight: 400;
					color: #ffffff;
					line-height: 44rpx;
				}
			}
		}
	}

	.state-bar {
		height: 112rpx;
		display: flex;
		align-items: center;

		.user {
			margin-left: 28rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.img {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}

			.name {
				margin-top: 10rpx;
				width: 100rpx;
				height: 28rpx;
				font-size: 20rpx;
				color: #ffffff;
				line-height: 28rpx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.flex1 {
			flex: 1;
		}

		.state-bar-text {
			font-size: 28rpx;
			font-weight: 400;
			color: #ffffff;
			line-height: 24rpx;
			margin-right: 24rpx;
		}
	}

	.content {
		width: 100vw;
		height: 100vh;
		background: url("http://dbj.dragonn.top/static/mp/dabanjia/images/home/live_bg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
	}

	.player {
		flex: 1;
		width: 100vw;
	}
</style>
